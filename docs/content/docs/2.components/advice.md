---
title: Advice
description: A couple of lines of text and an avatar
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Advice.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/advice
---

## Usage

### Description

Use the `description` prop to set the description of the Advice.

::component-code
---
prettier: true
props:
  description: Let's signal the manager that the deal is not moving, the manager does not call the client back and does not respond to his messages. Let's assign a task to the manager on behalf of the manager
---
::

### Icon

Use the `icon` prop to show an [Icon](https://bitrix24.github.io/b24icons/guide/icons.html).

::component-code
---
prettier: true
ignore:
  - description
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  description: Let's signal the manager that the deal is not moving, the manager does not call the client back and does not respond to his messages. Let's assign a task to the manager on behalf of the manager
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/).

::component-code
---
prettier: true
ignore:
  - description
  - avatar.src
props:
  avatar.src: '/b24ui/avatar/employee.png'
  description: Let's signal the manager that the deal is not moving, the manager does not call the client back and does not respond to his messages. Let's assign a task to the manager on behalf of the manager
---
::

### Angle

Use the `angle` prop to change the color the position of the corner.

::component-code
---
prettier: true
ignore:
  - description
  - avatar.src
props:
  angle: top
  avatar.src: '/b24ui/avatar/employee.png'
  description: Let's signal the manager that the deal is not moving, the manager does not call the client back and does not respond to his messages. Let's assign a task to the manager on behalf of the manager
---
::

### With custom slot

Use the slot property to customize a description.

::component-example
---
name: 'advice-example'
props:
  class: 'w-full flex flex-col flex-nowrap justify-center items-center gap-4'
  collapse: true
---
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
