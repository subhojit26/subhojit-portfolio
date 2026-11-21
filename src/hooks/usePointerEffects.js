import { useEffect, useRef } from 'react';

/**
 * 3D tilt toward the cursor. Also sets --px / --py (cursor position in %)
 * so CSS can draw a glow that follows the mouse.
 */
export function useTilt(maxDeg = 6, { enabled = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg)`;
      el.style.setProperty('--px', `${(x + 0.5) * 100}%`);
      el.style.setProperty('--py', `${(y + 0.5) * 100}%`);
    };
    const leave = () => { el.style.transform = ''; };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [maxDeg, enabled]);

  return ref;
}

/** Button that is gently pulled toward the cursor. */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) * strength * 0.85;
      const dy = (e.clientY - r.top - r.height / 2) * strength * 1.15;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const leave = () => { el.style.transform = ''; };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);

  return ref;
}
