'use client';

import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/lib/store';
import { motion } from 'framer-motion';

export function Navigation() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const isDark = theme === 'dark';

  return (
    <nav className="bg-(--color-primary) text-(--color-background) transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="text-lg font-semibold">Hello, World!</div>
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
    </nav>
  );
}
