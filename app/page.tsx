import { loadVocabulary } from "@/lib/load-vocabulary";
import { VocabularyTable } from "@/app/components/VocabularyTable";

export default async function Home() {
  const vocabulary = await loadVocabulary();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-12 px-4 py-12">
      <header>
        <h1 className="text-3xl font-bold">Duolingo Japanese Vocabulary</h1>
      </header>
      {vocabulary.map((entry, index) => (
        <VocabularyTable
          key={`${entry.title}-${index}`}
          title={entry.title}
          words={entry.words}
        />
      ))}
    </main>
  );
}
