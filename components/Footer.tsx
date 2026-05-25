'use client';

import { useThemeStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export function Footer() {
  const language = useThemeStore((state) => state.language);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-(--color-primary) text-(--color-background) transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center gap-4">
        <div className="text-sm text-(--color-background) opacity-80">
          {getTranslation(language, 'appTitle')} © {currentYear}
        </div>
        <p className="text-xs text-(--color-background) opacity-80 text-center max-w-md">
          {getTranslation(language, 'appDescription')}
        </p>
      </div>
    </footer>
  );
}
