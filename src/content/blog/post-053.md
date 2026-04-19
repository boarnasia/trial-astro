---
title: 'Testing Accessibility with Axe'
description: 'Integrate automated accessibility testing into your workflow using the axe-core library and browser extensions.'
pubDate: 'May 30 2024'
---

Axe-core is an open-source accessibility testing engine used in dozens of tools including browser extensions, testing frameworks, and CI pipelines. It runs automated checks against WCAG and best practice rules.

The jest-axe package integrates axe-core with Jest and React Testing Library, letting you add an accessibility assertion to every component test with a single line. This creates a continuous baseline check that prevents regressions.

Automated testing catches roughly 30-40% of accessibility issues — important but not sufficient on its own. Manual testing with keyboard navigation and screen readers, plus user testing with people who have disabilities, is required for comprehensive coverage.
