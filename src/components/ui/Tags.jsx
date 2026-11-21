/** A row of small pill tags (tech stack etc.). */
export default function Tags({ items, className = '' }) {
  return (
    <div className={`tags ${className}`.trim()}>
      {items.map((t) => (
        <span className="tag" key={t}>{t}</span>
      ))}
    </div>
  );
}
