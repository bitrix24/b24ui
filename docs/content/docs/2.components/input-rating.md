---
title: InputRating
description: A component to display and collect ratings from users.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputRating.vue
  - label: Rating
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/inpu-rating
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/listbox
navigation.badge: New
---

## Usage

Use the `v-model` directive to control the rating value of the InputRating component.

::component-code
---
external:
  - modelValue
props:
  modelValue: 3
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
ignore:
  - defaultValue
props:
  defaultValue: 3
---
::

### Step

Use the `step` prop to control the granularity of each star. Set it to `0.5` to allow half-star ratings.

::component-code
---
ignore:
  - defaultValue
props:
  step: 0.5
  defaultValue: 3.5
---
::

### Length

Use the `length` prop to set the number of stars. Defaults to `5`.

::component-code
---
ignore:
  - defaultValue
props:
  length: 10
  step: 0.5
  defaultValue: 7.5
---
::

### Clearable

Use the `clearable` prop to allow users to clear the rating by clicking on the currently selected value. Defaults to `false`.

::component-code
---
ignore:
  - defaultValue
props:
  clearable: true
  defaultValue: 3
---
::

### Hoverable

Use the `hoverable` prop to control whether the rating previews the value when hovering over the stars. Defaults to `false`.

::component-code
---
ignore:
  - defaultValue
props:
  hoverable: true
  defaultValue: 3
---
::

### Icon

Use the `icon` prop to customize the icon used for stars.

::component-code
---
ignore:
  - defaultValue
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  defaultValue: 4
---
::

### Empty Icon

Use the `empty-icon` prop to customize the icon used for empty stars. If not provided, uses the same icon as `icon`.

::component-code
---
ignore:
  - defaultValue
  - emptyIcon
cast:
  emptyIcon: 'RocketIcon'
props:
  emptyIcon: 'RocketIcon'
  defaultValue: 3
---
::

### Color

Use the `color` prop to change the color of the filled stars.

::component-code
---
ignore:
  - defaultValue
props:
  color: 'air-primary-success'
  defaultValue: 4
---
::

### Size

Use the `size` prop to change the size of the stars.

::component-code
---
ignore:
  - defaultValue
items:
  size:
    - xs
    - sm
    - md
    - lg
    - xl
  - defaultValue
props:
  size: xl
  defaultValue: 4
---
::

### Orientation

Use the `orientation` prop to change the orientation of the rating. Defaults to `horizontal`.

::component-code
---
ignore:
  - defaultValue
props:
  orientation: vertical
  defaultValue: 4
---
::

### Disabled

Use the `disabled` prop to disable the InputRating component.

::component-code
---
ignore:
  - defaultValue
props:
  disabled: true
  defaultValue: 3
---
::

### Readonly

Use the `readonly` prop to display a rating without allowing user interaction. Unlike `disabled`, it maintains normal appearance (full opacity, default cursor). Use when you want to display a rating that cannot be changed but should look normal.

::component-code
---
ignore:
  - defaultValue
props:
  readonly: true
  defaultValue: 4.5
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
