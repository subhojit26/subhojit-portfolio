/**
 * Client-side spam guard for the contact form.
 * Stops casual abuse from a browser (button mashing, repeat pasting). Scripts can bypass
 * client code; Web3Forms' own server-side spam check covers those.
 *
 *   - cooldown between messages
 *   - daily cap per browser
 *   - blocks link-stuffed messages
 */
const KEY = 'sk-contact-sends';
export const COOLDOWN_SEC = 60;
export const DAILY_LIMIT = 3;
export const MAX_LINKS = 2;
const DAY_MS = 24 * 60 * 60 * 1000;

function load() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(list) ? list.filter((t) => Date.now() - t < DAY_MS) : [];
  } catch {
    return [];
  }
}

/** @returns {{ ok: true } | { ok: false, reason: string }} */
export function checkLimits(message) {
  const links = (message.match(/https?:\/\/|www\./gi) || []).length;
  if (links > MAX_LINKS) {
    return { ok: false, reason: `Please keep it to ${MAX_LINKS} links or fewer.` };
  }
  const sends = load();
  if (sends.length >= DAILY_LIMIT) {
    return { ok: false, reason: `You’ve sent ${DAILY_LIMIT} messages today. I’ll reply to those first. Email me directly if it’s urgent.` };
  }
  const last = sends[sends.length - 1];
  const wait = last ? Math.ceil((COOLDOWN_SEC * 1000 - (Date.now() - last)) / 1000) : 0;
  if (wait > 0) {
    return { ok: false, reason: `Please wait ${wait}s before sending another message.` };
  }
  return { ok: true };
}

/** Call after a successful send. */
export function recordSend() {
  try {
    localStorage.setItem(KEY, JSON.stringify([...load(), Date.now()]));
  } catch {
    /* storage blocked: limits just won't persist */
  }
}
