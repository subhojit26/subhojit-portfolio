import { useCallback, useState } from 'react';

const KEY = 'sk-theme';

/** Light/dark theme stored on <html data-theme> and remembered in localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  );

  const toggle = useCallback(() => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode etc.: theme still works for this visit */
    }
    setTheme(next);
    return next;
  }, []);

  return { theme, toggle };
}
