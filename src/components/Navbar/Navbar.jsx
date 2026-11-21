import { useState } from 'react';
import { nav } from '../../data/profile';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useScrollFrame((y) => setScrolled(y > 40)); // React skips re-render when the value is unchanged

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="logo">
        <b>SK</b>subhojit.dev
      </a>
      <div className="nav-links">
        {nav.map((item, i) => (
          <a key={item.id} href={`#${item.id}`}>
            <span>{String(i + 1).padStart(2, '0')}.</span> {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
