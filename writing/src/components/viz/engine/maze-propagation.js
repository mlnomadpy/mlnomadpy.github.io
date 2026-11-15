// Native evaluator for the exported 5-neighbor Yat operator. The two affine
// products retain the existing jax-js CPU float32 input/output boundaries;
// patch norms, Yat features and tanh use JS float64 exactly as yatdeqmaze.js does.
const f32 = Math.fround;
const now = () => globalThis.performance?.now?.() ?? Date.now();
export function prepareMazeOperator(model) {
  const { params: p, dims: { d: D, m: M, kn } } = model;
  if (kn !== 5 || p.W.length !== M || p.W.some(r => r.length !== 5 * D)) throw new Error('Unsupported maze operator dimensions');
  return {
    D, M, P: 5 * D, W: p.W.map(r => Float32Array.from(r)),
    A: p.A.map(r => Float32Array.from(r)), Uin: p.Uin.map(r => Float32Array.from(r)),
    w2: Float64Array.from(p.W.map(r => r.reduce((s, v) => s + v * v, 0))),
    b: p.b, eps: p.eps, z0: Float64Array.from(p.z0), C: Float64Array.from(p.C[0]), cb: p.cb[0],
  };
}
export function createMazeRunner(op, wall, goal) {
  const H = wall.length, W = wall[0].length, n = H * W, { D, M, P } = op;
  if (!H || wall.some(r => r.length !== W)) throw new Error('Maze must be rectangular');
  const free = new Uint8Array(n), neighbors = new Int32Array(n * 5), xU = new Float32Array(n * D);
  for (let i = 0; i < H; i++) for (let j = 0; j < W; j++) {
    const c = i * W + j, offset = c * 5, fr = wall[i][j] ? 0 : 1, go = i === goal[0] && j === goal[1] ? 1 : 0;
    free[c] = fr;
    neighbors[offset] = c; neighbors[offset + 1] = i ? c - W : -1;
    neighbors[offset + 2] = i + 1 < H ? c + W : -1;
    neighbors[offset + 3] = j ? c - 1 : -1; neighbors[offset + 4] = j + 1 < W ? c + 1 : -1;
    for (let d = 0; d < D; d++) xU[c * D + d] = fr * op.Uin[d][0] + go * op.Uin[d][1];
  }
  let z = new Float64Array(n * D), next = new Float64Array(n * D);
  const patch = new Float32Array(P), phi = new Float32Array(M);
  function cells(start, end) {
    for (let c = start; c < end; c++) {
      if (!free[c]) continue; // A wall's next state is identically zero.
      let norm = 0;
      for (let s = 0; s < 5; s++) {
        const neighbor = neighbors[c * 5 + s], source = neighbor * D, dest = s * D;
        for (let d = 0; d < D; d++) { const v = neighbor < 0 ? 0 : z[source + d]; patch[dest + d] = v; norm += v * v; }
      }
      for (let m = 0; m < M; m++) {
        let dot = 0; const weight = op.W[m];
        for (let p = 0; p < P; p++) dot += patch[p] * weight[p];
        dot = f32(dot);
        const num = dot + op.b;
        phi[m] = num * num / (norm + op.w2[m] - 2 * dot + op.eps);
      }
      for (let d = 0; d < D; d++) {
        let sum = 0; const a = op.A[d];
        for (let m = 0; m < M; m++) sum += phi[m] * a[m];
        next[c * D + d] = Math.tanh(f32(sum) + xU[c * D + d] + op.z0[d]);
      }
    }
  }
  function commit() { const old = z; z = next; next = old; }
  function prob() {
    const out = new Float64Array(n);
    for (let c = 0; c < n; c++) {
      if (!free[c]) { out[c] = -1; continue; }
      let logit = op.cb; for (let d = 0; d < D; d++) logit += z[c * D + d] * op.C[d];
      out[c] = 1 / (1 + Math.exp(-logit));
    }
    return out;
  }
  return { H, W, n, free, cells, commit, prob, step() { cells(0, n); commit(); return this; } };
}
export function mazeAbortError() { const error = new Error('Maze propagation cancelled'); error.name = 'AbortError'; return error; }
export function yieldToBrowser() {
  if (globalThis.scheduler?.yield) return globalThis.scheduler.yield();
  return new Promise(resolve => setTimeout(resolve, 0));
}
// Results include every original iteration. Work is sliced by cell batches,
// rather than reducing grid resolution or skipping propagation steps.
export async function propagateMaze(op, example, {
  signal, isCurrent = () => true, onProgress = () => {}, maxSteps = 60,
  budgetMs = 6, batchCells = 8, yieldTask = yieldToBrowser,
} = {}) {
  const check = () => { if (signal?.aborted || !isCurrent()) throw mazeAbortError(); };
  check();
  const runner = createMazeRunner(op, example.wall, example.goal), { H, W, n } = runner;
  const maxk = Math.min(maxSteps, 2 * Math.max(H, W) + 6), fields = [runner.prob()];
  let sliceStart = now(), yields = 0, maxSliceMs = 0;
  onProgress(0, maxk);
  // Yield once before compute so loading status paints and early cancellation works.
  await yieldTask(); yields++; check(); sliceStart = now();
  for (let k = 0; k < maxk; k++) {
    for (let c = 0; c < n; c += batchCells) {
      check(); runner.cells(c, Math.min(n, c + batchCells));
      const elapsed = now() - sliceStart;
      if (elapsed >= budgetMs) {
        maxSliceMs = Math.max(maxSliceMs, elapsed); onProgress(k + Math.min(n, c + batchCells) / n, maxk);
        await yieldTask(); yields++; check(); sliceStart = now();
      }
    }
    runner.commit(); fields.push(runner.prob()); onProgress(k + 1, maxk);
  }
  maxSliceMs = Math.max(maxSliceMs, now() - sliceStart); check();
  const wallFlat = Uint8Array.from(example.wall.flat()), reachFlat = Uint8Array.from(example.reach.flat());
  return { H, W, n, fields, maxk, wallFlat, reachFlat, goal: example.goal.slice(), radius: example.radius, work: { yields, maxSliceMs } };
}
