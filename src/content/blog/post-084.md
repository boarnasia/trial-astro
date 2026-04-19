---
title: 'Building with the Web Fetch API'
description: "Use the browser's native Fetch API for network requests, including streaming, caching, and error handling."
pubDate: 'Jul 21 2022'
---

The Fetch API is the modern, Promise-based replacement for XMLHttpRequest. It is built into all modern browsers and provides a clean, flexible interface for making HTTP requests.

The Request and Response objects represent fetch transactions as first-class values that can be inspected, modified, and passed around. Service workers intercept fetch events, receiving the Request and returning a Response — this is what makes offline caching possible.

AbortController allows you to cancel in-flight requests, which is essential for cleanup in React useEffect hooks and for implementing request timeouts. Attaching a signal to a fetch request and calling abort() on the controller cancels the request immediately.
