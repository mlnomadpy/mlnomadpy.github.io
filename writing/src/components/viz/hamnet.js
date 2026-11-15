import { loadJSON } from './engine/io.js';
// Shared math + data loading for the hamiltonian-net post. Every panel runs the
// REAL trained weights exported by scripts/hamiltonian_net.py (the Kaggle run):
// the two learned pendulum fields (plain MLP vs HNN) and the seed-0 depth nets.
// Tiny models, so the linear algebra is hand-rolled (same precedent as the
// solve-wall post); the gradients of the learned scalars are exact backprop.

import reviewAsset0 from '../../../assets/hamiltonian-net/depth.json?url';
import reviewAsset1 from '../../../assets/hamiltonian-net/models.json?url';
import reviewAsset2 from '../../../assets/hamiltonian-net/pendulum.json?url';
const reviewAssets = {"depth": reviewAsset0, "models": reviewAsset1, "pendulum": reviewAsset2};
export function load(name) {
  return loadJSON(reviewAssets[name]);
}

// ---- generic MLP pieces (weights stored as [w, b] pairs, w is in x out) ----
function affine(x, [w, b]) {
  const out = new Float64Array(b.length);
  for (let j = 0; j < b.length; j++) {
    let s = b[j];
    for (let i = 0; i < x.length; i++) s += x[i] * w[i][j];
    out[j] = s;
  }
  return out;
}
const tanhV = (v) => v.map(Math.tanh);

// baseline pendulum field: [q,p] -> (dq/dt, dp/dt) directly (2-64-64-2, tanh)
export function baseField(m, q, p) {
  let h = tanhV(affine([q, p], m[0]));
  h = tanhV(affine(h, m[1]));
  const o = affine(h, m[2]);
  return [o[0], o[1]];
}

// HNN: the net is a SCALAR energy H(q,p) (2-64-64-1); the field is its
// symplectic gradient (dH/dp, -dH/dq), computed by exact backprop.
export function hnnEnergy(m, q, p) {
  let h = tanhV(affine([q, p], m[0]));
  h = tanhV(affine(h, m[1]));
  return affine(h, m[2])[0];
}
export function hnnField(m, q, p) {
  // forward, keeping post-activation values
  const a1 = affine([q, p], m[0]); const h1 = tanhV(a1);
  const a2 = affine(h1, m[1]); const h2 = tanhV(a2);
  // backward: dH/dh2 = w3 ; through tanh, then w2, tanh, w1
  const [w1] = m[0], [w2] = m[1], [w3] = m[2];
  const g2 = h2.map((v, j) => (1 - v * v) * w3[j][0]);
  const g1 = h1.map((v, i) => {
    let s = 0;
    for (let j = 0; j < g2.length; j++) s += w2[i][j] * g2[j];
    return (1 - v * v) * s;
  });
  let dq = 0, dp = 0;
  for (let i = 0; i < g1.length; i++) { dq += w1[0][i] * g1[i]; dp += w1[1][i] * g1[i]; }
  return [dp, -dq];              // (dH/dp, -dH/dq)
}

// RK4 step of either learned field (this is the integrator the run used)
export function rk4(field, m, q, p, dt) {
  const k1 = field(m, q, p);
  const k2 = field(m, q + 0.5 * dt * k1[0], p + 0.5 * dt * k1[1]);
  const k3 = field(m, q + 0.5 * dt * k2[0], p + 0.5 * dt * k2[1]);
  const k4 = field(m, q + dt * k3[0], p + dt * k3[1]);
  return [q + (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]),
          p + (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])];
}

export const trueEnergy = (q, p) => 0.5 * p * p + (1 - Math.cos(q));

// ---- the depth nets (Part B): DIM = 4, state (q, p) each in R^4 ----
export const DIM = 4, T_TOTAL = 6;

function vecAffine(x, [w, b]) { return affine(x, [w, b]); }

// potential V(q) = sum_j (tanh(q W1 + b1) W2 + b2)_j ; gradV by exact backprop
function gradV(net, q) {
  const a1 = vecAffine(q, net.b1); const h = tanhV(a1);
  const [w1] = net.b1, [w2] = net.b2, b2 = net.b2[1];
  // dV/dh_i = rowsum of w2
  const gh = h.map((v, i) => {
    let s = 0;
    for (let j = 0; j < b2.length; j++) s += w2[i][j];
    return (1 - v * v) * s;
  });
  const g = new Float64Array(DIM);
  for (let d = 0; d < DIM; d++) { let s = 0; for (let i = 0; i < gh.length; i++) s += w1[d][i] * gh[i]; g[d] = s; }
  return g;
}
export function potentialV(net, q) {
  const h = tanhV(vecAffine(q, net.b1));
  const o = vecAffine(h, net.b2);
  let s = 0; for (let j = 0; j < o.length; j++) s += o[j];
  return s;
}
function plainField(net, z) {
  const h = tanhV(vecAffine(z, net.b1));
  return vecAffine(h, net.b2);
}

// one depth step; kind 'ham' = leapfrog on V, else plain residual step
export function depthStep(net, kind, h, q, p) {
  if (kind === 'ham') {
    let g = gradV(net, q);
    for (let d = 0; d < DIM; d++) p[d] -= 0.5 * h * g[d];
    for (let d = 0; d < DIM; d++) q[d] += h * p[d];
    g = gradV(net, q);
    for (let d = 0; d < DIM; d++) p[d] -= 0.5 * h * g[d];
  } else {
    const z = Float64Array.from([...q, ...p]);
    const f = plainField(net, z);
    for (let d = 0; d < DIM; d++) { q[d] = z[d] + h * f[d]; p[d] = z[DIM + d] + h * f[DIM + d]; }
  }
  return [q, p];
}

// full forward pass at ANY depth L (fixed total time T, h = T/L), returning
// logits; optionally records per-layer telemetry via onLayer(q, p, layer)
export function netForward(net, kind, x, L, onLayer) {
  const h = T_TOTAL / L;
  const z0 = vecAffine(x, net.enc);
  let q = Float64Array.from(z0.slice(0, DIM));
  let p = Float64Array.from(z0.slice(DIM));
  for (let l = 0; l < L; l++) {
    [q, p] = depthStep(net, kind, h, q, p);
    if (onLayer) onLayer(q, p, l);
  }
  return vecAffine(Float64Array.from([...q, ...p]), net.dec);
}

export function accuracy(net, kind, X, y, L) {
  let ok = 0;
  for (let i = 0; i < X.length; i++) {
    const lg = netForward(net, kind, X[i], L);
    if ((lg[1] > lg[0] ? 1 : 0) === y[i]) ok++;
  }
  return ok / X.length;
}

export function learnedEnergy(net, q, p) {
  let ke = 0; for (let d = 0; d < DIM; d++) ke += 0.5 * p[d] * p[d];
  return ke + potentialV(net, q);
}

export const stateRms = (q, p) => {
  let s = 0;
  for (let d = 0; d < DIM; d++) s += q[d] * q[d] + p[d] * p[d];
  return Math.sqrt(s / (2 * DIM));
};
