"use client";

import { useDeferredValue, useEffect, useRef, useState } from "react";
import { VocabularyTable } from "@/app/components/VocabularyTable";
import { FloatingActionButton } from "@/app/components/FloatingActionButton";
import { NavigationModal } from "@/app/components/NavigationModal";
import type { Unit } from "@/lib/load-vocabulary-data";
import SearchInput from "./SearchInput";
import { removeWhitespaces } from "@/lib/string-utils";

interface VocabularyBrowserProps {
  units: Unit[];
}

export function VocabularyBrowser({ units }: VocabularyBrowserProps) {
  const [query, setQuery] = useState("");
  const [shouldMatchEntireCell, setShouldMatchEntireCell] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = searchBarRef.current;
    if (!el) return;
    const updateSearchBarHeight = () => {
      document.documentElement.style.setProperty("--search-bar-height", `${el.offsetHeight}px`);
    };
    updateSearchBarHeight();
    const ro = new ResizeObserver(updateSearchBarHeight);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scrollToUnit = (title: string) => {
    const el = document.getElementById(removeWhitespaces(title));
    if (el) {
      el.scrollIntoView();
      setModalOpen(false);
    }
  };

  return (
    <>
      <div
        ref={searchBarRef}
        className="sticky top-0 z-10 bg-background py-6 flex flex-wrap items-center gap-y-6 mb-0"
      >
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
      <NavigationModal
        shouldOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        units={units}
        onSelectUnit={scrollToUnit}
      />
      <FloatingActionButton onClick={() => setModalOpen(true)} />
    </>
  );
}
