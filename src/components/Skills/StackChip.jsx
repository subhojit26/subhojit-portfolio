import { useState } from 'react';

/**
 * A tech name as a compact chip. Hover, focus or tap shows a tooltip with
 * where I used it and a one-line story. The tooltip flips left near the right edge.
 */
export default function StackChip({ skill, onSeen }) {
  const [open, setOpen] = useState(false);
  const [flip, setFlip] = useState(false);

  const show = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setFlip(r.left + 280 > window.innerWidth - 16);
    setOpen(true);
    onSeen(skill.name);
  };

  return (
    <button
      type="button"
      className={`chip ${open ? 'open' : ''}`}
      aria-expanded={open}
      onMouseEnter={show}
      onMouseLeave={() => setOpen(false)}
      onFocus={show}
      onBlur={() => setOpen(false)}
      onClick={(e) => (open ? setOpen(false) : show(e))}
    >
      {skill.name}
      <span className={`chip-tip ${flip ? 'flip' : ''}`} role="tooltip">
        <em>{skill.where}</em>
        {skill.story}
      </span>
    </button>
  );
}
