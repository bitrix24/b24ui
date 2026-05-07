---
title: DateTimePicker
description: A date and time selector with a two-step popover interface and configurable presets.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DateTimePicker.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/date-time-picker
---

`B24DateTimePicker` composes [`B24Popover`](/docs/components/popover/), [`B24Calendar`](/docs/components/calendar/), [`B24Input`](/docs/components/input/) and [`B24Button`](/docs/components/button/) into a single Bitrix24-style picker. The popover opens from a read-only input, lets the user pick a date in the first step, then offers a clickable hour/minute grid in the second step. A configurable preset list is rendered on the side.

## Usage

Use the `v-model` directive to control the selected value. The default model is a `CalendarDateTime` from the [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/index.html) package.

::component-example
---
name: 'date-time-picker-basic-example'
---
::

::framework-only
#nuxt
:::note{to="/docs/getting-started/integrations/i18n/nuxt/#locale"}
This component uses the `@internationalized/date` package and the `<B24App>` locale for formatting.
:::

#vue
:::note{to="/docs/getting-started/integrations/i18n/vue/#locale"}
This component uses the `@internationalized/date` package and the `<B24App>` locale for formatting.
:::
::

### Date only

Use the `date-only` prop to hide the time-selection step. The bound model becomes a `CalendarDate` and the time portion is forced to `00:00:00`.

::component-example
---
name: 'date-time-picker-date-only-example'
---
::

### Minute step

Use the `minute-step` prop to change the granularity of the minutes column. Defaults to `5`.

::component-code
---
prettier: true
props:
  minuteStep: 15
  placeholder: 'Pick a time'
---
::

### Locale

Use the `locale` prop to change the calendar locale and the trigger formatter.

::component-code
---
prettier: true
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
props:
  locale: ru
  placeholder: 'Выберите дату и время'
---
::

### Hide presets

Use the `hide-presets` prop to remove the side preset column.

::component-code
---
prettier: true
props:
  hidePresets: true
  placeholder: 'Pick a date and time'
---
::

### Color

Use the `color` prop to change the calendar selection color.

::component-code
---
prettier: true
props:
  color: 'air-primary-alert'
---
::

### Size

Use the `size` prop to change the picker size.

::component-code
---
prettier: true
props:
  size: lg
---
::

### Disabled

Use the `disabled` prop to disable the picker.

::component-code
---
prettier: true
props:
  disabled: true
---
::

## Examples

### With custom presets

Pass an array of presets via the `presets` prop. Each entry is `{ label, hint?, value }` where `value` is either a `DateValue` or a factory function evaluated when the preset is applied.

::component-example
---
name: 'date-time-picker-custom-presets-example'
---
::

### With custom trigger

Override the trigger via the default slot. The slot receives `{ open, value, formatted }`.

::component-example
---
name: 'date-time-picker-custom-trigger-example'
---
::

### Inside a form field

Compose with [`B24FormField`](/docs/components/form-field/) to attach a label, hint and validation message.

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
