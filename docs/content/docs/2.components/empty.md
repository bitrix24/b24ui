---
title: Empty
description: 'An empty state component.'
category: data
badge: new
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Empty.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/empty
---

## Usage

::component-example
---
collapse: true
name: 'empty-example'
---
::

### Title

Use the `title` prop to set the title of the empty state.

::component-code
---
props:
  title: No projects found
---
::

### Description

Use the `description` prop to set the description of the empty state.

::component-code
---
prettier: true
ignore:
  - title
props:
  title: No projects found
  description: It looks like you haven't added any projects. Create one to get started.
---
::

### Icon

Use the `icon` prop to set the icon of the empty state.

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
  title: No projects found
  description: It looks like you haven't added any projects. Create one to get started.
---
::

### Actions

Use the `actions` prop to add some [Button](/docs/components/button/) actions to the empty state.

::component-code
---
prettier: true
ignore:
  - icon
  - title
  - description
  - actions
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: RocketIcon
  title: No projects found
  description: It looks like you haven't added any projects. Create one to get started.
  actions:
    - label: Create new
      color: air-primary
    - label: Refresh
---
::

### Color

Use the `color` prop to change the color of the empty state.

::component-code
---
prettier: true
ignore:
  - icon
  - title
  - description
  - actions
  - icon
cast:
  icon: 'RocketIcon'
props:
  color: 'air-secondary-accent-2'
  icon: 'RocketIcon'
  title: No notifications
  description: You're all caught up. New notifications will appear here.
  actions:
    - label: Refresh
---
::

### Inverted

Use the `inverted` prop to invert the color of the empty state.

::warning
Only available for `air-primary*` colors
::

::component-code
---
prettier: true
ignore:
  - icon
  - title
  - description
  - actions
  - icon
cast:
  icon: 'RocketIcon'
props:
  inverted: true
  color: 'air-primary'
  icon: 'RocketIcon'
  title: No notifications
  description: You're all caught up. New notifications will appear here.
  actions:
    - label: Refresh
---
::

### Size

Use the `size` prop to change the size of the empty state.

::component-code
---
prettier: true
ignore:
  - icon
  - title
  - description
  - actions
  - icon
cast:
  icon: 'RocketIcon'
props:
  size: xl
  icon: 'RocketIcon'
  title: No notifications
  description: You're all caught up. New notifications will appear here.
  actions:
    - label: Refresh
---
::

## Examples

### With slots

Use the available slots to create a more complex empty state.

::component-example
---
collapse: true
name: 'empty-slots-example'
---
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
