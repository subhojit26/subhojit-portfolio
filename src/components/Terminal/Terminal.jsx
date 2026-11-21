import { useEffect, useRef, useState } from 'react';
import { links } from '../../data/profile';
import { bootMessage, chips, fallback, intents, jokes, responses } from '../../data/terminal';
import { emit } from '../../lib/fx';
import { EGGS, find, foundCount, isFound } from '../../lib/eggs';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import './Terminal.css';

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * "Ask me anything" terminal in the bottom-right corner.
 * Answers come from data/terminal.js. Lines are kept in state; each output line
 * types itself out via <TypedLine />.
 *
 * Props:
 *  open / onOpen / onClose: controlled by App so other buttons can open it
 *  onToggleTheme          : the `theme` command flips the lights
 */
export default function Terminal({ open, onOpen, onClose, onToggleTheme }) {
  const [lines, setLines] = useState([]); // { id, kind: 'cmd' | 'out', html }
  const [busy, setBusy] = useState(false);
  const [value, setValue] = useState('');
  const history = useRef({ list: [], i: 0 });
  const booted = useRef(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const nextId = useRef(0);

  const push = (kind, html) => setLines((ls) => [...ls, { id: nextId.current++, kind, html }]);

  // boot message + focus when opened
  useEffect(() => {
    if (!open) return;
    find('terminal');
    const t = setTimeout(() => inputRef.current?.focus(), 200);
    if (!booted.current) {
      booted.current = true;
      push('out', bootMessage);
    }
    return () => clearTimeout(t);
  }, [open]);

  // keyboard shortcut: ` opens the terminal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`' && !open && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpen]);

  const scrollToBottom = () => {
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  };

  async function run(raw) {
    const cmd = raw.trim();
    if (!cmd || busy) return;
    const h = history.current;
    h.list.push(cmd);
    h.i = h.list.length;

    push('cmd', escapeHtml(cmd));
    const q = cmd.toLowerCase();
    const key = intents.find(([re]) => re.test(q))?.[1];

    switch (key) {
      case 'clear':
        setLines([]);
        return;
      case 'exit':
        push('out', 'bye 👋');
        await sleep(500);
        onClose();
        return;
      case 'theme': {
        const t = onToggleTheme();
        push('out', `💡 lights ${t === 'light' ? 'on' : 'off'}, switched to <b>${t}</b> mode.`);
        return;
      }
      case 'joke':
        push('out', `😄 ${jokes[(Math.random() * jokes.length) | 0]}`);
        return;
      case 'party':
        push('out', responses.party);
        emit('confetti', { big: true });
        return;
      case 'matrix':
        push('out', responses.matrix);
        await sleep(700);
        emit('matrix');
        find('matrix');
        return;
      case 'eggs': {
        const list = EGGS.map((e) => (isFound(e.id) ? `  🥚 <b>${e.name}</b>` : `  ·  ??? <span class="k">hint:</span> ${e.hint}`)).join('\n');
        push('out', `Easter eggs found: <b>${foundCount()}/${EGGS.length}</b>\n${list}`);
        return;
      }
      case 'resume': {
        push('out', `📄 <a href="${links.resume}" download>Subhojit_Karmakar_Resume.pdf</a> (downloading…)`);
        const a = document.createElement('a');
        a.href = links.resume;
        a.download = 'Subhojit_Karmakar_Resume.pdf';
        a.click();
        return;
      }
      case 'github':
      case 'linkedin': {
        const url = links[key];
        push('out', `opening <a href="${url}" target="_blank" rel="noopener">${url.replace('https://www.', '').replace('https://', '')}</a> …`);
        window.open(url, '_blank', 'noopener');
        return;
      }
      default:
        push('out', responses[key] ?? fallback(escapeHtml(cmd)));
    }
  }

  const onKeyDown = (e) => {
    const h = history.current;
    if (e.key === 'Enter') {
      run(value);
      setValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (h.i > 0) setValue(h.list[--h.i]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (h.i < h.list.length - 1) setValue(h.list[++h.i]);
      else { h.i = h.list.length; setValue(''); }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <>
      <button className={`term-launch ${open ? 'hide' : ''}`} onClick={onOpen}>
        <span className="pr">&gt;_</span> ask me anything
      </button>

      <div className={`term ${open ? 'open' : ''}`} role="dialog" aria-label="Interactive terminal" aria-hidden={!open}>
        <div className="term-bar">
          <button aria-label="Close" onClick={onClose} />
          <button aria-label="Clear" onClick={() => setLines([])} />
          <button aria-label="Maximize" tabIndex={-1} />
          <span>guest@subhojit: ~</span>
        </div>

        <div className="term-body" ref={bodyRef}>
          {lines.map((l) =>
            l.kind === 'cmd' ? (
              <div key={l.id} className="term-line cmd">
                <em>guest@subhojit</em>:~$ <span dangerouslySetInnerHTML={{ __html: l.html }} />
              </div>
            ) : (
              <TypedLine key={l.id} html={l.html} onProgress={scrollToBottom} onTypingChange={setBusy} />
            )
          )}
        </div>

        <div className="term-chips">
          {chips.map((c) => (
            <button key={c} onClick={() => { run(c); inputRef.current?.focus(); }}>{c}</button>
          ))}
        </div>

        <div className="term-input">
          <span>❯</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck="false"
            placeholder="type 'help' or ask a question…"
          />
        </div>
      </div>
    </>
  );
}

/** Output line that types out its HTML a few characters at a time (tags are inserted whole). */
function TypedLine({ html, onProgress, onTypingChange }) {
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const el = ref.current;
    if (prefersReducedMotion) {
      el.innerHTML = html;
      onProgress();
      return;
    }
    onTypingChange(true);
    (async () => {
      const tokens = html.match(/<[^>]+>|&[a-z]+;|[\s\S]/g) || [];
      let out = '';
      for (let i = 0; i < tokens.length; i++) {
        if (cancelled) return;
        out += tokens[i];
        if (tokens[i].length === 1 && i % 3 === 0) {
          el.innerHTML = out;
          onProgress();
          await sleep(4);
        }
      }
      el.innerHTML = out;
      onProgress();
      onTypingChange(false);
    })();
    return () => {
      cancelled = true;
      el.innerHTML = html;
      onTypingChange(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html]);

  return <div className="term-line out" ref={ref} />;
}
