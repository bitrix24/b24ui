---
title: ChatMessages
description: 'A chat messages list component designed for seamless integration with the Vercel AI SDK.'
category: chat
badge: soon
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatMessages.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-messages
  - label: AI SDK
    icon: i-simple-icons-vercel
    to: https://ai-sdk.dev/
    target: _blank
---

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

## Usage :badge{label="2.2+"}

The ChatMessages component displays a list of [ChatMessage](/docs/components/chat-message/) components using either the default slot or the `messages` prop.

```vue {2,8}
<template>
  <B24ChatMessages>
    <B24ChatMessage
      v-for="(message, index) in messages"
      :key="index"
      v-bind="message"
    />
  </B24ChatMessages>
</template>
```

::callout{color="air-secondary"}
This component is purpose-built for AI chatbots with features like:

- Initial scroll to the bottom upon loading ([`shouldScrollToBottom`](#should-scroll-to-bottom)).
- Continuous scrolling down as new messages arrive ([`shouldAutoScroll`](#should-auto-scroll)).
- An "Auto scroll" button appears when scrolled up, allowing users to jump back to the latest messages ([`autoScroll`](#auto-scroll)).
- A loading indicator displays while the assistant is processing ([`status`](#status)).
- Submitted messages are scrolled to the top of the viewport and the height of the last user message is dynamically adjusted.
::

### Messages

Use the `messages` prop to display a list of chat messages.

::component-code
---
prettier: true
external:
  - messages
ignore:
  - messages
hide:
  - shouldScrollToBottom
collapse: true
class: 'overflow-y-auto'
props:
  messages:
    - id: '6045235a-a435-46b8-989d-2df38ca2eb47'
      role: user
      parts:
        - type: 'text'
          text: 'Hello, how are you?'
    - id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8'
      role: assistant
      parts:
        - type: 'text'
          text: 'I am doing well, thank you for asking! How can I assist you today?'
    - id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a'
      role: user
      parts:
        - type: 'text'
          text: 'What is the current weather in Tokyo?'
    - id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: "Based on the latest data, Tokyo is currently experiencing sunny weather with temperatures around 24°C (75°F). It's a beautiful day with clear skies."
  shouldScrollToBottom: false
---
::

### Status

Use the `status` prop to display a visual indicator when the assistant is processing.

::component-code
---
prettier: true
external:
  - messages
ignore:
  - messages
  - status
hide:
  - shouldScrollToBottom
class: 'overflow-y-auto'
props:
  status: 'submitted'
  messages:
    - id: '6045235a-a435-46b8-989d-2df38ca2eb47'
      role: user
      parts:
        - type: 'text'
          text: 'Hello, how are you?'
  shouldScrollToBottom: false
---
::

::note
Here's the detail of the different statuses from the AI SDK v5 Chat class:

- `submitted`: The message has been sent to the API and we're awaiting the start of the response stream.
- `streaming`: The response is actively streaming in from the API, receiving chunks of data.
- `ready`: The full response has been received and processed; a new user message can be submitted.
- `error`: An error occurred during the API request, preventing successful completion.
::

### User

Use the `user` prop to change the [ChatMessage](/docs/components/chat-message/) props for `user` messages. Defaults to:

- `side: 'right'`{lang="ts-type"}
- `variant: 'message'`{lang="ts-type"}

::component-code
---
prettier: true
external:
  - messages
ignore:
  - messages
  - avatar.src
hide:
  - shouldScrollToBottom
collapse: true
items:
  user.variant:
    - message
    - event
    - system
  user.side:
    - left
    - right
class: 'overflow-y-auto'
props:
  user:
    side: left
    variant: message
    avatar:
      src: https://github.com/bitrix24.png
  messages:
    - id: '6045235a-a435-46b8-989d-2df38ca2eb47'
      role: user
      parts:
        - type: 'text'
          text: 'Hello, how are you?'
    - id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8'
      role: assistant
      parts:
        - type: 'text'
          text: 'I am doing well, thank you for asking! How can I assist you today?'
    - id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a'
      role: user
      parts:
        - type: 'text'
          text: 'What is the current weather in Tokyo?'
    - id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: "Based on the latest data, Tokyo is currently experiencing sunny weather with temperatures around 24°C (75°F). It's a beautiful day with clear skies."
  shouldScrollToBottom: false
---
::

### Assistant

Use the `assistant` prop to change the [ChatMessage](/docs/components/chat-message/) props for `assistant` messages. Defaults to:

- `side: 'left'`{lang="ts-type"}
- `variant: 'message'`{lang="ts-type"}

::component-code
---
prettier: true
external:
  - messages
ignore:
  - messages
  - avatar.src
  - assistant.actions
hide:
  - shouldScrollToBottom
collapse: true
items:
  assistant.variant:
    - message
    - event
    - system
  assistant.side:
    - left
    - right
class: 'overflow-y-auto'
props:
  assistant:
    side: left
    variant: message
    avatar:
      src: '/b24ui/avatar/employee.png'
    actions:
      - label: 'Copy to clipboard'
  messages:
    - id: '6045235a-a435-46b8-989d-2df38ca2eb47'
      role: user
      parts:
        - type: 'text'
          text: 'Hello, how are you?'
    - id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8'
      role: assistant
      parts:
        - type: 'text'
          text: 'I am doing well, thank you for asking! How can I assist you today?'
    - id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a'
      role: user
      parts:
        - type: 'text'
          text: 'What is the current weather in Tokyo?'
    - id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: "Based on the latest data, Tokyo is currently experiencing sunny weather with temperatures around 24°C (75°F). It's a beautiful day with clear skies."
  shouldScrollToBottom: false
---
::

### Auto Scroll

Use the `auto-scroll` prop to customize or hide the auto scroll button (with `false` value) displayed when scrolling to the top of the chat. Defaults to:

- `color: 'air-secondary-no-accent'`{lang="ts-type"}

You can pass any property from the [Button](/docs/components/button/) component to customize it.

::component-code
---
prettier: true
collapse: true
external:
  - messages
ignore:
  - messages
  - autoScroll.color
  - shouldScrollToBottom
class: 'overflow-y-auto max-h-[341px] static'
props:
  autoScroll:
    color: air-secondary-no-accent
  shouldScrollToBottom: false
  messages:
    - id: '6045235a-a435-46b8-989d-2df38ca2eb47'
      role: user
      parts:
        - type: 'text'
          text: 'Hello, how are you?'
    - id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8'
      role: assistant
      parts:
        - type: 'text'
          text: 'I am doing well, thank you for asking! How can I assist you today?'
    - id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a'
      role: user
      parts:
        - type: 'text'
          text: 'What is the current weather in Tokyo?'
    - id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: "Based on the latest data, Tokyo is currently experiencing sunny weather with temperatures around 24°C (75°F). It's a beautiful day with clear skies. The forecast for the rest of the week shows a slight chance of rain on Thursday, with temperatures gradually rising to 28°C by the weekend. Humidity levels are moderate at around 65%, and wind speeds are light at 8 km/h from the southeast. Air quality is good with an index of 42. The UV index is high at 7, so it's recommended to wear sunscreen if you're planning to spend time outdoors. Sunrise was at 5:24 AM and sunset will be at 6:48 PM, giving Tokyo approximately 13 hours and 24 minutes of daylight today. The moon is currently in its waxing gibbous phase."
    - id: 'c3e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: user
      parts:
        - type: 'text'
          text: 'Can you recommend some popular tourist attractions in Kyoto?'
    - id: 'd4f5g8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: 'Kyoto is known for its beautiful temples, traditional tea houses, and gardens. Some popular attractions include Kinkaku-ji (Golden Pavilion) with its stunning gold leaf exterior reflecting in the mirror pond, Fushimi Inari Shrine with its thousands of vermilion torii gates winding up the mountainside, Arashiyama Bamboo Grove where towering stalks create an otherworldly atmosphere, Kiyomizu-dera Temple perched on a hillside offering panoramic views of the city, and the historic Gion district where you might spot geisha hurrying to evening appointments through narrow stone-paved streets lined with traditional wooden machiya houses.'
---
::

### Auto Scroll Icon

Use the `auto-scroll-icon` prop to customize the auto scroll button [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
collapse: true
external:
  - messages
ignore:
  - messages
  - autoScroll.color
  - shouldScrollToBottom
  - autoScrollIcon
cast:
  autoScrollIcon: 'RocketIcon'
class: 'overflow-y-auto max-h-[341px] static'
props:
  autoScrollIcon: 'RocketIcon'
  shouldScrollToBottom: false
  messages:
    - id: '6045235a-a435-46b8-989d-2df38ca2eb47'
      role: user
      parts:
        - type: 'text'
          text: 'Hello, how are you?'
    - id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8'
      role: assistant
      parts:
        - type: 'text'
          text: 'I am doing well, thank you for asking! How can I assist you today?'
    - id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a'
      role: user
      parts:
        - type: 'text'
          text: 'What is the current weather in Tokyo?'
    - id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: "Based on the latest data, Tokyo is currently experiencing sunny weather with temperatures around 24°C (75°F). It's a beautiful day with clear skies. The forecast for the rest of the week shows a slight chance of rain on Thursday, with temperatures gradually rising to 28°C by the weekend. Humidity levels are moderate at around 65%, and wind speeds are light at 8 km/h from the southeast. Air quality is good with an index of 42. The UV index is high at 7, so it's recommended to wear sunscreen if you're planning to spend time outdoors. Sunrise was at 5:24 AM and sunset will be at 6:48 PM, giving Tokyo approximately 13 hours and 24 minutes of daylight today. The moon is currently in its waxing gibbous phase."
    - id: 'c3e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: user
      parts:
        - type: 'text'
          text: 'Can you recommend some popular tourist attractions in Kyoto?'
    - id: 'd4f5g8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4'
      role: assistant
      parts:
        - type: 'text'
          text: 'Kyoto is known for its beautiful temples, traditional tea houses, and gardens. Some popular attractions include Kinkaku-ji (Golden Pavilion) with its stunning gold leaf exterior reflecting in the mirror pond, Fushimi Inari Shrine with its thousands of vermilion torii gates winding up the mountainside, Arashiyama Bamboo Grove where towering stalks create an otherworldly atmosphere, Kiyomizu-dera Temple perched on a hillside offering panoramic views of the city, and the historic Gion district where you might spot geisha hurrying to evening appointments through narrow stone-paved streets lined with traditional wooden machiya houses.'
---
::

### Should Auto Scroll

Use the `should-auto-scroll` prop to enable/disable continuous auto scroll while messages are streaming. Defaults to `false`.

```vue
<template>
  <B24ChatMessages :messages="messages" should-auto-scroll />
</template>
```

### Should Scroll To Bottom

Use the `should-scroll-to-bottom` prop to enable/disable bottom auto scroll when the component is mounted. Defaults to `true`.

```vue
<template>
  <B24ChatMessages :messages="messages" :should-scroll-to-bottom="false" />
</template>
```

## Examples

The Chat components are designed to be used with the [Vercel AI SDK](https://ai-sdk.dev/), specifically the [`Chat`](https://ai-sdk.dev/docs/reference/ai-sdk-ui/chat) class for managing chat state and streaming responses.

First, install the required dependencies:

::code-group{sync="pm"}

```bash [pnpm]
pnpm add ai @ai-sdk/deepseek @ai-sdk/vue
```

```bash [yarn]
yarn add ai @ai-sdk/deepseek @ai-sdk/vue
```

```bash [npm]
npm install ai @ai-sdk/deepseek @ai-sdk/vue
```

```bash [bun]
bun add ai @ai-sdk/deepseek @ai-sdk/vue
```

::

Then, create a server API endpoint to handle chat requests using [`streamText`](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text) from the AI SDK.
You can use the [DeepSeek Provider](https://ai-sdk.dev/providers/ai-sdk-providers/deepseek to access AI model through a centralized endpoint:

```ts [server/api/chat.post.ts]
import { streamText, convertToModelMessages } from 'ai'
import { createDeepSeek } from '@ai-sdk/deepseek'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? ''
  })

  return streamText({
    model: deepseek('deepseek-reasoner'), // or 'deepseek-chat'
    maxOutputTokens: 10000,
    system: 'You are a helpful assistant.',
    messages: convertToModelMessages(messages)
  }).toUIMessageStreamResponse()
})
```

### Within a page

Use the ChatMessages component with the `Chat` class from AI SDK v5 to display a list of chat messages within a page.

Pass the `messages` prop alongside the `status` prop that will be used for the auto scroll and the indicator display.

```vue [pages/\[id\\].vue] {2,7-11,24,28}
<script setup lang="ts">
import { Chat } from '@ai-sdk/vue'
import { getTextFromMessage } from '@bitrix24/b24ui-nuxt/utils/ai'

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
          <B24ChatPromptSubmit :status="chat.status" @stop="chat.stop()" @reload="chat.regenerate()" />
        </B24ChatPrompt>
      </B24Container>
    </template>
  </B24Card>
</template>
```

::note
In this example, we use the `MDC` component from [`@nuxtjs/mdc`](https://github.com/nuxt-modules/mdc) to render the content of the message. The `getTextFromMessage` utility extracts the text content from the AI SDK V5 message parts. As Bitrix24 UI provides pre-styled prose components, your content will be automatically styled.
::

### With indicator slot

You can customize the loading indicator that appears when the status is `submitted`.

::component-example
---
name: "chat-messages-indicator-slot-example"
class: 'overflow-y-auto'
collapse: true
---
::


## API

### Props

:component-props

### Slots

:component-slots

::tip
You can use all the slots of the [`ChatMessage`](/docs/components/chat-message/#slots) component inside ChatMessages, they are automatically forwarded allowing you to customize individual messages when using the `messages` prop.

```vue{7-9}
<script setup lang="ts">
import { getTextFromMessage } from '@bitrix24/b24ui-nuxt/utils/ai'
</script>

<template>
  <B24ChatMessages :messages="messages" :status="status">
    <template #content="{ message }">
      <MDC :value="getTextFromMessage(message)" :cache-key="message.id" class="*:first:mt-0 *:last:mb-0" />
    </template>
  </B24ChatMessages>
</template>
```
::

## Theme

:component-theme
