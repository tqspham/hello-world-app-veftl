'use client';

import { useThemeStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function Home() {
  const language = useThemeStore((state) => state.language);

  const heading = getTranslation(language, 'pageHeading');
  const description = getTranslation(language, 'pageDescription');

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-73px)] bg-(--color-background) text-(--color-text)">
      <div className="text-center max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">{heading}</h1>
        <p className="text-(--color-muted-text) mt-4 text-lg">{description}</p>
      </div>
    </main>
  );
}
