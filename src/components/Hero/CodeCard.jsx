import { useEffect, useRef, useState } from 'react';
import { codeTokens, hero } from '../../data/profile';
import { useTilt } from '../../hooks/usePointerEffects';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import './CodeCard.css';

const CLASS = { c: 'tk-c', k: 'tk-k', t: 'tk-t', s: 'tk-s', a: 'tk-a', n: 'tk-n', p: '' };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const wrap = (type, txt) => (CLASS[type] ? `<span class="${CLASS[type]}">${esc(txt)}</span>` : esc(txt));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Editor window in the hero that "types" the Java snippet from profile.js. */
export default function CodeCard() {
  const preRef = useRef(null);
  const [ready, setReady] = useState(false); // tilt starts after the fade-in finishes
  const cardRef = useTilt(10, { enabled: ready });
  const { filename } = hero.codeCard;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await sleep(prefersReducedMotion ? 0 : 900);
      let html = '';
      for (const [type, txt] of codeTokens) {
        let cur = '';
        for (const ch of txt) {
          if (cancelled) return;
          cur += ch;
          preRef.current.innerHTML = `${html}${wrap(type, cur)}<span class="caret"></span>`;
          if (!prefersReducedMotion) await sleep(ch === '\n' ? 60 : 14 + Math.random() * 22);
        }
        html += wrap(type, txt);
      }
      if (!cancelled) preRef.current.innerHTML = `${html}<span class="caret"></span>`;
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className={`code-card ${ready ? 'ready' : ''}`} ref={cardRef} onAnimationEnd={(e) => e.target === e.currentTarget && setReady(true)}>
      <div className="code-bar"><i /><i /><i /><span>{filename}</span></div>
      <pre ref={preRef} />
    </div>
  );
}
