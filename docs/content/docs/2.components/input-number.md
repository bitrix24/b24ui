---
title: InputNumber
description: Provide numerical input with a flexible range setting.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputNumber.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/input-number
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/input-number
  - label: NumberField
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/number-field
---

## Usage

Use the `v-model` directive to control the value of the InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
ignore:
  - defaultValue
props:
  defaultValue: 5
---
::

::note
This component relies on the [`@internationalized/number`](https://react-spectrum.adobe.com/internationalized/number/index.html) package which provides utilities for formatting and parsing numbers across locales and numbering systems.
::

### Min / Max

Use the `min` and `max` props to set the minimum and maximum values of the InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  min: 0
  max: 10
---
::

### Step

Use the `step` prop to set the step value of the InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  step: 2
---
::

### Orientation

Use the `orientation` prop to change the orientation of the InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  orientation: vertical
---
::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

::component-code
---
props:
  placeholder: 'Enter a number'
---
::

### Color

Use the `color` prop to change the ring color when the InputNumber is focused.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  color: 'air-primary'
  highlight: true
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Tag

Use the `tag` property to display a [Badge](/docs/components/badge/) on top of the InputNumber.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
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
  modelValue: 5
  tag: note
  tagColor: air-secondary-alert
  color: 'air-primary'
  highlight: true
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Size

Use the `size` prop to change the size of the InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  size: xl
---
::

### Disabled

Use the `disabled` prop to disable the InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 5
  disabled: true
---
::

### Increment / Decrement

Use the `increment` and `decrement` props to customize the increment and decrement buttons with any [Button](/docs/components/button/) props.

::component-code
---
prettier: true
ignore:
  - modelValue
  - increment.size
  - increment.color
  - decrement.size
  - decrement.color
external:
  - modelValue
props:
  modelValue: 5
  increment:
    color: 'air-primary'
    size: xs
  decrement:
    color: 'air-primary-alert'
    size: xs
---
::

### Increment / Decrement Icons

Use the `increment-icon` and `decrement-icon` props to customize the buttons [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
ignore:
  - modelValue
  - incrementIcon
  - decrementIcon
cast:
  incrementIcon: 'RocketIcon'
  decrementIcon: 'RocketIcon'
external:
  - modelValue
props:
  modelValue: 5
  incrementIcon: 'RocketIcon'
  decrementIcon: 'RocketIcon'
---
::

### No border

Use the `noBorder` prop to removes all borders (rings) from the InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  noBorder: true
  highlight: true
  modelValue: 5
---
::

::note
The `highlight` prop is used here to indicate that there is no focus state.
::

### Underline

Use the `underline` prop to removes all borders (rings) except the bottom one from the InputNumber.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  underline: true
  highlight: true
  modelValue: 5
---
::

::note
The `highlight` prop is used here to show the focus state.
::

### Rounded

Use the `rounded` prop to round the InputMenu.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  rounded: true
  highlight: true
  modelValue: 5
---
::

::note
The `highlight` prop is used here to show the focus state.
::

## Examples

### With decimal format

Use the `format-options` prop to customize the format of the value.

::component-example
---
name: 'input-number-decimal-example'
---
::

### With percentage format

Use the `format-options` prop with `style: 'percent'` to customize the format of the value.

::component-example
---
name: 'input-number-percentage-example'
---
::

### With currency format

Use the `format-options` prop with `style: 'currency'` to customize the format of the value.

::component-example
---
name: 'input-number-currency-example'
---
::

### Without buttons

You can use the `increment` and `decrement` props to control visibility of the buttons.

::component-example
---
name: 'input-number-without-buttons-example'
---
::

### Within a FormField

You can use the InputNumber within a [FormField](/docs/components/form-field/) component to display a label, help text, required indicator, etc.

::component-example
---
name: 'input-number-form-field-example'
---
::

### With slots

Use the `#increment` and `#decrement` slots to customize the buttons.

::component-example
---
name: 'input-number-slots-example'
---
::

## API

### Props

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes" target="_blank"}
This component also supports all native `<input>` HTML attributes.
::

### Slots

:component-slots

### Emits

:component-emits

### Expose

When accessing the component via a template ref, you can use the following:

| Name | Type |
| ---- | ---- |
| `inputRef`{lang="ts-type"} | `Ref<HTMLInputElement \| null>`{lang="ts-type"} |

## Theme

:component-theme
