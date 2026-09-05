"use client";

import { useState } from "react";
import { VocabularyTable } from "@/app/components/VocabularyTable";
import type { Unit } from "@/lib/load-vocabulary-data";
import type { Word } from "@/types/word";

interface VocabularyBrowserProps {
  units: Unit[];
}

export function VocabularyBrowser({ units }: VocabularyBrowserProps) {
  const [query, setQuery] = useState("");

  return (
    <>
      <input
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
          query={query}
        />
      ))}
    </>
  );
}
