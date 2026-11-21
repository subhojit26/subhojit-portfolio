import { useEffect, useState } from 'react';

/** A big number that counts up from 0 once `start` becomes true. */
export default function StatCounter({ value, decimals = 0, prefix = '', suffix = '', label, start }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const duration = 1600;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / duration);
      setShown(value * (1 - Math.pow(1 - k, 4))); // ease-out
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return (
    <div className="stat">
      <b>
        {prefix}
        {shown.toFixed(decimals)}
        {suffix && <sup>{suffix}</sup>}
      </b>
      <span>{label}</span>
    </div>
  );
}
