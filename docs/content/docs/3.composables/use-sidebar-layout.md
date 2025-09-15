---
title: useSidebarLayout
description: Controlling the loading mode of the SidebarLayout component
---
<script setup>
</script>
# useSidebarLayout

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

<Description 
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useSidebarLayout.ts"
  demo="/demo/sidebar-layout"
>
  Hook for accessing SidebarLayout API and managing loading states in nested sidebar layouts
</Description>

## Usage

Use the auto-imported `useSidebarLayout` composable to access the [`SidebarLayout`](/docs/components/sidebar-layout/) API and manage loading states.

```vue
<script setup lang="ts">
const sidebarLayout = useSidebarLayout()
</script>
```

::: danger
`useSidebarLayout` must be used within a [`SidebarLayout`](/docs/components/sidebar-layout/) component as it relies on component injection context.
:::

## API

### `interface SidebarLayoutApi`

```ts
interface SidebarLayoutApi {
  // Current loading state of the current component
  readonly isLoading: Readonly<Ref<boolean>>
  
  // Loading state of the immediate parent component
  readonly isParentLoading: Readonly<Ref<boolean>>
  
  // Loading state of the root component in the hierarchy
  readonly isRootLoading: Readonly<Ref<boolean>>
  
  // Set the loading state for the current component
  setLoading: (value: boolean) => void
  
  // Set the loading state for the parent component
  setParentLoading: (value: boolean) => void
  
  // Set the loading state for the root component
  setRootLoading: (value: boolean) => void
  
  // Internal property for managing hierarchy
  rootRef: Ref<boolean>
}
```

### `isLoading: Readonly<Ref<boolean>>`

Current loading state of the SidebarLayout component.

```vue:line-numbers
<script setup lang="ts">
const { isLoading } = useSidebarLayout()
</script>

<template>
  <div v-if="isLoading">Loading...</div>
</template>
```

### `isParentLoading: Readonly<Ref<boolean>>`

Loading state of the immediate parent SidebarLayout (returns `false` if no parent exists).

```vue:line-numbers
<script setup lang="ts">
const { isParentLoading } = useSidebarLayout()

watch(isParentLoading, (loading) => {
  console.log('Parent loading state changed:', loading)
})
</script>
```

### `isRootLoading: Readonly<Ref<boolean>>`

Loading state of the topmost root SidebarLayout in the hierarchy.

```vue:line-numbers
<script setup lang="ts">
const { isRootLoading } = useSidebarLayout()

function checkRootStatus() {
  alert(`Root is loading: ${isRootLoading.value}`)
}
</script>
```

### `setLoading: (value: boolean) => void`

Sets the loading state for the current SidebarLayout component.

```vue:line-numbers
<script setup lang="ts">
const { setLoading } = useSidebarLayout()

function loadData() {
  setLoading(true)
  // fetch data...
  setLoading(false)
}
</script>
```

### `setParentLoading: (value: boolean) => void`

Sets the loading state for the immediate parent SidebarLayout.

```vue:line-numbers
<script setup lang="ts">
const { setParentLoading } = useSidebarLayout()

function notifyParent() {
  setParentLoading(true)
  // processing...
  setParentLoading(false)
}
</script>
```

### `setRootLoading: (value: boolean) => void`

Sets the loading state for the root SidebarLayout.

```vue:line-numbers
<script setup lang="ts">
const { setRootLoading } = useSidebarLayout()

function notifyRoot() {
  setRootLoading(true)
  // global processing...
  setRootLoading(false)
}
</script>
```


## Example

### Basic usage

```vue:line-numbers
<script setup lang="ts">
const {
  isLoading,
  isParentLoading,
  isRootLoading,
  setLoading,
  setParentLoading,
  setRootLoading
} = useSidebarLayout()

function handleAction() {
  setLoading(true)
  // Perform async operation
  setTimeout(() => setLoading(false), 1000)
}
</script>

<template>
  <div>
    <button @click="handleAction">
      Trigger Loading
    </button>
    <div v-if="isLoading">Processing...</div>
  </div>
</template>
```

### Nested layout communication

```vue:line-numbers
<script setup lang="ts">
const sidebar = useSidebarLayout()

function cascadeLoading() {
  sidebar.setLoading(true)
  sidebar.setParentLoading(true)
  sidebar.setRootLoading(true)
  
  // Complex operation affecting all layout levels
  setTimeout(() => {
    sidebar.setLoading(false)
    sidebar.setParentLoading(false)
    sidebar.setRootLoading(false)
  }, 2000)
}
</script>
```
