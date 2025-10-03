---
title: Progress
description: A progress bar displaying task completion status.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Progress.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/progress
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/progress
  - label: Progress
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/progress
---

## Usage

Use the `v-model` directive to control the value of the Progress.

::component-code
---
external:
  - modelValue
props:
  modelValue: 24
---
::

### Max

Use the `max` prop to set the maximum value of the Progress.

::component-code
---
external:
  - modelValue
props:
  modelValue: 2
  max: 4
---
::

Use the `max` prop with an array of strings to display the active step under the bar, the maximum value of the Progress is the length of the array.

::component-code
---
prettier: true
ignore:
  - max
external:
  - modelValue
props:
  modelValue: 3
  max:
    - 'Prospecting...'
    - 'Qualifying...'
    - 'Presenting...'
    - 'Negotiating...'
    - 'Closed!'
---
::

### Status

Use the `status` prop to display the current Progress value above the bar.

::component-code
---
external:
  - modelValue
props:
  modelValue: 24
  status: true
---
::

### Indeterminate

When no `v-model` is set or the value is `null`, the Progress becomes _indeterminate_. The progress bar is animated as a `loading`, but you can change it using the [`animation`](#animation) prop.

::component-code
---
external:
  - modelValue
props:
  modelValue: null
---
::

### Animation

Use the `animation` prop to change the animation of the Progress to an inverse carousel, a swinging bar or an elastic bar. Defaults to `loading`.

::component-code
---
props:
  animation: swing
---
::

### Orientation

Use the `orientation` prop to change the orientation of the Progress. Defaults to `horizontal`.

::component-code
---
ignore:
  - class
props:
  orientation: vertical
  class: 'h-48 justify-center'
---
::

### Color

Use the `color` prop to change the color of the Progress.

::component-code
---
props:
  color: 'air-primary-copilot'
---
::

### Size

Use the `size` prop to change the size of the Progress.

::component-code
---
props:
  size: lg
---
::

### Inverted

Use the `inverted` prop to visually invert the Progress.

::component-code
---
props:
  inverted: true
  modelValue: 24
---
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
