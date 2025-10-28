---
title: ChatPrompt
description: 'An enhanced Textarea component optimized for prompt submission in AI chat interfaces.'
category: chat
links:
  - label: Textarea
    to: /docs/components/textarea
    icon: i-simple-icons-nuxtdotjs
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/nuxt/ui/blob/v4/src/runtime/components/ChatPrompt.vue
---

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

## Usage

The ChatPrompt component renders a `<form>` element and extends the [Textarea](/docs/components/textarea/) component so you can pass any property such as `icon`, `placeholder`, `autofocus`, etc.

::code-preview

:::b24-chat-prompt
---
variant: 'subtle'
---

#default
::::b24-chat-prompt-submit
---
color: 'air-primary'
class: 'rounded-full'
---
::::

#footer
::::b24-select
---
placeholder: 'Select a model'
modelValue: 'deepseek'
items:
  - label: 'Gemini 2.5 Pro'
    value: 'gemini-2.5-pro'
  - label: 'GPT-4o'
    value: 'gpt-4o'
  - label: 'DeepSeek'
    value: 'deepseek'
  - label: 'Claude 3.5 Sonnet'
    value: 'claude-3.5-sonnet'
  - label: 'Llama 4'
    value: 'llama-4'
---
::::

:::

::

::note
The ChatPrompt handles the following events:

- The form is submitted when the user presses :kbd{value="enter"} or when the user clicks on the submit button.
- The textarea is blurred when :kbd{value="escape"} is pressed and emits a `close` event.
::

### Variant

Use the `variant` prop to change the style of the prompt. Defaults to `outline`.

::component-code
---
hide:
  - autofocus
props:
  variant: 'soft'
  autofocus: false
---
::

## Examples

::note{to="https://ai-sdk.dev/docs/getting-started/nuxt" target="_blank"}
These chat components are designed to be used with the **AI SDK v5** from **Vercel AI SDK**.
::

### Within a page

Use the ChatPrompt component with the `Chat` class from AI SDK v5 to display a chat prompt within a page.

Pass the `input` prop alongside the `error` prop to disable the textarea when an error occurs.

```vue [pages/\[id\\].vue] {2,5,13-17,34,36}
<script setup lang="ts">
import { Chat } from '@ai-sdk/vue'
import { getTextFromMessage } from '@bitrix24/b24ui-nux/utils/ai'

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
          <MDC :value="getTextFromMessage(message)" :cache-key="message.id" class="*:first:mt-0 *:last:mb-0" />
        </template>
      </B24ChatMessages>
    </B24Container>

    <template #footer>
      <B24Container class="pb-4 sm:pb-6">
        <B24ChatPrompt v-model="input" :error="chat.error" @submit="onSubmit">
          <B24ChatPromptSubmit :status="chat.status" @stop="chat.stop" @reload="chat.regenerate" />
        </B24ChatPrompt>
      </B24Container>
    </template>
  </B24Card>
</template>
```

You can also use it as a starting point for a chat interface.

```vue [pages/index.vue] {2,4,8-15,24,26}
<script setup lang="ts">
import { Chat } from '@ai-sdk/vue'

const input = ref('')

const chat = new Chat()

async function onSubmit() {
  chat.sendMessage({ text: input.value })

  // Navigate to chat page after first message
  if (chat.messages.length === 1) {
    await navigateTo('/chat')
  }
}
</script>

<template>
  <B24Card>
    <B24Container>
      <h1>How can I help you today?</h1>

      <B24ChatPrompt v-model="input" @submit="onSubmit">
        <B24ChatPromptSubmit :status="chat.status" />
      </B24ChatPrompt>
    </B24Container>
  </B24Card>
</template>
```

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme
