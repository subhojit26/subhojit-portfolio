import { useEffect, useRef } from 'react';
import { init } from '../../lib/particles';

/** Full-screen, click-through canvas the particle engine draws on. Mounted once in App. */
export default function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => init(ref.current), []);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 90 }}
    />
  );
}
