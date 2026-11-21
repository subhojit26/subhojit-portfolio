/**
 * Sends a contact-form message.
 *
 * With VITE_WEB3FORMS_KEY set (free key from https://web3forms.com, tied to your inbox),
 * the message is emailed to you directly from the page — no server needed.
 * Without it, we fall back to opening the visitor's email app with everything pre-filled.
 *
 * Note: a Web3Forms access key is designed to be public (it only allows sending TO your inbox),
 * so it's fine for it to end up in the browser bundle.
 */
import { links } from '../data/profile';

const KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export const canSendDirectly = Boolean(KEY);

/** @returns {Promise<'sent' | 'mailto'>} */
export async function sendMessage({ name, email, message, botcheck }) {
  if (!KEY) {
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
    return 'mailto';
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: KEY,
      subject: `Portfolio message from ${name}`,
      from_name: 'subhojit.dev contact form',
      name,
      email,
      replyto: email,
      message,
      botcheck, // honeypot: must stay empty
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || 'Could not send right now');
  return 'sent';
}
