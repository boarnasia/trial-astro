---
title: 'CSS Logical Properties and Values'
description: 'Explore CSS logical properties for writing direction-agnostic styles that work in any writing mode.'
pubDate: 'Mar 16 2022'
---

CSS logical properties replace physical properties like margin-left and padding-top with direction-aware equivalents like margin-inline-start and padding-block-start. They adapt automatically to the document writing mode and text direction.

For most websites serving left-to-right languages, the benefit is mainly about semantics and future-proofing. If you ever need to support right-to-left languages like Arabic or Hebrew, components using logical properties require no changes.

Inline refers to the direction text flows — horizontal in most languages — and block refers to the perpendicular direction. Once you internalize these terms, the property names become intuitive and consistent across the entire logical properties specification.
