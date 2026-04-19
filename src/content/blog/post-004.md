---
title: 'Introduction to React Hooks'
description: 'Explore React Hooks including useState, useEffect, and custom hooks to write cleaner functional components.'
pubDate: 'Apr 10 2020'
---

React Hooks, introduced in version 16.8, let you use state and other React features in functional components without writing a class. The two most commonly used hooks are useState for local state and useEffect for side effects like data fetching.

Custom hooks are the real power of the hooks API — you can extract stateful logic into reusable functions that can be shared across components. A custom useFetch hook, for example, can handle loading states, errors, and caching in one place.

The rules of hooks — only call at the top level, only call from React functions — exist because React relies on the order of hook calls to associate state with each component instance. The ESLint plugin enforces these rules automatically.
