---
title: 'React Performance Optimization Tips'
description: 'Identify and fix React performance issues using the Profiler, memo, useMemo, and useCallback.'
pubDate: 'Sep 17 2022'
---

React's reconciler is highly optimized, but there are cases where components re-render unnecessarily. Identifying and fixing these cases requires understanding when renders are triggered and which tool to use.

React.memo wraps a component and skips re-rendering if its props have not changed. It is a low-level optimization and should only be applied after profiling reveals an actual problem — premature memoization adds complexity without guaranteed benefit.

useMemo and useCallback memoize values and functions between renders. They are most valuable when passing objects or functions as props to memoized components, since new references cause memo to re-render anyway. Keep in mind that memoization itself has a cost.
