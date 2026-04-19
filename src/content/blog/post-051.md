---
title: 'CSS Subgrid: The Missing Piece'
description: 'Discover how CSS Subgrid allows nested elements to align to the parent grid for complex layouts.'
pubDate: 'Mar 14 2024'
---

CSS Subgrid allows a grid item to participate in its parent grid's tracks rather than creating an independent nested grid. This enables perfect alignment across component boundaries that was previously impossible without JavaScript.

The classic problem is a card grid where each card has a header, body, and footer. Without Subgrid, you cannot align headers across cards in different columns without JavaScript height synchronization. With Subgrid, each card uses grid-template-rows: subgrid to inherit the parent's row tracks, and alignment becomes automatic.

Subgrid works on both rows and columns independently. You can subgrid only rows while defining your own column tracks, or vice versa. Browser support is now excellent across all major browsers.
