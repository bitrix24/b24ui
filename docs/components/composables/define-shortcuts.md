---
title: defineShortcuts
description: 'A composable to assign keyboard shortcuts in your app.'
---
# defineShortcuts

<Description
  nuxt-ui="https://ui3.nuxt.dev/composables/define-shortcuts"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useFormField.ts"
>
  A composable to assign keyboard shortcuts in your app.
</Description>

## Usage

Use the auto-imported `defineShortcuts` composable to define keyboard shortcuts.

```vue
<script setup lang="ts">
const open = ref(false)

defineShortcuts({
  meta_k: () => {
    open.value = !open.value
  }
})
</script>
```

- Shortcuts are automatically adjusted for non-macOS platforms, converting `meta` to `ctrl`.
- The composable uses VueUse's [`useEventListener`](https://vueuse.org/core/useEventListener/) to handle keydown events.
- For a complete list of available shortcut keys, refer to the [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values) API documentation. Note that the key should be written in lowercase.

::: info
[Learn](/components/kbd) how to display shortcuts in components in the **Kbd** component documentation.
:::

## API

### `defineShortcuts(config: ShortcutsConfig, options?: ShortcutsOptions)`

Define keyboard shortcuts for your application.

- `config`: An object where keys are shortcut definitions and values are either handler functions or shortcut configuration objects.
- `options`: Optional configuration for the shortcuts behavior.
  - `chainDelay`: The delay between key presses to consider the shortcut as chained. Default is `250`.

#### Shortcut Definition

Shortcuts are defined using the following format:

- Single key: `'a'`, `'b'`, `'1'`, `'?'`, etc.
- Key combinations: Use `_` to separate keys, e.g., `'meta_k'`, `'ctrl_shift_f'`
- Key sequences: Use `-` to define a sequence, e.g., `'g-d'`

#### Modifiers

- `meta`: Represents `⌘ Command` on macOS and `Ctrl` on other platforms
- `ctrl`: Represents `Ctrl` on all platforms
- `shift`: Used for alphabetic keys when Shift is required

#### Special Keys

- `escape`: Triggers on Esc key
- `enter`: Triggers on Enter key
- `arrowleft`, `arrowright`, `arrowup`, `arrowdown`: Trigger on respective arrow keys

#### Shortcut Configuration

Each shortcut can be defined as a function or an object with the following properties:

```ts
interface ShortcutConfig {
  handler: () => void
  usingInput?: boolean | string
}
```

- `handler`: Function to be executed when the shortcut is triggered
- `usingInput`:
  - `false` (default): Shortcut only triggers when no input is focused
  - `true`: Shortcut triggers even when any input is focused
  - `string`: Shortcut only triggers when the specified input (by name) is focused

## Examples

### Basic usage

```vue
<script setup lang="ts">
defineShortcuts({
  '?': () => openHelpModal(),
  'meta_k': () => openCommandPalette(),
  'g-d': () => navigateToDashboard()
})
</script>
```

### With input focus handling

The `usingInput` option allows you to specify that a shortcut should only trigger when a specific input is focused.

```vue
<template>
  <B24Input v-model="query" name="queryInput" />
</template>

<script setup lang="ts">
const query = ref('')

defineShortcuts({
  enter: {
    usingInput: 'queryInput',
    handler: () => performSearch()
  },
  escape: {
    usingInput: true,
    handler: () => clearSearch()
  }
})
</script>
```
