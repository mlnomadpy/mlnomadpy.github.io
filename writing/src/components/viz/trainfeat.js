// Shared data + compute for the train-the-features panels. One memoized fetch of
// fold.json for all eight panels, one memoized nearest-prototype evaluation per
// backbone stage (shared across the panels that show predictions), and the common
// palette and labels. The kernel matmul runs on the engine compute backend.
import { np, ensureJax } from './engine/jax.js';
import { loadJSON, loadImage, whenVisible } from './engine/io.js';

import reviewAsset0 from '../../../assets/train-features/fold.json?url';
import reviewAsset1 from '../../../assets/train-features/pixel-protos.png?url';
import reviewAsset2 from '../../../assets/train-features/feat-exemplars.png?url';
const reviewAssets = {"fold": reviewAsset0, "pixel-protos": reviewAsset1, "feat-exemplars": reviewAsset2};

export const CLASS_COL = ['#b3661b', '#4a7fb3', '#3a8f5e', '#9a4f9c', '#c2553a', '#5a7d3a', '#2f8f8f', '#a06a2a', '#7a5fc0', '#c0892a'];
export const CLASSES = ['T-shirt', 'Trouser', 'Pullover', 'Dress', 'Coat', 'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Boot'];

export const loadFold = () => loadJSON(reviewAsset0);
export const pixelImg = () => loadImage(reviewAsset1);
export const exemplarImg = () => loadImage(reviewAsset2);

const B = 0.5;
const _cls = new Map();   // stage -> { pred, acc }, computed once and shared

// constructed head: nearest-prototype vote over the kernel, for one backbone
// stage. The dot product runs on jax-js; the reduction is a tight JS loop.
export function classifyStage(d, s) {
  if (_cls.has(s)) return _cls.get(s);
  const fr = d.frames[s], feat = fr.feat, protos = fr.protos, vote = fr.vote, n = feat.length, K = protos.length;
  const dot = np.matmul(np.array(feat), np.transpose(np.array(protos))).js();
  const zn = feat.map((r) => r.reduce((a, v) => a + v * v, 0));
  const wn = protos.map((r) => r.reduce((a, v) => a + v * v, 0));
  const d2flat = [];
  for (let i = 0; i < n; i++) for (let u = 0; u < K; u++) d2flat.push(zn[i] + wn[u] - 2 * dot[i][u]);
  d2flat.sort((a, b) => a - b);
  const mid = d2flat.length >> 1;
  // Display-only recalibration on the 600 saved evaluation vectors. This is
  // deliberately not labeled as the archived full-evaluation accuracy.
  const median = d2flat.length % 2 ? d2flat[mid] : (d2flat[mid - 1] + d2flat[mid]) / 2;
  const eps = Math.max(0.1 * median, 1e-8);
  const pred = new Int8Array(n); let ok = 0;
  for (let i = 0; i < n; i++) {
    let best = -1e18, arg = 0;
    for (let u = 0; u < K; u++) { const dd = zn[i] + wn[u] - 2 * dot[i][u], a = (dot[i][u] + B) ** 2 / (dd + eps); if (a > best) { best = a; arg = u; } }
    pred[i] = vote[arg]; if (pred[i] === d.labels[i]) ok++;
  }
  const res = { pred, acc: 100 * ok / n, eps, sampleCount: n };
  _cls.set(s, res);
  return res;
}

export { ensureJax, whenVisible };
