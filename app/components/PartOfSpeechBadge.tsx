const PART_OF_SPEECH_TO_COLOR: Record<string, string> = {
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

export default function PartOfSpeechBadge(partOfSpeech: string) {
  const badgeColor = PART_OF_SPEECH_TO_COLOR[partOfSpeech];
  return (
    <span
      className={badgeColor ? "inline-flex rounded px-2 py-0.5 dark:text-black" : undefined}
      style={badgeColor ? { backgroundColor: badgeColor } : undefined}
    >
      {partOfSpeech}
    </span>
  );
}
