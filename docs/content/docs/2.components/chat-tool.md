---
title: ChatTool
description: An expandable section that indicates whether an AI tool has been called and its execution state.
category: chat
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatTool.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chat-tool
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-tool
  - label: Collapsible
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/collapsible
navigation.badge: New
---

## Usage

The ChatTool component renders a collapsible block that displays AI tool invocation status, such as "Searching components" or "Reading documentation". When a default slot is provided, it becomes collapsible to reveal tool output.

::component-example
---
collapse: true
prettier: true
name: 'chat-tool-example'
---
::

### Text

Use the `text` prop to set the tool status text.

::component-code
---
hide:
  - class
props:
  text: 'Searched components'
  class: 'w-60'
---
::

### Suffix

Use the `suffix` prop to display secondary text after the main label.

::component-code
---
hide:
  - class
ignore:
  - text
props:
  text: 'Reading component'
  suffix: 'Button'
  class: 'w-60'
---
::

### Streaming

Use the `streaming` prop to indicate the tool is actively running. The text displays a shimmer animation.

::component-code
---
hide:
  - class
ignore:
  - text
props:
  streaming: true
  text: 'Searching components...'
  class: 'w-60'
---
::

::tip
Use the `isToolStreaming` utility from `@bitrix24/b24ui-nuxt/utils/ai` to determine if a tool part is still running.
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
  text: 'Searching components...'
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
hide:
  - class
ignore:
  - text
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  text: 'Searched components'
  class: 'w-60'
---
::

### Loading

Use the `loading` prop to show a loading indicator. Use the `loading-icon` prop to customize the loading icon.

::component-code
---
hide:
  - class
ignore:
  - text
props:
  loading: true
  text: 'Searching components...'
  class: 'w-60'
---
::

### Loading Icon

Use `use-clock` or `use-wait` props to show different loading icons.

Use the `loading-icon` prop to customize the loading icon.

::component-code
---
hide:
  - class
  - loadingIcon
ignore:
  - text
  - loadingIcon
cast:
  loadingIcon: 'RocketIcon'
props:
  loading: true
  loadingIcon: 'RocketIcon'
  text: 'Searching components...'
  class: 'w-60'
---
::

::component-code
---
hide:
  - class
ignore:
  - text
props:
  loading: true
  useWait: true
  useClock: false
  text: 'Searching components...'
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
  text: 'Searched components'
  class: 'w-60'
slots:
  default: |

    Tool output content
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
  text: 'Searched components'
  class: 'w-60'
slots:
  default: |

    Tool output content
---
::

### Variant

Use the `variant` prop to change the visual style. Defaults to `inline`.

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
  variant: card
  text: 'Searched components'
  icon: 'RocketIcon'
  chevron: trailing
  class: 'w-60'
slots:
  default: |

    Tool output content
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
