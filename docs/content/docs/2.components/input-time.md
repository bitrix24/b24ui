---
title: InputTime
description: 'A time selection input field.'
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputTime.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/input-time
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/input-time
  - label: TimeField
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/time-field
---

## Usage

Use the `v-model` directive to control the selected date.

::component-code
---
cast:
  modelValue: TimeValue
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [12, 30, 0]
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
cast:
  defaultValue: TimeValue
ignore:
  - defaultValue
external:
  - defaultValue
props:
  defaultValue: [12, 30, 0]
---
::

::note
This component relies on the [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/index.html) package which provides objects and functions for representing and manipulating dates and times in a locale-aware manner. Format of date depends on the [`locale`](/docs/getting-started/integrations/i18n/) installed in your application.
::

### Hour Cycle

Use the `hour-cycle` prop to change the hour cycle of the InputTime. Defaults to `12`.

::component-code
---
cast:
  defaultValue: TimeValue
ignore:
  - hourCycle
  - defaultValue
external:
  - defaultValue
props:
  hourCycle: 24
  defaultValue: [16, 30, 0]
---
::

### Color

Use the `color` prop to change the color of the InputTime.

::component-code
---
props:
  color: air-primary
  highlight: true
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Tag

Use the `tag` property to display a [Badge](/docs/components/badge/) on top of the InputTime.

::component-code
---
prettier: true
props:
  tag: note
  color: 'air-primary'
  highlight: true
---
::

Use the `tagColor` property to set the color for Badge.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
items:
  tagColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-primary-warning
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-tertiary
    - air-selection
props:
  tag: note
  tagColor: air-secondary-alert
  color: 'air-primary'
  highlight: true
---
::

### Size

Use the `size` prop to change the size of the InputTime.

::component-code
---
props:
  size: xl
---
::

### Icon

Use the `icon` prop to show an [Icon](https://bitrix24.github.io/b24icons/icons/) inside the InputTime.

::component-code
---
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/) inside the InputTime.

::component-code
---
prettier: true
ignore:
  - avatar.src
props:
  avatar:
    src: '/b24ui/avatar/employee.png'
  size: md
---
::

### Loading

Use the `loading` prop to show a loading icon on the InputTime.

::component-code
---
prettier: true
props:
  loading: true
---
::

### Disabled

Use the `disabled` prop to disable the InputTime.

::component-code
---
props:
  disabled: true
---
::

### No padding

Use the `noPadding` prop to removes padding from the InputTime.

::component-code
---
prettier: true
props:
  noPadding: true
  highlight: true
---
::

::note
The `highlight` prop is used here to show the focus state.
::

### No border

Use the `noBorder` prop to removes all borders (rings) from the InputTime.

::component-code
---
prettier: true
props:
  noBorder: true
  highlight: true
---
::

::note
The `highlight` prop is used here to indicate that there is no focus state.
::

### Underline

Use the `underline` prop to removes all borders (rings) except the bottom one from the InputTime.

::component-code
---
prettier: true
props:
  underline: true
  highlight: true
---
::

::note
The `highlight` prop is used here to show the focus state.
::

### Rounded

Use the `rounded` prop to round the InputTime.

::component-code
---
prettier: true
props:
  rounded: true
  highlight: true
---
::

::note
The `highlight` prop is used here to show the focus state.
::

## Examples

### Within a FormField

You can use the InputTime within a [FormField](/docs/components/form-field/) component to display a label, help text, required indicator, etc.

::component-example
---
name: 'input-time-form-field-example'
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
