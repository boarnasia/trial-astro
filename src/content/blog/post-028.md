---
title: 'Testing React Components with Testing Library'
description: 'Learn how to test React components effectively using React Testing Library and accessibility-first queries.'
pubDate: 'Apr 01 2022'
---

React Testing Library encourages testing your components the way users interact with them, rather than testing implementation details. Its queries prioritize accessible attributes — label text, role, and display text — over class names and test IDs.

The getByRole query is usually the right starting point. It finds elements by their ARIA role, which is determined by the HTML element type and any role attributes. This makes your tests double as accessibility checks.

Avoiding implementation details means not testing state directly or reaching into component internals. Instead, simulate user interactions with userEvent and assert on what the user sees. Tests written this way are more resilient to refactoring and more meaningful as documentation.
