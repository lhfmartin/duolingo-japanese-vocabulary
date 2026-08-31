import { createReadStream, readdirSync } from "node:fs";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";
import csv from "csv-parser";
import type { Word } from "@/types/word";

export interface VocabularyFile {
  title: string;
  words: Word[];
}

function parseSectionAndUnitFromFileName(filename: string): { section: number; unit: number } {
  const sectionMatch = filename.match(/Section\s+(\d+)/i);
  const section = sectionMatch ? Number(sectionMatch[1]) : Number.MAX_SAFE_INTEGER;
  const unitMatch = filename.match(/\bUnit\s+(\d+)/i);
  const unit = unitMatch ? Number(unitMatch[1]) : Number.MAX_SAFE_INTEGER;
  return { section, unit };
}

function bySectionThenUnit(a: string, b: string): number {
  const ka = parseSectionAndUnitFromFileName(a);
  const kb = parseSectionAndUnitFromFileName(b);
  if (ka.section !== kb.section) return ka.section - kb.section;
  return ka.unit - kb.unit;
}

async function parseCsvFile(filePath: string): Promise<Word[]> {
  const words: Word[] = [];
  const parser = csv({
    mapHeaders: ({ header }) => header.replace(/^\uFEFF/, "").trim(),
  }).on("data", (row: Word) => words.push(row));

  await pipeline(createReadStream(filePath), parser);
  
  return words;
}

export async function loadVocabulary(): Promise<VocabularyFile[]> {
  const dataDir = join(process.cwd(), "data");
  const fileNames = readdirSync(dataDir).filter((f) => f.endsWith(".csv"));
  fileNames.sort(bySectionThenUnit);

  return Promise.all(
    fileNames.map(async (fileName) => ({
      title: fileName.replace(/\.csv$/i, ""),
      words: await parseCsvFile(join(dataDir, fileName)),
    }))
  );
}
