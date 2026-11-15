import { loadJSON } from './engine/io.js';
// Shared data + helpers for the Mercer-microscope panels. All panels read
// the exported eigen-analysis of the trained network's kernel; the
// truncation panel recomputes rank-k predictions live from shipped
// eigen-coordinates.

import { grayGlyph } from './engine/draw.js';

import reviewAsset0 from '../../../assets/mercer-microscope/modes.json?url';
import reviewAsset1 from '../../../assets/mercer-microscope/numbers.json?url';
import reviewAsset2 from '../../../assets/mercer-microscope/spectrum.json?url';
import reviewAsset3 from '../../../assets/mercer-microscope/trunc.json?url';
const reviewAssets = {"modes": reviewAsset0, "numbers": reviewAsset1, "spectrum": reviewAsset2, "trunc": reviewAsset3};

export function load(name) {
  return loadJSON(reviewAssets[name]);
}

// draw a 14x14 uint8 thumb (flat array) into a rect, dpr-safe
export function thumb(ctx, img, x, y, w, h, key) {
  grayGlyph(ctx, img, 14, x, y, w, h, { invert: true, key });
}

// rank-k accuracy sweep from eigen-coordinates, computed incrementally:
// logits_k = logits_{k-1} + E[:,k] Ahat[k,:]
export function truncSweep(arm, y) {
  const { E, Ahat, base } = arm;
  const n = E.length, K = Ahat.length, C = 10;
  const logits = new Float64Array(n * C);
  for (let i = 0; i < n; i++) for (let c = 0; c < C; c++) logits[i * C + c] = base[c];
  const acc = [], preds = [];
  for (let k = 0; k < K; k++) {
    for (let i = 0; i < n; i++) {
      const e = E[i][k];
      for (let c = 0; c < C; c++) logits[i * C + c] += e * Ahat[k][c];
    }
    let ok = 0;
    const pk = new Int8Array(n);
    for (let i = 0; i < n; i++) {
      let bi = 0;
      for (let c = 1; c < C; c++) if (logits[i * C + c] > logits[i * C + bi]) bi = c;
      pk[i] = bi;
      if (bi === y[i]) ok++;
    }
    acc.push((100 * ok) / n);
    preds.push(pk);
  }
  return { acc, preds };
}
