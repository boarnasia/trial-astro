---
name: check-build
description: Verify a change compiles and the site builds without spawning the dev server. Use when the user asks you to confirm a change works, or before reporting an edit as complete. Safe to run even when the human's `bun run dev` is already running.
---

# check-build

Dev servers (`bun run dev`, `bun run storybook`) are managed by humans in this repo — do not start them. Use this skill to verify a change instead.

## What to run

```bash
bun run build
```

This runs `astro build`, which type-checks the project and produces a production build to `dist/`. It does not start a long-running server.

## How to report results

- **Build succeeded**: state it in one sentence and stop. Do not paste the full build log.
- **Build failed**: surface the error(s) — file, line, and the message — and propose a fix. Do not retry the build with the same code.
- **Type errors only (no runtime build failure)**: show the type errors and ask whether to fix them before continuing.

## When NOT to use this skill

- For tiny edits to MDX content or markdown — running a full build is overkill; trust the change.
- When the user has already confirmed they're verifying in the browser themselves.
- When the user asks for a Storybook-specific check — use `bun run build-storybook` separately, and warn that it's slow.
