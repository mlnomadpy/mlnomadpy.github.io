// nanograd, tiny reverse-mode autodiff over dense 2-D Float64 tensors.
// Just enough for small in-browser ML viz: matmul, broadcasted elementwise,
// reductions, the nonlinearities and the ⵟ-kernel. ~150 lines, finite-diff clean.
export class V {
  constructor(r, c, data) { this.r = r; this.c = c; this.d = data || new Float64Array(r * c); this.g = new Float64Array(r * c); this.prev = []; this.bw = null; this.req = false; }
}
export const tensor = (r, c, data) => new V(r, c, Float64Array.from(data));
export const zeros = (r, c) => new V(r, c);
export const param = (r, c, fill) => { const t = new V(r, c); if (fill) for (let i = 0; i < r * c; i++) t.d[i] = fill(i); t.req = true; return t; };
export const scalar = (x) => { const t = new V(1, 1); t.d[0] = x; return t; };

const bin = (a, b, f, dfa, dfb) => {
  const rr = Math.max(a.r, b.r), rc = Math.max(a.c, b.c), out = new V(rr, rc);
  const ai = (i, j) => (a.r === 1 ? 0 : i) * a.c + (a.c === 1 ? 0 : j);
  const bi = (i, j) => (b.r === 1 ? 0 : i) * b.c + (b.c === 1 ? 0 : j);
  for (let i = 0; i < rr; i++) for (let j = 0; j < rc; j++) out.d[i * rc + j] = f(a.d[ai(i, j)], b.d[bi(i, j)]);
  out.prev = [a, b];
  out.bw = () => { for (let i = 0; i < rr; i++) for (let j = 0; j < rc; j++) { const k = i * rc + j, av = a.d[ai(i, j)], bv = b.d[bi(i, j)], go = out.g[k];
    a.g[ai(i, j)] += dfa(av, bv) * go; b.g[bi(i, j)] += dfb(av, bv) * go; } };
  return out;
};
export const add = (a, b) => bin(a, b, (x, y) => x + y, () => 1, () => 1);
export const sub = (a, b) => bin(a, b, (x, y) => x - y, () => 1, () => -1);
export const mul = (a, b) => bin(a, b, (x, y) => x * y, (x, y) => y, (x, y) => x);
export const div = (a, b) => bin(a, b, (x, y) => x / y, (x, y) => 1 / y, (x, y) => -x / (y * y));
const un = (a, f, df) => { const out = new V(a.r, a.c); for (let k = 0; k < a.d.length; k++) out.d[k] = f(a.d[k]); out.prev = [a];
  out.bw = () => { for (let k = 0; k < a.d.length; k++) a.g[k] += df(a.d[k], out.d[k]) * out.g[k]; }; return out; };
export const relu = (a) => un(a, x => x > 0 ? x : 0, x => x > 0 ? 1 : 0);
export const sigmoid = (a) => un(a, x => 1 / (1 + Math.exp(-x)), (x, y) => y * (1 - y));
export const softplus = (a) => un(a, x => x > 30 ? x : Math.log1p(Math.exp(-Math.abs(x))) + Math.max(x, 0), x => 1 / (1 + Math.exp(-x)));
export const square = (a) => un(a, x => x * x, x => 2 * x);
export const sqrt = (a) => un(a, x => Math.sqrt(x), (x, y) => 0.5 / (y + 1e-12));
export const recip = (a) => un(a, x => 1 / x, (x, y) => -y * y);
export const addk = (a, k) => un(a, x => x + k, () => 1);
export const mulk = (a, k) => un(a, x => x * k, () => k);
export const ksub = (k, a) => un(a, x => k - x, () => -1);              // k - a
export const matmul = (a, b) => { const out = new V(a.r, b.c);
  for (let i = 0; i < a.r; i++) for (let j = 0; j < b.c; j++) { let s = 0; for (let m = 0; m < a.c; m++) s += a.d[i * a.c + m] * b.d[m * b.c + j]; out.d[i * b.c + j] = s; }
  out.prev = [a, b];
  out.bw = () => { for (let i = 0; i < a.r; i++) for (let m = 0; m < a.c; m++) { let s = 0; for (let j = 0; j < b.c; j++) s += out.g[i * b.c + j] * b.d[m * b.c + j]; a.g[i * a.c + m] += s; }
    for (let m = 0; m < a.c; m++) for (let j = 0; j < b.c; j++) { let s = 0; for (let i = 0; i < a.r; i++) s += a.d[i * a.c + m] * out.g[i * b.c + j]; b.g[m * b.c + j] += s; } };
  return out; };
