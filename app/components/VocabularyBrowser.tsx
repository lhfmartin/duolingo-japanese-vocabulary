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
  const [shouldMatchEntireCell, setShouldMatchEntireCell] = useState(false);
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <div className="sticky top-0 z-10 bg-background py-6 flex flex-wrap items-center gap-y-6 mb-0">
        <SearchInput
          query={query}
          setQuery={setQuery}
          shouldMatchEntireCell={shouldMatchEntireCell}
          setShouldMatchEntireCell={setShouldMatchEntireCell}
        />
      </div>
      {units.map((entry) => (
        <VocabularyTable
          key={entry.title}
          title={entry.title}
          words={entry.words}
          query={deferredQuery}
          shouldMatchEntireCell={shouldMatchEntireCell}
        />
      ))}
    </>
  );
}
