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
import PartOfSpeechBadge from "@/app/components/PartOfSpeechBadge";

const features = tableFeatures({
  columnSizingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
});
const helper = createColumnHelper<typeof features, Word>();

const columns = helper.columns([
  helper.accessor("Kana", { header: "Kana", size: 200 }),
  helper.accessor("Kanji", { header: "Kanji", size: 220 }),
  helper.accessor("Romaji", { header: "Romaji", size: 220 }),
  helper.accessor("Meaning", { header: "Meaning", size: 220 }),
  helper.accessor("Notes", { header: "Notes", size: 180, enableGlobalFilter: false }),
  helper.accessor("Part Of Speech", {
    header: "Part Of Speech",
    cell: (cellData) => PartOfSpeechBadge(cellData.getValue() ?? ""),
    size: 140,
    enableGlobalFilter: false,
  }),
]);

interface VocabularyTableProps {
  title: string;
  words: Word[];
  query: string;
}

export function VocabularyTable({ words, title, query }: VocabularyTableProps) {
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
