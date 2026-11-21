/**
 * Easter-egg hunt. Call find('id') wherever an egg is discovered.
 * Progress is remembered per visitor (localStorage) and announced via the fx bus.
 */
import { emit } from './fx';

export const EGGS = [
  { id: 'terminal', name: 'Opened the terminal', hint: 'There’s a terminal in the bottom-right corner.' },
  { id: 'lights', name: 'Flipped the lights', hint: 'Pull the bulb.' },
  { id: 'name', name: 'Broke my name', hint: 'My name looks clickable…' },
  { id: 'stack', name: 'Skill detective', hint: 'Hover five different techs in the stack to read their stories.' },
  { id: 'matrix', name: 'Entered the Matrix', hint: 'Ask the terminal about the Matrix.' },
  { id: 'konami', name: 'Konami code', hint: '↑ ↑ ↓ ↓ ← → ← → B A' },
];

const KEY = 'sk-eggs';

function load() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) || '[]'));
  } catch {
    return new Set();
  }
}

const found = load();

export const foundCount = () => found.size;
export const isFound = (id) => found.has(id);

export function find(id) {
  if (found.has(id) || !EGGS.some((e) => e.id === id)) return;
  found.add(id);
  try {
    localStorage.setItem(KEY, JSON.stringify([...found]));
  } catch {
    /* storage blocked: progress just won't persist */
  }
  const egg = EGGS.find((e) => e.id === id);
  emit('egg', { egg, count: found.size, total: EGGS.length });
  if (found.size === EGGS.length) setTimeout(() => emit('confetti', { big: true }), 400);
}
