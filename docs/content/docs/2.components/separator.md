---
title: Separator
description: Divides content in a horizontal or vertical manner.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Separator.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/separator
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/separator
  - label: Separator
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/separator
---

## Usage

Use the Separator component as-is to separate content.

::component-code
---
hideBgGrid: true
class: 'p-[32px]'
---
::

### Orientation

Use the `orientation` prop to change the orientation of the Separator. Defaults to `horizontal`.

::component-code
---
prettier: true
hideBgGrid: true
ignore:
  - class
class: 'p-[32px]'
props:
  orientation: vertical
  class: 'h-48'
---
::

### Label

Use the `label` prop to display a label in the middle of the Separator.

::component-code
---
prettier: true
hideBgGrid: true
class: 'p-[32px]'
props:
  label: 'Bitrix24 UI'
---
::

### Icon

Use the `icon` prop to display an [Icon](https://bitrix24.github.io/b24icons/icons/) in the middle of the Separator.

::component-code
---
prettier: true
hideBgGrid: true
class: 'p-[32px]'
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
---
::

### Avatar

Use the `avatar` prop to display an [Avatar](/docs/components/avatar/) in the middle of the Separator.

::component-code
---
prettier: true
hideBgGrid: true
class: 'p-[32px]'
ignore:
  - avatar.src
props:
  avatar:
    src: '/b24ui/avatar/employee.png'
---
::

### Accent

Use the `accent` prop to change the variant of the Separator. Defaults to `default`.

::component-code
---
prettier: true
class: 'p-[32px]'
hideBgGrid: true
props:
  accent: accent
  type: solid
---
::

### Type

Use the `type` prop to change the type of the Separator. Defaults to `solid`.

::component-code
---
prettier: true
class: 'p-[32px]'
hideBgGrid: true
props:
  type: dashed
  accent: accent
  size: thick
---
::

### Size

Use the `size` prop to change the size of the Separator. Defaults to `thin`.

::component-code
---
prettier: true
class: 'p-[32px]'
hideBgGrid: true
props:
  size: thick
---
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
