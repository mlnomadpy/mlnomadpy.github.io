// jax.js, the engine's compute backend. All blog ML math runs on real jax-js
// (@jax-js/jax): NumPy/JAX in the browser. This module owns the one async bit
// (device init) and the glue that lets a synchronous vizkit spec use it:
// kick `withJax` in setup(), guard draw() with `drawJaxLoading`.
//
//   import { np, nn, withJax, drawJaxLoading } from './engine/jax.js';
//   setup(api){ /* build JS data into api.state */ withJax(api, recompute); }
//   draw(api){ if (!api.state.jaxReady) return drawJaxLoading(api); ... }
//
// We pin the `cpu` device. jax-js's faster wasm/webgpu backends read tensor data
// back synchronously through a `SharedArrayBuffer`, which the browser only exposes
// on cross-origin-isolated pages (COOP/COEP), and COEP would break giscus and our
// other cross-origin embeds site-wide. The `cpu` backend is the reference JS
// interpreter: its synchronous read is a plain buffer slice (no SharedArrayBuffer),
// so it runs in every browser with zero isolation. It's still real jax-js, true
// NumPy semantics, real LU-based `linalg.solve`, real `nn.softmax`, just
// interpreted rather than SIMD-compiled, which is irrelevant at our problem sizes.
//
// Reminder: arrays have Rust-like move semantics, every op consumes its inputs.
// Reuse a value -> take `.ref`. A forward pass that allocates fresh and reads out
// once per call never leaks; only long training loops that reuse params do.
import { numpy as np, nn, init, defaultDevice, tree, random } from '@jax-js/jax';
import { text } from './draw.js';
import { currentTask } from './runtime.js';

let _ready = null;
// memoised init. `cpu` is registered at import time, so init('cpu') resolves
// immediately (no WebGPU adapter request, no Wasm workers); we then pin it default.
export const ensureJax = () => (_ready ||= init('cpu').then(() => { defaultDevice('cpu'); return true; }).catch(error => { _ready = null; throw error; }));

// Kick init from a vizkit setup(); marks api.state.jaxReady and re-renders when
// the device is live (all jax ops are synchronous after init resolves).
export function withJax(api, compute) {
  const state = api.state, generation = api.generation;
  state.jaxReady = false;
  const complete = api.beginTask?.('Preparing figure…') || (() => {});
  return ensureJax().then(() => {
    if (!currentTask(api, state, generation)) return;
    state.jaxReady = true;
    if (compute) compute(api);
    complete(); api.render();
  }).catch(error => {
    if (!currentTask(api, state, generation)) return;
    complete(); api.fail?.(error);
  });
}

// standard loading frame to show until the device is ready
export function drawJaxLoading(api) {
  const { ctx, colors, size } = api;
  text(ctx, 'initializing visualization…', size.W / 2, size.H / 2, colors,
    { align: 'center', baseline: 'middle', color: colors.muted, size: 12, mono: true });
}

export { np, nn, tree, random };

// ── eigh: symmetric eigendecomposition (jax-js has no eigh/svd) ────────────────
// LAPACK's dsyev shape: Householder tridiagonalization with the O(n³) reflections
// H·A·H and the eigenvector accumulation Q·H run as real jax-js matmuls; the cheap
// O(n²) tridiagonal QL solve (tql2) is JS glue. Robust on degenerate/clustered
// spectra where orthogonal iteration stalls, verified to the analytical spectrum
// of block / simplex / graded kernels (jax-js cpu is float32, so ~1e-6 accurate).
//   eigh(rows) → { values: [λ desc], vectors: [v0, v1, …] }  (vectors[k] = k-th eigenvector, length n)
function tql2(d, e, n) {
  const Z = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  const ee = e.slice(); ee.push(0);
  for (let l = 0; l < n; l++) {
    let iter = 0, m;
    do {
      for (m = l; m < n - 1; m++) { const dd = Math.abs(d[m]) + Math.abs(d[m + 1]); if (Math.abs(ee[m]) <= 1e-15 * dd) break; }
      if (m !== l) {
        if (iter++ === 80) break;
        let g = (d[l + 1] - d[l]) / (2 * ee[l]); let r = Math.hypot(g, 1);
        g = d[m] - d[l] + ee[l] / (g + (g >= 0 ? Math.abs(r) : -Math.abs(r)));
        let s = 1, c = 1, p = 0;
        for (let i = m - 1; i >= l; i--) {
          let f = s * ee[i], b = c * ee[i];
          r = Math.hypot(f, g); ee[i + 1] = r;
          if (r === 0) { d[i + 1] -= p; ee[m] = 0; break; }
          s = f / r; c = g / r; g = d[i + 1] - p;
          r = (d[i] - g) * s + 2 * c * b; p = s * r; d[i + 1] = g + p; g = c * r - b;
          for (let k = 0; k < n; k++) { f = Z[k][i + 1]; Z[k][i + 1] = s * Z[k][i] + c * f; Z[k][i] = c * Z[k][i] - s * f; }
        }
        if (r === 0 && (m - 1) >= l) continue;
        d[l] -= p; ee[l] = g; ee[m] = 0;
      }
    } while (m !== l);
  }
  return { d, Z };
}

export function eigh(rows) {
  const n = rows.length;
  if (n === 1) return { values: [rows[0][0]], vectors: [[1]] };
  let A = np.array(rows.map(r => Array.from(r)));
  let Q = np.eye(n);
  for (let k = 0; k < n - 2; k++) {
    const a = A.ref.js();
    const x = []; for (let i = k + 1; i < n; i++) x.push(a[i][k]);
    let nrm = 0; for (const v of x) nrm += v * v; nrm = Math.sqrt(nrm);
    if (nrm < 1e-12) continue;
    const alpha = (x[0] >= 0 ? -1 : 1) * nrm;
    const v = x.slice(); v[0] -= alpha;
    let vn = 0; for (const t of v) vn += t * t; vn = Math.sqrt(vn);
    if (vn < 1e-12) continue;
    for (let i = 0; i < v.length; i++) v[i] /= vn;
    const Hjs = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
    for (let i = k + 1; i < n; i++) for (let j = k + 1; j < n; j++) Hjs[i][j] -= 2 * v[i - (k + 1)] * v[j - (k + 1)];
    const H = np.array(Hjs);
    A = np.matmul(np.matmul(H.ref, A), H.ref);   // H symmetric → H·A·H
    Q = np.matmul(Q, H);
  }
  const af = A.ref.js();
  const d = [], e = []; for (let i = 0; i < n; i++) d.push(af[i][i]); for (let i = 1; i < n; i++) e.push(af[i][i - 1]);
  const { d: w, Z } = tql2(d, e, n);
  const V = np.matmul(Q, np.array(Z)).js();      // eigenvectors of A = Q·Z
  const idx = w.map((_, i) => i).sort((p, q) => w[q] - w[p]);
  return { values: idx.map(i => w[i]), vectors: idx.map(i => V.map(r => r[i])) };
}
