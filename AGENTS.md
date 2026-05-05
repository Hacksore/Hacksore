# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is **hacksore.com** — a personal portfolio/blog site built with **Astro 5** (SSR mode), **React 19**, **Tailwind CSS v4**, and **Biome** for linting/formatting. Deployed to **Vercel**. Single service, no monorepo.

### Key commands

| Task | Command |
|------|---------|
| Dev server | `pnpm dev` (port 4321) |
| Build | `pnpm build` |
| Lint/check | `pnpm check` |
| Format | `pnpm format` |
| Auto-fix | `pnpm fix` |

### Environment variables

A `.env` file is required at the project root. Copy `.env.example` and fill in values. All env fields defined in `astro.config.ts` are required by Astro's env schema (no `optional` flag):

- `DEVTO_TOKEN` — Dev.to API key (used on homepage to fetch articles; placeholder value is fine for dev, but homepage will show empty articles)
- `R2_BUCKET_NAME`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_PUBLIC_URL` — Cloudflare R2 config (only the `/pics` page uses these; all other pages work with placeholder values)

### Gotchas

- **pnpm build scripts**: `esbuild` and `sharp` require build script execution. The `pnpm.onlyBuiltDependencies` field in `package.json` allows them. Without this, `pnpm install` will warn about ignored build scripts and binaries won't be available.
- **Astro adapter**: The project uses `@astrojs/vercel` adapter. `pnpm dev` works locally without Vercel, but `pnpm build` produces Vercel-specific output in `dist/` and `.vercel/`.
- **No automated test suite**: There are no unit/integration tests in this repo. Validation is done via `pnpm check` (Biome) and manual testing.
