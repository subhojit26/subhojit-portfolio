import { useInView } from '../../hooks/useInView';

/**
 * Fades + slides its content up the first time it scrolls into view.
 * <Reveal as="h2" delay={0.1} className="...">…</Reveal>
 * Children can also be a function: {(inView) => …}: handy to start a counter on reveal.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'in' : ''} ${className}`.trim()}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
      {...rest}
    >
      {typeof children === 'function' ? children(inView) : children}
    </Tag>
  );
}
