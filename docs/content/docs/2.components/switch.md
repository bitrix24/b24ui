---
title: Switch
description: A toggle control for switching between two states.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Switch.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/select
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui4.nuxt.com/docs/components/switch
  - label: Switch
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/switch
---

## Usage

Use the `v-model` directive to control the checked state of the Switch.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: true
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
ignore:
  - defaultValue
props:
  defaultValue: true
---
::

### Label

Use the `label` prop to set the label of the Switch.

::component-code
---
props:
  label: Check me
---
::

When using the `required` prop, an asterisk is added next to the label.

::component-code
---
ignore:
  - label
props:
  required: true
  label: Check me
---
::

### Description

Use the `description` prop to set the description of the Switch.

::component-code
---
ignore:
  - label
props:
  label: Check me
  description: 'This is a checkbox.'
---
::

### Icon

Use the `checked-icon` and `unchecked-icon` props to set the icons of the Switch when checked and unchecked.

::component-code
---
prettier: true
ignore:
  - label
  - defaultValue
  - checkedIcon
cast:
  icon: 'RocketIcon'
props:
  checkedIcon: 'RocketIcon'
  defaultValue: true
  label: Check me
---
::

### Loading

Use the `loading` prop to show a loading icon on the Switch.

::component-code
---
ignore:
  - label
  - defaultValue
props:
  loading: true
  defaultValue: true
  label: Check me
---
::

### Color

Use the `color` prop to change the color of the Switch.

::component-code
---
ignore:
  - label
  - defaultValue
props:
  color: air-primary-copilot
  defaultValue: true
  label: Check me
---
::

### Size

Use the `size` prop to change the size of the Switch.

::component-code
---
ignore:
  - label
  - defaultValue
props:
  size: xl
  defaultValue: true
  label: Check me
---
::

### Disabled

Use the `disabled` prop to disable the Switch.

::component-code
---
ignore:
  - label
props:
  disabled: true
  label: Check me
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
