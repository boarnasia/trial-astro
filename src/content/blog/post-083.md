---
title: 'TypeScript Conditional Types'
description: 'Master TypeScript conditional types to build flexible, expressive type-level logic in your projects.'
pubDate: 'Jun 24 2022'
---

TypeScript conditional types use the extends keyword in a ternary-like syntax to select between types based on a condition. The pattern T extends U ? X : Y reads as 'if T is assignable to U, use type X, otherwise use type Y'.

The infer keyword, used within conditional types, extracts and names a type from a pattern. ReturnType is implemented using infer: if T extends (...args: any[]) => infer R, the R is the inferred return type. This kind of type deconstruction unlocks powerful type manipulation.

Distributive conditional types automatically distribute over union members. When T is a union type, a conditional type that uses T is applied to each member individually and the results are unioned. This behavior enables powerful transformations like filtering union members.
