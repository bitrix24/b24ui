---
title: ChatPromptSubmit
description: 'A chat prompt submission button with automatic status handling.'
category: chat
badge: New
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

::tip{to="/docs/components/chat-messages/#examples"}
Check the **ChatMessages** documentation for server API setup and installation instructions.
::

### Within a page

Use the ChatPromptSubmit component with the `Chat` class from AI SDK v5 to display a chat prompt within a page.

Pass the `status` prop and listen to the `stop` and `reload` events to control the chat.

```vue [pages/\[id\\].vue] {2,7-11,33}
<script setup lang="ts">
import { Chat } from '@ai-sdk/vue'

const input = ref('')

const chat = new Chat({
  onError(error) {
    console.error(error)
  }
})

function onSubmit() {
  chat.sendMessage({ text: input.value })

  input.value = ''
}
</script>

<template>
  <B24Card>
    <B24Container>
      <B24ChatMessages :messages="chat.messages" :status="chat.status">
        <template #content="{ message }">
          <template v-for="(part, index) in message.parts" :key="`${message.id}-${part.type}-${index}`">
            <MDC v-if="part.type === 'text' && message.role === 'assistant'" :value="part.text" :cache-key="`${message.id}-${index}`" class="*:first:mt-0 *:last:mb-0" />
            <p v-else-if="part.type === 'text' && message.role === 'user'" class="whitespace-pre-wrap">{{ part.text }}</p>
          </template>
        </template>
      </B24ChatMessages>
    </B24Container>

    <template #footer>
      <B24Container class="pb-4 sm:pb-6">
        <B24ChatPrompt v-model="input" :error="chat.error" @submit="onSubmit">
          <B24ChatPromptSubmit :status="chat.status" @stop="chat.stop()" @reload="chat.regenerate()" />
        </B24ChatPrompt>
      </B24Container>
    </template>
  </B24Card>
</template>
```

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
