// draw.js, canvas drawing primitives shared by every viz. All take a 2-D ctx
// already transformed to CSS pixels. Colours come from vizkit's theme reader.
import { whenVisible } from './io.js';
import { currentTask } from './runtime.js';

export const PALETTE = ['#d99d60', '#7cabc7', '#8ab68f', '#c19bbd', '#d88d7a', '#b4aa9a'];

// split a region into a cols×rows grid of inner boxes (with a small gap)
export function grid(W, H, cols, rows, gap = 8) {
  const cells = []; const pw = W / cols, ph = H / rows;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++)
    cells.push({ x: c * pw + gap / 2, y: r * ph + gap / 2, w: pw - gap, h: ph - gap });
  return cells;
}

// a framed panel; returns a disc mapper for [-1,1]^2 -> canvas (header reserves top px)
export function panel(ctx, box, colors, { header = 0 } = {}) {
  ctx.fillStyle = colors.cellBg; ctx.fillRect(box.x, box.y, box.w, box.h);
  ctx.strokeStyle = colors.border; ctx.lineWidth = 1; ctx.strokeRect(box.x + 0.5, box.y + 0.5, box.w - 1, box.h - 1);
  const ix = box.x, iy = box.y + header, iw = box.w, ih = box.h - header;
  const side = Math.min(iw, ih) - 8, ox = ix + (iw - side) / 2, oy = iy + (ih - side) / 2;
  const cx = ox + side / 2, cy = oy + side / 2, R = side * 0.42;
  return { cx, cy, R, side, x: ox, y: oy, map: (p) => [cx + p[0] * R, cy - p[1] * R] };
}

export function unitCircle(ctx, m, colors) { ctx.beginPath(); ctx.arc(m.cx, m.cy, m.R > 0 ? m.R : 0, 0, 2 * Math.PI); ctx.strokeStyle = colors.border; ctx.lineWidth = 1; ctx.stroke(); }

export function dot(ctx, x, y, r, color) { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r > 0 ? r : 0, 0, 2 * Math.PI); ctx.fill(); }   // clamp: a transient negative data-driven radius must not throw
export function cross(ctx, x, y, r, color) { ctx.strokeStyle = color; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x + r, y + r); ctx.moveTo(x + r, y - r); ctx.lineTo(x - r, y + r); ctx.stroke(); }
// shape: 0 -> filled circle, 1 -> cross
export function mark(ctx, x, y, r, shape, color) { shape ? cross(ctx, x, y, r, color) : dot(ctx, x, y, r, color); }

// parse a CSS colour ('#rgb', '#rrggbb', 'rgb(...)') to [r,g,b]
export function parseColor(v) {
  v = (v || '').trim();
  if (v[0] === '#') { let s = v.slice(1); if (s.length === 3) s = s.split('').map((c) => c + c).join(''); return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)]; }
  const m = v.match(/\d+(\.\d+)?/g); return m ? [+m[0], +m[1], +m[2]] : [0, 0, 0];
}

// N×N matrix heatmap (flat row-major A) in a square inside box; lerps cellBg→accent.
// opts: {activeRow, gamma, title, colors override via base/hi}
export function heatmap(ctx, box, A, N, colors, { activeRow = -1, gamma = 0.6 } = {}) {
  const side = Math.min(box.w, box.h); const ox = box.x + (box.w - side) / 2, oy = box.y + (box.h - side) / 2;
  const base = parseColor(colors.cellBg), hi = parseColor(colors.accent);
  ctx.fillStyle = colors.cellBg; ctx.fillRect(ox, oy, side, side);
  const cell = side / N;
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const a = A[i * N + j]; const t = Math.min(1, Math.pow(Math.max(0, a) * N * 0.7, gamma));
    ctx.fillStyle = `rgb(${Math.round(base[0] + (hi[0] - base[0]) * t)},${Math.round(base[1] + (hi[1] - base[1]) * t)},${Math.round(base[2] + (hi[2] - base[2]) * t)})`;
    ctx.fillRect(ox + j * cell, oy + i * cell, cell + 0.5, cell + 0.5);
  }
  if (activeRow >= 0) { ctx.strokeStyle = colors.fg; ctx.lineWidth = 1.4; ctx.strokeRect(ox + 0.5, oy + activeRow * cell + 0.5, side - 1, cell); }
  ctx.strokeStyle = colors.border; ctx.lineWidth = 1; ctx.strokeRect(ox + 0.5, oy + 0.5, side - 1, side - 1);
  return { ox, oy, side, cell };
}

