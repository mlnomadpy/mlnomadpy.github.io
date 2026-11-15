import { loadJSON } from './engine/io.js';
// Shared data + math for the spectral-surgery panels. The live panels
// recompute predictions from the trained network's mode coordinates, so any
// deletion the reader chooses is applied to the real model, exactly.

import { grayGlyph } from './engine/draw.js';

import liveDataUrl from '../../../assets/spectral-surgery/live.json?url';
import numbersDataUrl from '../../../assets/spectral-surgery/numbers.json?url';
import predictDataUrl from '../../../assets/spectral-surgery/predict.json?url';
import recoveryDataUrl from '../../../assets/spectral-surgery/recovery.json?url';
import surgeryDataUrl from '../../../assets/spectral-surgery/surgery.json?url';
const datasets = {
  'live': liveDataUrl,
  'numbers': numbersDataUrl,
  'predict': predictDataUrl,
  'recovery': recoveryDataUrl,
  'surgery': surgeryDataUrl,
};

export function load(name) {
  return loadJSON(datasets[name]);
}

export function thumb(ctx, img, x, y, w, h, key) {
  grayGlyph(ctx, img, 14, x, y, w, h, { invert: true, key });
}

// One-time preparation: the shipped payload is nested JSON arrays, which are
// slow to walk. Flatten to typed arrays and cache the intact logits, so a cut
// costs only the modes actually removed instead of a full rebuild.
function prepare(live) {
  if (live._prep) return live._prep;
  const { E, Ahat, base, tail } = live;
  const n = E.length, K = Ahat.length, C = 10;
  const Ef = new Float32Array(n * K), Af = new Float32Array(K * C);
  for (let i = 0; i < n; i++) {
    const row = E[i], off = i * K;
    for (let k = 0; k < K; k++) Ef[off + k] = row[k];
  }
  for (let k = 0; k < K; k++) {
    const row = Ahat[k], off = k * C;
    for (let c = 0; c < C; c++) Af[off + c] = row[c];
  }
  const full = new Float64Array(n * C);
  for (let i = 0; i < n; i++) {
    const eo = i * K, lo = i * C;
    for (let c = 0; c < C; c++) full[lo + c] = base[c] + (tail ? tail[i][c] : 0);
    for (let k = 0; k < K; k++) {
      const e = Ef[eo + k];
      if (e === 0) continue;
      const ao = k * C;
      for (let c = 0; c < C; c++) full[lo + c] += e * Af[ao + c];
    }
  }
  live._prep = { n, K, C, Ef, Af, full, lg: new Float64Array(n * C) };
  return live._prep;
}

// predictions with an arbitrary set of modes deleted, computed by subtracting
// only those modes from the intact logits
export function predictWith(live, deleted) {
  const { n, K, C, Ef, Af, full, lg } = prepare(live);
  lg.set(full);
  for (const k of deleted) {
    if (k < 0 || k >= K) continue;
    const ao = k * C;
    for (let i = 0; i < n; i++) {
      const e = Ef[i * K + k];
      if (e === 0) continue;
      const lo = i * C;
      for (let c = 0; c < C; c++) lg[lo + c] -= e * Af[ao + c];
    }
  }
  const pred = new Int8Array(n);
  for (let i = 0; i < n; i++) {
    const lo = i * C;
    let bi = 0;
    for (let c = 1; c < C; c++) if (lg[lo + c] > lg[lo + bi]) bi = c;
    pred[i] = bi;
  }
  return pred;
}

// Accuracy along a deletion order, cutting one mode at a time. Returns
// order.length + 1 accuracies (intact first); each step touches one mode.
export function cutSweep(live, order, y) {
  const { n, K, C, Ef, Af, full, lg } = prepare(live);
  lg.set(full);
  const score = () => {
    let ok = 0;
    for (let i = 0; i < n; i++) {
      const lo = i * C;
      let bi = 0;
      for (let c = 1; c < C; c++) if (lg[lo + c] > lg[lo + bi]) bi = c;
      if (bi === y[i]) ok++;
    }
    return (100 * ok) / n;
  };
  const acc = [score()];
  for (const k of order) {
    const ao = k * C;
    for (let i = 0; i < n; i++) {
      const e = Ef[i * K + k];
      if (e === 0) continue;
      const lo = i * C;
      for (let c = 0; c < C; c++) lg[lo + c] -= e * Af[ao + c];
    }
    acc.push(score());
  }
  return acc;
}

export function confusion(pred, y) {
  const M = Array.from({ length: 10 }, () => new Array(10).fill(0));
  for (let i = 0; i < pred.length; i++) M[y[i]][pred[i]]++;
  return M;
}

export function accuracy(pred, y) {
  let ok = 0;
  for (let i = 0; i < pred.length; i++) if (pred[i] === y[i]) ok++;
  return (100 * ok) / pred.length;
}
