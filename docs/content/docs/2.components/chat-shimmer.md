---
title: ChatShimmer
description: Apply a shimmer loading effect to text.
category: chat
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatShimmer.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chat-shimmer
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-shimmer
navigation.badge: Soon
---

## Usage

The ChatShimmer component renders an element with an animated shimmer gradient over text, commonly used to indicate streaming or loading states in chat interfaces.

::component-code
---
props:
  text: 'Thinking...'
---
::

### Duration

Use the `duration` prop to control the animation speed in seconds.

::component-code
---
props:
  text: 'Thinking...'
  duration: 4
---
::

### Spread

Use the `spread` prop to control the width of the shimmer highlight. The actual spread is computed as `text.length * spread` in pixels.

::component-code
---
props:
  text: 'Thinking...'
  spread: 5
---
::

## API

### Props

:component-props

## Theme

:component-theme
