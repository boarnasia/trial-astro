---
title: 'Setting Up ESLint and Prettier'
description: 'How to configure ESLint and Prettier together for consistent, high-quality code across your project.'
pubDate: 'Aug 15 2020'
---

ESLint and Prettier serve different purposes: ESLint catches code quality issues and potential bugs, while Prettier handles consistent formatting. Used together, they automate code review for style and catch common mistakes before they reach production.

The key to using them together without conflicts is to disable ESLint's formatting rules using eslint-config-prettier. This package turns off all rules that might conflict with Prettier, so each tool focuses on what it does best.

Integrate both tools into your editor for instant feedback, and add them to a pre-commit hook using Husky and lint-staged so only properly formatted, linted code can be committed. This removes formatting debates from code reviews entirely.
