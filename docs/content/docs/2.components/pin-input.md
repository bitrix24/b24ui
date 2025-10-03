---
title: PinInput
description: A PIN code input component.
category: form
badge: new
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PinInput.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/pin-input
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/pin-input
  - label: PinInput
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/pin-input
---

## Usage

Use the `v-model` directive to control the value of the PinInput.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: []
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
prettier: true
ignore:
  - defaultValue
props:
  defaultValue: ['1','2','3']
---
::

### Type

Use the `type` prop to change the input type. Defaults to `text`.

::component-code
---
items:
  type:
    - text
    - number
props:
  type: 'number'
---
::

::note
When `type` is set to `number`, it will only accept numeric characters.
::

### Mask

Use the `mask` prop to treat the input like a password.

::component-code
---
prettier: true
ignore:
  - placeholder
  - defaultValue
props:
  mask: true
  defaultValue: ['1','2','3','4','5']
---
::

### OTP

Use the `otp` prop to enable One-Time Password functionality. When enabled, mobile devices can automatically detect and fill OTP codes from SMS messages or clipboard content, with autocomplete support.

::component-code
---
props:
  otp: true
---
::

### Length

Use the `length` prop to change the amount of inputs.

::component-code
---
props:
  length: 6
---
::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

::component-code
---
props:
  placeholder: '○'
---
::

### Color

Use the `color` prop to change the ring color when the PinInput is focused.

::component-code
---
ignore:
  - placeholder
props:
  color: 'air-primary'
  highlight: true
  placeholder: '○'
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Size

Use the `size` prop to change the size of the PinInput.

::component-code
---
ignore:
  - placeholder
props:
  size: xl
  placeholder: '○'
---
::

### Disabled

Use the `disabled` prop to disable the PinInput.

::component-code
---
ignore:
  - placeholder
props:
  disabled: true
  placeholder: '○'
---
::

### No border

Use the `noBorder` prop to removes all borders (rings) from the InputTags.

::component-code
---
ignore:
  - placeholder
props:
  noBorder: true
  highlight: true
  size: xl
  placeholder: '○'
---
::

::note
The `highlight` prop is used here to indicate that there is no focus state.
::

### Underline

Use the `underline` prop to removes all borders (rings) except the bottom one from the InputTags.

::component-code
---
ignore:
  - placeholder
props:
  underline: true
  highlight: true
  size: xl
  placeholder: '○'
---
::

::note
The `highlight` prop is used here to show the focus state.
::

### Rounded

Use the `rounded` prop to round the InputTags.

::component-code
---
ignore:
  - placeholder
props:
  rounded: true
  highlight: true
  size: xl
  placeholder: '○'
---
::

::note
The `highlight` prop is used here to show the focus state.
::

## API

### Props

:component-props

### Emits

:component-emits

### Expose

When accessing the component via a template ref, you can use the following:

| Name                        | Type                                             |
|-----------------------------|--------------------------------------------------|
| `inputsRef`{lang="ts-type"} | `Ref<ComponentPublicInstance[]>`{lang="ts-type"} |

## Theme

:component-theme
