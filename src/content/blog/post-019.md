---
title: 'Understanding Browser Rendering'
description: 'Understand how browsers parse HTML, build the DOM, apply styles, and paint pixels to the screen.'
pubDate: 'Jul 31 2021'
---

When a browser receives an HTML document, it immediately begins parsing and building the DOM. Simultaneously, it fetches and processes CSS to build the CSSOM. Only when both are ready can it create the render tree and calculate layout.

This explains why render-blocking resources matter so much. A stylesheet in the head blocks rendering until it is downloaded and parsed. JavaScript in the head blocks both parsing and rendering unless marked async or defer.

The paint process is more complex than most developers realize. Browsers create compositing layers for elements with certain CSS properties — transform, opacity, will-change — and render them independently using the GPU. Understanding this helps you write animations that stay on the compositor thread and never drop frames.
