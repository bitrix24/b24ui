---
title: EditorEmojiMenu
description: "An emoji suggestion menu that automatically appears upon typing the colon : character in the editor."
category: editor
badge: New
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/EditorEmojiMenu.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/editor
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/editor-emoji-menu
---

## Usage

The EditorEmojiMenu component displays a menu of emoji suggestions when typing the `:` character in the editor and inserts the selected emoji. It works alongside the `@tiptap/extension-emoji` package to provide emoji support.

::note
It uses the `useEditorMenu` composable built on top of TipTap's [Suggestion](https://tiptap.dev/docs/editor/api/utilities/suggestion) utility to filter items as you type and support keyboard navigation (arrow keys, enter to select, escape to close).
::

::caution
It must be used inside an [Editor](/docs/components/editor/) component's default slot to have access to the editor instance.
::

::component-example
---
elevated: true
collapse: true
name: 'editor-emoji-menu-example'
class: 'p-8'
---
::

::warning
The `@tiptap/extension-emoji` package is not installed by default, you need to install it separately.
::

::callout{to="https://tiptap.dev/docs/editor/extensions/nodes/emoji" target="_blank"}
Learn more about the Emoji extension in the TipTap documentation.
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `name: string`{lang="ts-type"}
- `emoji: string`{lang="ts-type"}
- `shortcodes?: string[]`{lang="ts-type"}
- `tags?: string[]`{lang="ts-type"}
- `group?: string`{lang="ts-type"}
- `fallbackImage?: string`{lang="ts-type"}

::component-example
---
elevated: true
collapse: true
name: 'editor-emoji-menu-items-example'
class: 'p-8'
---
::

::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

### Char

Use the `char` prop to change the trigger character. Defaults to `:`{lang="ts-type"}.

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorEmojiMenu :editor="editor" :items="items" char=";" />
  </B24Editor>
</template>
```

### Options

Use the `options` prop to customize the positioning behavior using [Floating UI options](https://floating-ui.com/docs/computeposition#options).

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorEmojiMenu
      :editor="editor"
      :items="items"
      :options="{
        placement: 'bottom-start',
        offset: 4
      }"
    />
  </B24Editor>
</template>
```

## API

### Props

:component-props

## Theme

:component-theme
