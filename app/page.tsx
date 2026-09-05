import { loadAllUnits } from "@/lib/load-vocabulary-data";
import { VocabularyBrowser } from "@/app/components/VocabularyBrowser";

export default async function Home() {
  const units = await loadAllUnits();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-12 px-4 py-12">
      <header className="space-y-6">
        <h1 className="text-3xl font-bold">Duolingo Japanese Vocabulary</h1>
        <VocabularyBrowser units={units} />
      </header>
    </main>
  );
}
