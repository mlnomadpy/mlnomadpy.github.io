// theme.js, the canvas colour palette, read from CSS custom properties, plus a
// helper to re-read it when the site theme toggles. Single source for vizkit and
// for the bespoke (non-vizkit) components that used to reimplement readColors.
export function readColors() {
  const s = getComputedStyle(document.documentElement);
  const v = (n, f) => (s.getPropertyValue(n).trim() || f);
  return {
    accent: v('--sand', '#d7b77e'),
    blue: '#7cabc7',
    green: '#8ab68f',
    muted: v('--muted', '#b4aa9a'),
    faint: '#988d7c',
    border: v('--line', '#454034'),
    fg: v('--ink', '#e9e1d4'),
    bg: v('--bg', '#171512'),
    cellBg: v('--surface', '#211e19'),
  };
}

// Call cb whenever the site theme attribute changes; returns a disconnect fn.
export function watchTheme(cb) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => obs.disconnect();
}
