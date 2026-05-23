# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Astro 6 + React 19, SCSS (BEM + FLOCSS), Radix UI for headless primitives, MDX for content collections, Storybook + Vitest for component dev/testing. TypeScript strict mode. Path alias `@/*` → `src/*`.

## Critical: dev servers are human-managed

Do **not** run `bun run dev`, `bun run storybook`, `astro dev`, or `storybook dev` — humans start and stop these. If you need to verify a change, run `bun run build` (or use `/check-build`) instead, and ask the user to check the running server.

## Repository docs

Treat the following as the source of truth — don't restate their contents here, follow them:

- @docs/ai-guidelines.md — minimal rules for agents (stack, styling, change-size preference)
- @docs/onboarding.md — workflow, human/AI role split, dev URLs
- @docs/feontend-design.md — component / styling design rules (note: filename is `feontend-design.md`, not `frontend-`)

## Conventions

- **Content**: blog posts live in `src/content/blog/`; the content schema is in `src/content.config.ts`.
- **Custom scripts**: `bun run generate:posts` runs `scripts/generate-posts.mjs` to create blog posts programmatically.
- **Tasks**: ongoing work context lives under `tasks/<date>-<nn>/` (used by the `/task-run` skill). Read the relevant `order.md` before changing files touched by an active task.
- **Components**: colocate `.tsx` / `.astro` with `.stories.tsx` and `.scss` siblings; no per-component subdirectory required.

## Change-size preference

Prefer small, reviewable changes over sweeping refactors. When a request implies a large rewrite, propose a split into smaller steps first.
