---
title: InputTags
description: A tags input component with interactive tag elements.
category: form
badge: new
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputTags.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/input-tags
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/input-tags
  - label: InputTags
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/tags-input
---

## Usage

Use the `v-model` directive to control the value of the InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
prettier: true
ignore:
  - defaultValue
props:
  defaultValue: ['Bitrix24']
---
::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

::component-code
---
props:
  placeholder: 'Enter tags...'
---
::

### Max Length

Use the `max-length` prop to set the maximum number of characters allowed in a tag.

::component-code
---
props:
  maxLength: 4
---
::

### Color

Use the `color` prop to change the ring color when the InputTags is focused.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  color: 'air-primary'
  highlight: true
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Tag

Use the `tag` property to display a [Badge](/docs/components/badge/) on top of the InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
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
  modelValue: ['Bitrix24']
  tag: note
  tagColor: air-secondary-alert
  color: 'air-primary'
  highlight: true
---
::

### Sizes

Use the `size` prop to adjust the size of the InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  size: xl
---
::

### Icon

Use the `icon` prop to show an [Icon](https://bitrix24.github.io/b24icons/guide/icons.html) inside the InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
  - icon
cast:
  icon: 'RocketIcon'
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  icon: 'RocketIcon'
  size: md
---
::

### Trailing Icon

Use the `trailing-icon` prop to set icon for trailing position.

::component-code
---
prettier: true
ignore:
  - modelValue
  - trailingIcon
cast:
  trailingIcon: 'RocketIcon'
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  trailingIcon: 'RocketIcon'
  size: md
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/) inside the InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
  - avatar.src
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  avatar.src: '/b24ui/avatar/employee.png'
  size: md
---
::

### Delete Icon

Use the `delete-icon` prop to customize the delete [Icon](https://bitrix24.github.io/b24icons/guide/icons.html) in the tags.

::component-code
---
prettier: true
ignore:
  - modelValue
  - deleteIcon
external:
  - modelValue
cast:
  deleteIcon: 'RocketIcon'
props:
  modelValue: ['Bitrix24']
  deleteIcon: 'RocketIcon'
---
::

### Loading

Use the `loading` prop to show a loading icon on the InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  loading: true
---
::

### Disabled

Use the `disabled` prop to disable the InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: ['Bitrix24']
  disabled: true
---
::

### No border

Use the `noBorder` prop to removes all borders (rings) from the InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  noBorder: true
  highlight: true
  modelValue: ['Bitrix24']
---
::

::note
The `highlight` prop is used here to indicate that there is no focus state.
::

### Underline

Use the `underline` prop to removes all borders (rings) except the bottom one from the InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  underline: true
  highlight: true
  modelValue: ['Bitrix24']
---
::

::note
The `highlight` prop is used here to show the focus state.
::

### Rounded

Use the `rounded` prop to round the InputTags.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  rounded: true
  highlight: true
  modelValue: ['Bitrix24']
---
::

::note
The `highlight` prop is used here to show the focus state.
::

## Examples

### Within a FormField

You can use the InputTags within a [FormField](/docs/components/form-field/) component to display a label, help text, required indicator, etc.

::component-example
---
name: 'input-tags-form-field-example'
---
::

## API

### Props

:component-props

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