export function arrow(ctx, x0, y0, x1, y1, color, w = 2) {
  ctx.strokeStyle = color; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
  const a = Math.atan2(y1 - y0, x1 - x0), h = 7;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - h * Math.cos(a - 0.4), y1 - h * Math.sin(a - 0.4));
  ctx.moveTo(x1, y1); ctx.lineTo(x1 - h * Math.cos(a + 0.4), y1 - h * Math.sin(a + 0.4)); ctx.stroke();
}

export function text(ctx, str, x, y, colors, { size = 11, weight = '', mono = false, align = 'left', baseline = 'top', color } = {}) {
  ctx.fillStyle = color || colors.fg; ctx.font = `${weight} ${size}px ${mono ? 'ui-monospace, monospace' : 'ui-sans-serif, system-ui'}`;
  ctx.textAlign = align; ctx.textBaseline = baseline; ctx.fillText(str, x, y);
}

// line plot of one or more series in a framed box; each: {data:[], color, scale:(v)=>0..1}
export function sparkline(ctx, box, series, colors, { dashedMid = false } = {}) {
  ctx.fillStyle = colors.cellBg; ctx.fillRect(box.x, box.y, box.w, box.h);
  ctx.strokeStyle = colors.border; ctx.lineWidth = 1; ctx.strokeRect(box.x + 0.5, box.y + 0.5, box.w - 1, box.h - 1);
  if (dashedMid) { const mid = box.y + box.h / 2; ctx.strokeStyle = colors.border; ctx.setLineDash([2, 2]); ctx.beginPath(); ctx.moveTo(box.x, mid); ctx.lineTo(box.x + box.w, mid); ctx.stroke(); ctx.setLineDash([]); }
  for (const s of series) { const n = s.data.length; if (n < 2) continue; ctx.strokeStyle = s.color; ctx.lineWidth = 1.5; ctx.beginPath();
    for (let i = 0; i < n; i++) { const x = box.x + (i / (n - 1)) * box.w, y = box.y + box.h - Math.max(0, Math.min(1, s.scale(s.data[i]))) * (box.h - 4) - 2; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); }
}

// ── data-panel helpers: load gate, loading text, scatter, headline, frame ──
// These factor out the boilerplate the data panels repeated by hand.

// Run `loader()` once the canvas scrolls into view, hand the result to
// onload(api, data), then flip api.state.ready and repaint. Replaces the
// api.state={ready:false}; whenVisible(...).then(...) block in every setup().
export function gate(api, loader, onload) {
  if (!api.state) api.state = {};
  const state = api.state, generation = api.generation;
  state.ready = false;
  const complete = api.beginTask?.('Loading figure…') || (() => {});
  const cancel = whenVisible(api.canvas, () => {
    if (!currentTask(api, state, generation)) return;
    Promise.resolve().then(loader).then(async data => {
      if (!currentTask(api, state, generation)) return;
      if (onload) await onload(api, data);
      if (!currentTask(api, state, generation)) return;
      state.ready = true; complete(); api.render();
    }).catch(error => {
      if (!currentTask(api, state, generation)) return;
      complete(); api.fail?.(error);
    });
  });
  api.onCleanup?.(cancel);
  return cancel;
}

// Centered muted status text, for the not-ready branch of draw().
export function loadingText(api, msg = 'loading…') {
  const { ctx, colors, size } = api;
  ctx.fillStyle = colors.muted; ctx.font = '12px ui-monospace, monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(msg, size.W / 2, size.H / 2);
}

// Plot a cloud of 2D points. sx/sy map data coords to pixels; colorAt(i) gives a
// fill; ringAt(i) optionally rings a point (e.g. a misclassification).
export function scatter(ctx, pts, { sx, sy, r = 2.6, alpha = 0.8, colorAt, ringAt, ringColor = '#b3661b', ringWidth = 1.2 } = {}) {
  for (let i = 0; i < pts.length; i++) {
    ctx.beginPath(); ctx.arc(sx(pts[i][0]), sy(pts[i][1]), r > 0 ? r : 0, 0, 6.283);
    ctx.globalAlpha = alpha; ctx.fillStyle = colorAt ? colorAt(i) : '#888'; ctx.fill();
    if (ringAt && ringAt(i)) { ctx.globalAlpha = 0.9; ctx.lineWidth = ringWidth; ctx.strokeStyle = ringColor; ctx.stroke(); }
  }
  ctx.globalAlpha = 1;
}

