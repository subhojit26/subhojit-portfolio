/** Renders a string where **double stars** become <b>bold</b>. Used for data in profile.js. */
export default function RichText({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <b key={i}>{part.slice(2, -2)}</b> : part
  );
}
