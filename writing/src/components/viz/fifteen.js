import { loadJSON } from './engine/io.js';
// Shared data + math for the hundred-classes panels.
import { grayGlyph } from './engine/draw.js';

import reviewAsset0 from '../../../assets/fifteen-ideas/eps.json?url';
import reviewAsset1 from '../../../assets/fifteen-ideas/rebuild.json?url';
import reviewAsset2 from '../../../assets/fifteen-ideas/support.json?url';
import reviewAsset3 from '../../../assets/fifteen-ideas/taxonomy.json?url';
import reviewAsset4 from '../../../assets/fifteen-ideas/welch.json?url';
const reviewAssets = {"eps": reviewAsset0, "rebuild": reviewAsset1, "support": reviewAsset2, "taxonomy": reviewAsset3, "welch": reviewAsset4};
export function load(name) {
  return loadJSON(reviewAssets[name]);
}
export function thumb(ctx, img, x, y, w, h, key) {
  grayGlyph(ctx, img, 16, x, y, w, h, { invert: false, key });
}
// rebuild the 100-class verdicts from the top-k concept axes (prepared once
// into typed arrays; each call subtracts nothing, it projects fresh but the
// inner product is over k<=100 so the whole sweep is cheap)
export function prepare(d) {
  if (d._prep) return d._prep;
  const n = d.L.length, C = d.base.length;
  const L = new Float32Array(n * C), E = new Float32Array(C * C);
  for (let i = 0; i < n; i++) for (let c = 0; c < C; c++) L[i * C + c] = d.L[i][c];
  for (let a = 0; a < C; a++) for (let j = 0; j < C; j++) E[a * C + j] = d.E[a][j];
  // coordinates along each concept axis, once
  const D = new Float32Array(n * C);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < C; j++) {
      let s = 0;
      for (let c = 0; c < C; c++) s += L[i * C + c] * E[c * C + j];
      D[i * C + j] = s;
    }
  }
  d._prep = { n, C, L, E, D };
  return d._prep;
}
// ── the codebook packing, live ───────────────────────────────────────────────
// coords: per seed, 100 class means as unit vectors in the progressive 30-axis
// concept basis. Truncating to the first k coords and renormalizing IS the
// projection onto the top-k concept subspace, so the whole squeeze is a
// 100 x k renormalize plus 4,950 k-term dot products per dial move.
export function welchPrep(d) {
  if (d._wp) return d._wp;
  const C = 100, S = d.coords.length;
  const co = d.coords.map((m) => {
    const a = new Float32Array(C * 30);
    for (let i = 0; i < C; i++) for (let j = 0; j < 30; j++) a[i * 30 + j] = m[i][j];
    return a;
  });
  const nP = (C * (C - 1)) / 2;
  const I = new Uint8Array(nP), J = new Uint8Array(nP), sib = new Uint8Array(nP);
  let p = 0;
  for (let i = 0; i < C; i++) for (let j = i + 1; j < C; j++) {
    I[p] = i; J[p] = j;
    sib[p] = d.fine2coarse[i] === d.fine2coarse[j] ? 1 : 0;
    p++;
  }
  const conf = new Float32Array(nP);
  for (const [i, j, c] of d.conf) conf[i * C - ((i + 1) * (i + 2)) / 2 + j] = c;
  d._wp = { C, S, co, nP, I, J, sib, conf };
  return d._wp;
}
export function welchCos(d, s, k) {
  const { C, co, nP, I, J } = welchPrep(d);
  const V = new Float32Array(C * k), a = co[s];
  for (let i = 0; i < C; i++) {
    let n = 0;
    for (let j = 0; j < k; j++) n += a[i * 30 + j] * a[i * 30 + j];
    n = 1 / Math.sqrt(Math.max(n, 1e-12));
    for (let j = 0; j < k; j++) V[i * k + j] = a[i * 30 + j] * n;
  }
  const cos = new Float32Array(nP);
  for (let p = 0; p < nP; p++) {
    let s2 = 0;
    const i = I[p] * k, j = J[p] * k;
    for (let t = 0; t < k; t++) s2 += V[i + t] * V[j + t];
    cos[p] = s2;
  }
  return cos;
}
export const welchFloor = (C, k) => Math.sqrt(Math.max(C - k, 0) / (k * (C - 1)));
export function rebuildAcc(d, k) {
  const { n, C, E, D } = prepare(d);
  const pred = new Int16Array(n);
  const lg = new Float64Array(C);
  const f2c = d.fine2coarse;
  let ok = 0, okCo = 0;
  for (let i = 0; i < n; i++) {
    for (let c = 0; c < C; c++) lg[c] = d.base[c];
    for (let j = 0; j < k; j++) {
      const dv = D[i * C + j];
      if (dv === 0) continue;
      for (let c = 0; c < C; c++) lg[c] += dv * E[c * C + j];
    }
    let bi = 0;
    for (let c = 1; c < C; c++) if (lg[c] > lg[bi]) bi = c;
    pred[i] = bi;
    if (bi === d.y[i]) ok++;
    if (f2c && f2c[bi] === f2c[d.y[i]]) okCo++;
  }
  return { pred, acc: (100 * ok) / n, coAcc: (100 * okCo) / n };
}
