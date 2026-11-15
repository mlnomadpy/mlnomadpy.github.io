import { loadJSON } from './engine/io.js';
// Shared data + helpers for the patch-parts panels.
import { grayGlyph } from './engine/draw.js';

import votesDataUrl from '../../../assets/patch-parts/votes.json?url';
import sizesDataUrl from '../../../assets/patch-parts/sizes.json?url';
import partsDataUrl from '../../../assets/patch-parts/parts.json?url';
const datasets = {
  'votes': votesDataUrl,
  'sizes': sizesDataUrl,
  'parts': partsDataUrl,
};
export function load(name) {
  return loadJSON(datasets[name]);
}
export function thumb(ctx, img, x, y, w, h, key) {
  grayGlyph(ctx, img, 14, x, y, w, h, { invert: true, key });
}
export function patchGlyph(ctx, img, side, x, y, w, h, key) {
  grayGlyph(ctx, img, side, x, y, w, h, { invert: true, key });
}
// the per-patch ballot: which class this patch voted for, and how loudly
export function ballot(votes, p) {
  const v = votes[p];
  let bi = 0;
  for (let c = 1; c < v.length; c++) if (v[c] > v[bi]) bi = c;
  let mean = 0;
  for (const x of v) mean += x;
  mean /= v.length;
  return { cls: bi, margin: v[bi] - mean };
}
