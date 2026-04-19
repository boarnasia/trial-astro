---
title: 'Git Hooks with Husky'
description: 'Automate code quality checks before every commit using Git hooks managed by Husky and lint-staged.'
pubDate: 'Mar 07 2025'
---

Git hooks are scripts that run automatically at specific points in the Git workflow. Pre-commit hooks run before a commit is created, making them perfect for running linters and formatters on staged files.

Husky is an npm package that manages Git hooks as part of your project. Hooks are defined in your package.json or a dedicated .husky/ directory, making them part of the repository and applied to all contributors automatically.

lint-staged runs linters only on staged files rather than the entire codebase. This keeps pre-commit hooks fast — running ESLint on 5 changed files takes milliseconds rather than seconds. The combination of Husky and lint-staged is the standard approach for pre-commit quality checks.
