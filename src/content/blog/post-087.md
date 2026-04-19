---
title: 'CSS :has() Selector'
description: 'The CSS :has() relational pseudo-class unlocks powerful parent-selection patterns that were never before possible.'
pubDate: 'Oct 28 2022'
---

The CSS :has() pseudo-class selects an element based on whether it contains a matching descendant. This has been called a parent selector, though it is more accurately a relational selector that checks context.

:has() enables many previously-impossible CSS patterns. Styling a form label differently when its input is focused: label:has(+ input:focus). Styling a section that contains an image: section:has(img). Applying styles to a list when it has more than three items using :has(:nth-child(4)).

Because :has() can select parents and ancestors — not just descendants — it significantly increases what CSS can express without JavaScript. The performance characteristics are excellent; modern browsers evaluate :has() efficiently.
