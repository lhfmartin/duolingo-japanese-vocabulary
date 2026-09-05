"use client";

import {
  columnFilteringFeature,
  columnSizingFeature,
  createColumnHelper,
  createFilteredRowModel,
  globalFilteringFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import type { Word } from "@/types/word";

const features = tableFeatures({
  columnSizingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
});
const helper = createColumnHelper<typeof features, Word>();

interface VocabularyTableProps {
  title: string;
  words: Word[];
  query: string;
}

const partOfSpeechColors: Record<string, string> = {
  "Noun (n.)": "#fee2e2",
  Expression: "#fef3c7",
  Conjunction: "#dcfce7",
  "I-Adjective": "#cffafe",
  Suffix: "#fce7f3",
  Pronoun: "#ede9fe",
  Particle: "#f3e8ff",
  Other: "#f1f5f9",
  "Na-adjective": "#e0e7ff",
  "Godan Verb": "#fef9c3",
  Adverb: "#e0f2fe",
  Counter: "#ffedd5",
  "Ichidan Verb": "#ffe4e6",
  "Irregular Verb": "#fae8ff",
  Prefix: "#e2e8f0",
};

function renderPos(value: string) {
  const badgeColor = partOfSpeechColors[value];
  return (
    <span
      className={badgeColor ? "inline-flex rounded px-2 py-0.5 dark:text-black" : undefined}
      style={badgeColor ? { backgroundColor: badgeColor } : undefined}
    >
      {value}
    </span>
  );
}

export function VocabularyTable({ words, title, query }: VocabularyTableProps) {
  const columns = helper.columns([
    helper.accessor("Kana", { header: "Kana", size: 200 }),
    helper.accessor("Kanji", { header: "Kanji", size: 220 }),
    helper.accessor("Romaji", { header: "Romaji", size: 220 }),
    helper.accessor("Meaning", { header: "Meaning", size: 220 }),
    helper.accessor("Notes", { header: "Notes", size: 180, enableGlobalFilter: false }),
    helper.accessor("Part Of Speech", {
      header: "Part Of Speech",
      cell: (info) => renderPos(info.getValue() ?? ""),
      size: 140,
      enableGlobalFilter: false,
    }),
  ]);

  const table = useTable({
    features,
    columns,
    data: words,
    state: { globalFilter: query.toLowerCase().trim() },
  });

  const rows = table.getRowModel().rows;
  if (rows.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="overflow-x-auto rounded-lg border border-zinc-200">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-transparent">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b border-zinc-200 px-3 py-2 font-semibold [&:not(:first-child)]:border-l"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              const isLastRow = rowIndex === rows.length - 1;
              return (
                <tr key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <td // oxlint-disable-line control-has-associated-label
                      key={cell.id}
                      className={`px-3 py-2 align-top whitespace-pre-wrap [&:not(:first-child)]:border-l ${
                        isLastRow ? "" : "border-b"
                      } border-zinc-200`}
                      style={{ width: cell.column.getSize() }}
                    >
                      <table.FlexRender cell={cell} />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
