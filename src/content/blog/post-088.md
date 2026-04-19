---
title: 'JavaScript Proxy and Reflect'
description: "Understand JavaScript's Proxy and Reflect APIs for building reactive systems and powerful abstractions."
pubDate: 'Nov 16 2022'
---

The Proxy object wraps another object and intercepts its fundamental operations — property access, assignment, function invocation, and more. This makes it possible to build reactive systems, validation layers, and powerful abstractions.

The simplest useful Proxy adds logging to every property access, which is helpful for debugging. More advanced uses include creating reactive state by notifying subscribers when properties change — this is the mechanism behind Vue 3's reactivity system.

The Reflect API provides default implementations of all the operations that Proxy can intercept. When writing Proxy traps, using Reflect to forward operations to the target object ensures correct semantics. Reflect.get(target, property, receiver) handles the prototype chain correctly, which a simple target[property] access might not.
