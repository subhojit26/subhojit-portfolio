import { useRef } from 'react';
import { burst } from '../../lib/particles';
import { find } from '../../lib/eggs';
import './ThemeBulb.css';

/**
 * Minimal pendant lamp (top right). Click / Enter / Space toggles light ↔ dark.
 * Light mode = lamp on (warm bulb + soft cone of light); dark mode = lamp off.
 */
export default function ThemeBulb({ theme, onToggle }) {
  const ref = useRef(null);
  const on = theme === 'light';

  const handle = () => {
    onToggle();
    find('lights');
    const el = ref.current;
    // restart the swing animation
    el.classList.remove('swing');
    void el.offsetWidth;
    el.classList.add('swing');
    const r = el.getBoundingClientRect();
    burst(r.left + r.width / 2, r.bottom - 6, 14);
  };

  return (
    <div
      ref={ref}
      className={`lamp ${on ? 'on' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${on ? 'dark' : 'light'} mode`}
      aria-pressed={on}
      onClick={handle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handle();
        }
      }}
    >
      <div className="lamp-cord" />
      <svg viewBox="0 0 64 44" aria-hidden="true">
        <defs>
          <linearGradient id="lampShade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" className="shade-dark" />
            <stop offset="0.42" className="shade-light" />
            <stop offset="1" className="shade-dark" />
          </linearGradient>
          <radialGradient id="lampBulb" cx="0.5" cy="0.35" r="0.65">
            <stop offset="0" className="bulb-core" />
            <stop offset="1" className="bulb-edge" />
          </radialGradient>
        </defs>
        {/* canopy + stem */}
        <rect className="lamp-metal" x="28.5" y="0" width="7" height="7" rx="1.5" />
        {/* bulb (peeks out under the shade) */}
        <circle className="lamp-bulb" cx="32" cy="33" r="6.5" fill="url(#lampBulb)" />
        {/* dome shade */}
        <path className="lamp-shade" d="M6 33 C6 17 17 6.5 32 6.5 C47 6.5 58 17 58 33 Z" fill="url(#lampShade)" />
        {/* rim with a thin brass edge */}
        <rect className="lamp-rim" x="4.5" y="31.5" width="55" height="3" rx="1.5" />
      </svg>
      {/* soft cone of light, visible when on */}
      <div className="lamp-beam" aria-hidden="true" />
      <span className="lamp-tip">{on ? 'lights off' : 'lights on'}</span>
    </div>
  );
}
