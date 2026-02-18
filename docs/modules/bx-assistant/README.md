# BxAssistant Module

A Nuxt module that provides an AI-powered chat interface using MCP (Model Context Protocol) tools.

See [Docus assistant](https://github.com/nuxt-content/docus/blob/main/layer/modules/assistant/)

## Installation

1. Copy the `modules/bx-assistant` folder to your Nuxt project
2. Install the required dependencies:

```bash
pnpm add @ai-sdk/mcp @ai-sdk/vue @ai-sdk/deepseek ai motion-v shiki shiki-stream @shikijs/core @shikijs/engine-javascript @shikijs/langs @shikijs/themes
```

3. Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['./modules/bx-assistant'],

  bxAssistant: {
    apiPath: '/__bx__/assistant',
    mcpServer: '/mcp',
    model: 'deepseek-reasoner'
  }
})
```

4. Set up your API key as an environment variable:

```bash
DEEPSEEK_API_KEY=your-deepseek-api-key
```

> **Note:** The module will only be enabled if `DEEPSEEK_API_KEY` is detected. If no key is found, the module is disabled and a message is logged to the console.

## Usage

Add the components to your app:

```vue
<template>
  <div>
    <!-- Button to open the chat -->
    <AssistantChat />

    <!-- Chat panel (place once in your app/layout) -->
    <AssistantPanel />
  </div>
</template>
```

### FAQ Questions

Configure FAQ questions in your `app.config.ts`:

```ts
export default defineAppConfig({
  bxAssistant: {
    faqQuestions: [
      {
        category: 'Getting Started',
        items: ['How do I install?', 'How do I configure?']
      },
      {
        category: 'Advanced',
        items: ['How do I customize?']
      }
    ]
  }
})
```

You can also use localized FAQ questions:

```ts
export default defineAppConfig({
  bxAssistant: {
    faqQuestions: {
      en: ['How do I install?', 'How do I configure?'],
      fr: ['Comment installer ?', 'Comment configurer ?']
    }
  }
})
```

### Floating Input

Use `AssistantFloatingInput` for a floating input at the bottom of the page.

**Recommended:** Use `Teleport` to render the floating input at the body level, ensuring it stays fixed at the bottom regardless of your component hierarchy:

```vue
<template>
  <div>
    <!-- Teleport to body for proper fixed positioning -->
    <Teleport to="body">
      <ClientOnly>
        <LazyAssistantFloatingInput />
      </ClientOnly>
    </Teleport>

    <!-- Chat panel (required to display responses) -->
    <AssistantPanel />
  </div>
</template>
```

The floating input:
- Appears at the bottom center of the viewport
- Automatically hides when the chat slideover is open
- Expands on focus for better typing experience
- Supports keyboard shortcuts: `⌘I` to focus, `Escape` to blur

### Programmatic Control

Use the `useAssistant` composable to control the chat:

```vue
<script setup>
const { open, close, toggle, isOpen, messages, clearMessages } = useAssistant()

// Open chat with an initial message
open('How do I install the module?')

// Open and clear previous messages
open('New question', true)

// Toggle chat visibility
toggle()

// Clear all messages
clearMessages()
</script>
```

## Module Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiPath` | `string` | `/__docbx__/assistant` | API endpoint path for the chat |
| `mcpServer` | `string` | `/mcp` | MCP server path or full URL (e.g., `https://docs.example.com/mcp` for external servers) |
| `model` | `string` | `deepseek-reasoner` | AI model to use via AI DeepSeek `deepseek-reasoner` \| `deepseek-chat` |

## Components

### `<AssistantChat>`

Button to toggle the chat panel. The tooltip text is automatically translated using i18n (`assistant.tooltip`).

### `<AssistantPanel>`

Main chat interface displayed as a side panel. Configuration is done via `app.config.ts` (see FAQ Questions section above).

### `<AssistantFloatingInput>`

Floating input field positioned at the bottom of the viewport. No props required.

**Keyboard shortcuts:**
- `⌘I` / `Ctrl+I` - Focus the input
- `Escape` - Blur the input
- `Enter` - Submit the question

## Composables

### `useAssistant`

Main composable for controlling the chat state.

```ts
const {
  isOpen,         // Ref<boolean> - Whether the chat is open
  messages,       // Ref<UIMessage[]> - Chat messages
  pendingMessage, // Ref<string | undefined> - Pending message to send
  faqQuestions,   // ComputedRef<FaqCategory[]> - FAQ questions from config
  open,           // (message?: string, clearPrevious?: boolean) => void
  close,          // () => void
  toggle,         // () => void
  clearMessages,  // () => void
  clearPending,   // () => void
} = useAssistant()
```

### `useHighlighter`

Composable for syntax highlighting code blocks with Shiki.

## Requirements

- Nuxt 4.x
- Bitrix24 UI 2.3.x (for `B24Slideover`, `B24Button`, `B24Textarea`, `B24ChatMessages`, etc.)
- An MCP server running (path configurable via `mcpServer`)
- `DEEPSEEK_API_KEY` environment variable

## Customization

### System Prompt

To customize the AI's behavior, edit the system prompt in:
`runtime/server/api/search.post.ts`

### Styling

The components use Nuxt UI and Tailwind CSS design tokens. Customize the appearance by modifying the component files or overriding the UI props.
