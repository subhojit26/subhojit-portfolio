/** True when the visitor asked their OS for less motion. Checked once at load. */
export const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
