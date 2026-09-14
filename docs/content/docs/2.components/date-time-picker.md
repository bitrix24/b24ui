---
title: DateTimePicker
description: 'A date and time selector: a calendar that hands over to an hour and minute grid, with presets beside it.'
category: form
keywords:
  - date picker
  - datetime picker
  - time picker
  - schedule
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DateTimePicker.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/date-time-picker
---

## Usage

Bind the selected value with `v-model`. It is a `CalendarDateTime` or a `ZonedDateTime` from [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/index.html), the same types [Calendar](/docs/components/calendar/) and [InputDate](/docs/components/input-date/) use.

Picking a date moves to the time step; picking a minute closes the picker.

::component-example
---
name: 'date-time-picker-basic-example'
---
::

### Date only

Use `date-only` when the time is not part of the answer. The time step is dropped and the value stays a `CalendarDate`, so it carries no time at all rather than a time of midnight.

::component-example
---
name: 'date-time-picker-date-only-example'
---
::

### Presets

A preset column sits beside the calendar with today, tomorrow, the end of the week, a week out and the end of the month. Pass `presets` to replace the list, or `hide-presets` to drop the column.

A preset's `value` may be a function, which is resolved when the list renders — so a relative preset stays correct however long the page has been open.

::component-example
---
name: 'date-time-picker-custom-presets-example'
---
::

### Minute step

Use `minute-step` to change how many minutes the grid moves by. It is clamped to 1…30, and a value that is not a finite number falls back to `5`.

::component-code
---
prettier: true
items:
  minuteStep:
    - 5
    - 10
    - 15
    - 30
props:
  minuteStep: 15
  placeholder: 'Pick a date and time'
---
::

### Custom trigger

The `#default` slot replaces the trigger. It receives the open state, the value and the formatted value.

::component-example
---
name: 'date-time-picker-custom-trigger-example'
---
::

### Inside a FormField

::component-example
---
name: 'date-time-picker-form-field-example'
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
