---
title: Calendar
description: A calendar tool for choosing individual dates, multiple dates, or date spans.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Calendar.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/calendar
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/calendar
  - label: Calendar
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/calendar
---

## Usage

Use the `v-model` directive to control the selected date.

::component-code
---
prettier: true
cast:
  modelValue: DateValue
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: [2012, 4, 12]
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
prettier: true
cast:
  defaultValue: DateValue
ignore:
  - defaultValue
external:
  - defaultValue
props:
  defaultValue: [2012, 4, 12]
---
::

::framework-only
#nuxt
:::note{to="/docs/getting-started/integrations/i18n/nuxt/#locale"}
This component uses the `@internationalized/date` package for locale-aware formatting. The date format is determined by the `locale` prop of the App component.
:::

#vue
:::note{to="/docs/getting-started/integrations/i18n/vue/#locale"}
This component uses the `@internationalized/date` package for locale-aware formatting. The date format is determined by the `locale` prop of the App component.
:::
::

### Multiple

Use the `multiple` prop to allow multiple selections.

::component-code
---
prettier: true
cast:
  modelValue: DateValue[]
ignore:
  - multiple
  - modelValue
external:
  - modelValue
props:
  multiple: true
  modelValue: [[2012, 4, 4], [2012, 4, 12], [2012, 4, 20]]
---
::

### Locale

Use the `locale` prop to change the locale of the calendar.

::component-code
---
prettier: true
cast:
  modelValue: DateValue
ignore:
  - modelValue
external:
  - modelValue
items:
  locale:
    - en
    - de
    - es
    - pt-BR
    - fr
    - it
    - pl
    - ru
    - uk
    - tr
    - zh-CN
    - zh-TW
    - ja
    - vi
    - id
    - ms
    - th
    - ar
    - kk
props:
  modelValue: [2012, 4, 12]
  locale: 'zh-CN'
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
    start: [2012, 4, 3]
    end: [2012, 4, 20]
---
::

### Color

Use the `color` prop to change the color of the calendar.

::component-code
---
prettier: true
props:
  color: 'air-primary-alert'
---
::

### Size

Use the `size` prop to change the size of the calendar.

::component-code
---
prettier: true
props:
  size: lg
---
::

### Disabled

Use the `disabled` prop to disable the calendar.

::component-code
---
prettier: true
props:
  disabled: true
---
::

### Number Of Months

Use the `numberOfMonths` prop to change the number of months in the calendar.

::component-code
---
prettier: true
props:
  numberOfMonths: 3
---
::

### Month Controls

Use the `month-controls` prop to show the month controls. Defaults to `true`.

::component-code
---
prettier: true
props:
  monthControls: false
---
::

### Year Controls

Use the `year-controls` prop to show the year controls. Defaults to `false`.

::component-code
---
prettier: true
props:
  yearControls: true
---
::

### Fixed Weeks

Use the `fixed-weeks` prop to display the calendar with fixed weeks.

::component-code
---
prettier: true
props:
  fixedWeeks: false
---
::

### Week Numbers

Use the `week-numbers` prop to display week numbers in the calendar.

::component-code
---
props:
  weekNumbers: true
  fixedWeeks: true
---
::

## Examples

### With chip events

Use the [Chip](/docs/components/chip/) component to add events to specific days.

::component-example
---
name: 'calendar-events-example'
---
::

### With disabled dates

Use the `is-date-disabled` prop with a function to mark specific dates as disabled.

::component-example
---
name: 'calendar-disabled-dates-example'
---
::

### With unavailable dates

Use the `is-date-unavailable` prop with a function to mark specific dates as unavailable.

::component-example
---
name: 'calendar-unavailable-dates-example'
---
::

### With min/max dates

Use the `min-value` and `max-value` props to limit the dates.

::component-example
---
name: 'calendar-min-max-dates-example'
---
::

### With other calendar systems

You can use other calenders from `@internationalized/date` to implement a different calendar system. 

::component-example
---
name: 'calendar-other-system-example'
---
::

::note{to="https://react-spectrum.adobe.com/internationalized/date/Calendar.html#implementations"}
You can check all the available calendars on `@internationalized/date` docs.
::

### With external controls

You can control the calendar with external controls by manipulating the date passed in the `v-model`.

::component-example
---
name: 'calendar-external-controls-example'
---
::

### As a DatePicker

Use a [Button](/docs/components/button/) and a [Popover](/docs/components/popover/) component to create a date picker.

::component-example
---
name: 'calendar-date-picker-example'
---
::

### As a DateRangePicker

Use a [Button](/docs/components/button/) and a [Popover](/docs/components/popover/) component to create a date range picker.

::component-example
---
name: 'calendar-date-range-picker-example'
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
