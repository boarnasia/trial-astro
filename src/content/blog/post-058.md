---
title: 'TypeScript Mapped Types'
description: 'Understand TypeScript mapped types to transform existing types into new ones with minimal code.'
pubDate: 'Oct 02 2024'
---

TypeScript mapped types transform one type into another by iterating over the keys of an existing type and applying transformations. They are the mechanism behind many of TypeScript's built-in utility types.

The syntax uses the in keyof operator to iterate over type properties. Within the mapped type, you can modify each property's type, add or remove optionality with ? , and add or remove the readonly modifier with readonly or -readonly.

Template literal types and mapped types compose powerfully. You can create a type that prefixes all property names with get, creating a getter interface from a plain data type. This kind of type-level computation eliminates large amounts of boilerplate type definitions.
