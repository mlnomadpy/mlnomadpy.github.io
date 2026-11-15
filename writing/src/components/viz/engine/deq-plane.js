// The exported two-moons operator, evaluated with reusable native typed arrays.
// Mathematical update matches yatdeq.js: damped tanh(A φ_W(z) + Ux + z0).
// All 100×100 plane points and every test input retain all requested snapshots.
// Float64 arithmetic avoids interpreter/tensor allocation overhead; field images
// are converted to Float32 only by their renderer. No spectral/kernel shortcut.

const clock = () => performance.now();
const yieldToBrowser = () => new Promise(resolve => setTimeout(resolve, 0));

function flatten(rows, count, width, name) {
  if (rows.length !== count || rows.some(row => row.length !== width)) throw new Error(`Invalid ${name} shape`);
  const out = Float64Array.from(rows.flat());
  if (!out.every(Number.isFinite)) throw new Error(`Non-finite ${name}`);
  return out;
}

export function prepareDEQOperator(model) {
  const { params: p, dims } = model;
  const D = dims.d, M = dims.m, I = dims.d_in;
  if (![D, M, I].every(n => Number.isInteger(n) && n > 0) || dims.ncls !== 2) throw new Error('Expected a binary DEQ operator');
  const W = flatten(p.W, M, D, 'W'), A = flatten(p.A, D, M, 'A');
  const U = flatten(p.Uin, D, I, 'Uin'), C = flatten(p.C, 2, D, 'C');
  const z0 = Float64Array.from(p.z0), cb = Float64Array.from(p.cb), w2 = new Float64Array(M);
  if (z0.length !== D || cb.length !== 2 || !z0.every(Number.isFinite) || !cb.every(Number.isFinite)) throw new Error('Invalid DEQ biases');
  if (!Number.isFinite(p.b) || !(p.eps > 0) || !Number.isFinite(p.eps) || !(model.solver.beta > 0 && model.solver.beta <= 1)) throw new Error('Invalid DEQ scalar parameters');
  for (let m = 0; m < M; m++) for (let d = 0; d < D; d++) w2[m] += W[m * D + d] ** 2;
  return { D, M, I, W, A, U, C, z0, cb, w2, b: p.b, eps: p.eps, beta: model.solver.beta };
}

function pointEvaluator(op, snapshots, maxDepth) {
  const { D, M, I, W, A, U, C, z0, cb, w2, b, eps, beta } = op;
  let z = new Float64Array(D), next = new Float64Array(D);
  const injection = new Float64Array(D), phi = new Float64Array(M);
  const probability = () => {
    let a = cb[0], b = cb[1];
    for (let d = 0; d < D; d++) { a += z[d] * C[d]; b += z[d] * C[D + d]; }
    return 1 / (1 + Math.exp(a - b));
  };
  return (point, index) => {
    if (point.length !== I || !point.every(Number.isFinite)) throw new Error('Invalid DEQ input');
    z.fill(0);
    for (let d = 0; d < D; d++) {
      let s = 0; for (let i = 0; i < I; i++) s += point[i] * U[d * I + i];
      injection[d] = s;
    }
    snapshots[0][index] = probability();
    for (let k = 1; k <= maxDepth; k++) {
      let z2 = 0; for (let d = 0; d < D; d++) z2 += z[d] * z[d];
      for (let m = 0; m < M; m++) {
        let dot = 0; for (let d = 0; d < D; d++) dot += z[d] * W[m * D + d];
        const numerator = dot + b;
        phi[m] = numerator * numerator / (z2 + w2[m] - 2 * dot + eps);
      }
      for (let d = 0; d < D; d++) {
        let s = 0; for (let m = 0; m < M; m++) s += phi[m] * A[d * M + m];
        next[d] = (1 - beta) * z[d] + beta * Math.tanh(s + injection[d] + z0[d]);
      }
      const previous = z; z = next; next = previous;
      snapshots[k][index] = probability();
    }
  };
}

// Cooperative batches cap the uninterrupted work. Cancellation is checked before
// every batch and after each yield, so a stale setup never commits its result.
// `null` means cancelled; a partial plane is never returned as a finished result.
export async function evaluateDEQPoints(model, points, maxDepth, {
  shouldCancel = () => false,
  onProgress = () => {},
  batchSize = 16,
  budgetMs = 6,
  yieldControl = yieldToBrowser,
  now = clock,
} = {}) {
  if (!Number.isInteger(maxDepth) || maxDepth < 0 || !Number.isInteger(batchSize) || batchSize < 1 || !(budgetMs > 0)) throw new Error('Invalid DEQ sweep options');
  if (shouldCancel()) return null;
  const started = now(), op = prepareDEQOperator(model);
  const snapshots = Array.from({ length: maxDepth + 1 }, () => new Float64Array(points.length));
  const evaluatePoint = pointEvaluator(op, snapshots, maxDepth);
  let sliceStarted = now(), maxSliceMs = 0, yields = 0;
  onProgress({ completed: 0, total: points.length });
  // Give the loading/progress state a paint opportunity before the first batch.
  await yieldControl();
  if (shouldCancel()) return null;
  sliceStarted = now();
  for (let start = 0; start < points.length; start += batchSize) {
    if (shouldCancel()) return null;
    const end = Math.min(points.length, start + batchSize);
    for (let i = start; i < end; i++) evaluatePoint(points[i], i);
    const elapsed = now() - sliceStarted;
    if (elapsed >= budgetMs && end < points.length) {
      maxSliceMs = Math.max(maxSliceMs, elapsed);
      onProgress({ completed: end, total: points.length });
      await yieldControl(); yields++;
      if (shouldCancel()) return null;
      sliceStarted = now();
    }
  }
  maxSliceMs = Math.max(maxSliceMs, now() - sliceStarted);
  if (shouldCancel()) return null;
  onProgress({ completed: points.length, total: points.length });
  return { snapshots, metrics: { elapsedMs: now() - started, maxSliceMs, yields, points: points.length, maxDepth } };
}
