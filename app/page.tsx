import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hello, World!',
  description: 'A simple hello world page',
};

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-black">Hello, World!</h1>
    </main>
  );
}
