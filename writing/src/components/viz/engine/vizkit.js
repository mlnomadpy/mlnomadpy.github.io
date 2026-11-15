// vizkit.js, the harness. Give it a control spec + setup/step/draw and it
// renders the control bar and canvas, runs the play/step/reset/speed loop, and
// wires dpr, theme, resize, and visibility (autoplay/pause). Multi-instance and
// Astro-view-transition safe. A new viz is just a short spec object.
//
//   defineViz('myviz', {
//     title, height, autoplay, stepsPerFrame, maxStep,
//     controls: [ {type:'play'},{type:'step'},{type:'reset'},{type:'speed'},
//                 {type:'range', name, label, min,max,step,value, int?, reset?, fmt?},
//                 {type:'select', name, label, options:[{value,label}], value, reset?},
//                 {type:'toggle', name, label, value},
//                 {type:'button', name, label, reset?},
//                 {type:'readout', name} ],
//     setup(api){}, step(api){}, draw(api){},
//   })
// api: { get(name), set(name,v), state, colors, ctx, size:{W,H}, iter, readout(name,txt) }
import { readColors } from './theme.js';
import { createStepClock, ignoreShortcut } from './runtime.js';
import { disposeDrag } from './pointer.js';

const CSS = `
.vk-cell{position:relative;min-width:0;color:var(--fg,var(--ink));}
.vk-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:14px;}
.vk-heading h4{font:600 1rem/1.45 var(--ui,system-ui);margin:0;max-width:68ch;text-wrap:balance;}
.vk-controls{display:flex;flex-direction:column;gap:10px;margin-bottom:14px;}
.vk-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;}
.vk-play,.vk-btn,.vk-s,.vk-tool{appearance:none;font:500 13px/1.2 var(--ui,system-ui);border:1px solid var(--border);border-radius:5px;background:var(--bg-elev,var(--surface));color:var(--fg);cursor:pointer;min-height:40px;padding:9px 12px;transition:border-color .12s,background-color .12s;}
.vk-play{background:var(--accent);border-color:var(--accent);color:var(--bg);min-width:86px;}
.vk-play:hover,.vk-btn:hover,.vk-s:hover,.vk-tool:hover{border-color:var(--accent);}
.vk-btn:disabled,.vk-s:disabled{opacity:.5;cursor:default;}
.vk-play:focus-visible,.vk-btn:focus-visible,.vk-s:focus-visible,.vk-tool:focus-visible,.vk-controls input:focus-visible,.vk-controls select:focus-visible,.vk-plot:focus-visible{outline:2px solid var(--accent);outline-offset:4px;}
.vk-spd{display:inline-flex;align-items:center;gap:4px;font-size:12px;color:var(--fg-muted);}
.vk-s{min-width:40px;padding:8px;}
.vk-s.active{background:var(--accent);color:var(--bg);border-color:var(--accent);}
.vk-controls label{display:inline-flex;align-items:center;gap:8px;color:var(--fg-muted);font:13px/1.4 var(--ui,system-ui);max-width:100%;}
.vk-range{display:grid!important;grid-template-columns:auto minmax(100px,1fr) minmax(40px,auto);gap:8px;flex:1 1 260px;max-width:520px!important;}
.vk-range-name{white-space:normal;}
.vk-controls input[type=range]{accent-color:var(--accent);width:100%;min-width:80px;min-height:32px;}
.vk-controls input[type=checkbox]{accent-color:var(--accent);width:18px;height:18px;}
.vk-controls select,.vk-controls input[type=number],.vk-controls input[type=text]{font:13px/1.4 var(--ui,system-ui);color:var(--fg);background:var(--bg-elev,var(--surface));border:1px solid var(--border);border-radius:5px;padding:8px;max-width:100%;min-height:40px;}
.vk-val{font-size:12px;color:var(--fg);font-variant-numeric:tabular-nums;text-align:right;}
.vk-results{display:grid;gap:6px;margin-top:12px;}.vk-results:empty{display:none;}
.vk-readout{display:block;white-space:normal;overflow-wrap:anywhere;width:100%;margin:2px 0 0;padding:10px 12px;border-left:2px solid var(--accent);background:var(--bg);font:13px/1.65 var(--ui,system-ui);font-variant-numeric:tabular-nums;color:var(--fg);box-sizing:border-box;}
.vk-readout:empty{display:none;}
.vk-tools{display:inline-flex;flex:0 0 auto;gap:6px;}
.vk-tool{width:40px;min-height:40px;display:inline-grid;place-items:center;padding:6px;font-size:17px;}
.vk-cell canvas{width:100%;display:block;touch-action:manipulation;}
.vk-plot{position:relative;max-width:100%;overflow-x:auto;overscroll-behavior-inline:contain;scrollbar-color:var(--border) transparent;}
.vk-plot canvas{min-width:var(--viz-min-width,640px);max-width:none;}
.vk-annotation{margin-top:12px;font-size:14px;line-height:1.65;}
.vk-help{display:none;margin-top:2px;font:12px/1.5 var(--ui,system-ui);color:var(--fg-muted);}
.vk-cell:focus-within .vk-help{display:block;}
.vk-scroll-note{display:none;margin:9px 0 0;font:12px/1.5 var(--ui,system-ui);color:var(--fg-muted);}
.vk-overflow .vk-scroll-note{display:block;}
.vk-status{display:flex;gap:12px;align-items:center;padding:12px 0;font:13px/1.6 var(--ui,system-ui);color:var(--fg-muted);}
.vk-status[hidden],.vk-status button[hidden]{display:none;}
.vk-toast{position:absolute;right:0;bottom:0;padding:8px 12px;border:1px solid var(--border);border-radius:4px;background:var(--bg-elev,var(--surface));font:13px/1.5 var(--ui,system-ui);opacity:0;pointer-events:none;}
.vk-toast.show{opacity:1;}
.viz:fullscreen,.viz:-webkit-full-screen,.viz.vk-expanded{background:var(--bg);padding:24px;overflow:auto;box-sizing:border-box;}
.viz:fullscreen .vk-cell,.viz:-webkit-full-screen .vk-cell,.viz.vk-expanded .vk-cell{max-width:1280px;margin:auto;}
.viz.vk-expanded{position:fixed!important;inset:0;z-index:10000;width:100vw!important;height:100vh!important;height:100dvh!important;max-width:none!important;margin:0!important;}
@media(max-width:720px){.vk-heading{gap:10px;}.vk-heading h4{font-size:15px;}.vk-play,.vk-btn,.vk-s,.vk-tool,.vk-controls select,.vk-controls input[type=number],.vk-controls input[type=text]{min-height:44px;}.vk-tool{width:44px;}.vk-range{width:100%;grid-template-columns:minmax(0,1fr) auto;min-width:0;}.vk-range-name{grid-column:1/-1;}.vk-controls label{flex-wrap:wrap;}.vk-readout{font-size:13px;padding:9px 10px;}}
@media(prefers-reduced-motion:reduce){.vk-cell *{animation:none!important;transition:none!important;scroll-behavior:auto!important;}}
`;
function injectCSS() { if (document.getElementById('vizkit-css')) return; const s = document.createElement('style'); s.id = 'vizkit-css'; s.textContent = CSS; document.head.appendChild(s); }

