import { useEffect, useState } from 'react';
import { on } from '../../lib/fx';

/** Pops up "Easter egg found 3/6" whenever lib/eggs.js reports a new discovery. */
export default function EggToast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timer;
    const off = on('egg', (d) => {
      setToast({ ...d, key: Date.now() });
      clearTimeout(timer);
      timer = setTimeout(() => setToast(null), 3800);
    });
    return () => {
      off();
      clearTimeout(timer);
    };
  }, []);

  if (!toast) return null;
  const done = toast.count === toast.total;
  return (
    <div className={`egg-toast ${done ? 'done' : ''}`} key={toast.key} role="status">
      <span className="egg-icon">{done ? '🏆' : '🥚'}</span>
      <div>
        <small>{done ? 'All easter eggs found!' : `Easter egg ${toast.count}/${toast.total}`}</small>
        <b>{done ? 'You’re thorough. I like that in a teammate.' : toast.egg.name}</b>
      </div>
    </div>
  );
}
