import { useMemo, useRef } from 'react';
import { useScrollFrame } from '../../hooks/useScrollFrame';

/**
 * Paragraph whose words light up one by one as you scroll through it.
 * Words prefixed with ~ in the source text get the italic accent style.
 * Only the words whose state changed are touched each frame.
 */
export default function ScrollLitText({ text }) {
  const ref = useRef(null);
  const lit = useRef(-1);

  const words = useMemo(
    () => text.split(/\s+/).map((w) => (w.startsWith('~') ? { w: w.slice(1), hl: true } : { w, hl: false })),
    [text]
  );

  useScrollFrame((_, vh) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (lit.current >= 0 && (r.top > vh || r.bottom < 0)) return; // off screen: nothing to do
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
    const n = Math.round(p * words.length);
    if (n === lit.current) return;
    const spans = el.children;
    const from = Math.min(n, Math.max(lit.current, 0));
    const to = Math.max(n, lit.current);
    for (let i = from; i < to; i++) spans[i].classList.toggle('lit', i < n);
    lit.current = n;
  });

  return (
    <p className="lit-text" ref={ref}>
      {words.map(({ w, hl }, i) => (
        <span key={i} className={hl ? 'w hl' : 'w'}>
          {w}{' '}
        </span>
      ))}
    </p>
  );
}
