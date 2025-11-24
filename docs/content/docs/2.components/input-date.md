---
title: InputDate
description: 'A date selection input field.'
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputDate.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/input-date
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/input-date
  - label: DateField
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/date-field
---

## Usage

Use the `v-model` directive to control the selected date.

::component-code
---
cast:
  modelValue: DateValue
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [2022, 2, 3]
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
cast:
  defaultValue: DateValue
ignore:
  - defaultValue
external:
  - defaultValue
props:
  defaultValue: [2022, 2, 6]
---
::

### Range

Use the `range` prop to select a range of dates.

::component-code
---
prettier: true
cast:
  modelValue: DateRange
ignore:
  - range
  - modelValue.start
  - modelValue.end
external:
  - modelValue
props:
  range: true
  modelValue:
    start: [2022, 2, 3]
    end: [2022, 2, 20]
---
::

### Color

Use the `color` prop to change the color of the InputDate.

::component-code
---
props:
  color: air-primary
  highlight: true
---
::

### Tag

Use the `tag` property to display a [Badge](/docs/components/badge/) on top of the InputDate.

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

Use the `size` prop to change the size of the InputDate.

::component-code
---
props:
  size: xl
---
::

### Separator Icon

Use the `separator-icon` prop to change the icon of the range separator.

::component-code
---
ignore:
  - separatorIcon
cast:
  separatorIcon: 'RocketIcon'
props:
  range: true
  separatorIcon: 'RocketIcon'
---
::

### Icon

Use the `icon` prop to show an [Icon](https://bitrix24.github.io/b24icons/icons/) inside the InputDate.

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

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/) inside the InputDate.

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

Use the `loading` prop to show a loading icon on the InputDate.

::component-code
---
prettier: true
props:
  loading: true
---
::

### Disabled

Use the `disabled` prop to disable the InputDate.

::component-code
---
props:
  disabled: true
---
::

### No padding

Use the `noPadding` prop to removes padding from the InputDate.

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

Use the `noBorder` prop to removes all borders (rings) from the InputDate.

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

Use the `underline` prop to removes all borders (rings) except the bottom one from the InputDate.

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

Use the `rounded` prop to round the InputDate.

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

### With unavailable dates

Use the `is-date-unavailable` prop with a function to mark specific dates as unavailable.

::component-example
---
name: 'input-date-unavailable-dates-example'
---
::

### With min/max dates

Use the `min-value` and `max-value` props to limit the dates.

::component-example
---
name: 'input-date-min-max-dates-example'
---
::

### As a DatePicker

Use a [Calendar](/docs/components/calendar/) and a [Popover](/docs/components/popover/) component to create a date picker.

::component-example
---
name: 'input-date-date-picker-example'
---
::

### As a DateRangePicker

Use a [Calendar](/docs/components/calendar/) and a [Popover](/docs/components/popover/) component to create a date range picker.

::component-example
---
name: 'input-date-date-range-picker-example'
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
