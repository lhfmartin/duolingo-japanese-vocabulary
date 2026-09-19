"use client";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open modal"
      className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 h-12 w-12 sm:h-14 sm:w-14 rounded-full cursor-pointer"
    >
      <span className="h-full w-full rounded-full bg-zinc-800/40 dark:bg-zinc-50/20 backdrop-blur-xs text-white shadow-lg transition-all hover:bg-gray-800/80 active:scale-95 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <line x1="5.5" y1="8.3" x2="18.5" y2="8.3" strokeLinecap="round" strokeWidth={1.4} />
          <line x1="5.5" y1="15.7" x2="18.5" y2="15.7" strokeLinecap="round" strokeWidth={1.4} />
        </svg>
      </span>
    </button>
  );
}
