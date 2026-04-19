---
title: 'Keyboard Navigation and Focus Management'
description: 'Implement robust keyboard navigation and focus management to make your app usable without a mouse.'
pubDate: 'Jan 10 2021'
---

Keyboard navigation is a baseline accessibility requirement — every feature must be reachable and operable using only a keyboard. Tab moves between interactive elements, Enter activates buttons and links, and Space toggles checkboxes and scrolls pages.

Focus management becomes complex in single-page applications where content changes without a page reload. When a dialog opens, focus must move into it. When it closes, focus must return to the element that opened it. When a route changes, focus must be announced to screen readers.

The focus-visible pseudo-class shows focus rings only for keyboard navigation, not for mouse clicks. This is now available natively in all major browsers and should replace any CSS that removes outline from focused elements.