export const transpose = (a) => { const out = new V(a.c, a.r); for (let i = 0; i < a.r; i++) for (let j = 0; j < a.c; j++) out.d[j * a.r + i] = a.d[i * a.c + j];
  out.prev = [a]; out.bw = () => { for (let i = 0; i < a.r; i++) for (let j = 0; j < a.c; j++) a.g[i * a.c + j] += out.g[j * a.r + i]; }; return out; };
export const sumAll = (a) => { const out = new V(1, 1); let s = 0; for (let k = 0; k < a.d.length; k++) s += a.d[k]; out.d[0] = s;
  out.prev = [a]; out.bw = () => { for (let k = 0; k < a.d.length; k++) a.g[k] += out.g[0]; }; return out; };
export const sumRows = (a) => { const out = new V(a.r, 1); for (let i = 0; i < a.r; i++) { let s = 0; for (let j = 0; j < a.c; j++) s += a.d[i * a.c + j]; out.d[i] = s; }
  out.prev = [a]; out.bw = () => { for (let i = 0; i < a.r; i++) for (let j = 0; j < a.c; j++) a.g[i * a.c + j] += out.g[i]; }; return out; };
export const normRows = (a) => div(a, addk(sqrt(sumRows(square(a))), 1e-9));   // L2-normalise each row
export const yatk = (S, b, eps) => div(square(addk(S, b)), ksub(eps + 2, mulk(S, 2)));  // ⵟ on the sphere

export function backward(loss) {
  const topo = [], seen = new Set();
  (function build(x) { if (seen.has(x)) return; seen.add(x); for (const p of x.prev) build(p); topo.push(x); })(loss);
  for (const x of topo) x.g.fill(0);
  loss.g[0] = 1;
  for (let i = topo.length - 1; i >= 0; i--) if (topo[i].bw) topo[i].bw();
}

export class Adam {
  constructor(params, lr = 0.01, b1 = 0.9, b2 = 0.999, eps = 1e-8) { this.p = params; this.lr = lr; this.b1 = b1; this.b2 = b2; this.eps = eps; this.t = 0;
    this.m = params.map(p => new Float64Array(p.d.length)); this.v = params.map(p => new Float64Array(p.d.length)); }
  step(lr) { lr = lr || this.lr; this.t++; const bc1 = 1 - Math.pow(this.b1, this.t), bc2 = 1 - Math.pow(this.b2, this.t);
    this.p.forEach((p, i) => { const m = this.m[i], v = this.v[i]; for (let k = 0; k < p.d.length; k++) {
      m[k] = this.b1 * m[k] + (1 - this.b1) * p.g[k]; v[k] = this.b2 * v[k] + (1 - this.b2) * p.g[k] * p.g[k];
      p.d[k] -= lr * (m[k] / bc1) / (Math.sqrt(v[k] / bc2) + this.eps); } }); }
}
export const exp = (a) => { const out = new V(a.r, a.c); for (let k = 0; k < a.d.length; k++) out.d[k] = Math.exp(a.d[k]); out.prev = [a];
  out.bw = () => { for (let k = 0; k < a.d.length; k++) a.g[k] += out.d[k] * out.g[k]; }; return out; };
export const log = (a) => { const out = new V(a.r, a.c); for (let k = 0; k < a.d.length; k++) out.d[k] = Math.log(a.d[k]); out.prev = [a];
  out.bw = () => { for (let k = 0; k < a.d.length; k++) a.g[k] += (1 / a.d[k]) * out.g[k]; }; return out; };
