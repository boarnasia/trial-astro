---
title: 'Using CSS Container Queries'
description: 'Harness CSS container queries to build truly responsive components that adapt to their parent container.'
pubDate: 'Jun 10 2022'
---

Container queries allow components to respond to the size of their containing element rather than the viewport. This is a fundamental shift — components can be truly self-contained and reusable in any layout context.

Before container queries, a card component that needed to change layout at small sizes would use media queries based on viewport width. But the card might appear in a narrow sidebar or a full-width main area, requiring media queries at completely different breakpoints.

With container queries, you first define a containment context on the parent element using container-type: inline-size. Then you write @container rules inside the component that respond to the container's size, not the viewport.
