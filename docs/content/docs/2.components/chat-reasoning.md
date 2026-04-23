---
title: ChatReasoning
description: An expandable panel that shows the AI's internal reasoning steps.
category: chat
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatReasoning.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chat-reasoning
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-reasoning
  - label: Collapsible
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/collapsible
navigation.badge: New
---

## Usage

The ChatReasoning component renders a collapsible block that displays AI reasoning or thinking content. It auto-opens during streaming and auto-closes after.

::component-example
---
collapse: true
prettier: true
name: 'chat-reasoning-example'
class: 'h-[252px]'
---
::

::note{to="/docs/composables/use-scroll-shadow/"}
The body content uses the `useScrollShadow` composable to apply fade shadows when overflowing.
::

### Text

Use the `text` prop to set the reasoning content. The text is displayed inside the collapsible body.

::component-code
---
prettier: true
hide:
  - class
props:
  text: 'The user is asking about Vue components...'
  class: 'w-60'
---
::

### Streaming

Use the `streaming` prop to indicate active reasoning. The component auto-opens when streaming starts and auto-closes when it ends.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
props:
  streaming: true
  text: 'The user is asking about Vue components...'
  class: 'w-60'
---
::

::tip
Use the `isPartStreaming` utility from `@bitrix24/b24ui-nuxt/utils/ai` to determine if a reasoning part is currently being streamed.
::

### Shimmer

When streaming, the trigger label uses the [`ChatShimmer`](/docs/components/chat-shimmer/) component. Use the `shimmer` prop to customize its `duration` and `spread`.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
props:
  streaming: true
  text: 'The user is asking about Vue components...'
  shimmer:
    duration: 2
    spread: 2
  class: 'w-60'
---
::

### Icon

Use the `icon` prop to display an [Icon](https://bitrix24.github.io/b24icons/icons/) component next to the trigger.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  text: 'The user is asking about Vue components...'
  class: 'w-60'
---
::

### Chevron

Use the `chevron` prop to change the position of the chevron icon.

::note
When `chevron` is set to `leading` with an `icon`, the icon swaps with the chevron on hover and when open.
::

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
  - icon
cast:
  icon: 'RocketIcon'
props:
  chevron: leading
  icon: 'RocketIcon'
  text: 'The user is asking about Vue components...'
  class: 'w-60'
---
::

### Chevron Icon

Use the `chevron-icon` prop to customize the chevron [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
  - chevronIcon
cast:
    chevronIcon: 'RocketIcon'
props:
  chevronIcon: 'RocketIcon'
  text: 'The user is asking about Vue components...'
  class: 'w-60'
---
::

## Examples

::tip{to="/docs/components/chat/"}
Check the **Chat** overview page for installation instructions, server setup and usage examples.
::

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme
