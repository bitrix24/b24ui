---
title: Badge
description: A short descriptor for a status or category.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Badge.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/badge
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui4.nuxt.com/docs/components/badge
---

## Usage

### Label

Use the default slot to set the label of the Badge.

::component-code
---
slots:
  default: Badge
---
::

You can achieve the same result by using the `label` prop.

Use the `use-link` prop to show underline.

::component-code
---
prettier: true
props:
  label: Badge
  useLink: true
---
::

### Color

Use the `color` prop to change the color of the Badge.

::component-code
---
props:
  color: 'air-primary'
slots:
  default: Badge
---
::

### Inverted

Use the `inverted` prop to invert the color of the Badge.

::warning
Only available for `air-primary*` colors
::

::component-code
---
prettier: true
props:
  inverted: true
  color: 'air-primary'
slots:
  default: Badge
---
::

### Size

Use the `size` prop to change the size of the Badge.

::component-code
---
prettier: true
props:
  size: xl
slots:
  default: Badge
---
::

### Icon

Use the `icon` prop to show an [Icon](https://bitrix24.github.io/b24icons/guide/icons.html) inside the Badge.

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  size: md
  color: 'air-primary'
slots:
  default: Badge
---
::

Use the `use-close` prop to show close icon.

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  useClose: true
  icon: 'RocketIcon'
  size: md
  color: 'air-primary'
slots:
  default: Badge
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/) inside the Badge.

::component-code
---
prettier: true
ignore:
  - avatar.src
props:
  avatar:
    src: '/b24ui/avatar/employee.png'
  size: xl
  color: 'air-primary'
slots:
  default: |

    Badge
---
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
