'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store';
import type { LanguageCode } from '@/lib/i18n';
import { DEFAULT_LANGUAGE } from '@/lib/i18n';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setTheme = useThemeStore((state) => state.setTheme);
  const setLanguage = useThemeStore((state) => state.setLanguage);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(theme);

    const savedLanguage = localStorage.getItem('language') as LanguageCode | null;
    const language = savedLanguage || DEFAULT_LANGUAGE;
    setLanguage(language);
  }, [setTheme, setLanguage]);

  return <>{children}</>;
}
