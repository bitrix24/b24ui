---
title: Textarea
description: A textarea for entering multi-line text.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Textarea.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/textarea
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/textarea
---

## Usage

Use the `v-model` directive to control the value of the Textarea.

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

### Rows

Use the `rows` prop to set the number of rows. Defaults to `3`.

::component-code
---
props:
  rows: 12
---
::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

::component-code
---
prettier: true
props:
  placeholder: 'Type something...'
---
::

### Autoresize

Use the `autoresize` prop to enable autoresizing the height of the Textarea.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 'This is a long text that will autoresize the height of the Textarea.'
  autoresize: true
---
::

Use the `maxrows` prop to set the maximum number of rows when autoresizing. If set to `0`, the Textarea will grow indefinitely.

::component-code
---
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: 'This is a long text that will autoresize the height of the Textarea with a maximum of 4 rows.'
  maxrows: 4
  autoresize: true
---
::

### Color

Use the `color` prop to change the ring color when the Textarea is focused.

::component-code
---
ignore:
  - placeholder
props:
  color: air-primary-copilot
  highlight: true
  placeholder: 'Type something...'
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Tag
Use the `tag` property to display a [Badge](/docs/components/badge/) on top of the Textarea.

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

### Icon

Use the `icon` prop to show an [Icon](https://bitrix24.github.io/b24icons/icons/) inside the Textarea.

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
  placeholder: 'Search...'
  rows: 1
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
  rows: 1
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/) inside the Textarea.

::component-code
---
prettier: true
ignore:
  - placeholder
  - avatar.src
props:
  avatar.src: '/b24ui/avatar/employee.png'
  placeholder: 'Search...'
  rows: 1
---
::

### Loading

Use the `loading` prop to show a loading icon on the Textarea.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  loading: true
  placeholder: 'Search...'
  rows: 1
---
::

### Disabled

Use the `disabled` prop to disable the Textarea.

::component-code
---
prettier: true
ignore:
  - placeholder
props:
  disabled: true
  placeholder: 'Type something...'
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
  placeholder: 'Type something...'
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
  placeholder: 'Type something...'
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
  placeholder: 'Type something...'
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
  placeholder: 'Type something...'
---
::

::note
The `highlight` prop is used here to show the focus state.
::

### Speech Recognition

Use composable [useSpeechRecognition](/docs/composables/use-speech-recognition/) to provide speech recognition using the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

::component-example
---
collapse: true
name: 'use-speech-recognition-example'
---
::

## API

### Props

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attributes" target="_blank"}
This component also supports all native `<textarea>` HTML attributes.
::

### Slots

:component-slots

### Emits

:component-emits

### Expose

When accessing the component via a template ref, you can use the following:

| Name | Type |
| ---- | ---- |
| `textareaRef`{lang="ts-type"} | `Ref<HTMLTextAreaElement \| null>`{lang="ts-type"} |

## Theme

:component-theme
