import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { useThemeStore } from '@/lib/store';
import { getTranslation, DEFAULT_LANGUAGE } from '@/lib/i18n';

export const metadata: Metadata = {
  title: getTranslation(DEFAULT_LANGUAGE, 'contactTitle'),
  description: getTranslation(DEFAULT_LANGUAGE, 'contactDescription'),
};

export default function ContactPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-73px)] bg-(--color-background) text-(--color-text)">
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{getTranslation(DEFAULT_LANGUAGE, 'contactHeading')}</h1>
          <p className="text-(--color-muted-text) text-lg">{getTranslation(DEFAULT_LANGUAGE, 'contactDescription')}</p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
