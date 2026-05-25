'use client';

import { Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { useThemeStore } from '@/lib/store';
import { LanguageSelector } from './LanguageSelector';
import { getTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';

export function Navigation() {
  const theme = useThemeStore((state) => state.theme);
  const language = useThemeStore((state) => state.language);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isDark = theme === 'dark';

  return (
    <nav className="bg-(--color-primary) text-(--color-primary) transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-(--color-background) hover:opacity-80 transition-opacity duration-300">
          Hello, World!
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/contact"
            className="text-sm font-medium text-(--color-accent) hover:opacity-80 transition-opacity duration-300"
          >
            {getTranslation(language, 'contactNav')}
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-(--color-surface) text-(--color-primary) transition-colors duration-300 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-2 dark:focus:ring-offset-(--color-primary)"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}
