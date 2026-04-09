---
title: ChatReasoning
description: An expandable panel that shows the AI's internal reasoning steps.
category: chat
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatReasoning.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/chat-reasoning
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-reasoning
  - label: Collapsible
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/collapsible
navigation.badge: Soon
---

## Usage

The ChatReasoning component renders a collapsible block that displays AI reasoning or thinking content. It auto-opens during streaming and auto-closes after.

::component-example
---
collapse: true
prettier: true
name: 'chat-reasoning-example'
class: 'h-[252px]'
---
::

::note{to="/docs/composables/use-scroll-shadow/"}
The body content uses the `useScrollShadow` composable to apply fade shadows when overflowing.
::

### Streaming

Use the `streaming` prop to indicate active reasoning. The component auto-opens when streaming starts and auto-closes when it ends.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
props:
  streaming: true
  text: 'Let me think about this...'
  class: 'w-60'
---
::

::tip{to="#within-a-page"}
Use the `isStreamingPart` utility from `@bitrix24/b24ui-nuxt/utils/ai` to determine if a specific message part is currently being streamed.
::

### Shimmer

When streaming, the trigger label uses the [`ChatShimmer`](/docs/components/chat-shimmer/) component. Use the `shimmer` prop to customize its `duration` and `spread`.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
props:
  streaming: true
  text: 'Let me think about this...'
  shimmer:
    duration: 2
    spread: 2
  class: 'w-60'
---
::

### Icon

Use the `icon` prop to display an [Icon](https://bitrix24.github.io/b24icons/icons/) component next to the trigger.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  text: 'The user is asking about Vue components...'
  class: 'w-60'
---
::

### Chevron

Use the `chevron` prop to change the position of the chevron icon.

::note
When `chevron` is set to `leading` with an `icon`, the icon swaps with the chevron on hover and when open.
::

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
  - icon
cast:
  icon: 'RocketIcon'
props:
  chevron: leading
  icon: 'RocketIcon'
  text: 'The user is asking about Vue components...'
  class: 'w-60'
---
::

### Chevron Icon

Use the `chevron-icon` prop to customize the chevron [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
hide:
  - class
ignore:
  - text
  - chevronIcon
cast:
    chevronIcon: 'RocketIcon'
props:
  chevronIcon: 'RocketIcon'
  text: 'The user is asking about Vue components...'
  class: 'w-60'
---
::

## Examples

::tip{to="/docs/components/chat-messages/#examples"}
Check the **ChatMessages** documentation for server API setup and installation instructions.
::

### Within a page

Use the ChatReasoning component inside the [`ChatMessages`](/docs/components/chat-messages/) `#content` slot to display reasoning blocks alongside regular message parts.

The AI SDK provides the [`isReasoningUIPart`](https://ai-sdk.dev/docs/reference/ai-sdk-ui/is-reasoning-ui-part) helper to identify reasoning parts in a message.

```vue [pages/\[id\\].vue] {2,4,34-44}
<script setup lang="ts">
import { isReasoningUIPart, isTextUIPart } from 'ai'
import { Chat } from '@ai-sdk/vue'
import { isStreamingPart } from '@bitrix24/b24ui-nuxt/utils/ai'

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
  <B24DashboardPanel>
    <template #body>
      <B24Container>
        <B24ChatMessages
          :messages="chat.messages"
          :status="chat.status"
        >
          <template #content="{ message }">
            <template
              v-for="(part, index) in message.parts"
              :key="`${message.id}-${part.type}-${index}`"
            >
              <B24ChatReasoning
                v-if="isReasoningUIPart(part)"
                :text="part.text"
                :streaming="isStreamingPart(message, index, chat)"
              >
                <MDC
                  :value="part.text"
                  :cache-key="`reasoning-${message.id}-${index}`"
                  class="*:first:mt-0 *:last:mb-0"
                />
              </B24ChatReasoning>

              <MDC
                v-else-if="isTextUIPart(part)"
                :value="part.text"
                :cache-key="`${message.id}-${index}`"
                class="*:first:mt-0 *:last:mb-0"
              />
            </template>
          </template>
        </B24ChatMessages>
      </B24Container>
    </template>

    <template #footer>
      <B24Container class="pb-4 sm:pb-6">
        <B24ChatPrompt
          v-model="input"
          :error="chat.error"
          @submit="onSubmit"
        >
          <B24ChatPromptSubmit
            :status="chat.status"
            @stop="chat.stop()"
            @reload="chat.regenerate()"
          />
        </B24ChatPrompt>
      </B24Container>
    </template>
  </B24DashboardPanel>
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
