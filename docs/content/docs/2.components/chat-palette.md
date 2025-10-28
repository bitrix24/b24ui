---
title: ChatPalette
description: 'A chat interface component designed to be displayed in a modal overlay.'
category: chat
badge: soon
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatPalette.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-palette
---

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

## Usage

The ChatPalette component is a structured layout wrapper that organizes [ChatMessages](/docs/components/chat-messages/) in a scrollable content area and [ChatPrompt](/docs/components/chat-prompt/) in a fixed bottom section, creating cohesive chatbot interfaces for modals, slideovers.

```vue{2,8}
<template>
  <B24ChatPalette>
    <B24ChatMessages />

    <template #prompt>
      <B24ChatPrompt />
    </template>
  </B24ChatPalette>
</template>
```

## Examples

::note{to="https://ai-sdk.dev/docs/getting-started/nuxt" target="_blank"}
These chat components are designed to be used with the **AI SDK v5** from **Vercel AI SDK**.
::

### Within a Modal

You can use the ChatPalette component inside a [Modal](/docs/components/modal/)'s content.

::component-example
---
collapse: true
iframe:
  height: 500px;
iframeMobile: true
overflowHidden: true
name: 'chat-palette-modal-example'
---
::

### Within ContentSearch

You can use the ChatPalette component conditionally inside [ContentSearch](/docs/components/content-search/)'s content to display a chatbot interface when a user selects an item.

::component-example
---
collapse: true
iframe:
  height: 500px;
iframeMobile: true
overflowHidden: true
name: 'chat-palette-content-search-example'
---
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
