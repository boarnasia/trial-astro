---
title: 'CSS Nesting: The Future of Stylesheets'
description: 'Explore the CSS nesting specification to write more concise, component-scoped styles without a preprocessor.'
pubDate: 'Mar 30 2022'
---

CSS nesting, now available natively in all modern browsers, brings one of the most beloved preprocessor features into plain CSS. Nested rules are scoped to the parent selector, eliminating repetition and keeping related styles together.

The ampersand selector — & — references the parent in nested rules, enabling patterns like &:hover, &.is-active, and &::before. This is nearly identical to Sass nesting and allows migrating preprocessor stylesheets to plain CSS with minimal changes.

Deep nesting is as problematic in native CSS as it was in Sass — it creates high specificity and makes styles hard to override. The recommended depth is two to three levels maximum. Nesting is for grouping related styles, not for mirroring HTML structure.
