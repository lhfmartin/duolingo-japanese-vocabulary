"use client";

import { useDeferredValue, useState } from "react";
import { VocabularyTable } from "@/app/components/VocabularyTable";
import type { Unit } from "@/lib/load-vocabulary-data";
import SearchInput from "./SearchInput";

interface VocabularyBrowserProps {
  units: Unit[];
}

export function VocabularyBrowser({ units }: VocabularyBrowserProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <SearchInput query={query} setQuery={setQuery} />
      {units.map((entry) => (
        <VocabularyTable
          key={entry.title}
          title={entry.title}
          words={entry.words}
          query={deferredQuery}
        />
      ))}
    </>
  );
}
