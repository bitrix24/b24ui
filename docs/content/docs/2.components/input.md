---
title: Input
description: An input box designed for text entry.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Input.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/input
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/input
---

## Usage

Use the `v-model` directive to control the value of the Input.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ''
---
::

### Type

Use the `type` prop to change the input type. Defaults to `text`.

Some types have been implemented in their own components such as [Checkbox](/docs/components/checkbox/), [Radio](/docs/components/radio-group/), [InputNumber](/docs/components/input-number/) etc. and others have been styled like `file` for example.

::component-code
---
prettier: true
items:
  type:
    - text
    - number
    - password
    - search
    - file
props:
  type: 'file'
---
::

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types" target="_blank"}
You can check all the available types on the MDN Web Docs.
::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

::component-code
---
prettier: true
props:
  placeholder: 'Search...'
---
::

### Color

Use the `color` prop to change the ring color when the Input is focused.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  color: air-primary-warning
  highlight: true
  placeholder: 'Search...'
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Tag

Use the `tag` property to display a [Badge](/docs/components/badge/) on top of the Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  tag: note
  color: air-primary-warning
  highlight: true
  placeholder: 'Search...'
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

Use the `tagColor` property to set the color for Badge.

::component-code
---
prettier: true
ignore:
  - placeholder
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
  tagColor: air-secondary-alert
  tag: note
  color: air-primary-warning
  highlight: true
  placeholder: 'Search...'
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Size

Use the `size` prop to change the size of the Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  size: xl
  placeholder: 'Search...'
---
::

### Icon

Use the `icon` prop to show an [Icon](https://bitrix24.github.io/b24icons/icons/) inside the Input.

::component-code
---
prettier: true
ignore:
  - placeholder
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  size: md
  placeholder: 'Search...'
---
::

### Trailing Icon

Use the `trailing-icon` prop to set icon for trailing position.

::component-code
---
prettier: true
ignore:
  - placeholder
  - trailingIcon
cast:
  trailingIcon: 'RocketIcon'
props:
  trailingIcon: 'RocketIcon'
  placeholder: 'Enter your email'
  size: md
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/) inside the Input.

::component-code
---
prettier: true
ignore:
  - placeholder
  - avatar.src
props:
  avatar.src: '/b24ui/avatar/employee.png'
  size: md
  placeholder: 'Search...'
---
::

### Loading

Use the `loading` prop to show a loading icon on the Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  loading: true
  placeholder: 'Search...'
---
::

### Disabled

Use the `disabled` prop to disable the Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  disabled: true
  placeholder: 'Search...'
---
::

### No padding

Use the `noPadding` prop to removes padding from the Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  noPadding: true
  highlight: true
  placeholder: 'Search...'
---
::

::note
The `highlight` prop is used here to show the focus state.
::

### No border

Use the `noBorder` prop to removes all borders (rings) from the Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  noBorder: true
  highlight: true
  placeholder: 'Search...'
---
::

::note
The `highlight` prop is used here to indicate that there is no focus state.
::

### Underline

Use the `underline` prop to removes all borders (rings) except the bottom one from the Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  underline: true
  highlight: true
  placeholder: 'Search...'
---
::

::note
The `highlight` prop is used here to show the focus state.
::

### Rounded

Use the `rounded` prop to round the Input.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  rounded: true
  highlight: true
  placeholder: 'Search...'
---
::

::note
The `highlight` prop is used here to show the focus state.
::

## Examples

### With clear button

You can put a [Button](/docs/components/button/) inside the `#trailing` slot to clear the Input.

::component-example
---
name: 'input-clear-button-example'
---
::

### With copy button

You can put a [Button](/docs/components/button/) inside the `#trailing` slot to copy the value to the clipboard.

::component-example
---
name: 'input-copy-button-example'
---
::

### With password toggle

You can put a [Button](/docs/components/button/) inside the `#trailing` slot to toggle the password visibility.

::component-example
---
name: 'input-password-toggle-example'
---
::

### With password strength indicator

You can use the [Progress](/docs/components/progress/) component to display the password strength indicator.

::component-example
---
collapse: true
name: 'input-password-strength-indicator-example'
---
::

### With character limit

You can use the `#trailing` slot to add a character limit to the Input.

::component-example
---
name: 'input-character-limit-example'
---
::

### With keyboard shortcut

You can use the [Kbd](/docs/components/kbd/) component inside the `#trailing` slot to add a keyboard shortcut to the Input.

::component-example
---
name: 'input-kbd-example'
---
::

::note{to="/docs/composables/define-shortcuts/"}
This example uses the `defineShortcuts` composable to focus the Input when the :kbd{value="/"} key is pressed.
::

### With mask

There's no built-in support for masks, but you can use libraries like [maska](https://github.com/beholdr/maska) to mask the Input.

::component-example
---
name: 'input-mask-example'
---
::

### With floating label

You can use the `#default` slot to add a floating label to the Input.

::component-example
---
name: 'input-floating-label-example'
---
::

### Within a FormField

You can use the Input within a [FormField](/docs/components/form-field/) component to display a label, help text, required indicator, etc.

::component-example
---
name: 'input-form-field-example'
---
::

::tip{to="/docs/components/form/"}
It also provides validation and error handling when used within a **Form** component.
::

### Within a FieldGroup

You can use the Input within a [FieldGroup](/docs/components/field-group/) component to group multiple elements together.

::component-example
---
name: 'input-field-group-example'
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
