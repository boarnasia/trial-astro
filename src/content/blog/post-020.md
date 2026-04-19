---
title: 'CSS Animation and Transitions'
description: 'Create smooth, performant animations using CSS transitions, keyframes, and the animation shorthand property.'
pubDate: 'Aug 22 2021'
---

CSS animations let you create visual feedback and delight without JavaScript. Transitions handle simple property changes triggered by state changes — hover, focus, or class additions — while keyframe animations play automatically and can loop indefinitely.

The most important performance rule for animations is to only animate transform and opacity. These properties are handled by the compositor thread and do not trigger layout or paint. Animating properties like width, height, or left forces the browser to recalculate layout every frame, causing jank.

The animation-timing-function property controls the pacing of an animation. The cubic-bezier() function lets you define custom easing curves. Tools like easings.net provide a visual editor for creating the perfect feel for your transitions.