// The shared header: a kicker line, a big accent value, and up to two sub lines
// to its right. Returns the y baseline (topH) where panel content can begin.
export function headline(ctx, colors, { pad = 14, kicker, value, valueColor, sub } = {}) {
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  if (kicker) { ctx.fillStyle = colors.muted; ctx.font = '11px ui-sans-serif, system-ui'; ctx.fillText(kicker, pad, pad + 12); }
  if (value != null) { ctx.fillStyle = valueColor || colors.accent; ctx.font = 'bold 26px ui-sans-serif, system-ui'; ctx.fillText(value, pad, pad + 44); }
  if (sub) { const lines = Array.isArray(sub) ? sub : [sub], x = pad + 64;
    ctx.fillStyle = colors.muted; ctx.font = '12px ui-sans-serif, system-ui'; ctx.fillText(lines[0], x, pad + 38);
    if (lines[1]) { ctx.fillStyle = colors.faint; ctx.font = '11px ui-sans-serif, system-ui'; ctx.fillText(lines[1], x, pad + 52); } }
  return pad + 64;
}

// The bordered plot square.
export function frame(ctx, colors, x, y, w, h) {
  ctx.strokeStyle = colors.border; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
}

// ── polish kit: rounded panels, gradient bars, crisp type (a shared visual bar) ──

// a rounded-rect path (no fill/stroke); r clamps to half the smaller side
export function roundRect(ctx, x, y, w, h, r = 8) {
  const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
}

// a soft elevated panel: subtle fill, hairline border, rounded. `accent` tints the
// border (e.g. a verdict color). Returns nothing; draw content on top.
export function softPanel(ctx, x, y, w, h, colors, { r = 10, fill, border, lw = 1, glow } = {}) {
  if (glow) { ctx.save(); ctx.shadowColor = glow; ctx.shadowBlur = 16; roundRect(ctx, x, y, w, h, r); ctx.fillStyle = fill || colors.cellBg; ctx.fill(); ctx.restore(); }
  roundRect(ctx, x, y, w, h, r); ctx.fillStyle = fill || colors.cellBg; ctx.fill();
  ctx.strokeStyle = border || colors.border; ctx.lineWidth = lw; roundRect(ctx, x + lw / 2, y + lw / 2, w - lw, h - lw, r); ctx.stroke();
}

// a vertical gradient bar with a rounded top, the default chart bar
export function barGrad(ctx, x, y, w, h, top, bottomColor, topColor) {
  if (h <= 0) return; const g = ctx.createLinearGradient(0, y, 0, y + h);
  g.addColorStop(0, topColor); g.addColorStop(1, bottomColor);
  ctx.fillStyle = g; roundRect(ctx, x, y, w, h, Math.min(w / 2, 4)); ctx.fill();
}

