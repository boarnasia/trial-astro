---
title: 'Optimizing React Re-renders'
description: 'Techniques for reducing unnecessary React re-renders using React.memo, context splitting, and state colocation.'
pubDate: 'May 19 2023'
---

Unnecessary React re-renders are a common performance issue, but they are often misdiagnosed. React's reconciler is fast — re-rendering a component is usually not expensive unless that component does significant work or renders many children.

State colocation is the most effective technique: moving state down to the component that needs it prevents it from causing parent re-renders. This restructuring often eliminates the need for memoization entirely.

Context splitting solves a common Context API performance problem: split frequently changing state into separate contexts so components only subscribe to what they use. A context that holds both user data and cart data will cause every consumer to re-render whenever the cart changes, even if it only needs the user data.
