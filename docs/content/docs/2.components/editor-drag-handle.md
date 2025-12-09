---
title: EditorDragHandle
description: A draggable handle component for reordering and selecting editor blocks.
category: editor
badge: New
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/EditorDragHandle.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/editor
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/editor-drag-handle
---

## Usage

The EditorDragHandle component provides drag-and-drop functionality for reordering editor blocks using the `@tiptap/extension-drag-handle-vue-3` package.

::caution
It must be used inside an [Editor](/docs/components/editor/) component's default slot to have access to the editor instance.
::

It extends the [Button](/docs/components/button/) component, so you can pass any property such as `color`, `size`, etc.

::component-example
---
collapse: true
elevated: true
name: 'editor-drag-handle-example'
class: 'p-8'
---
::

::callout{to="https://tiptap.dev/docs/editor/extensions/functionality/drag-handle-vue" target="_blank"}
Learn more about the Drag Handle extension in the TipTap documentation.
::

### Icon

Use the `icon` prop to customize the drag handle icon.

```vue
<script setup lang="ts">
import DragLIcon from '@bitrix24/b24icons-vue/outline/DragLIcon'
</script>

<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorDragHandle :editor="editor" :icon="DragLIcon" />
  </B24Editor>
</template>
```

### Options

Use the `options` prop to customize the positioning behavior using [Floating UI options](https://floating-ui.com/docs/computeposition#options).

::note
The offset is automatically calculated to center the handle for small blocks and align it to the top for taller blocks.
::

```vue
<template>
  <B24Editor v-slot="{ editor }">
    <B24EditorDragHandle
      :editor="editor"
      :options="{
        placement: 'left'
      }"
    />
  </B24Editor>
</template>
```

## Examples

### With dropdown menu

Use the default slot to add a [DropdownMenu](/docs/components/dropdown-menu/) with block-level actions like duplicate, delete, move up/down, or transform blocks into different types.

Listen to the `@node-change` event to track the currently hovered node and its position, then use `editor.chain().setMeta('lockDragHandle', open).run()`{lang="ts-type"} to lock the handle position while the menu is open.

::component-example
---
elevated: true
collapse: true
name: 'editor-drag-handle-dropdown-menu-example'
class: 'p-8'
---
::

::note
This example uses the `mapEditorItems` utility from `@bitrix24/b24ui-nuxt/utils/editor` to automatically map handler kinds (like `duplicate`, `delete`, `moveUp`, etc.) to their corresponding editor commands with proper state management.
::

### With suggestion menu

Use the default slot to add a [Button](/docs/components/button/) next to the drag handle to open the [EditorSuggestionMenu](/docs/components/editor-suggestion-menu/).

Call the `onClick` slot function to get the current node position, then use `handlers.suggestion?.execute(editor, { pos: node?.pos }).run()`{lang="ts-type"} to insert new blocks at that position.

::component-example
---
elevated: true
collapse: true
name: 'editor-drag-handle-suggestion-menu-example'
class: '!p-0'
---
::

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme
