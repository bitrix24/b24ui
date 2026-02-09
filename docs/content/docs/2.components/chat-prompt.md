---
title: ChatPrompt
description: 'An enhanced Textarea component optimized for prompt submission in AI chat interfaces.'
category: chat
badge: New
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
  variant: 'tinted'
  autofocus: false
---
::

## Examples

::tip{to="/docs/components/chat-messages/#examples"}
Check the **ChatMessages** documentation for server API setup and installation instructions.
::

### Within a page

Use the ChatPrompt component with the `Chat` class from AI SDK v5 to display a chat prompt within a page.

Pass the `input` prop alongside the `error` prop to disable the textarea when an error occurs.

```vue [pages/\[id\\].vue] {2,5,13-17,32,34}
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
