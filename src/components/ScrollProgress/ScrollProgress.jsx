import { useRef } from 'react';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import './ScrollProgress.css';

/** Thin gradient bar at the very top that fills as you scroll. */
export default function ScrollProgress() {
  const ref = useRef(null);
  useScrollFrame((y, vh) => {
    const h = document.documentElement.scrollHeight - vh;
    if (ref.current) ref.current.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
  });
  return <div ref={ref} className="scroll-progress" />;
}
