---
title: 'React Component Composition Patterns'
description: 'Explore powerful React component patterns including compound components, render props, and higher-order components.'
pubDate: 'Nov 19 2021'
---

Component composition is one of the most powerful patterns in React. Rather than building monolithic components with many props, you compose small, focused components that each do one thing well.

The compound component pattern uses React context to share state between a parent and its designated children, providing a flexible API that feels natural to use. The Tabs, Tab, and TabPanel pattern from libraries like Reach UI is a classic example.

The children prop is underused by many developers. Passing JSX as children instead of configuration props keeps components flexible and allows users of your component to compose their own markup inside it. This is especially powerful when combined with named slots via multiple props.
