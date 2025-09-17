---
title: Alert
description: An alert designed to capture the user's attention.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Alert.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/alert
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui4.nuxt.com/docs/components/alert
---

## Usage

### Title

Use the `title` prop to set the title of the Alert.

::component-code
---
prettier: true
props:
  title: Heads up!
---
::

### Description

Use the `description` prop to set the description of the Alert.

::component-code
---
prettier: true
props:
  title: Heads up!
  description: We will immediately notify the manager that the deal is not progressing.
---
::

### Icon

Use the `icon` prop to show an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html).

::component-code
---
prettier: true
ignore:
  - title
  - description
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  title: Heads up!
  description: We will immediately notify the manager that the deal is not progressing.
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/).

::component-code
---
prettier: true
ignore:
  - title
  - description
  - avatar.src
  - avatar.size
props:
  avatar.src: '/b24ui/avatar/employee.png'
  avatar.size: 'xs'
  title: Heads up!
  description: We will immediately notify the manager that the deal is not progressing.
---
::

### Color

Use the `color` prop to change the color of the Alert.

::component-code
---
prettier: true
ignore:
  - title
  - description
  - icon
cast:
  icon: 'RocketIcon'
props:
  color: 'air-primary'
  title: Heads up!
  description: We will immediately notify the manager that the deal is not progressing.
  icon: 'RocketIcon'
---
::

### Inverted

Use the `inverted` prop to invert the color of the Alert.

::warning
Only available for `air-primary*` colors
::

::component-code
---
prettier: true
ignore:
  - title
  - description
  - icon
cast:
  icon: 'RocketIcon'
props:
  inverted: true
  color: 'air-primary'
  title: Heads up!
  description: We will immediately notify the manager that the deal is not progressing.
  icon: 'RocketIcon'
---
::

### Size

Use the `size` prop to change the size of the Alert.

::component-code
---
prettier: true
ignore:
 - title
 - description
 - icon
cast:
  icon: 'RocketIcon'
props:
  size: 'md'
  title: Heads up!
  description: We will immediately notify the manager that the deal is not progressing.
  icon: 'RocketIcon'
---
::

### Close

Use the `close` prop to display a [Button](/docs/components/button/) to dismiss the Alert.

::tip
An `update:open` event will be emitted when the close button is clicked.
::

::component-code
---
prettier: true
ignore:
  - title
  - description
  - close
  - color
props:
  close: true
  title: Heads up!
  description: We will immediately notify the manager that the deal is not progressing.
---
::

You can pass any property from the [Button](/docs/components/button/) component to customize it.

::component-code
---
prettier: true
ignore:
  - title
  - description
  - close.color
  - color
props:
  title: Heads up!
  description: We will immediately notify the manager that the deal is not progressing.
  close:
    color: 'air-primary'
    class: 'rounded-full'
---
::

### Actions

Use the `actions` prop to add some [Button](/docs/components/button/) actions to the Alert.

::component-code
---
prettier: true
ignore:
  - title
  - description
  - actions
  - color
props:
  title: Heads up!
  description: We will immediately notify the manager that the deal is not progressing.
  actions:
    - label: Action 1
    - label: Action 2
      color: 'air-primary'
---
::

### Orientation

Use the `orientation` prop to change the orientation of the Alert.

::component-code
---
prettier: true
ignore:
  - title
  - actions
  - color
props:
  title: Heads up!
  description: We will immediately notify the manager that the deal is not progressing.
  orientation: horizontal
  actions:
    - label: Action 1
    - label: Action 2
      color: 'air-primary'
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