// a crisp filled-area curve under a series (for weight/function plots)
export function areaCurve(ctx, pts, baseY, stroke, fill, lw = 2.4) {
  if (pts.length < 2) return;
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  if (fill) { ctx.save(); ctx.lineTo(pts[pts.length - 1][0], baseY); ctx.lineTo(pts[0][0], baseY); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke();
}

// the type scale: one call sets font + color + alignment. sizes: title 15, label 11.5,
// value 13 (tabular), kicker 10.5. weights: 'b' bold, '' regular.
export function T(ctx, colors, role = 'label', { color, align = 'left', baseline = 'alphabetic', weight } = {}) {
  const F = { title: ['b', 15], sub: ['', 12], label: ['', 12], value: ['', 13], kicker: ['', 11], small: ['', 11] }[role] || ['', 11.5];
  const wt = (weight ?? F[0]) === 'b' ? '600 ' : '';
  ctx.font = `${wt}${F[1]}px ui-sans-serif, system-ui, sans-serif`;
  ctx.fillStyle = color || (role === 'title' ? colors.fg : role === 'kicker' || role === 'small' ? colors.faint : colors.muted);
  ctx.textAlign = align; ctx.textBaseline = baseline;
}

// ── glyph sprites: cached small images ──
// A panel that blits dozens of thumbnails (prototypes, test images, mode
// poles) every frame should not rebuild an offscreen canvas and an ImageData
// each time. `paint(ctx2d)` runs once per key; afterwards the sprite is just
// a drawImage. The cache is bounded and evicts oldest-first.
const _spriteCache = new Map();
export function sprite(key, w, h, paint) {
  let c = _spriteCache.get(key);
  if (c) return c;
  c = document.createElement('canvas');
  c.width = w; c.height = h;
  paint(c.getContext('2d'), c);
  _spriteCache.set(key, c);
  if (_spriteCache.size > 600) _spriteCache.delete(_spriteCache.keys().next().value);
  return c;
}

// Blit a single-channel image (Uint8/Float array, `side`x`side`) as a cached
// grayscale sprite. `key` must identify the pixels; omit it to skip caching.
export function grayGlyph(ctx, img, side, x, y, w, h, { invert = false, key } = {}) {
  const paint = (octx) => {
    const im = octx.createImageData(side, side);
    let lo = Infinity, hi = -Infinity;
    for (let i = 0; i < side * side; i++) { const v = img[i]; if (v < lo) lo = v; if (v > hi) hi = v; }
    const span = hi - lo || 1;
    for (let i = 0; i < side * side; i++) {
      let t = (img[i] - lo) / span;
      if (invert) t = 1 - t;
      const g = (255 * t) | 0;
      im.data[i * 4] = g; im.data[i * 4 + 1] = g; im.data[i * 4 + 2] = g;
      im.data[i * 4 + 3] = 255;
    }
    octx.putImageData(im, 0, 0);
  };
  let src;
  if (key == null) {
    src = document.createElement('canvas');
    src.width = side; src.height = side;
    paint(src.getContext('2d'));
  } else {
    src = sprite(key, side, side, paint);
  }
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(src, x, y, w, h);
}

// ── color + number utilities (deduped from nbody/storm and the bespoke panels) ──
export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; // a,b are [r,g,b]
export const rgba = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
export function fmt(v, d = 2) { const n = +v; if (!Number.isFinite(n)) return String(v); return Math.abs(n) >= 1000 ? n.toFixed(0) : n.toFixed(d); }

// ── heatmapField: a cached scalar-field renderer ──
// compute(u, v) takes normalized coords (u left→right, v top→bottom, both in
// [0,1]) and returns a scalar; the field is rasterized to an N×N offscreen canvas
// and stretched into `box`. The expensive raster is cached per ctx-canvas and only
// recomputed when `version` (the caller's data key, e.g. a slider value) or the
// theme colours change, so dragging a marker over a fixed field costs one drawImage.
// Returns { maxV, minV }. Pass version:undefined to force recompute every call.
const _fieldCache = new WeakMap();
export function heatmapField(ctx, box, compute, N, colors, { version, gamma = 0.6, base, hi, cap } = {}) {
  const canvas = ctx.canvas;
  const colorKey = (colors.accent || '') + '|' + (colors.cellBg || colors.bg || '');
  let e = _fieldCache.get(canvas);
  if (!e || e.N !== N) { e = { off: (e && e.off) || document.createElement('canvas') }; _fieldCache.set(canvas, e); }
  if (version === undefined || e.key !== version || e.N !== N || e.colorKey !== colorKey || e.cap !== cap || e.gamma !== gamma) {
    const vals = new Float32Array(N * N); let maxV = -Infinity, minV = Infinity;
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      const val = compute(c / (N - 1), r / (N - 1));
      vals[r * N + c] = val; if (val > maxV) maxV = val; if (val < minV) minV = val;
    }
    const b = base || parseColor(colors.cellBg || colors.bg || '#ffffff'), h = hi || parseColor(colors.accent || '#b3661b');
    const denom = (cap != null ? cap : maxV) || 1;
    e.off.width = N; e.off.height = N;
    const octx = e.off.getContext('2d'), img = octx.createImageData(N, N);
    for (let i = 0; i < N * N; i++) {
      const t = clamp01(Math.pow(Math.max(0, vals[i]) / denom, gamma));
      img.data[i * 4] = (b[0] + (h[0] - b[0]) * t) | 0;
      img.data[i * 4 + 1] = (b[1] + (h[1] - b[1]) * t) | 0;
      img.data[i * 4 + 2] = (b[2] + (h[2] - b[2]) * t) | 0;
      img.data[i * 4 + 3] = 255;
    }
    octx.putImageData(img, 0, 0);
    Object.assign(e, { key: version, N, colorKey, cap, gamma, maxV, minV });
  }
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(e.off, box.x, box.y, box.w, box.h);
  return { maxV: e.maxV, minV: e.minV };
}

