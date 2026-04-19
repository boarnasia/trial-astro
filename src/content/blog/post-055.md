---
title: 'Managing Environment Variables in Astro'
description: 'Manage environment variables in Astro projects securely, including the difference between public and private variables.'
pubDate: 'Jul 11 2024'
---

Astro uses environment variables for configuration that differs between environments — development, staging, and production. Unlike many frameworks, Astro makes a clear distinction between variables available on the server and those exposed to the client.

Variables prefixed with PUBLIC_ are bundled into the client-side JavaScript and exposed in the browser. All other variables are only available in server-side code — .astro files, API endpoints, and middleware. This prevents accidentally leaking secret keys to the client.

The import.meta.env object provides typed access to environment variables. Defining your variables in the Astro env schema gives you type inference and validation, catching missing or incorrectly typed variables at build time.
