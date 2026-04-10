---
title: ChatPrompt
description: 'An enhanced Textarea component optimized for prompt submission in AI chat interfaces.'
category: chat
links:
  - label: Textarea
    to: /docs/components/textarea/
    iconName: Bitrix24Icon
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatPrompt.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-prompt
---

## Usage

The ChatPrompt component renders a `<form>` element and extends the [Textarea](/docs/components/textarea/) component so you can pass any property such as `icon`, `placeholder`, `autofocus`, etc.

::code-preview

:::b24-chat-prompt
---
variant: 'outline'
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
size: 'sm'
items:
  - label: 'BitrixGPT 5'
    value: 'bitrix-gpt-5'
  - label: 'Claude Opus 4.6'
    value: 'claude-opus-4.6'
  - label: 'Gemini 3 Pro'
    value: 'gemini-3-pro'
  - label: 'GPT-5'
    value: 'gpt-5'
  - label: 'DeepSeek'
    value: 'deepseek'
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
  variant: 'tinted'
  autofocus: false
---
::

## Examples

::tip{to="/docs/components/chat/"}
Check the **Chat** overview page for installation instructions, server setup and usage examples.
::

### As a starting point

You can also use it as a starting point for a chat interface.

```vue [pages/index.vue] {2,4,8-15,23,25}
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
  <B24DashboardPanel>
    <template #body>
      <B24Container>
        <h1>How can I help you today?</h1>
  
        <B24ChatPrompt v-model="input" @submit="onSubmit">
          <B24ChatPromptSubmit :status="chat.status" />
        </B24ChatPrompt>
      </B24Container>
    </template>
  </B24DashboardPanel>
</template>
```

### Speech Recognition

Use composable [useSpeechRecognition](/docs/composables/use-speech-recognition/) to provide speech recognition using the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

::component-example
---
collapse: true
class: '!p-0'
border: false
name: 'chat-prompt-speech-recognition-example'
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
