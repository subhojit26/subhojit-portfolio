import { useEffect, useState } from 'react';
import { on } from '../../lib/fx';
import { EGGS, foundCount } from '../../lib/eggs';
import './Footer.css';

export default function Footer() {
  const [count, setCount] = useState(foundCount);
  useEffect(() => on('egg', ({ count: c }) => setCount(c)), []);
  const all = count === EGGS.length;

  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} Subhojit Karmakar</span>
      <span className={`egg-counter ${all ? 'all' : ''}`} title="Hidden around the page. The terminal knows more: type “eggs”.">
        {all ? '🏆' : '🥚'} {count}/{EGGS.length} easter eggs found{all ? '. Legend.' : ''}
      </span>
      <span>built with ☕ + curiosity · try the terminal ↘</span>
    </footer>
  );
}
