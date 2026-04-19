---
title: 'Introduction to Design Tokens'
description: 'Learn what design tokens are, why they matter, and how to implement them across your design system.'
pubDate: 'Apr 20 2021'
---

Design tokens are the atomic values that define a design system: colors, spacing, typography, shadows, and more. Storing these as tokens rather than hardcoded values makes them portable across platforms and easy to update consistently.

Tokens are typically defined in a format like JSON or YAML and then transformed into platform-specific outputs — CSS custom properties for the web, Swift constants for iOS, XML for Android — using a tool like Style Dictionary.

The two-layer token model is a best practice: primitive tokens hold raw values, and semantic tokens reference primitives with meaningful names. Changing a semantic token from the light theme to the dark theme requires only remapping the semantic layer.
