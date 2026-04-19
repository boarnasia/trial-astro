---
title: 'TypeScript Template Literal Types'
description: 'Explore TypeScript template literal types to generate complex union types from string patterns.'
pubDate: 'Mar 25 2023'
---

TypeScript template literal types extend string literal types with the ability to construct new string types from existing ones. They use the same backtick syntax as JavaScript template literals but operate at the type level.

Combining template literal types with mapped types creates powerful patterns. Given a type with properties name and age, you can automatically generate a type with getters getName and getAge by mapping and transforming the key names.

The Uppercase, Lowercase, Capitalize, and Uncapitalize utility types work with template literal types to transform string casing. These are useful for generating consistent naming conventions — transforming camelCase properties to SCREAMING_SNAKE_CASE environment variable names, for example.
