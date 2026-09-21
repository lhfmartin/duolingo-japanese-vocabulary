"use client";

import { useMemo, useState } from "react";
import type { Unit } from "@/lib/load-vocabulary-data";

interface NavigationModalProps {
  shouldOpen: boolean;
  onClose: () => void;
  units: Unit[];
  onSelectUnit: (title: string) => void;
}

function parseSection(title: string): number {
  const m = title.match(/Section\s+(\d+)/i);
  return m ? parseInt(m[1]) : Number.MAX_SAFE_INTEGER;
}

function getUnitDisplay(title: string): string {
  return title.slice(title.indexOf("-") + 1).trim();
}

export function NavigationModal({
  shouldOpen,
  onClose,
  units,
  onSelectUnit,
}: NavigationModalProps) {
  const sectionAndUnits = useMemo(() => {
    const map = new Map<number, Unit[]>();
    for (const u of units) {
      const s = parseSection(u.title);
      if (!map.has(s)) map.set(s, []);
      map.get(s)!.push(u);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a - b);
  }, [units]);
  const [selectedSection, setSelectedSection] = useState<number>(sectionAndUnits[0][0]);

  const selectedSectionAvailableUnits = useMemo(() => {
    return sectionAndUnits.find(([s]) => s === selectedSection)?.[1] ?? [];
  }, [sectionAndUnits, selectedSection]);

  if (!shouldOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        aria-label="Close modal"
        className="fixed inset-0 bg-black/30"
        onClick={onClose}
      />
      <div
        className="relative z-50 flex h-[50%] w-[360px] flex-col overflow-hidden rounded-2xl bg-background shadow-2xl dark:border dark:border-pink-200"
        data-testid="modal"
      >
        <div className="flex items-center justify-end px-3 py-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="flex min-h-0">
          <div className="w-28 shrink-0 overflow-y-auto">
            {sectionAndUnits.map(([s]) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSection(s)}
                className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                  selectedSection === s
                    ? "bg-foreground text-background"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-foreground"
                }`}
              >
                Section {s}
              </button>
            ))}
          </div>
          <div className="overflow-y-auto">
            {selectedSectionAvailableUnits.map((u) => (
              <button
                key={u.title}
                type="button"
                onClick={() => onSelectUnit(u.title)}
                className="w-full border-b border-zinc-100 dark:border-zinc-800 last:border-b-0 px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {getUnitDisplay(u.title)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
