import { useEffect, useRef, useState } from 'react';
import { on } from '../../lib/fx';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';

const GLYPHS = 'アカサタナハマヤラワ0123456789{}<>=+*JAVASPRINGKAFKA'.split('');
const DURATION = 6500;

/** Green code-rain overlay. Trigger with emit('matrix'). Click or Esc to exit early. */
export default function MatrixRain() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => on('matrix', () => !prefersReducedMotion && setActive(true)), []);

  useEffect(() => {
    if (!active) return;
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    const W = (cv.width = innerWidth);
    const H = (cv.height = innerHeight);
    const size = 16;
    const drops = Array.from({ length: Math.ceil(W / size) }, () => Math.random() * -H / size);
    let raf;
    let last = 0;
    const t0 = performance.now();

    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 45) return; // ~22 fps feels more "terminal"
      last = t;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${size}px "JetBrains Mono", monospace`;
      drops.forEach((d, i) => {
        const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        ctx.fillStyle = Math.random() > 0.96 ? '#eafff0' : '#3dfc7a';
        ctx.fillText(ch, i * size, d * size);
        drops[i] = d * size > H && Math.random() > 0.97 ? 0 : d + 1;
      });
      if (t - t0 > DURATION) setActive(false);
    };
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    raf = requestAnimationFrame(draw);

    const esc = (e) => e.key === 'Escape' && setActive(false);
    window.addEventListener('keydown', esc);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', esc);
    };
  }, [active]);

  if (!active) return null;
  return (
    <div className="matrix" onClick={() => setActive(false)}>
      <canvas ref={ref} />
      <p>wake up, recruiter… <span>(click to exit)</span></p>
    </div>
  );
}
