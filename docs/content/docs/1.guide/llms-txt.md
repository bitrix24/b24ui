---
title: LLMs.txt
description: 'How to get AI tools like Cursor, Windsurf, GitHub Copilot, ChatGPT, and Claude to understand Bitrix24 UI components, theming, and best practices.'
---
# LLMs.txt
<Description>
  How to get AI tools like Cursor, Windsurf, GitHub Copilot, ChatGPT, and Claude to understand Bitrix24 UI components, theming, and best practices.
</Description>

## What is LLMs.txt?

LLMs.txt is a structured documentation format specifically designed for large language models (LLMs). Bitrix24 UI provides LLMs.txt files that contain comprehensive information about our component library, making it easy for AI tools to understand and assist with Bitrix24 UI development.

These files are optimized for AI consumption and contain structured information about components, APIs, usage patterns, and best practices.

## Available Routes

We provide LLMs.txt routes to help AI tools access our documentation:

- **`/llms.txt`** - Contains a structured overview of all components and their documentation links (~5K tokens)
- **`/llms-full.txt`** - Provides comprehensive documentation including implementation details, examples, theming, composables, and migration guidance (~1M+ tokens)

## Choosing the Right File

::: note
**Most users should start with `/llms.txt`** - it contains all essential information and works with standard LLM context windows.

Use `/llms-full.txt` only if you need comprehensive implementation examples and your AI tool supports large contexts (200K+ tokens).
:::

## Important Usage Notes

::: warning
**@-symbol must be typed manually** - When using tools like Cursor or Windsurf, the `@` symbol must be typed by hand in the chat interface. Copy-pasting breaks the tool's ability to recognize it as a context reference.
:::

## Usage with AI Tools

### Cursor

Bitrix24 UI provides specialized LLMs.txt files that you can reference in Cursor for better AI assistance with component development.

#### How to use:

1. **Direct reference**: Mention the LLMs.txt URLs when asking questions
2. Add these specific URLs to your project context using `@docs`

[Read more about Cursor Web and Docs Search](https://docs.cursor.com/en/context/@-symbols/@-docs)

### Windsurf

Windsurf can directly access the Bitrix24 UI LLMs.txt files to understand component usage and best practices.

#### Using LLMs.txt with Windsurf:

- Use `@docs` to reference specific LLMs.txt URLs
- Create persistent rules referencing these URLs in your workspace

[Read more about Windsurf Web and Docs Search](https://docs.windsurf.com/windsurf/cascade/web-search)

### Other AI Tools

Any AI tool that supports LLMs.txt can use these routes to better understand Bitrix24 UI.

#### Examples for ChatGPT, Claude, or other LLMs:

- "Using Bitrix24 UI documentation from https://bitrix24.github.io/b24ui/llms.txt"
- "Follow complete Bitrix24 UI guidelines from https://bitrix24.github.io/b24ui/llms-full.txt"
