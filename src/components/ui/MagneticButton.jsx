import { useMagnetic } from '../../hooks/usePointerEffects';

/**
 * Pill button/link that gets pulled toward the cursor.
 * Renders an <a> when `href` is given, otherwise a <button>.
 */
export default function MagneticButton({ href, primary = false, external = false, children, className = '', ...rest }) {
  const ref = useMagnetic();
  const cls = `btn ${primary ? 'primary' : ''} ${className}`.trim();

  if (href) {
    const ext = external ? { target: '_blank', rel: 'noopener' } : {};
    return (
      <a ref={ref} href={href} className={cls} {...ext} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
