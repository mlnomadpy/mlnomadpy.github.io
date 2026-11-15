// Shared data + compute for the Yat deep-equilibrium panels. One memoized fetch of
// model.json (the exact trained operator: prototypes W, mixing A, injection U,
// readout C) and one memoized on-device compute object that runs the SAME iteration
// the network was trained with, entirely on the engine backend (jax-js):
//
//     F(z; x) = tanh( A · φ_W(z) + U·x + z0 ),   φ_W(z)_i = (⟨z,w_i⟩ + b)² / (‖z-w_i‖² + ε)
//     z_{k+1} = (1-β) z_k + β F(z_k; x)   →   z*  (the answer is the fixed point)
//
// The whole step (both matmuls, the Yat feature, the tanh) stays as jax-js arrays;
// nothing is read back mid-loop, and only the small quantities a panel actually
// draws (a 2-D projection, a probability, a residual) are materialized. Weights are
// held on-device and reused via `.ref` (move semantics); each runner disposes its
// state so a bounded forward loop never leaks. Numbers from scripts/yat_deq.py.
import { np, ensureJax } from './engine/jax.js';
import { loadJSON } from './engine/io.js';

import reviewAsset0 from '../../../assets/yat-deq/model.json?url';
const reviewAssets = {"model": reviewAsset0};
const URL = reviewAsset0;

export const CLS_A = '#4a7fb3';   // class 0
export const CLS_B = '#c2553a';   // class 1

// load the model and the compute device together, once, shared across every panel
export const loadReady = () => Promise.all([loadJSON(URL), ensureJax()]).then(([m]) => m);

let _cmp = null;
export function compute(model) {
  if (_cmp) return _cmp;
  const P = model.params, dims = model.dims, D = dims.d, M = dims.m;
  const beta = model.solver.beta, b = P.b, eps = P.eps;
  const Wnp = np.array(P.W);
  // persistent on-device weights (transposed for the batch matmuls); reused via .ref, never disposed
  const WT = np.transpose(Wnp.ref);                       // D×M
  const AT = np.transpose(np.array(P.A));                 // M×D
  const UinT = np.transpose(np.array(P.Uin));             // d_in×D
  const CT = np.transpose(np.array(P.C));                 // D×ncls
  const z0 = np.array([P.z0]);                            // 1×D
  const cb = np.array([P.cb]);                            // 1×ncls
  const w2 = np.sum(np.square(Wnp), 1).reshape([1, M]);   // 1×M   ‖w_i‖²
  const mean = np.array([model.pca.mean]);                // 1×D
  const basisT = np.transpose(np.array(model.pca.basis)); // D×2

  // one application of the shared operator to a batch, all on-device:
  //   F(Z; xU) = tanh( φ_W(Z)·Aᵀ + xU + z0 ),  xU = X·Uᵀ precomputed by the runner
  const applyDev = (Z, xU, n) => {
    const z2 = np.sum(np.square(Z.ref), 1).reshape([n, 1]);            // n×1 (reshape: keepdims is unreliable)
    const dot = np.matmul(Z.ref, WT.ref);                             // n×M
    const num = dot.ref.add(b);                                       // ⟨z,w⟩ + b
    const K = num.ref.mul(num).div(z2.add(w2.ref).sub(dot.mul(2)).add(eps));  // n×M  Yat feature
    const pre = np.matmul(K, AT.ref).add(xU.ref).add(z0.ref);         // n×D
    return np.tanh(pre);                                              // n×D
  };

  _cmp = { D, M, beta, WT, AT, UinT, CT, z0, cb, w2, mean, basisT, applyDev };
  return _cmp;
}

// A stateful iterator over one fixed batch of inputs. Holds the state Z and the
// precomputed input injection xU on-device; step() advances the damped-Picard
// iteration; proj/prob1/stateJS read out only what a panel draws. Always dispose().
export function makeRunner(cmp, Xjs, Z0js = null) {
  const n = Xjs.length;
  const xU = np.matmul(np.array(Xjs), cmp.UinT.ref);      // n×D, constant across iterations
  let Z = Z0js ? np.array(Z0js) : np.zeros([n, cmp.D]);

  const advance = () => {
    const Fz = cmp.applyDev(Z.ref, xU.ref, n);
    return Z.ref.mul(1 - cmp.beta).add(Fz.mul(cmp.beta));  // (1-β)Z + βF(Z)
  };
  return {
    n,
    step() { const out = advance(); Z.dispose(); Z = out; return this; },
    // advance and return the per-sample step size ‖z_{k+1}-z_k‖ (JS array, length n)
    stepR() {
      const out = advance();
      const rn = np.sqrt(np.sum(np.square(out.ref.sub(Z.ref)), 1)).js();
      Z.dispose(); Z = out; return rn;
    },
    proj() { return np.matmul(Z.ref.sub(cmp.mean.ref), cmp.basisT.ref).js(); },   // n×2 PCA window
    prob1() {                                                                     // class-1 probability, length n
      const lg = np.matmul(Z.ref, cmp.CT.ref).add(cmp.cb.ref).js();               // n×ncls
      return lg.map((r) => 1 / (1 + Math.exp(r[0] - r[1])));
    },
    stateJS() { return Z.ref.js(); },
    dispose() { Z.dispose(); xU.dispose(); },
  };
}
