import { useEffect, useRef } from 'react';

/**
 * Shared, frame-throttled scroll listener.
 * Every subscriber runs at most once per animation frame, all in the same frame,
 * which keeps scrolling smooth even with several scroll effects on the page.
 */
const subscribers = new Set();
let ticking = false;

function flush() {
  ticking = false;
  const y = window.scrollY;
  const vh = window.innerHeight;
  subscribers.forEach((fn) => fn(y, vh));
}
function schedule() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(flush);
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
}

/** callback(scrollY, viewportHeight) runs on scroll/resize and once on mount. */
export function useScrollFrame(callback) {
  const ref = useRef(callback);
  ref.current = callback;

  useEffect(() => {
    const fn = (y, vh) => ref.current(y, vh);
    subscribers.add(fn);
    fn(window.scrollY, window.innerHeight);
    return () => subscribers.delete(fn);
  }, []);
}
