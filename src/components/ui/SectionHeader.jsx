import Reveal from './Reveal';

/**
 * Small label + big title whose last word is set in the accent colour.
 * <SectionHeader eyebrow="02 / experience" title="Where I've been" accent="shipping." />
 */
export default function SectionHeader({ eyebrow, title, accent }) {
  return (
    <>
      <div className="eyebrow">{eyebrow}</div>
      <Reveal as="h2" className="section-title">
        {title} <span className="serif">{accent}</span>
      </Reveal>
    </>
  );
}
