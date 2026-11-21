import { marquee } from '../../data/profile';
import './Marquee.css';

/** Endless strip of tech names under the hero (list is doubled so the loop is seamless). */
export default function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
