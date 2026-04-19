---
title: 'Astro Islands Architecture'
description: "Understand Astro's Islands Architecture and how it delivers optimal performance through partial hydration."
pubDate: 'Jan 20 2023'
---

Astro's Islands Architecture is a rendering pattern where the page is mostly static HTML, with isolated interactive regions — islands — that hydrate independently. The name comes from the idea of islands of interactivity in a sea of static content.

Each island can use a different JavaScript framework. A page might have a React search widget and a Vue shopping cart, each hydrating independently with their own JavaScript. The rest of the page ships no JavaScript at all.

The client: directives control when an island hydrates. client:load hydrates immediately, client:idle waits until the browser is idle, client:visible waits until the island is scrolled into view, and client:media waits for a media query. This granular control minimizes JavaScript execution.
