---
title: Kbd
description: A kbd element for indicating a keyboard input.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Kbd.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/kbd
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/kbd
---

## Usage

Use the default slot to set the value of the Kbd.

::component-code
---
slots:
  default: K
---
::

### Value

Use the `value` prop to set the value of the Kbd.

::component-code
---
props:
  value: K
---
::

You can pass special keys to the `value` prop that goes through the [`useKbd`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useKbd.ts) composable. For example, the `meta` key displays as `⌘` on macOS and `Ctrl` on other platforms.

::component-code
---
props:
  value: meta
items:
  value:
    - meta
    - win
    - command
    - shift
    - ctrl
    - option
    - alt
    - enter
    - delete
    - backspace
    - escape
    - tab
    - capslock
    - arrowup
    - arrowright
    - arrowdown
    - arrowleft
    - pageup
    - pagedown
    - home
    - end
---
::

### Accent

Use the `accent` prop to change the variant of the Kbd.

::component-code
---
props:
  accent: accent
slots:
  default: K
---
::

### Size

Use the `size` prop to change the size of the Kbd.

::component-code
---
props:
  size: lg
slots:
  default: K
---
::

## Examples

### `class` prop

Use the `class` prop to override the base styles of the Badge.

::component-code
---
props:
  class: 'text-(--ui-color-copilot-accent-primary) dark:text-(--ui-color-accent-main-warning) font-(--ui-font-weight-bold) rounded-full'
  accent: accent
slots:
  default: K
---
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
