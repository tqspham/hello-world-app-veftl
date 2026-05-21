import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navigation } from '@/components/Navigation';
import { DEFAULT_LANGUAGE, getTranslation } from '@/lib/i18n';

export const metadata: Metadata = {
  title: getTranslation(DEFAULT_LANGUAGE, 'appTitle'),
  description: getTranslation(DEFAULT_LANGUAGE, 'appDescription'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
