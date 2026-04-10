---
title: ChatPromptSubmit
description: 'A chat prompt submission button with automatic status handling.'
category: chat
links:
  - label: Button
    iconName: Bitrix24Icon
    to: /docs/components/button/
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatPromptSubmit.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-prompt-submit
---

## Usage

The ChatPromptSubmit component is used inside the [ChatPrompt](/docs/components/chat-prompt/) component to submit the prompt. It automatically handles the different `status` values to control the chat.

It extends the [Button](/docs/components/button/) component, so you can pass any property such as `color`, `size`, etc.

::code-preview

#default
:b24-chat-prompt-submit

#code

```vue
<template>
  <B24ChatPrompt>
    <B24ChatPromptSubmit />
  </B24ChatPrompt>
</template>
```

::

::note
You can also use it inside the `footer` slot of the [`ChatPrompt`](/docs/components/chat-prompt/) component.
::

### Ready

When its status is `ready`{lang="ts-type"}, use the `color` and `icon` props to customize the Button. Defaults to:

- `color="primary"`{lang="ts-type"}
- `icon="ArrowTopLIcon"`{lang="ts-type"}

::component-code
---
prettier: true
items:
  color:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-secondary-no-accent
    - air-tertiary
    - air-tertiary-accent
    - air-tertiary-no-accent
    - air-selection
    - air-boost
props:
  color: 'air-primary'
---
::

### Submitted

When its status is `submitted`{lang="ts-type"}, use the `submitted-color` and `submitted-icon` props to customize the Button. Defaults to:

- `submittedColor="air-secondary-no-accent"`{lang="ts-type"}
- `submittedIcon="StopLIcon"`{lang="ts-type"}

::note
The `stop` event is emitted when the user clicks on the Button.
::

::component-code
---
prettier: true
ignore:
  - status
items:
  submittedColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-secondary-no-accent
    - air-tertiary
    - air-tertiary-accent
    - air-tertiary-no-accent
    - air-selection
    - air-boost
props:
  submittedColor: 'air-secondary-no-accent'
  status: 'submitted'
---
::

### Streaming

When its status is `streaming`{lang="ts-type"}, use the `streaming-color` and `streaming-icon` props to customize the Button. Defaults to:

- `streamingColor="air-secondary-accent-2"`{lang="ts-type"}
- `streamingIcon="StopLIcon"`{lang="ts-type"}

::note
The `stop` event is emitted when the user clicks on the Button.
::

::component-code
---
prettier: true
ignore:
  - status
items:
  streamingColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-secondary-no-accent
    - air-tertiary
    - air-tertiary-accent
    - air-tertiary-no-accent
    - air-selection
    - air-boost
props:
  streamingColor: 'air-secondary-accent-2'
  status: 'streaming'
---
::

### Error

When its status is `error`{lang="ts-type"}, use the `error-color` and `error-icon` props to customize the Button. Defaults to:

- `errorColor="air-primary-alert"`{lang="ts-type"}
- `errorIcon="RefreshIcon"`{lang="ts-type"}

::note
The `reload` event is emitted when the user clicks on the Button.
::

::component-code
---
prettier: true
ignore:
  - status
items:
  errorColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-secondary-no-accent
    - air-tertiary
    - air-tertiary-accent
    - air-tertiary-no-accent
    - air-selection
    - air-boost
props:
  errorColor: 'air-primary-alert'
  status: 'error'
---
::

## Examples

::tip{to="/docs/components/chat/"}
Check the **Chat** overview page for installation instructions, server setup and usage examples.
::

## API

### Props

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
This component also supports all native `<button>` HTML attributes.
::

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme
