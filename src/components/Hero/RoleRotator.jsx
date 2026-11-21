import { useEffect, useRef } from 'react';

const GLYPHS = '!<>-_\\/[]{}-=+*^?#01';

/** Cycles through `roles`, with a quick "decoding" scramble between each one. */
export default function RoleRotator({ roles, interval = 2600 }) {
  const ref = useRef(null);

  useEffect(() => {
    let i = 0;
    let raf;
    const scramble = (to) => {
      let frame = 0;
      const total = 18;
      const tick = () => {
        if (!ref.current) return;
        ref.current.textContent = [...to]
          .map((c, idx) => (idx < (frame / total) * to.length ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join('');
        if (++frame <= total) raf = requestAnimationFrame(tick);
        else ref.current.textContent = to;
      };
      tick();
    };
    const id = setInterval(() => {
      i = (i + 1) % roles.length;
      scramble(roles[i]);
    }, interval);
    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, [roles, interval]);

  return <span className="rotator" ref={ref}>{roles[0]}</span>;
}