function readNumber(v) {
  if (v == null || v === '') return undefined;
  const n = Number.parseFloat(String(v).trim());
  return Number.isFinite(n) ? n : undefined;
}

function cssNumber(styles, name) {
  return readNumber(styles.getPropertyValue(name));
}

function resolveHeight(root, spec, width) {
  const styles = getComputedStyle(root);
  const ds = root.dataset || {};
  const base = readNumber(ds.height) ?? cssNumber(styles, '--viz-height') ?? spec.height ?? 360;
  const desktop = readNumber(ds.heightDesktop) ?? cssNumber(styles, '--viz-height-desktop') ?? spec.heightDesktop;
  const mobile = readNumber(ds.heightMobile) ?? cssNumber(styles, '--viz-height-mobile') ?? spec.heightMobile;
  const responsive = width > 0 && width < 680 ? mobile : desktop;
  const scale = readNumber(ds.heightScale) ?? cssNumber(styles, '--viz-height-scale') ?? spec.heightScale ?? 1;
  const min = readNumber(ds.minHeight) ?? cssNumber(styles, '--viz-min-height') ?? spec.minHeight ?? 160;
  const max = readNumber(ds.maxHeight) ?? cssNumber(styles, '--viz-max-height') ?? spec.maxHeight ?? Math.max(520, base, mobile || 0, desktop || 0);
  return Math.max(min, Math.min(max, Math.round((responsive ?? base) * scale)));
}

function downloadCanvas(canvas, filename, background) {
  // Export an opaque paper background so pale plot labels remain readable off-site.
  const output = document.createElement('canvas'); output.width = canvas.width; output.height = canvas.height;
  const context = output.getContext('2d'); context.fillStyle = background; context.fillRect(0, 0, output.width, output.height); context.drawImage(canvas, 0, 0);
  return new Promise((resolve, reject) => {
    const save = blob => {
      if (!blob) { reject(new Error('Could not create PNG')); return; }
      const url = URL.createObjectURL(blob), link = document.createElement('a');
      link.href = url; link.download = filename; link.rel = 'noopener';
      document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); resolve();
    };
    try { output.toBlob(save, 'image/png'); } catch (error) { reject(error); }
  });
}

function showToast(root, text) {
  let el = root.querySelector('.vk-toast');
  if (!el) { el = document.createElement('div'); el.className = 'vk-toast'; root.appendChild(el); }
  el.textContent = text; el.classList.add('show');
  clearTimeout(el._vkTimer);
  el._vkTimer = setTimeout(() => el.classList.remove('show'), 1300);
}

const mounted = new Map();
let removalObserver;
let captionSequence = 0;
let expandedInstance = null;
function track(root, controller) {
  mounted.set(root, controller);
  if (!removalObserver && typeof MutationObserver !== 'undefined') {
    removalObserver = new MutationObserver(records => {
      if (!records.some(r => Array.from(r.removedNodes || []).some(n => n.nodeType === 1))) return;
      for (const [node, instance] of mounted) if (!node.isConnected) instance.dispose();
    });
    removalObserver.observe(document.documentElement, {childList: true, subtree: true});
  }
}
export function disposeViz(root) { mounted.get(root)?.dispose(); }

