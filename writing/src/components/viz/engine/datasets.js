// Toy 2-D datasets for contrastive viz, lifted into R^D so an encoder has work
// to do. Each returns { X: Float64Array(N*D), lab: Int8Array(N), C, N, D }.
// Deterministic given a seed.

export function rng32(seed) { let s = seed >>> 0; return () => {
  s |= 0; s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

export const DATASETS = [
  { value: 'moons',  label: 'two-moons' },
  { value: 'blobs',  label: 'overlapping blobs' },
  { value: 'rings',  label: 'concentric rings' },
  { value: 'c2',     label: '2 classes' },
  { value: 'c4',     label: '4 classes' },
  { value: 'spiral', label: 'two spirals' },
];

export function makeData(kind, N, seed, D = 12) {
  const r = rng32(seed >>> 0 || 1);
  const randn = () => { let u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const lab = new Int8Array(N); const P = []; let C = 2;
  for (let i = 0; i < N; i++) {
    let x, y, c;
    const u = r();
    if (kind === 'moons') { c = u < 0.5 ? 0 : 1; const a = Math.PI * r();
      if (c === 0) { x = Math.cos(a); y = Math.sin(a); } else { x = 1 - Math.cos(a); y = 0.5 - Math.sin(a); }
      x += randn() * 0.08; y += randn() * 0.08; }
    else if (kind === 'blobs') { c = u < 0.5 ? 0 : 1; x = (c ? 1 : -1) * 0.8 + randn() * 0.7; y = randn() * 0.7; }
    else if (kind === 'rings') { c = u < 0.5 ? 0 : 1; const a = 2 * Math.PI * r(), rad = (c ? 1.4 : 0.6) + randn() * 0.08; x = rad * Math.cos(a); y = rad * Math.sin(a); }
    else if (kind === 'c4') { C = 4; c = (r() * 4) | 0; const ang = c * Math.PI / 2; x = Math.cos(ang) * 1.2 + randn() * 0.28; y = Math.sin(ang) * 1.2 + randn() * 0.28; }
    else if (kind === 'spiral') { c = u < 0.5 ? 0 : 1; const t = r() * 3; const a = t * 2.2 + c * Math.PI; const rad = 0.25 + t * 0.42; x = rad * Math.cos(a) + randn() * 0.05; y = rad * Math.sin(a) + randn() * 0.05; }
    else { C = 2; c = u < 0.5 ? 0 : 1; x = (c ? 1 : -1) * 1.1 + randn() * 0.5; y = randn() * 0.5; }
    lab[i] = c; P.push([x, y]);
  }
  // lift the 2-D coordinate into R^D by a fixed random map + noise
  const W = []; for (let d = 0; d < D; d++) W.push([randn(), randn()]);
  const b = []; for (let d = 0; d < D; d++) b.push(randn() * 0.1);
  const X = new Float64Array(N * D);
  for (let i = 0; i < N; i++) for (let d = 0; d < D; d++) X[i * D + d] = P[i][0] * W[d][0] + P[i][1] * W[d][1] + b[d] + randn() * 0.05;
  // whiten per-dim
  for (let d = 0; d < D; d++) { let mu = 0, sd = 0; for (let i = 0; i < N; i++) mu += X[i * D + d] / N;
    for (let i = 0; i < N; i++) sd += (X[i * D + d] - mu) ** 2 / N; sd = Math.sqrt(sd) + 1e-6;
    for (let i = 0; i < N; i++) X[i * D + d] = (X[i * D + d] - mu) / sd; }
  return { X, lab, C, N, D };
}
