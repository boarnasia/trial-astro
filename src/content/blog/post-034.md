---
title: 'Building Accessible Forms'
description: 'Build accessible HTML forms with proper labels, error handling, and ARIA attributes for screen readers.'
pubDate: 'Oct 05 2022'
---

Accessible forms are critical because forms are where users take action — searching, checking out, logging in. A form that is inaccessible blocks those users completely.

Every input must have an associated label. The for attribute connects a label to an input by matching the input's id. Alternatively, wrapping an input in its label creates the same association without IDs. Placeholder text is not a substitute for a label — it disappears as soon as the user starts typing.

Error messages must be programmatically associated with their inputs using aria-describedby. Error states should be communicated visually and through ARIA — never by color alone. aria-invalid='true' tells screen readers the field has an error.
