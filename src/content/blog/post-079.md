---
title: 'React Error Boundaries'
description: 'Use React Error Boundaries to gracefully catch JavaScript errors in your component tree.'
pubDate: 'Feb 11 2022'
---

React Error Boundaries catch JavaScript errors during rendering, in lifecycle methods, and in constructors of child components. They prevent a component error from crashing the entire application.

Error boundaries are class components that implement static getDerivedStateFromError() to update state when an error is caught, and componentDidCatch() to log error details. Functional component equivalents are not yet available, so this remains one of the few cases where class components are still useful.

Strategic placement of error boundaries limits the impact of errors. Wrapping individual page sections means a chart component crashing does not take down the navigation. Logging errors to a monitoring service in componentDidCatch provides visibility into production errors.
