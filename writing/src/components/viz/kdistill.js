// Shared data + compute for the kernel-distillation panels. One memoized fetch of
// distill.json (and the garment sprite) for every panel, the class palette, and
// the small kernel math the panels share: temperature softmax over the real
// exported teacher logits and the class-similarity kernel S(T) built from them.
// Small class Gram calculations use direct float64 sums; spectral panels use eigh.
import { ensureJax } from './engine/jax.js';
import { loadJSON, loadImage, whenVisible } from './engine/io.js';

import reviewAsset0 from '../../../assets/kernel-distill/distill.json?url';
import reviewAsset1 from '../../../assets/kernel-distill/samples.png?url';
const reviewAssets = {"distill": reviewAsset0, "samples": reviewAsset1};

export const CLASS_COL = ['#b3661b', '#4a7fb3', '#3a8f5e', '#9a4f9c', '#c2553a', '#5a7d3a', '#2f8f8f', '#a06a2a', '#7a5fc0', '#c0892a'];
export const CLASSES = ['T-shirt', 'Trouser', 'Pullover', 'Dress', 'Coat', 'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Boot'];

export const loadKD = () => loadJSON(reviewAsset0);
export const samplesImg = () => loadImage(reviewAsset1);

export { softmaxT, classKernel, centerKernel } from './engine/distillation-math.js';

export { ensureJax, whenVisible };
