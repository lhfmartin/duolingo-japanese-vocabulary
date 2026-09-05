"use client";

import { useEffect, useDeferredValue, useRef, useState } from "react";
import { VocabularyTable } from "@/app/components/VocabularyTable";
import type { Unit } from "@/lib/load-vocabulary-data";

interface VocabularyBrowserProps {
  units: Unit[];
}

export function VocabularyBrowser({ units }: VocabularyBrowserProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by kana, kanji, romaji, or meaning"
        aria-label="Search"
        className="w-lg rounded-full border border-zinc-300 px-4 py-2 text-sm placeholder-zinc-400 focus:outline-none dark:border-zinc-700"
      />
      {units.map((entry, index) => (
        <VocabularyTable
          key={`${entry.title}-${index}`}
          title={entry.title}
          words={entry.words}
          query={deferredQuery}
        />
      ))}
    </>
  );
}
