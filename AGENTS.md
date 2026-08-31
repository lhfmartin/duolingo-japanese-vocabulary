<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# duolingo-japanese-vocabulary

Static site that renders Duolingo Japanese vocabulary from CSV files into per-unit tables. Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4.

## Commands

- `pnpm dev` — dev server
- `pnpm build` — static export to `./out` (deployed to GitHub Pages via CI)
- `pnpm lint` / `pnpm lint:fix` — **oxlint** (not eslint/standard)
- `pnpm fmt` / `pnpm fmt:check` — **oxfmt** (not prettier)
- No test framework is configured.

## Package manager

Use `pnpm` (v10.29.3, pinned via `packageManager`). `pnpm-workspace.yaml` only lists ignored build deps (`sharp`, `unrs-resolver`).

## Serving data (read-only)

Vocabulary lives in `data/*.csv` with columns `Kana, Kanji, Meaning, Notes, Part Of Speech, Romaji` — see `types/word.ts`. Files are read at build time by `lib/load-vocabulary.ts`, ordered by parsing `Section N` / `Unit N` from each filename (non-matching files sort last). To add words, add or edit a CSV in `data/` (UTF-8 w/ optional BOM handled via `mapHeaders`); filenames must follow `Section N - Unit N <Title>.csv`. Note: `Extras`/`Extra` title variants sort after main units.

## Deployment / base path

`next.config.ts` uses `output: "export"` and `basePath: "/duolingo-japanese-vocabulary"` (GitHub Pages). All internal links/assets must respect this base path. CI (`.github/workflows/main.yml`) builds then deploys `./out` to GitHub Pages on pushes to `main`.

## Tooling quirks

- Path alias `@/*` -> repo root (`tsconfig.json`).
- lint-staged runs `pnpm lint` on JS/TS and `pnpm fmt` on everything, via husky pre-commit. Keep code oxlint- and oxfmt-clean.

## Data lifecycle

`data/*.csv` are the source of truth; `out/` is generated and gitignored. Rebuild (`pnpm build`) to reflect data changes in the deployed site.
