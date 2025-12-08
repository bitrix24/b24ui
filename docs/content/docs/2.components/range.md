---
title: Range
description: A control for selecting a numeric value within a specified range.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Range.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/range
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/slider
  - label: Slider
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/slider
---

## Usage

Use the `v-model` directive to control the value of the Range.

::component-code
---
external:
  - modelValue
props:
  modelValue: 50
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
ignore:
  - defaultValue
props:
  defaultValue: 50
---
::

### Min / Max

Use the `min` and `max` props to set the minimum and maximum values of the Range. Defaults to `0` and `100`.

::component-code
---
ignore:
  - defaultValue
props:
  min: 0
  max: 50
  defaultValue: 50
---
::

### Step

Use the `step` prop to set the increment value of the Range. Defaults to `1`.

::component-code
---
ignore:
  - defaultValue
props:
  step: 10
  defaultValue: 50
---
::

### Multiple

Use the `v-model` directive or the `default-value` prop with an array of values to create a range Range.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [25, 75]
---
::

Use the `min-steps-between-thumbs` prop to limit the minimum distance between the thumbs.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [25, 50, 75]
  minStepsBetweenThumbs: 10
---
::

### Orientation

Use the `orientation` prop to change the orientation of the Range. Defaults to `horizontal`.

::component-code
---
ignore:
  - defaultValue
  - class
props:
  orientation: vertical
  defaultValue: 50
  class: 'h-48'
---
::

### Color

Use the `color` prop to change the color of the Range.

::component-code
---
ignore:
  - defaultValue
props:
  color: air-primary-copilot
  defaultValue: 50
---
::

### Size

Use the `size` prop to change the size of the Range.

::component-code
---
ignore:
  - defaultValue
props:
  size: lg
  defaultValue: 50
---
::

### Tooltip

Use the `tooltip` prop to display a [Tooltip](/docs/components/tooltip/) around the Range thumbs with the current value. You can set it to `true` for default behavior or pass an object to customize it with any property from the [Tooltip](/docs/components/tooltip/#props) component.

::component-code
---
ignore:
  - defaultValue
  - tooltip
props:
  defaultValue: 50
  tooltip: true
---
::

### Disabled

Use the `disabled` prop to disable the Range.

::component-code
---
ignore:
  - defaultValue
props:
  disabled: true
  defaultValue: 50
---
::

### Inverted

Use the `inverted` prop to visually invert the Range.

::component-code
---
ignore:
  - defaultValue
props:
  inverted: true
  defaultValue: 25
---
::

## API

### Props

:component-props

### Emits

:component-emits

## Theme

:component-theme
