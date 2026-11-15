// Pointer positions use the same CSS-pixel coordinates as the engine canvas.
export function localPoint(canvas, event) {
  const r = canvas.getBoundingClientRect();
  return {x: event.clientX - r.left, y: event.clientY - r.top};
}
export function hitTest(point, rects) {
  return rects.findIndex(r => point.x >= r.x && point.x <= r.x+r.w && point.y >= r.y && point.y <= r.y+r.h);
}
const bindings = new WeakMap();
export function drag(canvas, {onStart, onMove, onEnd, onHover, cursor} = {}) {
  if (bindings.has(canvas)) return bindings.get(canvas);
  let pointer = null;
  const previousCursor = canvas.style.cursor, previousTouch = canvas.style.touchAction;
  // Preserve native touch scrolling; pointercancel ends a browser-taken gesture.
  const down = event => {
    if (pointer !== null || (event.button != null && event.button !== 0)) return;
    pointer = event.pointerId;
    try { canvas.setPointerCapture?.(pointer); } catch {}
    if (cursor) canvas.style.cursor = cursor;
    onStart?.(localPoint(canvas,event),event);
  };
  const move = event => {
    if (pointer !== null && pointer !== event.pointerId) return;
    const point = localPoint(canvas,event); onHover?.(point,event);
    if (pointer !== null) onMove?.(point,event);
  };
  const end = event => {
    if (pointer === null || pointer !== event.pointerId) return;
    const id = pointer; pointer = null;
    try { if (canvas.hasPointerCapture?.(id)) canvas.releasePointerCapture(id); } catch {}
    canvas.style.cursor = previousCursor; onEnd?.(localPoint(canvas,event),event);
  };
  const events = [['pointerdown',down],['pointermove',move],['pointerup',end],['pointercancel',end],['lostpointercapture',end]];
  for (const [type, fn] of events) canvas.addEventListener(type,fn);
  const cleanup = () => {
    for (const [type, fn] of events) canvas.removeEventListener(type,fn);
    if (pointer !== null) { try { canvas.releasePointerCapture?.(pointer); } catch {} }
    pointer = null; canvas.style.cursor = previousCursor; canvas.style.touchAction = previousTouch;
    bindings.delete(canvas); delete canvas.dataset.vkDrag;
  };
  bindings.set(canvas,cleanup); canvas.dataset.vkDrag='1'; return cleanup;
}

export function disposeDrag(canvas) { bindings.get(canvas)?.(); }
