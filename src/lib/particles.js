/**
 * Tiny particle engine drawn on one full-screen <canvas>.
 * - init(canvas) is called once by <ParticleCanvas />.
 * - trail(x, y, speed) and burst(x, y, count) can be called from anywhere.
 * The animation loop only runs while particles are alive, so it costs nothing when idle.
 */

const MAX = 250;
const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let ctx = null;
let W = 0;
let H = 0;
let parts = [];
let running = false;
let palette = ['#a78bfa', '#c6f432', '#e879f9'];

function readPalette() {
  const s = getComputedStyle(document.documentElement);
  palette = ['--accent', '--accent-2', '--accent-3'].map((v) => s.getPropertyValue(v).trim());
}

function resize(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function loop() {
  ctx.clearRect(0, 0, W, H);
  if (!parts.length) {
    running = false;
    return;
  }
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.965;
    p.vy *= 0.965;
    p.vy += 0.012;
    p.life -= p.decay;
    if (p.life <= 0) {
      parts.splice(i, 1);
      continue;
    }
    ctx.globalAlpha = p.life * 0.85;
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * (0.5 + p.life * 0.5), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(loop);
}

function spawn(x, y, n, speed) {
  if (!ctx || reduceMotion) return;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = (Math.random() * 0.8 + 0.4) * speed;
    parts.push({
      x, y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
      life: 1,
      decay: 0.012 + Math.random() * 0.02,
      r: Math.random() * 2 + 0.8,
      c: palette[(Math.random() * palette.length) | 0],
    });
  }
  if (parts.length > MAX) parts.splice(0, parts.length - MAX);
  if (!running) {
    running = true;
    requestAnimationFrame(loop);
  }
}

export function init(canvas) {
  ctx = canvas.getContext('2d');
  readPalette();
  const onResize = () => resize(canvas);
  onResize();
  window.addEventListener('resize', onResize);
  // Re-read colours whenever the theme flips
  const mo = new MutationObserver(readPalette);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => {
    window.removeEventListener('resize', onResize);
    mo.disconnect();
    ctx = null;
  };
}

/** A few particles that drift away from the cursor while it moves. */
export const trail = (x, y, speed) => spawn(x, y, Math.min(3, 1 + ((speed / 12) | 0)), 1.1);

/** A bigger pop (clicks, theme toggle). */
export const burst = (x, y, count = 16) => spawn(x, y, count, 3.2);
