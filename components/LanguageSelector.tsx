'use client';

import { useRef, useState, useEffect } from 'react';
import { useThemeStore } from '@/lib/store';
import { LANGUAGES, type LanguageCode, getTranslation } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';

export function LanguageSelector() {
  const language = useThemeStore((state) => state.language);
  const setLanguage = useThemeStore((state) => state.setLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLanguageSelect = (lang: LanguageCode) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const languageOptions = Object.entries(LANGUAGES) as Array<[LanguageCode, string]>;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-(--color-surface) text-(--color-primary) transition-colors duration-300 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-2 dark:focus:ring-offset-(--color-primary) font-mono text-sm font-semibold"
        aria-label={getTranslation(language, 'switchLanguage')}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {language}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 bg-(--color-background) border border-(--color-border) rounded-lg shadow-lg z-50 min-w-max overflow-hidden"
            role="listbox"
          >
            {languageOptions.map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleLanguageSelect(code)}
                className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  language === code
                    ? 'bg-(--color-accent) text-(--color-background)'
                    : 'text-(--color-text) hover:bg-(--color-surface)'
                }`}
                role="option"
                aria-selected={language === code}
              >
                {code} – {name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
