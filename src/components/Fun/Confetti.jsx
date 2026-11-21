import { useEffect, useRef } from 'react';
import { on } from '../../lib/fx';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';

const COLORS = ['#a78bfa', '#c6f432', '#e879f9', '#7dd3fc', '#ffffff', '#6d28d9'];

/**
 * Full-screen confetti. Trigger with emit('confetti', { x, y, big }).
 * The canvas only animates while pieces are alive.
 */
export default function Confetti() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    let pieces = [];
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = innerWidth * dpr;
      cv.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      pieces = pieces.filter((p) => p.y < innerHeight + 40 && p.life > 0);
      for (const p of pieces) {
        p.vy += 0.18;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.004;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.min(1, p.life * 2);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.rot * 2)));
        ctx.restore();
      }
      if (pieces.length) requestAnimationFrame(loop);
      else running = false;
    };

    const off = on('confetti', ({ x, y, big } = {}) => {
      if (prefersReducedMotion) return;
      const n = big ? 260 : 140;
      for (let i = 0; i < n; i++) {
        // big = rain from the top; otherwise burst from a point
        const fromTop = big || x == null;
        const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
        const speed = 6 + Math.random() * 9;
        pieces.push({
          x: fromTop ? Math.random() * innerWidth : x,
          y: fromTop ? -20 - Math.random() * innerHeight * 0.5 : y,
          vx: fromTop ? (Math.random() - 0.5) * 3 : Math.cos(a) * speed,
          vy: fromTop ? Math.random() * 3 : Math.sin(a) * speed,
          w: 6 + Math.random() * 6,
          h: 8 + Math.random() * 8,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          c: COLORS[(Math.random() * COLORS.length) | 0],
          life: 1,
        });
      }
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    });

    return () => {
      off();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 160 }}
    />
  );
}
