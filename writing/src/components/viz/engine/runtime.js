// The historical stepsPerFrame convention is calibrated at 60 Hz, independent
// of the reader's display refresh rate. Long stalls never create an unbounded backlog.
export function createStepClock(stepsPerFrame = 1, maxElapsedMs = 100) {
  let last = null, remainder = 0;
  return {
    reset() { last = null; remainder = 0; },
    advance(timestamp, speed = 1) {
      if (!Number.isFinite(timestamp)) return 0;
      if (last === null) { last = timestamp; return 0; }
      const dt = Math.max(0, Math.min(maxElapsedMs, timestamp - last)); last = timestamp;
      remainder += dt * 0.06 * Math.max(0, stepsPerFrame) * Math.max(0, speed);
      const count = Math.floor(remainder + 1e-9); remainder = Math.max(0, remainder - count);
      return count;
    },
  };
}
export function ignoreShortcut(event) {
  return event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey ||
    !!event.target?.closest?.('input,select,textarea,button,a,[contenteditable="true"],[contenteditable=""],[role="slider"],[role="textbox"]');
}
export function currentTask(api, state, generation) {
  return !api.signal?.aborted && api.state === state &&
    (generation === undefined || api.generation === generation);
}
