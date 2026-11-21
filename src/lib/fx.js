/**
 * Tiny event bus for the fun stuff, so any component can trigger an effect
 * without wiring props through the whole tree.
 *
 *   emit('confetti', { x, y })   →  <Confetti /> pops
 *   emit('matrix')               →  <MatrixRain /> runs
 *   on('egg', fn)                →  fired by lib/eggs.js when an easter egg is found
 */
const bus = new EventTarget();

export const emit = (name, detail) => bus.dispatchEvent(new CustomEvent(name, { detail }));

export const on = (name, fn) => {
  const handler = (e) => fn(e.detail);
  bus.addEventListener(name, handler);
  return () => bus.removeEventListener(name, handler);
};