export function mountViz(root, specOrFactory) {
  if (mounted.has(root)) return mounted.get(root).api;
  if (root.dataset.vkReady) return; root.dataset.vkReady = '1';
  // spec may be a factory (root) => spec, so each instance can configure its
  // controls/title from its own data-* attributes (e.g. per-loss panels).
  const spec = typeof specOrFactory === 'function' ? specOrFactory(root) : specOrFactory;
  injectCSS();
  const cell = root.querySelector('.viz-cell') || root; cell.classList.add('vk-cell');
  const caption = root.dataset.caption || '';
  root.style.setProperty('--viz-min-width', (readNumber(root.dataset.minWidth) ?? spec.minWidth ?? 640) + 'px');
  const initialHeight = resolveHeight(root, spec, root.getBoundingClientRect().width || 0);

  const header = document.createElement('div'); header.className = 'vk-heading'; cell.appendChild(header);
  if (spec.title) { const h = document.createElement('h4'); h.textContent = spec.title; header.appendChild(h); }
  const bar = document.createElement('div'); bar.className = 'vk-controls'; cell.appendChild(bar);
  const canvas = document.createElement('canvas');
  canvas.height = initialHeight;
  canvas.style.height = initialHeight + 'px';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', spec.title || 'Interactive visualization');
  const plot = document.createElement('div');
  plot.className = 'vk-plot';
  plot.tabIndex = 0;
  plot.setAttribute('role', 'region');
  plot.setAttribute('aria-label', 'Scrollable visualization');
  plot.appendChild(canvas);
  cell.appendChild(plot);
  const scrollNote = document.createElement('p');
  scrollNote.className = 'vk-scroll-note';
  scrollNote.textContent = 'Scroll sideways to explore the full figure, or expand it.';
  cell.appendChild(scrollNote);
  const results = document.createElement('div'); results.className = 'vk-results'; cell.appendChild(results);
  let annEl = null;
  if (spec.annotation) { annEl = document.createElement('div'); annEl.className = 'vk-annotation'; cell.appendChild(annEl); }
  if (caption && !root.querySelector("figcaption")) { const fc = document.createElement("figcaption"); fc.textContent = caption; root.appendChild(fc); }
  const captionElement = root.querySelector('figcaption');
  if (captionElement) { if (!captionElement.id) captionElement.id = 'viz-caption-' + (++captionSequence); canvas.setAttribute('aria-describedby', captionElement.id); }
  const ctx = canvas.getContext('2d');
  const status = document.createElement('div'); status.className = 'vk-status'; status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite'); cell.appendChild(status);
  const statusText = document.createElement('span'); status.appendChild(statusText);
  const retry = document.createElement('button'); retry.type = 'button'; retry.className = 'vk-btn'; retry.textContent = 'Retry'; retry.hidden = true; status.appendChild(retry);
  let disposed = false, generation = 0, failure = null, visible = true, expanded = false;
  let closeExpanded = () => {}, expandButton = null;
  const lifetime = new AbortController(), cleanup = new Set(), finalizers = new Set(), pending = new Set();
  const clock = createStepClock(spec.stepsPerFrame ?? 1);
  const runCleanups = set => { for (const fn of set) { try { fn(); } catch (error) { console.error(error); } } set.clear(); };
  const addCleanup = (set, fn) => { if (disposed) fn(); else set.add(fn); return () => set.delete(fn); };
  const updateStatus = () => { root.dataset.vkState = failure ? 'error' : !didSetup ? 'idle' : pending.size ? 'loading' : 'ready'; statusText.textContent = failure ? 'This figure could not load. Try again.' : pending.size ? 'Loading figure…' : ''; retry.hidden = !failure; root.setAttribute('aria-busy', pending.size && !failure ? 'true' : 'false'); status.hidden = !failure && !pending.size; for (const button of cell.querySelectorAll('button')) if (button.dataset.vkWait) button.disabled = !!failure || pending.size > 0; };


  const vals = {}, readouts = {}, controlEls = {}; let speedMul = 1;
  let hasLoop = !!spec.step;       // true for physics viz (spec.step) or a timeline range (range.play)
  let timeline = null, lastTs = 0; // timeline: a range that a Play button auto-advances
  let playing = false, raf = 0, iter = 0, colors = readColors();
  let didSetup = false, renderRaf = 0; // setup is deferred to first viewport entry; paints coalesce into one rAF
  const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let reduceMotion = !!motionQuery?.matches;
  // Poster mode: a heavy viz can ship a pre-rendered PNG (data-poster) that is
  // shown, with ZERO compute, until the reader opts in (Play, or first interaction
  // for a pure-interactive viz). `?vizposter=1` / window.__VIZ_NO_POSTER forces the
  // live path so the generator can screenshot the real frame. everPlayed gates the
  // one-time "press play" pulse on the button.
  let everPlayed = false;
  const posterName = (root.dataset.poster || '').trim();
  const noPosterFlag = (() => { try { return new URLSearchParams(location.search).has('vizposter') || !!window.__VIZ_NO_POSTER; } catch { return false; } })();
  let usePoster = !!posterName && !noPosterFlag; // "still until intent": defer setup entirely
  let posterImg = null, posterReady = false, posterFailed = false;

  const api = {
    get: (n) => vals[n], set: (n, v) => { vals[n] = v; }, state: {}, iter: 0,
    get generation() { return generation; }, signal: lifetime.signal,
    onCleanup: fn => addCleanup(cleanup, fn), onDispose: fn => addCleanup(finalizers, fn),
    listen(target, event, handler, options) { target.addEventListener(event, handler, options); const off = () => target.removeEventListener(event, handler, options); finalizers.add(off); return off; },
    isCurrent: state => !disposed && state === api.state,
    fail: error => fail(error),
    beginTask() { const token = {}; pending.add(token); updateStatus(); return () => { pending.delete(token); updateStatus(); }; },
    get colors() { return colors; }, ctx, canvas, size: { W: 0, H: 0 },
    get playing() { return playing; },
    render: () => render(),
    readout: (n, txt) => { if (readouts[n] && readouts[n].textContent !== String(txt)) readouts[n].textContent = txt; },
    note: (html) => { if (annEl) annEl.innerHTML = html; },
    // programmatically set another control's value (updates DOM + label, no reset)
    setControl: (n, v) => {
      const e = controlEls[n]; if (!e) { vals[n] = v; return; }
      vals[n] = e.cast ? e.cast(v) : v;
      if (e.input) { if (e.input.type === 'checkbox') e.input.checked = !!vals[n]; else e.input.value = vals[n]; }
      if (e.span && e.fmt) { e.span.textContent = e.fmt(vals[n]); e.input.setAttribute('aria-valuetext', String(e.fmt(vals[n]))); }
    },
  };

  // ── build control bar ──
  let row = document.createElement('div'); row.className = 'vk-row'; bar.appendChild(row);
  const newRow = () => { row = document.createElement('div'); row.className = 'vk-row'; bar.appendChild(row); };
  const fit = () => {
    if (disposed) return;
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    const width = root.getBoundingClientRect().width || 0;
    const targetHeight = fsEl === root || expanded ? Math.min(window.innerHeight * .7, 760) : resolveHeight(root, spec, width);
    if (Math.abs(parseFloat(canvas.style.height || '0') - targetHeight) > .5) canvas.style.height = targetHeight + 'px';
    const rect = canvas.getBoundingClientRect(), dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, spec.maxDpr || 2));
    api.size.W = rect.width; api.size.H = rect.height;
    const w = Math.round(rect.width * dpr), h = Math.round(rect.height * dpr);
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const overflow = plot.scrollWidth > plot.clientWidth + 2;
    root.classList.toggle('vk-overflow', overflow);
    plot.tabIndex = overflow ? 0 : -1;
    plot.setAttribute('role', overflow ? 'region' : 'group');
    plot.setAttribute('aria-label', (overflow ? 'Scrollable plot: ' : 'Plot: ') + (spec.title || 'visualization'));
  };
  const fail = error => { if (disposed) return; failure = error || new Error('Figure failed'); stop(); updateStatus(); console.error('Visualization error:', error); };
  const renderNow = () => {
    if (disposed || !didSetup || failure || !ctx) return;
    if (!api.size.W) fit(); if (!api.size.W || !api.size.H) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const dpr = canvas.width / api.size.W; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, api.size.W, api.size.H); api.iter = iter;
    try { spec.draw(api); } catch (error) { fail(error); }
  };
  const render = () => { if (disposed || renderRaf || !didSetup) return; renderRaf = requestAnimationFrame(() => { renderRaf = 0; renderNow(); }); };
  // ── transitions: api.tween(key, target, ms) eases a value toward target across
  // control changes and drives re-renders until it settles; snapped on (re)setup.
  let tweens = {}, tweenRaf = 0;
  const tnow = () => (typeof performance !== 'undefined' && performance.now ? performance.now() : 0);
  const driveTweens = () => { if (tweenRaf) return; const step = () => { tweenRaf = 0; if (disposed || !visible || document.hidden) return; renderNow(); let active = false; for (const k in tweens) if (tweens[k].p < 1) active = true; if (active) tweenRaf = requestAnimationFrame(step); }; tweenRaf = requestAnimationFrame(step); };
  api.tween = (key, target, ms = 300) => {
    if (reduceMotion) { tweens[key] = {to: target, val: target, p: 1}; return target; }
    if (!Number.isFinite(target)) { tweens[key] = { to: target, val: target, p: 1 }; return target; }
    const now = tnow(); let t = tweens[key];
    if (!t || !Number.isFinite(t.val)) { tweens[key] = { from: target, to: target, val: target, start: now, ms, p: 1 }; return target; }
    if (t.to !== target) { t.from = t.val; t.to = target; t.start = now; t.ms = ms; t.p = 0; }
    const p = t.ms > 0 ? Math.min(1, (now - t.start) / t.ms) : 1; t.p = p; const e = p * p * (3 - 2 * p);
    t.val = t.from + (t.to - t.from) * e; if (p < 1) driveTweens(); return t.val;
  };
  const doSetup = () => {
    disposeDrag(canvas); runCleanups(cleanup); generation++; pending.clear(); failure = null;
    cancelAnimationFrame(renderRaf); renderRaf = 0; cancelAnimationFrame(tweenRaf); tweenRaf = 0;
    tweens = {}; api.state = {}; iter = 0; api.iter = 0; clock.reset(); updateStatus();
    try { spec.setup?.(api); } catch (error) { fail(error); }
  };
  const stepN = k => {
    if (failure || pending.size || disposed) return;
    for (let i = 0; i < k && (!spec.maxStep || iter < spec.maxStep); i++) {
      try { api.iter = iter; spec.step?.(api); iter++; } catch (error) { fail(error); break; }
    }
    api.iter = iter;
  };
  const stop = () => { playing = false; clock.reset(); if (playBtn) { playBtn.textContent = '▶ Play'; playBtn.setAttribute('aria-pressed', 'false'); } cancelAnimationFrame(raf); raf = 0; };
  // advance a timeline range by real elapsed time, snapping the slider to its value
  const advanceTimeline = (ts) => {
    if (!lastTs) lastTs = ts;
    const dt = Math.min(ts - lastTs, 100); lastTs = ts;     // clamp dt so a backgrounded tab does not jump
    const tl = timeline, span = tl.max - tl.min || 1;
    tl.pos += span * (dt / tl.period) * speedMul * tl.dir;
    if (tl.pos >= tl.max) { if (tl.loop === 'pingpong') { tl.pos = tl.max; tl.dir = -1; } else if (tl.loop) { tl.pos = tl.min + ((tl.pos - tl.min) % span); } else { tl.pos = tl.max; api.setControl(tl.name, tl.int ? Math.round(tl.pos) : tl.pos); renderNow(); stop(); return; } }
    else if (tl.pos <= tl.min && tl.dir < 0) { tl.pos = tl.min; tl.dir = 1; }
    api.setControl(tl.name, tl.int ? Math.round(tl.pos) : tl.pos);
  };
  const loop = ts => {
    raf = 0;
    if (!playing || disposed) return;
    if (!canvas.isConnected || document.hidden || !visible) { stop(); return; }
    if (pending.size) { clock.reset(); lastTs = 0; raf = requestAnimationFrame(loop); return; }
    if (timeline && !spec.step) { advanceTimeline(ts); if (!playing) return; renderNow(); }
    else { stepN(clock.advance(ts, speedMul)); renderNow(); }
    if (failure || (spec.maxStep && iter >= spec.maxStep)) { stop(); return; }
    raf = requestAnimationFrame(loop);
  };
  const play = () => {
    if (!hasLoop || disposed || playing || document.hidden) return;
    ensureSetup(); if (failure) return;
    everPlayed = true;
    if (timeline && !spec.step) { if (timeline.pos >= timeline.max && timeline.loop !== 'pingpong') timeline.pos = timeline.min; timeline.dir = 1; }
    else if (spec.maxStep && iter >= spec.maxStep) doReset();
    lastTs = 0; clock.reset(); playing = true;
    if (playBtn) { playBtn.textContent = '❚❚ Pause'; playBtn.setAttribute('aria-pressed', 'true'); }
    raf = requestAnimationFrame(loop);
  };
  const doReset = () => { if (disposed) return; stop(); fit(); didSetup = true; doSetup(); renderNow(); };
  retry.onclick = doReset;

  let playBtn = null;
  const changed = (c, reset = false) => {
    const initialized = didSetup; ensureSetup();
    if (initialized) {
      try { spec.onControl?.(c.name, vals[c.name], api); } catch (error) { fail(error); return; }
      if (reset) doReset(); else if (!playing) render();
    }
  };
  for (const c of spec.controls || []) {
    if (c.type === 'play') { playBtn = document.createElement('button'); playBtn.type = 'button'; playBtn.setAttribute('aria-pressed', 'false'); playBtn.className = 'vk-play'; playBtn.textContent = '▶ Play'; playBtn.onclick = () => playing ? stop() : play(); row.appendChild(playBtn); }
    else if (c.type === 'step') { const b = document.createElement('button'); b.type = 'button'; b.className = 'vk-btn'; b.dataset.vkWait = '1'; b.textContent = c.label || 'Step'; b.onclick = () => { ensureSetup(); stop(); stepN(1); render(); }; row.appendChild(b); }
    else if (c.type === 'reset') { const b = document.createElement('button'); b.type = 'button'; b.className = 'vk-btn'; b.textContent = c.label || 'Reset'; b.onclick = doReset; row.appendChild(b); }
    else if (c.type === 'speed') { const wrap = document.createElement('span'); wrap.className = 'vk-spd'; wrap.append('speed');
      (c.presets || [0.5, 1, 2, 4]).forEach(m => { const b = document.createElement('button'); b.type = 'button'; b.className = 'vk-s' + (m === 1 ? ' active' : ''); b.textContent = m + '×';
        b.onclick = () => { speedMul = m; wrap.querySelectorAll('.vk-s').forEach(x => x.classList.remove('active')); b.classList.add('active'); wrap.querySelectorAll('.vk-s').forEach(x => x.setAttribute('aria-pressed', String(x === b))); };
        b.setAttribute('aria-pressed', String(m === 1)); wrap.appendChild(b); }); row.appendChild(wrap); }
    else if (c.type === 'newrow') { newRow(); }
    else if (c.type === 'range') {
      // a range with `play` gets a Play button that auto-advances it (a timeline)
      if (c.play) { hasLoop = true; timeline = { name: c.name, min: +c.min, max: +c.max, step: +c.step, int: !!c.int, period: c.play.period || 4000, loop: c.play.loop ?? false, pos: c.int ? Math.round(+c.value) : +c.value, dir: 1 };
        playBtn = document.createElement('button'); playBtn.type = 'button'; playBtn.setAttribute('aria-pressed', 'false'); playBtn.className = 'vk-play'; playBtn.textContent = '▶ Play'; playBtn.onclick = () => playing ? stop() : play(); row.appendChild(playBtn); }
      const lab = document.createElement('label'); lab.className = 'vk-range';
      const name = document.createElement('span'); name.className = 'vk-range-name'; name.textContent = c.label || c.name;
      const inp = document.createElement('input'); inp.type = 'range'; inp.min = c.min; inp.max = c.max; inp.step = c.step; inp.value = c.value;
      const span = document.createElement('span'); span.className = 'vk-val'; const fmt = c.fmt || (v => v);
      vals[c.name] = c.int ? Math.round(+c.value) : +c.value; span.textContent = fmt(vals[c.name]);
      controlEls[c.name] = { input: inp, span, fmt, cast: c.int ? (v => Math.round(+v)) : (v => +v) };
      inp.setAttribute('aria-label', c.label || c.name); inp.setAttribute('aria-valuetext', String(fmt(vals[c.name])));
      inp.oninput = () => { vals[c.name] = c.int ? Math.round(+inp.value) : +inp.value; span.textContent = fmt(vals[c.name]); inp.setAttribute('aria-valuetext', String(fmt(vals[c.name]))); if (c.play) { if (playing) stop(); timeline.pos = vals[c.name]; timeline.dir = 1; } changed(c, !!c.reset); };
      lab.appendChild(name); lab.appendChild(inp); lab.appendChild(span); row.appendChild(lab); }
    else if (c.type === 'select') { const lab = document.createElement('label'); lab.append((c.label || c.name) + ' ');
      const sel = document.createElement('select'); (c.options || []).forEach(o => { const op = document.createElement('option'); op.value = o.value; op.textContent = o.label; sel.appendChild(op); });
      sel.setAttribute('aria-label', c.label || c.name);
      sel.value = c.value != null ? c.value : (c.options[0] && c.options[0].value); vals[c.name] = sel.value;
      controlEls[c.name] = { input: sel };
      sel.onchange = () => { vals[c.name] = sel.value; changed(c, c.reset !== false); }; lab.appendChild(sel); row.appendChild(lab); }
    else if (c.type === 'number') { const lab = document.createElement('label'); lab.append((c.label || c.name) + ' ');
      const inp = document.createElement('input'); inp.type = 'number'; if (c.step != null) inp.step = c.step; if (c.min != null) inp.min = c.min; if (c.max != null) inp.max = c.max; inp.value = c.value; inp.style.width = (c.width || 54) + 'px'; vals[c.name] = +c.value;
      controlEls[c.name] = { input: inp, cast: v => +v };
      inp.setAttribute('aria-label', c.label || c.name);
      const updateNumber = () => { if (inp.value === '' || !Number.isFinite(+inp.value)) return; const value = Math.max(c.min ?? -Infinity, Math.min(c.max ?? Infinity, +inp.value)); if (value === vals[c.name]) return; vals[c.name] = value; inp.value = value; changed(c, c.reset !== false); };
      inp.oninput = updateNumber;
      inp.onchange = () => { if (inp.value === '' || !Number.isFinite(+inp.value)) inp.value = vals[c.name]; else updateNumber(); };
      lab.appendChild(inp); row.appendChild(lab); }
    else if (c.type === 'text') { const lab = document.createElement('label'); lab.className = 'vk-text'; if (c.label) lab.append((c.label) + ' ');
      const inp = document.createElement('input'); inp.type = 'text'; inp.value = c.value != null ? c.value : ''; if (c.placeholder) inp.placeholder = c.placeholder; inp.style.width = (c.width || 200) + 'px';
      if (c.maxLength) inp.maxLength = c.maxLength; inp.setAttribute('aria-label', c.label || c.name); vals[c.name] = inp.value;
      controlEls[c.name] = { input: inp, cast: v => '' + v };
      let deb; finalizers.add(() => clearTimeout(deb)); inp.oninput = () => { vals[c.name] = inp.value; clearTimeout(deb); deb = setTimeout(() => { changed(c); }, c.debounce ?? 120); };
      lab.appendChild(inp); row.appendChild(lab); }
    else if (c.type === 'toggle') { const lab = document.createElement('label'); const inp = document.createElement('input'); inp.type = 'checkbox'; inp.checked = !!c.value; vals[c.name] = !!c.value;
      controlEls[c.name] = { input: inp, cast: v => !!v };
      inp.onchange = () => { vals[c.name] = inp.checked; changed(c, !!c.reset); }; lab.appendChild(inp); lab.append(' ' + (c.label || c.name)); row.appendChild(lab); }
    else if (c.type === 'button') { const b = document.createElement('button'); b.type = 'button'; b.className = 'vk-btn'; b.textContent = c.label || c.name;
      if (!c.reset) b.dataset.vkWait = '1';
      b.onclick = () => { ensureSetup(); if (c.reset) doReset(); else { if (pending.size || failure) return; try { spec.onAction?.(c.name, api); } catch (error) { fail(error); } if (!playing) render(); } }; row.appendChild(b); }
    else if (c.type === 'readout') { const span = document.createElement('output'); span.className = 'vk-readout'; span.setAttribute('aria-live', 'off'); readouts[c.name] = span; results.appendChild(span); }
  }

  if (spec.tools !== false) {
    const tools = document.createElement('span'); tools.className = 'vk-tools';
    const shot = document.createElement('button');
    shot.type = 'button'; shot.className = 'vk-tool'; shot.textContent = '⇩';
    shot.dataset.vkWait = '1'; shot.title = 'Download this plot as PNG'; shot.setAttribute('aria-label', 'Download plot as PNG');
    shot.onclick = () => { ensureSetup(); if (pending.size || failure) return; renderNow(); downloadCanvas(canvas, `${root.classList[1] || 'viz'}-${Date.now()}.png`, colors.bg).then(() => showToast(root, 'PNG saved')).catch(() => showToast(root, 'Could not save this plot. Try again.')); };
    tools.appendChild(shot);
    const expand = document.createElement('button'); expandButton = expand;
    expand.type = 'button'; expand.className = 'vk-tool'; expand.textContent = '⛶';
    expand.title = 'Expand figure'; expand.setAttribute('aria-label', 'Expand figure'); expand.setAttribute('aria-pressed', 'false');
    let previousFocus, previousOverflow = '', previousRole, previousLabel;
    const labelExpanded = active => { expand.setAttribute('aria-label', active ? 'Close expanded figure' : 'Expand figure'); expand.title = active ? 'Close expanded figure' : 'Expand figure'; expand.setAttribute('aria-pressed', String(active)); };
    closeExpanded = () => {
      if (!expanded) return;
      expanded = false; root.classList.remove('vk-expanded'); document.body.style.overflow = previousOverflow;
      if (previousRole) root.setAttribute('role', previousRole); else root.removeAttribute('role');
      root.removeAttribute('aria-modal');
      if (previousLabel) root.setAttribute('aria-label', previousLabel); else root.removeAttribute('aria-label');
      if (expandedInstance === closeExpanded) expandedInstance = null;
      labelExpanded(false); fit(); renderNow(); if (previousFocus?.isConnected) previousFocus.focus?.({preventScroll:true});
    };
    const openExpanded = () => {
      if (disposed || expanded) return;
      expandedInstance?.(); previousFocus = document.activeElement; previousOverflow = document.body.style.overflow;
      previousRole = root.getAttribute('role'); previousLabel = root.getAttribute('aria-label');
      expanded = true; expandedInstance = closeExpanded; root.classList.add('vk-expanded'); document.body.style.overflow = 'hidden';
      root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', spec.title || 'Expanded visualization');
      labelExpanded(true); ensureSetup(); fit(); renderNow(); expand.focus?.({preventScroll:true});
    };
    // Expand within the page rather than relying on fullscreen permission or a
    // browser-managed mode that embedded webviews can revoke between actions.
    expand.onclick = () => { if (expanded) closeExpanded(); else openExpanded(); };
    tools.appendChild(expand);
    header.appendChild(tools);
  }

  if (spec.help !== false) {
    const help = document.createElement('div');
    help.className = 'vk-help';
    help.textContent = spec.step ? 'Shortcuts: Space play/pause, S step, R reset.' : (hasLoop ? 'Shortcut: Space play/pause.' : 'Interactive controls update the plot live.');
    bar.appendChild(help);
  }

  // ── poster (pre-rendered still) ──
  // A one-time nudge: pulse the Play button while the still preview waits, cleared
  // for good on the first play (see play()).
  const markReady = () => {};
  const posterSrc = () => {
    const base = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '');
    const dark = document.documentElement.dataset.theme === 'dark';
    return `${base}/viz-posters/${posterName}${dark ? '-dark' : ''}.png`;
  };
  // paint the poster to fill the canvas (cover-fit, no distortion); owns its own fit()
  // so the resize/theme paths can call it directly.
  const paintPoster = () => {
    if (!posterReady || !posterImg) return;
    fit();
    ctx.clearRect(0, 0, api.size.W, api.size.H);
    const iw = posterImg.naturalWidth, ih = posterImg.naturalHeight;
    if (!iw || !ih) return;
    const s = Math.max(api.size.W / iw, api.size.H / ih);
    const w = iw * s, h = ih * s;
    ctx.drawImage(posterImg, (api.size.W - w) / 2, (api.size.H - h) / 2, w, h);
    markReady();
  };
  // theme-correct fallback when the poster image is missing or still loading; keeps
  // setup deferred so a heavy panel never computes on scroll, just shows a hint.
  const drawPlaceholder = () => {
    fit();
    ctx.clearRect(0, 0, api.size.W, api.size.H);
    ctx.fillStyle = colors.muted || '#888';
    ctx.font = '13px ui-monospace, monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(hasLoop ? '▶  press play' : 'click to load', api.size.W / 2, api.size.H / 2);
    markReady();
  };
  const loadPoster = () => {
    posterReady = false; posterFailed = false;
    const img = new Image(); posterImg = img;
    img.onload = () => { if (disposed || img !== posterImg) return; posterReady = true; if (!didSetup) paintPoster(); };
    img.onerror = () => { if (disposed || img !== posterImg) return; posterFailed = true; if (!didSetup) drawPlaceholder(); }; // stay deferred
    img.src = posterSrc();
  };
  // repaint the current still (image if loaded, else placeholder); does not re-fetch.
  const paintStill = () => { if (posterReady && posterImg) paintPoster(); else drawPlaceholder(); };
  // paint the still on viewport entry, kicking off the (lazy, theme-specific) load once.
  const showStill = () => { if (posterReady) paintPoster(); else if (posterFailed) drawPlaceholder(); else { drawPlaceholder(); loadPoster(); } };
  const showingPoster = () => usePoster && !didSetup;

  // setup() is deferred to first viewport entry (see the IntersectionObserver
  // below), so nothing computes at page load; a page of panels stays responsive
  // and each panel does its work only as it scrolls near. A poster viz defers even
  // this until Play / first interaction.
  const ensureSetup = () => { if (didSetup || disposed) return; fit(); didSetup = true; doSetup(); renderNow(); markReady(); };

  // A poster viz wakes on intent: a loop viz on Play (see play()); a pure-interactive
  // one on the first pointer or focus so its controls compute live.
  if (usePoster) {
    const wake = () => { if (!didSetup) ensureSetup(); };
    api.listen(canvas, 'pointerdown', wake);
    api.listen(bar, 'pointerdown', wake);
    api.listen(root, 'focusin', wake);
  }

  // keyboard shortcuts on the focusable figure root: space=play/pause, s=step, r=reset
  api.listen(root, 'keydown', (e) => {
    if (expanded && e.key === 'Escape') { e.preventDefault(); closeExpanded(); return; }
    if (expanded && e.key === 'Tab') {
      const focusable = [...root.querySelectorAll('button,input,select,textarea,a[href],[tabindex="0"]')].filter(el => !el.disabled && !el.hidden && el.getClientRects().length);
      const first = focusable[0], last = focusable.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      return;
    }
    if (ignoreShortcut(e)) return;
    if (e.key === ' ' && hasLoop) { e.preventDefault(); ensureSetup(); playing ? stop() : play(); }
    else if ((e.key === 's' || e.key === 'S') && spec.step) { e.preventDefault(); ensureSetup(); stop(); stepN(1); renderNow(); }
    else if ((e.key === 'r' || e.key === 'R') && spec.step) { e.preventDefault(); ensureSetup(); doReset(); }
  });

  const observers = [];
  const alive = () => !disposed && canvas.isConnected;
  const dispose = () => {
    if (disposed) return; disposed = true; generation++; stop(); closeExpanded();
    cancelAnimationFrame(renderRaf); cancelAnimationFrame(tweenRaf); renderRaf = tweenRaf = 0;
    lifetime.abort(); disposeDrag(canvas); runCleanups(cleanup); runCleanups(finalizers); observers.forEach(o => o.disconnect());
    if (posterImg) { posterImg.onload = posterImg.onerror = null; }
    clearTimeout(root.querySelector('.vk-toast')?._vkTimer);
    mounted.delete(root); delete root.dataset.vkReady; delete root.dataset.vkState;
    for (const node of [header, bar, plot, scrollNote, results, annEl, status, root.querySelector('.vk-toast')]) node?.remove();
    if (!mounted.size) { removalObserver?.disconnect(); removalObserver = null; }
  };
  const themeObs = new MutationObserver(() => { if (!alive()) return; colors = readColors(); if (showingPoster()) loadPoster(); else render(); });
  themeObs.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});
  const resizeObs = new ResizeObserver(() => { if (!alive()) return; if (showingPoster()) paintStill(); else { fit(); render(); } });
  resizeObs.observe(plot);
  const onFullscreen = () => { if (!alive()) return; if (expandButton) { const active = document.fullscreenElement === root || document.webkitFullscreenElement === root; expandButton.setAttribute('aria-label', active ? 'Close expanded figure' : 'Expand figure'); expandButton.setAttribute('aria-pressed', String(active)); } colors = readColors(); if (showingPoster()) paintStill(); else { fit(); renderNow(); } };
  api.listen(document, 'fullscreenchange', onFullscreen); api.listen(document, 'webkitfullscreenchange', onFullscreen);
  api.listen(document, 'visibilitychange', () => { if (document.hidden) { stop(); cancelAnimationFrame(tweenRaf); tweenRaf = 0; } });
  const motionChange = event => { reduceMotion = event.matches; if (reduceMotion) { stop(); cancelAnimationFrame(tweenRaf); tweenRaf = 0; } render(); };
  if (motionQuery?.addEventListener) api.listen(motionQuery, 'change', motionChange);
  else if (motionQuery?.addListener) { motionQuery.addListener(motionChange); finalizers.add(() => motionQuery.removeListener(motionChange)); }
  let kicked = false;
  const entered = entry => {
    if (!alive()) return;
    visible = entry.isIntersecting;
    if (visible) {
      if (showingPoster()) showStill(); else if (!didSetup) ensureSetup(); else { fit(); renderNow(); }
      if (hasLoop && spec.autoplay === true && !reduceMotion && !kicked) { kicked = true; play(); }
    } else { stop(); cancelAnimationFrame(renderRaf); cancelAnimationFrame(tweenRaf); renderRaf = tweenRaf = 0; }
  };
  if (typeof IntersectionObserver !== 'undefined') { const io = new IntersectionObserver(entries => entered(entries[0]), {rootMargin: '80px 0px'}); io.observe(plot); observers.push(io); }
  else ensureSetup();
  observers.push(themeObs, resizeObs);
  track(root, {api, dispose}); updateStatus();
  if (!ctx) fail(new Error('Canvas unavailable'));
  return api;
}

const definitions = new Map();
let listening = false;
function bootAll() { for (const [name, spec] of definitions) document.querySelectorAll('.'+name).forEach(root => mountViz(root, spec)); }
export function defineViz(className, spec) {
  definitions.set(className, spec);
  if (!listening) {
    listening = true;
    document.addEventListener('DOMContentLoaded', bootAll);
    document.addEventListener('astro:page-load', bootAll);
    document.addEventListener('astro:after-swap', bootAll);
    document.addEventListener('astro:before-swap', () => { for (const {dispose} of [...mounted.values()]) dispose(); });
  }
  if (document.readyState !== 'loading') document.querySelectorAll('.'+className).forEach(root => mountViz(root, spec));
}
