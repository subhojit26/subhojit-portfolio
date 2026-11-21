import { useEffect, useRef } from 'react';
import { hero, links } from '../../data/profile';
import { trail, burst } from '../../lib/particles';
import { find } from '../../lib/eggs';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import MagneticButton from '../ui/MagneticButton';
import RichText from '../ui/RichText';
import { ArrowRight, DownloadIcon } from '../ui/Icons';
import RoleRotator from './RoleRotator';
import CodeCard from './CodeCard';
import './Hero.css';

/**
 * Landing screen. Owns the hero-only effects:
 *  - spotlight + grid that follow the cursor (CSS vars --mx / --my)
 *  - cursor particle trail + click bursts (only inside the hero)
 *  - gentle parallax + fade-out while scrolling away
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);

  // cursor spotlight + particles
  useEffect(() => {
    const el = sectionRef.current;
    let last = null;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
      if (e.pointerType === 'touch') return;
      if (last) {
        const speed = Math.min(Math.hypot(e.clientX - last.x, e.clientY - last.y), 40);
        if (speed > 1.5) trail(e.clientX, e.clientY, speed);
      }
      last = { x: e.clientX, y: e.clientY };
    };
    const leave = () => { last = null; };
    const down = (e) => burst(e.clientX, e.clientY, 16);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    el.addEventListener('pointerdown', down);

    // mark the hero as off screen (used to pause anything looping inside it)
    const io = new IntersectionObserver(([en]) => el.classList.toggle('off', !en.isIntersecting));
    io.observe(el);

    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      el.removeEventListener('pointerdown', down);
      io.disconnect();
    };
  }, []);

  // parallax: slow drift, and fade only during the second half of the scroll
  useScrollFrame((y, vh) => {
    if (prefersReducedMotion || !innerRef.current) return;
    if (y > vh * 1.2 && innerRef.current.style.opacity === '0.000') return; // already hidden
    y = Math.min(y, vh * 1.2);
    const k = y / vh;
    innerRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
    innerRef.current.style.opacity = Math.max(0, Math.min(1, 1 - (k - 0.45) / 0.6)).toFixed(3);
  });

  /** Easter egg: click the name and the letters fly apart, then spring back. */
  const explodeName = (e) => {
    const letters = e.currentTarget.querySelectorAll('.ch');
    find('name');
    burst(e.clientX, e.clientY, 24);
    letters.forEach((el) => {
      const dx = (Math.random() - 0.5) * 360;
      const dy = (Math.random() - 0.5) * 260 - 60;
      const rot = (Math.random() - 0.5) * 220;
      el.style.transition = 'transform .45s cubic-bezier(.2,.8,.2,1)';
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
    });
    setTimeout(() => {
      letters.forEach((el, i) => {
        el.style.transition = `transform .9s ${i * 0.03}s cubic-bezier(.3,1.6,.5,1)`;
        el.style.transform = '';
      });
      // hand control back to the CSS hover effect afterwards
      setTimeout(() => letters.forEach((el) => (el.style.transition = '')), 1300);
    }, 650);
  };

  return (
    <header className="hero" id="top" ref={sectionRef}>
      <div className="hero-grid" />
      <div className="hero-spot" />

      <div className="hero-inner" ref={innerRef}>
        <div>
          <div className="hero-status"><i />{hero.status}</div>

          <h1 className="hero-name">
            <span className="row">
              <span className="first-name" onClick={explodeName}>
                {[...hero.firstName].map((ch, i) => (
                  <span className="ch" key={i}>{ch}</span>
                ))}
              </span>
            </span>
            <span className="row">
              <span className="last-name">{hero.lastName.replace(/\.$/, '')}<span className="dot">.</span></span>
            </span>
          </h1>

          <p className="hero-intro">
            <RichText text={hero.intro} />
            <br />
            <span className="role-line">
              {hero.rotatorPrefix} <RoleRotator roles={hero.roles} />
            </span>
          </p>

          <div className="hero-cta">
            <MagneticButton href={links.resume} download="Subhojit_Karmakar_Resume.pdf" primary>
              Download resume <DownloadIcon />
            </MagneticButton>
            <MagneticButton href="#contact">
              Contact me <ArrowRight />
            </MagneticButton>
          </div>

          <div className="hero-highlights">
            {hero.highlights.map((h) => (
              <div key={h.title}>
                <b>{h.title}</b>
                {h.caption}
              </div>
            ))}
          </div>
        </div>

        <CodeCard />
      </div>

      <div className="scroll-hint"><div className="mouse" />scroll</div>
    </header>
  );
}
