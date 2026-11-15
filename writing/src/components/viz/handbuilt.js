// Shared data + compute for the hand-built-features post. One memoized fetch of
// handbuilt.json and the sprites, plus the constructed Yat head evaluated live
// (the kernel matmul runs on the engine compute backend). Every number traces to
// scripts/handbuilt_vision.py.
import { np, ensureJax } from './engine/jax.js';
import { loadJSON, loadImage } from './engine/io.js';

import reviewAsset0 from '../../../assets/handbuilt/handbuilt.json?url';
import reviewAsset1 from '../../../assets/handbuilt/samples.png?url';
import reviewAsset2 from '../../../assets/handbuilt/maps.png?url';
import reviewAsset3 from '../../../assets/handbuilt/decimg.png?url';
import reviewAsset4 from '../../../assets/handbuilt/exemplars.png?url';
const reviewAssets = {"handbuilt": reviewAsset0, "samples": reviewAsset1, "maps": reviewAsset2, "decimg": reviewAsset3, "exemplars": reviewAsset4};

export const CLASS_COL = ['#b3661b', '#4a7fb3', '#3a8f5e', '#9a4f9c', '#c2553a', '#5a7d3a', '#2f8f8f', '#a06a2a', '#7a5fc0', '#c0892a'];
// hue ramp by orientation (6 edges) + a distinct corner colour
export const CHAN_COL = ['#c2553a', '#c77d2a', '#5a7d3a', '#2f8f8f', '#4a7fb3', '#7a5fc0', '#a06a2a'];

export const loadHB = () => loadJSON(reviewAsset0);
export const samplesImg = () => loadImage(reviewAsset1);
export const mapsImg = () => loadImage(reviewAsset2);
export const decImg = () => loadImage(reviewAsset3);
export const exemplarImg = () => loadImage(reviewAsset4);

// constructed Yat head: kernel of one feature vector against all prototypes, then
// the per-class max, exactly as the script does. dot runs on jax-js; the rest is a
// tight loop. Returns { act:[K], scores:[10], pred }.
export function classify(d, feat) {
  const K = d.protos.length;
  const dot = np.matmul(np.array([feat]), np.transpose(np.array(d.protos))).js()[0];
  const fn = feat.reduce((a, v) => a + v * v, 0);
  const wn = d.protos.map((r) => r.reduce((a, v) => a + v * v, 0));
  const act = new Float64Array(K);
  const scores = new Float64Array(10).fill(-1e9);
  for (let u = 0; u < K; u++) {
    const dd = fn + wn[u] - 2 * dot[u];
    const a = (dot[u] + d.B) ** 2 / (dd + d.eps);
    act[u] = a;
    const c = d.vote[u];
    if (a > scores[c]) scores[c] = a;
  }
  let pred = 0; for (let c = 1; c < 10; c++) if (scores[c] > scores[pred]) pred = c;
  return { act, scores, pred };
}

// Run the hand-built feature extractor live on ANY 28x28 image (e.g. one the
// reader draws), a faithful JS port of scripts/handbuilt_vision.py: Sobel
// gradients, soft orientation binning into NB channels + a corner channel, mean
// pool over a GRID x GRID patch grid, L2 normalise, then z-score into the
// prototype space with the dumped mu/sd. Returns the head's input (feat), the
// non-negative pooled energy (featRaw), and the per-pixel channel maps for
// display. The convolve sign cancels (everything depends on |g| and angle mod pi),
// so plain correlation matches the Python output.
export function extractFeatures(d, im) {
  const N = 28, NB = d.NB, NCH = d.nChan, G = d.GRID, ps = (N / G) | 0, PI = Math.PI;
  const mod = (v, m) => ((v % m) + m) % m;
  const at = (y, x) => im[Math.min(N - 1, Math.max(0, y)) * N + Math.min(N - 1, Math.max(0, x))];
  const maps = []; for (let ch = 0; ch < NCH; ch++) maps.push(new Float32Array(N * N));
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const a = at(y - 1, x - 1), b = at(y - 1, x), c = at(y - 1, x + 1), l = at(y, x - 1), r = at(y, x + 1), g = at(y + 1, x - 1), h = at(y + 1, x), i = at(y + 1, x + 1);
    const gx = -a + c - 2 * l + 2 * r - g + i, gy = -a - 2 * b - c + g + 2 * h + i;       // Sobel
    const mag = Math.sqrt(gx * gx + gy * gy) + 1e-6, ang = mod(Math.atan2(gy, gx), PI);   // undirected edge angle
    const p = y * N + x;
    for (let ch = 0; ch < NB; ch++) { const dst = Math.abs(mod(ang - ch * PI / NB + PI / 2, PI) - PI / 2); maps[ch][p] = Math.max(0, Math.min(1, 1 - dst / (PI / NB))) * mag; }
    maps[NB][p] = Math.abs(gx) * Math.abs(gy);                                            // corner = two-direction gradient
  }
  const pooled = new Float32Array(NCH * G * G);
  for (let ch = 0; ch < NCH; ch++) for (let pr = 0; pr < G; pr++) for (let pc = 0; pc < G; pc++) {
    let s = 0; for (let dy = 0; dy < ps; dy++) for (let dx = 0; dx < ps; dx++) s += maps[ch][(pr * ps + dy) * N + (pc * ps + dx)];
    pooled[ch * G * G + pr * G + pc] = s / (ps * ps);
  }
  let nrm = 0; for (let i = 0; i < pooled.length; i++) nrm += pooled[i] * pooled[i]; nrm = Math.sqrt(nrm) + 1e-6;
  const featRaw = new Array(pooled.length), feat = new Array(pooled.length);
  for (let i = 0; i < pooled.length; i++) { featRaw[i] = pooled[i] / nrm; feat[i] = (featRaw[i] - d.mu[i]) / d.sd[i]; }
  return { feat, featRaw, maps };
}

export { ensureJax };
