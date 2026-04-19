---
title: 'Introduction to Web Workers'
description: 'Offload heavy computation to background threads using Web Workers to keep your UI responsive.'
pubDate: 'Sep 26 2023'
---

Web Workers run JavaScript in a background thread, completely separate from the main thread that handles rendering and user interaction. Offloading heavy computation to a worker prevents the UI from freezing during intensive operations.

Communication between the main thread and a worker uses a message-passing API — postMessage sends data and the message event receives it. Structured clone handles the serialization automatically, supporting most JavaScript data types including ArrayBuffers.

SharedArrayBuffer and Atomics enable true shared memory between threads for maximum performance, though they require specific HTTP headers to be enabled due to security restrictions. For most use cases, simple message passing is sufficient.
