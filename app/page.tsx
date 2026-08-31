import { loadAllUnits } from "@/lib/load-vocabulary-data";
import { VocabularyTable } from "@/app/components/VocabularyTable";

export default async function Home() {
  const units = await loadAllUnits();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-12 px-4 py-12">
      <header>
        <h1 className="text-3xl font-bold">Duolingo Japanese Vocabulary</h1>
      </header>
      {units.map((entry, index) => (
        <VocabularyTable key={`${entry.title}-${index}`} title={entry.title} words={entry.words} />
      ))}
    </main>
  );
}
