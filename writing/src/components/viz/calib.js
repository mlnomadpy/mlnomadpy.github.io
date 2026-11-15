// Shared data + compute for the calibration post. One memoized fetch of the
// exported logits (public/yat-calibration/logits.json, seed 0 of
// scripts/yat_calibration.py), plus the binning math every panel reuses: max
// softmax confidence at a temperature, reliability bins, ECE, histograms.
// The one matrix pass at load (correctness of the argmax prediction per net)
// runs on the engine compute backend; the per-frame re-binning is a tight loop
// so a slider drag stays instant.
import { np, ensureJax } from './engine/jax.js';
import { loadJSON } from './engine/io.js';

import datasetUrl from '../../../assets/yat-calibration/logits.json?url';

let _data = null;
export function loadCalib() {
  return (_data ||= Promise.all([loadJSON(datasetUrl), ensureJax()]).then(([d]) => {
    // one argmax pass per net on the backend: prediction + correctness at T=1
    // (argmax is temperature-invariant, so this is valid at every T)
    for (const name of ['yat', 'relu']) {
      const z = d[name].test;
      const pred = np.argmax(np.array(z), 1).js();
      d[name].correct = pred.map((p, i) => (p === d.labels[i] ? 1 : 0));
    }
    return d;
  }));
}

// max softmax probability of each row of `z` at temperature T (tight loop; a
// slider drag re-runs this 60x/s over 4000x10 without dropping frames)
export function maxConf(z, T = 1) {
  const n = z.length, out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const r = z[i];
    let m = -Infinity;
    for (let c = 0; c < r.length; c++) if (r[c] > m) m = r[c];
    let s = 0, top = 0;
    for (let c = 0; c < r.length; c++) {
      const e = Math.exp((r[c] - m) / T);
      s += e; if (e > top) top = e;
    }
    out[i] = top / s;
  }
  return out;
}

// equal-width reliability bins over confidence in [0,1]:
// per-bin count / mean confidence / accuracy, plus the count-weighted ECE
export function binStats(conf, correct, nBins = 15) {
  const count = new Float64Array(nBins), sc = new Float64Array(nBins), sa = new Float64Array(nBins);
  for (let i = 0; i < conf.length; i++) {
    let b = Math.floor(conf[i] * nBins);
    if (b >= nBins) b = nBins - 1;
    count[b]++; sc[b] += conf[i]; sa[b] += correct[i];
  }
  const mconf = [], macc = [];
  let ece = 0;
  for (let b = 0; b < nBins; b++) {
    mconf.push(count[b] ? sc[b] / count[b] : 0);
    macc.push(count[b] ? sa[b] / count[b] : 0);
    if (count[b]) ece += (count[b] / conf.length) * Math.abs(macc[b] - mconf[b]);
  }
  return { count, conf: mconf, acc: macc, ece };
}

// normalized histogram of `vals` into nBins bins over [lo, hi]
export function histogram(vals, nBins, lo = 0, hi = 1) {
  const h = new Float64Array(nBins);
  for (const v of vals) {
    let b = Math.floor(((v - lo) / (hi - lo)) * nBins);
    if (b < 0) b = 0; if (b >= nBins) b = nBins - 1;
    h[b]++;
  }
  for (let b = 0; b < nBins; b++) h[b] /= vals.length;
  return h;
}

// AUROC of score separating pos (higher = more positive) from neg
export function auroc(pos, neg) {
  const all = [];
  for (const v of pos) all.push([v, 1]);
  for (const v of neg) all.push([v, 0]);
  all.sort((a, b) => a[0] - b[0]);
  let rankSum = 0, i = 0;
  while (i < all.length) {
    let j = i;
    while (j + 1 < all.length && all[j + 1][0] === all[i][0]) j++;
    const r = 0.5 * (i + j) + 1;
    for (let k = i; k <= j; k++) if (all[k][1]) rankSum += r;
    i = j + 1;
  }
  const nP = pos.length, nN = neg.length;
  return (rankSum - (nP * (nP + 1)) / 2) / (nP * nN);
}
