---
title: ChatMessage
description: 'A chat message component with icon, avatar, and action buttons.'
category: chat
badge: soon
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ChatMessage.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/chat-message
---

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

## Usage

The ChatMessage component renders an `<article>` element for a `user` or `assistant` chat message.

::code-preview

::b24-chat-message
---
parts:
  - type: 'text'
    id: '1'
    text: 'Hello! Tell me more about building AI chatbots with Bitrix24 UI.'
side: 'right'
variant: 'soft'
role: 'user'
id: '1'
avatar:
  src: 'https://github.com/bitrix24.png'
---
::

::

### Parts

Use the `parts` prop to display the message content using the AI SDK v5 format.

::component-code
---
prettier: true
ignore:
  - parts
  - role
  - id
props:
  parts:
    - type: 'text'
      id: '1'
      text: 'Hello! Tell me more about building AI chatbots with Bitrix24 UI.'
  role: 'user'
  id: '1'
---
::

::note
The `parts` prop is the recommended format for AI SDK v5. Each part has a `type` (e.g., 'text') and corresponding content.
::

### Side

Use the `side` prop to display the message on the left or right.

::component-code
---
prettier: true
ignore:
  - parts
  - role
  - id
props:
  side: 'right'
  parts:
    - type: 'text'
      id: '1'
      text: 'Hello! Tell me more about building AI chatbots with Bitrix24 UI.'
  role: 'user'
  id: '1'
---
::

### Variant

Use the `variant` prop to change style of the message.

::component-code
---
prettier: true
ignore:
  - parts
  - role
  - id
props:
  variant: 'message'
  parts:
    - type: 'text'
      id: '1'
      text: 'Hello! Tell me more about building AI chatbots with Bitrix24 UI.'
  role: 'user'
  id: '1'
---
::

### Icon

Use the `icon` prop to display an [Icon](https://bitrix24.github.io/b24icons/guide/icons.html)  component next to the message.

::component-code
---
prettier: true
ignore:
  - parts
  - side
  - variant
  - role
  - id
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  variant: 'message'
  side: 'right'
  parts:
    - type: 'text'
      id: '1'
      text: 'Hello! Tell me more about building AI chatbots with Bitrix24 UI.'
  role: 'user'
  id: '1'
---
::

### Avatar

Use the `avatar` prop to display an [Avatar](/docs/components/avatar/) component next to the message.

::component-code
---
prettier: true
ignore:
  - parts
  - side
  - variant
  - role
  - id
props:
  avatar:
    src: 'https://github.com/bitrix24.png'
  variant: 'message'
  side: 'right'
  parts:
    - type: 'text'
      id: '1'
      text: 'Hello! Tell me more about building AI chatbots with Bitrix24 UI.'
  role: 'user'
  id: '1'
---
::

### Actions

Use the `actions` prop to display actions below the message that will be displayed when hovering over the message.

::component-code
---
prettier: true
external:
  - actions
ignore:
  - parts
  - actions
  - role
  - id
props:
  actions:
    - label: 'Copy to clipboard'
  parts:
    - type: 'text'
      id: '1'
      text: 'Bitrix24 UI offers several features for building AI chatbots including the ChatMessage, ChatMessages, and ChatPrompt components. Best practices include using the Chat class from AI SDK v5, implementing proper message styling with variants, and utilizing the built-in actions for message interactions. The components are fully customizable with theming support and responsive design.'
  role: 'user'
  id: '1'
---
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
