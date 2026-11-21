import { useState } from 'react';
import { canSendDirectly, sendMessage } from '../../lib/sendMessage';
import { checkLimits, recordSend } from '../../lib/spamGuard';
import { emit } from '../../lib/fx';
import { SendIcon } from '../ui/Icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE = 2000;
const EMPTY = { name: '', email: '', message: '', botcheck: '' };

/**
 * Contact form: name, email, message.
 * Spam protection: honeypot field + per-browser limits (lib/spamGuard), on top of
 * Web3Forms' server-side spam check. Without a Web3Forms key it falls back to mailto.
 */
export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error | blocked
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = 'Please add your name';
    if (!EMAIL_RE.test(form.email.trim())) er.email = 'That email doesn’t look right';
    if (form.message.trim().length < 10) er.message = 'A few more words, please (10+ characters)';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending' || !validate()) return;

    const limit = checkLimits(form.message);
    if (!limit.ok) {
      setErrorMsg(limit.reason);
      setStatus('blocked');
      return;
    }

    setStatus('sending');
    try {
      const result = await sendMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        botcheck: form.botcheck,
      });
      setStatus(result);
      if (result === 'sent') {
        recordSend();
        const r = e.target.getBoundingClientRect();
        emit('confetti', { x: r.left + r.width / 2, y: r.top + r.height / 2 });
        setForm(EMPTY);
      }
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="cform cform-done" role="status">
        <div className="cform-check">✓</div>
        <h3>Message sent</h3>
        <p>Thanks for reaching out. I’ll get back to you at the email you gave, usually within a day or two.</p>
        <button type="button" className="btn" onClick={() => setStatus('idle')}>Send another</button>
      </div>
    );
  }

  const note =
    status === 'error'
      ? `Couldn’t send (${errorMsg}). Try again, or email me directly.`
      : status === 'blocked'
        ? errorMsg
        : status === 'mailto'
          ? 'Your email app should have opened with the message ready to send.'
          : canSendDirectly
            ? 'Goes straight to my inbox. I reply from my personal email.'
            : 'Opens your email app with the message ready to send.';

  return (
    <form className="cform" onSubmit={onSubmit} noValidate>
      <div className="cform-row">
        <label className={errors.name ? 'bad' : ''}>
          <span>Your name</span>
          <input value={form.name} onChange={set('name')} autoComplete="name" maxLength={80} placeholder="Jane Doe" />
          {errors.name && <small>{errors.name}</small>}
        </label>
        <label className={errors.email ? 'bad' : ''}>
          <span>Your email</span>
          <input type="email" value={form.email} onChange={set('email')} autoComplete="email" maxLength={120} placeholder="jane@company.com" />
          {errors.email && <small>{errors.email}</small>}
        </label>
      </div>

      <label className={errors.message ? 'bad' : ''}>
        <span>
          Message <em>{form.message.length}/{MAX_MESSAGE}</em>
        </span>
        <textarea
          value={form.message}
          onChange={set('message')}
          rows={5}
          maxLength={MAX_MESSAGE}
          placeholder="Hi Subhojit, we’re hiring a backend engineer and…"
        />
        {errors.message && <small>{errors.message}</small>}
      </label>

      {/* honeypot: hidden from people, bots fill it in */}
      <input className="cform-hp" tabIndex={-1} autoComplete="off" value={form.botcheck} onChange={set('botcheck')} aria-hidden="true" />

      <div className="cform-foot">
        <p className={`cform-note ${status === 'blocked' || status === 'error' ? 'warn' : ''}`}>{note}</p>
        <button className="btn primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'} <SendIcon />
        </button>
      </div>
    </form>
  );
}