// ── axes: border, optional grid + ticks + zero-lines; returns sx/sy mappers ──
export function axes(ctx, box, { xMin = 0, xMax = 1, yMin = 0, yMax = 1, xTicks, yTicks, fmtX = (v) => fmt(v, 1), fmtY = (v) => fmt(v, 1), grid = false, zero = false, border = true } = {}, colors) {
  const sx = (x) => box.x + ((x - xMin) / (xMax - xMin)) * box.w;
  const sy = (y) => box.y + box.h - ((y - yMin) / (yMax - yMin)) * box.h;
  if (border) { ctx.strokeStyle = colors.border; ctx.lineWidth = 1; ctx.strokeRect(box.x + 0.5, box.y + 0.5, box.w - 1, box.h - 1); }
  ctx.font = '9px ui-sans-serif, system-ui'; ctx.fillStyle = colors.faint;
  if (xTicks) for (const t of xTicks) { const x = sx(t);
    if (grid) { ctx.strokeStyle = colors.border; ctx.globalAlpha = 0.45; ctx.beginPath(); ctx.moveTo(x, box.y); ctx.lineTo(x, box.y + box.h); ctx.stroke(); ctx.globalAlpha = 1; }
    ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillStyle = colors.faint; ctx.fillText(fmtX(t), x, box.y + box.h + 3); }
  if (yTicks) for (const t of yTicks) { const y = sy(t);
    if (grid) { ctx.strokeStyle = colors.border; ctx.globalAlpha = 0.45; ctx.beginPath(); ctx.moveTo(box.x, y); ctx.lineTo(box.x + box.w, y); ctx.stroke(); ctx.globalAlpha = 1; }
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillStyle = colors.faint; ctx.fillText(fmtY(t), box.x - 4, y); }
  if (zero) { ctx.strokeStyle = colors.faint; ctx.setLineDash([2, 4]);
    if (xMin < 0 && xMax > 0) { ctx.beginPath(); ctx.moveTo(sx(0), box.y); ctx.lineTo(sx(0), box.y + box.h); ctx.stroke(); }
    if (yMin < 0 && yMax > 0) { ctx.beginPath(); ctx.moveTo(box.x, sy(0)); ctx.lineTo(box.x + box.w, sy(0)); ctx.stroke(); }
    ctx.setLineDash([]); }
  return { sx, sy };
}

// ── legend: vertical list of swatch + label; items = [{color, label}] ──
export function legend(ctx, x, y, items, colors, { gap = 16, swatch = 10 } = {}) {
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.font = '10px ui-sans-serif, system-ui';
  items.forEach((it, i) => { const yy = y + i * gap;
    ctx.fillStyle = it.color; ctx.fillRect(x, yy - swatch / 2, swatch, swatch);
    ctx.fillStyle = colors.muted; ctx.fillText(it.label, x + swatch + 5, yy); });
}

// ── colorbar: a vertical base→hi gradient with min/max labels ──
export function colorbar(ctx, box, min, max, colors, { base, hi, label } = {}) {
  const b = base || parseColor(colors.cellBg || colors.bg || '#ffffff'), h = hi || parseColor(colors.accent || '#b3661b');
  const grad = ctx.createLinearGradient(0, box.y + box.h, 0, box.y);
  grad.addColorStop(0, rgba(b)); grad.addColorStop(1, rgba(h));
  ctx.fillStyle = grad; ctx.fillRect(box.x, box.y, box.w, box.h);
  ctx.strokeStyle = colors.border; ctx.lineWidth = 1; ctx.strokeRect(box.x + 0.5, box.y + 0.5, box.w - 1, box.h - 1);
  ctx.fillStyle = colors.faint; ctx.font = '9px ui-sans-serif, system-ui'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  ctx.fillText(fmt(max), box.x + box.w + 4, box.y + 5); ctx.fillText(fmt(min), box.x + box.w + 4, box.y + box.h - 5);
  if (label) { ctx.save(); ctx.translate(box.x - 6, box.y + box.h / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'; ctx.fillText(label, 0, 0); ctx.restore(); }
}

// Wrap prose labels within a declared panel width; never shrink their type to fit.
export function wrapText(ctx, value, x, y, maxWidth, {lineHeight = 17, maxLines = Infinity} = {}) {
  const words = String(value).split(/\s+/); const lines = []; let line = '';
  for (const word of words) {
    const next = line ? line + ' ' + word : word;
    if (line && ctx.measureText(next).width > maxWidth) { lines.push(line); line = word; }
    else line = next;
  }
  if (line) lines.push(line);
  for (const [i, text] of lines.slice(0, maxLines).entries()) ctx.fillText(text, x, y + i * lineHeight);
  return Math.min(lines.length, maxLines) * lineHeight;
}
