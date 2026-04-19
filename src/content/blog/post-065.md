---
title: 'React Server Components Explained'
description: 'An approachable explanation of React Server Components and how they change the rendering model.'
pubDate: 'May 01 2025'
---

React Server Components allow components to render on the server and stream their output to the client without shipping the component code to the browser. Unlike traditional SSR, the component code itself never reaches the client.

Server Components can access server resources directly — databases, file systems, environment variables — without an API layer. This eliminates entire categories of data-fetching code and reduces the complexity of full-stack React applications.

The mental model shift is significant: the component tree is now split between server and client, with server components as the default and client components opt-in via the 'use client' directive. Interactivity, browser APIs, and event handlers require client components.
