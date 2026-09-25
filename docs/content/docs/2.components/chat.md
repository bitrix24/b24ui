---
title: Chat
description: Develop AI-powered chat interfaces with streaming responses, reasoning capabilities, and tool calling.
category: chat
index: true
links:
  - label: AI SDK
    avatar:
      src: https://github.com/vercel.png
    to: https://ai-sdk.dev/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat
---

Bitrix24 UI provides a set of components designed to build AI-powered chat interfaces. They integrate seamlessly with the [Vercel AI SDK](https://ai-sdk.dev/) for streaming responses, reasoning, tool calling, and more.

## Components

| Component | Description |
| --- | --- |
| [ChatMessages](/docs/components/chat-messages/) | Scrollable message list with auto-scroll and loading indicator. |
| [ChatMessage](/docs/components/chat-message/) | Individual message bubble with avatar, actions, and slots. |
| [ChatPrompt](/docs/components/chat-prompt/) | Enhanced textarea for submitting prompts. |
| [ChatPromptSubmit](/docs/components/chat-prompt-submit/) | Submit button with automatic status handling. |
| [ChatReasoning](/docs/components/chat-reasoning/) | Collapsible block for AI reasoning / thinking process. |
| [ChatTool](/docs/components/chat-tool/) | Collapsible block for AI tool invocation status. |
| [ChatShimmer](/docs/components/chat-shimmer/) | Text shimmer animation for streaming states. |
| [ChatPalette](/docs/components/chat-palette/) | Layout wrapper for embedding chat in modals or drawers. |

## Installation

The Chat components are designed to be used with the [Vercel AI SDK](https://ai-sdk.dev/), specifically the [`useChat`](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat) composable for managing chat state and streaming responses. The examples on this page target AI SDK v7.

Install the required dependencies:

::code-group{sync="pm"}

```bash [pnpm]
pnpm add ai @ai-sdk/gateway @ai-sdk/vue
```

```bash [yarn]
yarn add ai @ai-sdk/gateway @ai-sdk/vue
```

```bash [npm]
npm install ai @ai-sdk/gateway @ai-sdk/vue
```

```bash [bun]
bun add ai @ai-sdk/gateway @ai-sdk/vue
```

::

## Server Setup

Create a server API endpoint to handle chat requests using [`streamText`](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text). You can use the [Vercel AI Gateway](https://vercel.com/ai-gateway) to access AI models through a centralized endpoint:

```ts [server/api/chat.post.ts]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { gateway } from '@ai-sdk/gateway'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: gateway('anthropic/claude-sonnet-5'),
    maxOutputTokens: 10000,
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages)
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

### Reasoning

To enable [reasoning](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot#reasoning), configure `providerOptions` for your provider ([Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic#reasoning), [Google](https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai#thinking), [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai#reasoning)):

```ts [server/api/chat.post.ts]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { gateway } from '@ai-sdk/gateway'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: gateway('anthropic/claude-sonnet-5'),
    maxOutputTokens: 10000,
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
    providerOptions: {
      anthropic: {
        thinking: {
          type: 'adaptive'
        },
        effort: 'low'
      },
      google: {
        thinkingConfig: {
          includeThoughts: true,
          thinkingLevel: 'low'
        }
      },
      openai: {
        reasoningEffort: 'low',
        reasoningSummary: 'detailed'
      }
    }
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

### Web Search

Some providers offer built-in web search tools: [Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic#web-search-tool), [Google](https://ai-sdk.dev/providers/ai-sdk-providers/google#google-search), [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai#web-search-tool).

::code-group

```ts [Anthropic]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { gateway } from '@ai-sdk/gateway'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: gateway('anthropic/claude-sonnet-5'),
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
    tools: {
      web_search: anthropic.tools.webSearch_20260209({})
    }
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

```ts [Google]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { google } from '@ai-sdk/google'
import { gateway } from '@ai-sdk/gateway'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: gateway('google/gemini-3-flash'),
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
    tools: {
      google_search: google.tools.googleSearch({})
    }
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

```ts [OpenAI]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { openai } from '@ai-sdk/openai'
import { gateway } from '@ai-sdk/gateway'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: gateway('openai/gpt-5-nano'),
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
    tools: {
      web_search: openai.tools.webSearch({})
    }
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

::

### Tool Calling with MCP

Empower your chatbot with advanced tool-calling features using the [Model Context Protocol (MCP)](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools) from `@ai-sdk/mcp`. MCP enables your AI to perform dynamic actions, such as searching your documentation or executing custom tasks, to provide more relevant and accurate responses.

To get started, install the MCP package:

:::code-group

```bash [npm]
npm install @ai-sdk/mcp
```

```bash [pnpm]
pnpm add @ai-sdk/mcp
```

```bash [yarn]
yarn add @ai-sdk/mcp
```

:::

Then, configure your server endpoint to use MCP tools:

```ts [server/api/chat.post.ts]
import { streamText, convertToModelMessages, isStepCount, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { createMCPClient } from '@ai-sdk/mcp'
import { gateway } from '@ai-sdk/gateway'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const httpClient = await createMCPClient({
    transport: { type: 'http', url: 'https://your-app.com/mcp' }
  })
  try {
    const tools = await httpClient.tools()

    const result = streamText({
      model: gateway('anthropic/claude-sonnet-5'),
      maxOutputTokens: 10000,
      instructions: 'You are a helpful assistant. Use your tools to search for relevant information before answering questions.',
      messages: await convertToModelMessages(messages),
      stopWhen: isStepCount(6),
      tools,
      onEnd: async () => {
        await httpClient.close()
      },
      onError: async (error) => {
        console.error(error)
        await httpClient.close()
      }
    })

    const stream = toUIMessageStream({ stream: result.stream })
    return createUIMessageStreamResponse({ stream })
  } catch (error) {
    // Close the MCP client if setup fails before streaming starts
    await httpClient.close()
    throw error
  }
})
```

::tip

You can use the [DeepSeek Provider](https://ai-sdk.dev/providers/ai-sdk-providers/deepseek) to access AI model through a centralized endpoint:

Install the required dependencies:

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

Create a server API endpoint:

```ts [server/api/chat.post.ts]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { createDeepSeek } from '@ai-sdk/deepseek'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? ''
  })

  const result = streamText({
    model: deepseek('deepseek-reasoner'), // or 'deepseek-chat'
    maxOutputTokens: 10000,
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages)
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

**Reasoning**

```ts [server/api/chat.post.ts]
import { streamText, convertToModelMessages, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { createDeepSeek } from '@ai-sdk/deepseek'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? ''
  })

  const result = streamText({
    model: deepseek('deepseek-reasoner'), // or 'deepseek-chat'
    maxOutputTokens: 10000,
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
    providerOptions: {
      openai: {
        reasoningEffort: 'low',
        reasoningSummary: 'detailed'
      }
    }
  })

  const stream = toUIMessageStream({ stream: result.stream })
  return createUIMessageStreamResponse({ stream })
})
```

**Tool Calling (MCP)**

```ts [server/api/chat.post.ts]
import { streamText, convertToModelMessages, isStepCount, smoothStream, toUIMessageStream, createUIMessageStreamResponse } from 'ai'
import { createMCPClient } from '@ai-sdk/mcp'
import { createDeepSeek } from '@ai-sdk/deepseek'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  if (!messages || !Array.isArray(messages)) {
    throw createError({ status: 400, message: 'Invalid or missing messages array.' })
  }

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? ''
  })

  const httpClient = await createMCPClient({
    transport: { type: 'http', url: 'https://your-app.com/mcp' }
  })
  try {
    const tools = await httpClient.tools()

    const result = streamText({
      model: deepseek('deepseek-reasoner'), // or 'deepseek-chat'
      maxOutputTokens: 10000,
      instructions: 'You are a helpful assistant. Use your tools to search for relevant information before answering questions.',
      messages: await convertToModelMessages(messages),
      experimental_transform: smoothStream(),
      stopWhen: isStepCount(6),
      tools,
      onEnd: async () => {
        await httpClient.close()
      },
      onError: async (error) => {
        console.error(error)
        await httpClient.close()
      }
    })

    const stream = toUIMessageStream({ stream: result.stream })
    return createUIMessageStreamResponse({ stream })
  } catch (error) {
    // Close the MCP client if setup fails before streaming starts
    await httpClient.close()
    throw error
  }
})
```

::

## Client Setup

Use the `useChat` composable from `@ai-sdk/vue` to manage chat state and connect to your server endpoint:

```vue
<script setup lang="ts">
import { isReasoningUIPart, isTextUIPart, isToolUIPart, getToolName } from 'ai'
import { useChat } from '@ai-sdk/vue'
import { isPartStreaming, isToolStreaming } from '@bitrix24/b24ui-nuxt/utils/ai'

const input = ref('')

const { messages, status, error, sendMessage, regenerate, stop } = useChat({
  onError(error) {
    console.error(error)
  }
})

function onSubmit() {
  sendMessage({ text: input.value })

  input.value = ''
}
</script>

<template>
  <B24ChatMessages
    :messages="messages"
    :status="status"
  >
    <template #content="{ message }">
      <template
        v-for="(part, index) in message.parts"
        :key="`${message.id}-${part.type}-${index}`"
      >
        <B24ChatReasoning
          v-if="isReasoningUIPart(part)"
          :text="part.text"
          :streaming="isPartStreaming(part)"
        >
          <MDC
            :value="part.text"
            :cache-key="`reasoning-${message.id}-${index}`"
            class="*:first:mt-0 *:last:mb-0"
          />
        </B24ChatReasoning>

        <B24ChatTool
          v-else-if="isToolUIPart(part)"
          :text="getToolName(part)"
          :streaming="isToolStreaming(part)"
        />

        <template v-else-if="isTextUIPart(part)">
          <MDC
            v-if="message.role === 'assistant'"
            :value="part.text"
            :cache-key="`${message.id}-${index}`"
            class="*:first:mt-0 *:last:mb-0"
          />
          <p v-else-if="message.role === 'user'" class="whitespace-pre-wrap">
            {{ part.text }}
          </p>
        </template>
      </template>
    </template>
  </B24ChatMessages>

  <B24ChatPrompt
    v-model="input"
    :error="error"
    @submit="onSubmit"
  >
    <B24ChatPromptSubmit
      :status="status"
      @stop="stop()"
      @reload="regenerate()"
    />
  </B24ChatPrompt>
</template>
```

::note
In this example, we use the `MDC` component from [`@nuxtjs/mdc`](https://github.com/nuxt-modules/mdc) to render messages as Markdown. As Bitrix24 UI provides pre-styled prose components, your content will be automatically styled.
::
