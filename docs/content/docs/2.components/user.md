---
title: User
description: 'A component to display user details, including their name, bio, and profile picture.'
category: data
badge: new
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/User.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/user
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/user
---

## Usage

### Name

Use the `name` prop to display a name for the user.

::component-code
---
props:
  name: 'John Doe'
---
::

### Description

Use the `description` prop to display a description for the user.

::component-code
---
props:
  name: 'John Doe'
  description: 'Software Engineer'
---
::

### Avatar

Use the `avatar` prop to display an [Avatar](/docs/components/avatar/) component.

::component-code
---
prettier: true
ignore:
  - name
  - description
  - avatar.src
props:
  name: 'John Doe'
  description: 'Software Engineer'
  avatar:
    src: '/b24ui/avatar/employee.png'
---
::

::collapsible{name="all avatar properties"}

::component-props
---
name: Avatar
ignore:
  - size
  - as
---
::

::

### Chip

Use the `chip` prop to display a [Chip](/docs/components/chip/) component.

::component-code
---
prettier: true
ignore:
  - name
  - description
  - avatar.src
items:
  chip.color:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-warning
    - air-primary-copilot
    - air-secondary
    - air-secondary-accent
    - air-secondary-accent-1
    - air-tertiary
  chip.position:
    - top-left
    - top-right
    - bottom-left
    - bottom-right
props:
  name: 'John Doe'
  description: 'Software Engineer'
  avatar.src: '/b24ui/avatar/employee.png'
  chip:
    color: 'primary'
    position: top-right
---
::

::collapsible{name="all chip properties"}

::component-props
---
name: Chip
ignore:
  - as
  - size
  - standalone
---
::

::

### Size

Use the `size` prop to change the size of the user avatar and text.

::component-code
---
prettier: true
ignore:
  - name
  - description
  - avatar.src
  - chip
props:
  name: 'John Doe'
  description: 'Software Engineer'
  avatar.src: '/b24ui/avatar/employee.png'
  chip: true
  size: xl
---
::

### Orientation

Use the `orientation` prop to change the orientation. Defaults to `horizontal`.

::component-code
---
prettier: true
ignore:
  - avatar.src
props:
  orientation: 'vertical'
  name: 'John Doe'
  description: 'Software Engineer'
  avatar.src: '/b24ui/avatar/employee.png'
---
::

### Link

You can pass any property from the [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link) component such as `to`, `target`, `rel`, etc.

::component-code
---
prettier: true
ignore:
  - name
  - description
  - avatar.src
  - target
props:
  to: 'https://github.com/bitrix24'
  target: '_blank'
  name: 'Username'
  description: 'User description'
  avatar.src: 'https://github.com/bitrix24.png'
---
::

::note
The `NuxtLink` component will inherit all other attributes you pass to the `User` component.
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
