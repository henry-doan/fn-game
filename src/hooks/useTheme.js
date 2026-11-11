import { useState, useEffect } from 'react';

const KEY = 'frazil_theme';

const initialTheme = () => {
  // ?theme=dark|light lets an embedding site match its own look
  const param = new URLSearchParams(window.location.search).get('theme');
  if (param === 'dark' || param === 'light') return param;
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // storage unavailable
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useTheme = () => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggle = () => setTheme(current => {
    const next = current === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // storage unavailable
    }
    return next;
  });

  return { theme, toggle };
};
