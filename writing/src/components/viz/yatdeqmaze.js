// Shared data + compute for the maze (propagation) panels. Loads the recursive Yat
// maze-solver's weights and showcase mazes, and runs the SAME shared operator live in
// the browser, one propagation step at a time:
//
//   z_{k+1}[i,j] = tanh( A · φ_W(patch(z_k)[i,j]) + U·x[i,j] + z0 ) · free[i,j]
//
// patch = the 5-cell neighborhood (self + up/down/left/right). The two matmuls run on
// the engine backend (jax-js); the neighborhood gather, Yat feature and mask are JS
// (grids are tiny). Same weights the network trained with; numbers from
// scripts/yat_deq_maze.py.
import { np, ensureJax } from './engine/jax.js';
import { loadJSON } from './engine/io.js';

import reviewAsset0 from '../../../assets/yat-deq-maze/model.json?url';
const reviewAssets = {"model": reviewAsset0};
const URL = reviewAsset0;

export const loadReady = () => Promise.all([loadJSON(URL), ensureJax()]).then(([m]) => m);

let _cmp = null;
export function compute(model) {
  if (_cmp) return _cmp;
  const P = model.params, D = model.dims.d, M = model.dims.m;
  const WT = np.transpose(np.array(P.W));       // 5D×M
  const AT = np.transpose(np.array(P.A));        // M×D
  const UinT = np.transpose(np.array(P.Uin));    // 2×D
  const w2 = P.W.map((r) => r.reduce((a, v) => a + v * v, 0));   // ‖w_i‖²
  const b = P.b, eps = P.eps, z0 = P.z0, C = P.C[0], cb = P.cb[0];

  // one propagation step over a whole grid. z,free,xU are flat [H*W] arrays.
  const stepGrid = (z, free, xU, H, W) => {
    const n = H * W;
    // gather the 5-cell neighborhood into a patch matrix [n, 5D] (0 outside grid / on walls, since z is masked)
    const zero = new Float64Array(D);
    const at = (i, j) => (i < 0 || j < 0 || i >= H || j >= W) ? zero : z[i * W + j];
    const patch = new Array(n);
    for (let i = 0; i < H; i++) for (let j = 0; j < W; j++) {
      const row = new Float64Array(5 * D), nb = [z[i * W + j], at(i - 1, j), at(i + 1, j), at(i, j - 1), at(i, j + 1)];
      for (let s = 0; s < 5; s++) row.set(nb[s], s * D);
      patch[i * W + j] = Array.from(row);
    }
    const dot = np.matmul(np.array(patch), WT.ref).js();          // n×M  (on device)
    const pn = patch.map((r) => r.reduce((a, v) => a + v * v, 0));
    const phi = new Array(n);
    for (let c = 0; c < n; c++) {
      const row = new Array(M);
      for (let u = 0; u < M; u++) { const num = dot[c][u] + b; row[u] = (num * num) / (pn[c] + w2[u] - 2 * dot[c][u] + eps); }
      phi[c] = row;
    }
    const kA = np.matmul(np.array(phi), AT.ref).js();             // n×D  (on device)
    const out = new Array(n);
    for (let c = 0; c < n; c++) {
      const row = new Float64Array(D);
      if (free[c]) for (let j = 0; j < D; j++) row[j] = Math.tanh(kA[c][j] + xU[c][j] + z0[j]);
      out[c] = row;   // walls stay all-zero
    }
    return out;
  };

  _cmp = { D, M, b, eps, z0, C, cb, w2, WT, AT, UinT, stepGrid };
  return _cmp;
}

// A live solver for one maze. wall: H×W (1=wall), goal: [gi,gj]. Iterates the operator
// from z=0; prob() gives the per-cell reachability the network currently believes.
export function makeMaze(cmp, wall, goal) {
  const H = wall.length, W = wall[0].length, n = H * W, D = cmp.D;
  const free = new Float64Array(n), xmat = new Array(n);
  for (let i = 0; i < H; i++) for (let j = 0; j < W; j++) {
    const c = i * W + j, fr = wall[i][j] ? 0 : 1, go = (i === goal[0] && j === goal[1]) ? 1 : 0;
    free[c] = fr; xmat[c] = [fr, go];
  }
  const xU = np.matmul(np.array(xmat), cmp.UinT.ref).js();        // input injection, constant across steps
  let z = Array.from({ length: n }, () => new Float64Array(D));
  return {
    H, W, n, free,
    step() { z = cmp.stepGrid(z, free, xU, H, W); return this; },
    prob() {                                                      // per-cell reachability probability [n]
      const C = cmp.C, cb = cmp.cb;
      return z.map((r, c) => { if (!free[c]) return -1; let s = cb; for (let j = 0; j < D; j++) s += r[j] * C[j]; return 1 / (1 + Math.exp(-s)); });
    },
  };
}
