---
title: Countdown
description: Countdown with options control.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Countdown.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/countdown
---

## Usage

Use the `seconds` prop to set the number of seconds to Countdown.

::component-code
---
prettier: true
props:
  seconds: 120
---
::

### Show minutes

Use the `show-minutes` property to show or hide the minutes in the Countdown. Default value: `true`.

::component-code
---
prettier: true
props:
  showMinutes: false
  seconds: 120
---
::

### Size

Use the `size` prop to change the size of the Countdown.

::component-code
---
prettier: true
props:
  size: xl
  seconds: 120
---
::

### Use Circle

Use the `useCircle` property to display a `circle` around the Countdown.

::component-code
---
prettier: true
props:
  useCircle: true
  seconds: 120
  size: xl
---
::

### Icon

Use the `icon` prop to show an [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  seconds: 120
  size: xl
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/).

::component-code
---
prettier: true
ignore:
  - avatar.src
cast:
  icon: 'RocketIcon'
props:
  avatar.src: '/b24ui/avatar/employee.png'
  seconds: 120
  size: xl
---
::

## Examples

### Information displayed

You can manage information using the default slot.

::component-example
---
name: 'countdown-information-displayed-example'
collapse: true
---
::

### With interval

You can control the countdown interval using the `interval` prop.

::component-example
---
name: 'countdown-interval-example'
collapse: true
---
::

### Handling countdown emits

Use emit `start`, `end`, `abort`, `progress` to respond to countdown events.

::component-example
---
name: 'countdown-emits-example'
collapse: true
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
