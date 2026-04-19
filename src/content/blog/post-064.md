---
title: 'CSS Cascade Layers'
description: 'Learn CSS Cascade Layers to gain explicit control over the order of specificity in your stylesheets.'
pubDate: 'Apr 18 2025'
---

CSS Cascade Layers give you explicit control over the order in which style blocks are applied, regardless of specificity. Styles in a higher-priority layer always win over styles in lower-priority layers, even if the lower-priority styles have higher specificity.

Layers are declared with @layer and arranged in order of priority. A common pattern is three layers: base for resets and defaults, components for UI component styles, and utilities for high-priority overrides. This replaces the specificity hacks that used to be necessary for overriding third-party styles.

Importing third-party CSS into a layer prevents it from fighting your own styles. Wrapping normalize.css or a UI library in a low-priority layer means your styles always win without needing !important.
