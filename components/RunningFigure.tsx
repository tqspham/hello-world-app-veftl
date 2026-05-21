'use client';

import { useThemeStore } from '@/lib/store';

export function RunningFigure() {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  const strokeColor = isDark ? '#F3F4F6' : '#111827';

  return (
    <div className="flex justify-center items-center my-8">
      <svg
        width="120"
        height="80"
        viewBox="0 0 120 80"
        className="animate-running"
        style={{
          '--stroke-color': strokeColor,
        } as React.CSSProperties}
      >
        {/* Head */}
        <circle cx="30" cy="15" r="6" fill="none" stroke={strokeColor} strokeWidth="1.5" />

        {/* Torso */}
        <line x1="30" y1="21" x2="30" y2="35" stroke={strokeColor} strokeWidth="1.5" />

        {/* Left arm (forward swing) */}
        <line x1="30" y1="24" x2="20" y2="32" stroke={strokeColor} strokeWidth="1.5" />

        {/* Right arm (back swing) */}
        <line x1="30" y1="24" x2="40" y2="16" stroke={strokeColor} strokeWidth="1.5" />

        {/* Left leg (forward) */}
        <line x1="30" y1="35" x2="24" y2="50" stroke={strokeColor} strokeWidth="1.5" />

        {/* Right leg (back) */}
        <line x1="30" y1="35" x2="36" y2="48" stroke={strokeColor} strokeWidth="1.5" />
      </svg>

      <style jsx>{`
        @keyframes running {
          0% {
            transform: translateX(-60px);
          }
          50% {
            transform: translateX(60px);
          }
          100% {
            transform: translateX(-60px);
          }
        }

        .animate-running {
          animation: running 2s ease-in-out infinite;
          transition: stroke 0.3s duration-300;
        }
      `}</style>
    </div>
  );
}
