---
title: 'JavaScript Module System Explained'
description: 'Understand ES Modules, CommonJS, and dynamic imports to better manage dependencies in JavaScript projects.'
pubDate: 'Nov 22 2022'
---

JavaScript has two module systems: CommonJS (require/module.exports) and ES Modules (import/export). Modern JavaScript projects use ES Modules, but understanding both is important for working with the Node.js ecosystem.

ES Modules are statically analyzable, which enables tree shaking — the elimination of unused code at build time. This is why bundlers can produce smaller output from ES Module codebases than from CommonJS ones.

Dynamic imports — the import() function — return a Promise and allow modules to be loaded on demand. This is the foundation of code splitting: loading JavaScript only when it is needed reduces initial page load and improves performance.
