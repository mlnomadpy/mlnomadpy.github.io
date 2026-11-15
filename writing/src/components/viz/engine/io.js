// Share successful reads, but let a failed request be retried. Never cancel a
// shared fetch when one figure resets: another visible figure may still need it.
const jsonCache = new Map(), imageCache = new Map(), binaryCache = new Map();
function memo(cache, url, read) {
  if (!cache.has(url)) {
    const promise = Promise.resolve().then(read).catch(error => {
      if (cache.get(url) === promise) cache.delete(url);
      throw error;
    });
    cache.set(url, promise);
  }
  return cache.get(url);
}
async function response(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Asset request failed (${r.status})`);
  return r;
}
export function loadJSON(url) { return memo(jsonCache, url, async () => (await response(url)).json()); }
export function loadFloat32(url) {
  return memo(binaryCache, url, async () => {
    const buffer = await (await response(url)).arrayBuffer();
    if (buffer.byteLength % 4) throw new Error('Invalid float32 asset length');
    return new Float32Array(buffer);
  });
}
export function loadImage(url) {
  // Keep the existing null-on-failure contract used by image panels.
  return memo(imageCache, url, () => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => { image.onload = image.onerror = null; resolve(image); };
    image.onerror = () => { image.onload = image.onerror = null; reject(new Error('Image could not be loaded')); };
    image.src = url;
  })).catch(() => null);
}
export function whenVisible(element, callback, margin = '400px') {
  let canceled = false, observer;
  const run = () => { if (canceled) return; observer?.disconnect(); callback(); };
  if (typeof IntersectionObserver === 'undefined') run();
  else { observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) run();
  }, {rootMargin: margin}); observer.observe(element); }
  return () => { canceled = true; observer?.disconnect(); };
}
