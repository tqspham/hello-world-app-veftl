import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hello, World! - Theme Toggle',
  description: 'A clean, minimalist app with smooth light and dark theme switching',
};

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-73px)] bg-(--color-background) text-(--color-text)">
      <div className="text-center max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">Hello, World!</h1>
        <p className="text-(--color-muted-text) mt-4 text-lg">Toggle the theme in the navigation bar to switch between light and dark modes. Your preference persists across page reloads.</p>
      </div>
    </main>
  );
}
