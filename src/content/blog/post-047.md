---
title: 'Semantic HTML: Why It Matters'
description: 'Why semantic HTML improves accessibility, SEO, and code maintainability — with before-and-after examples.'
pubDate: 'Nov 03 2023'
---

The HTML element you choose for each piece of content communicates its meaning and role to browsers, search engines, and assistive technologies. This communication is the foundation of web accessibility.

Heading elements — h1 through h6 — define the document outline. Screen reader users navigate by headings, so a logical heading hierarchy is essential. The most common mistake is choosing heading levels for their visual size rather than their semantic meaning.

Interactive elements must be the right type. A div with a click handler is not a button — it lacks keyboard focus, keyboard activation, and the button role that assistive technologies expect. Using the button element gives you all of this for free.
