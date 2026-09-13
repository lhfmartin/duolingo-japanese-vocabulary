import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";

export default function SearchInput({
  query,
  setQuery,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFindKeyboardShortcutTriggerTime: RefObject<number | null> = useRef(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        if (
          previousFindKeyboardShortcutTriggerTime.current == null ||
          Date.now() - previousFindKeyboardShortcutTriggerTime.current > 1000 ||
          inputRef.current !== document.activeElement
        ) {
          e.preventDefault();
          inputRef.current?.focus();
          previousFindKeyboardShortcutTriggerTime.current = Date.now();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <input
      ref={inputRef}
      type="search"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      placeholder="Search by kana, kanji, romaji, or meaning"
      aria-label="Search"
      className="w-lg max-w-full rounded-full border border-zinc-300 px-4 py-2 text-sm placeholder-zinc-400 focus:outline-none dark:border-zinc-700"
      suppressHydrationWarning // Playwright changes the caret color to transparent, see https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1
    />
  );
}
