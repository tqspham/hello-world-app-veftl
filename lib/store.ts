import { create } from 'zustand';
import type { LanguageCode } from './i18n';
import { DEFAULT_LANGUAGE } from './i18n';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',
  setTheme: (theme: Theme) => {
    set({ theme });
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  },
  toggleTheme: () => {
    const current = get().theme;
    const next = current === 'light' ? 'dark' : 'light';
    get().setTheme(next);
  },
  language: DEFAULT_LANGUAGE,
  setLanguage: (language: LanguageCode) => {
    set({ language });
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  },
}));
