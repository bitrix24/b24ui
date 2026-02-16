---
title: EditorMentionMenu
description: A mention menu that displays user suggestions when a trigger character is typed in the editor.
category: editor
badge: New
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/EditorMentionMenu.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/editor
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/editor-mention-menu
---

## Usage

The EditorMentionMenu component displays a menu of user suggestions when typing a trigger character (defaults to `@`) in the editor and inserts the selected mention using the `@tiptap/extension-mention` package. The trigger character is also used as the prefix when rendering the inserted mention.

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
name: 'editor-mention-menu-example'
class: 'p-8'
---
::

::callout{to="https://tiptap.dev/docs/editor/extensions/nodes/mention" target="_blank"}
Learn more about the Mention extension in the TipTap documentation.
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `label: string`{lang="ts-type"}
- `avatar?: AvatarProps`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `description?: string`{lang="ts-type"}
- `disabled?: boolean`{lang="ts-type"}

::component-example
---
elevated: true
collapse: true
name: 'editor-mention-menu-items-example'
class: 'p-8'
---
::

::note
You can also pass an array of arrays to the `items` prop to create separated groups of items.
::

### Char

Use the `char` prop to change the trigger character. Defaults to `@`{lang="ts-type"}. The trigger character is also used as the prefix when rendering the inserted mention (e.g. `#channel` instead of `@channel`).

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorMentionMenu :editor="editor" :items="channels" char="#" />
  </B24Editor>
</template>
```

::note
You can use multiple `EditorMentionMenu` components on the same editor with different `char` and `plugin-key` props to support different mention types.

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorMentionMenu :editor="editor" :items="users" plugin-key="mentionMenu" />
    <B24EditorMentionMenu :editor="editor" :items="tags" char="#" plugin-key="tagMenu" />
  </UEditor>
</template>
```
::

### Options

Use the `options` prop to customize the positioning behavior using [Floating UI options](https://floating-ui.com/docs/computeposition#options).

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorMentionMenu
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
