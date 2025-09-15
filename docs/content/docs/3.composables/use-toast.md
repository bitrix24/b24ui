---
title: useToast
description: 'A composable for showing toast notifications in your app.'
---
# useToast

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

<Description
  nuxt-ui="https://ui3.nuxt.dev/composables/use-toast"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/composables/useToast.ts"
>
  A composable for showing toast notifications in your app.
</Description>

## Usage

Use the auto-imported `useToast` composable to display [Toast](/docs/components/toast/) notifications.

```vue
<script setup lang="ts">
const toast = useToast()
</script>
```

- The `useToast` composable leverages Nuxt's `useState` to handle the toast state, ensuring reactivity throughout your application.
- Up to 12 toasts can be shown at once. If a new toast is added beyond this limit, the oldest toast is automatically discarded.
- Upon removing a toast, a 200ms delay is applied before it is removed from the state, allowing for exit animations.

::: warning
Be certain to wrap your app with the [`App`](/docs/components/app/) component, which integrates our [`Toaster`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Toaster.vue) component, leveraging the [`ToastProvider`](https://reka-ui.com/docs/components/toast#provider) from Reka UI.
:::

::: tip
Explore how to modify the appearance and behavior of toasts in the [`Toast`](/docs/components/toast/) component documentation.
:::

## API

### `add(toast: Partial<Toast>): Toast`

Adds a new toast notification.

- Parameters:
  - `toast`: A partial `Toast` object with the following properties:
    - `id` (optional): A unique identifier for the toast. If not provided, a timestamp will be used.
    - `open` (optional): Whether the toast is open. Defaults to `true`.
    - Other properties from the `Toast` interface.
- Returns: The complete `Toast` object that was added.

```vue
<script setup lang="ts">
const toast = useToast()

function showToast() {
  toast.add({
    title: 'Success',
    description: 'Your action was completed successfully.',
    color: 'success'
  })
}
</script>
```

### `update(id: string | number, toast: Partial<Toast>)`

Updates an existing toast notification.

- Parameters:
  - `id`: The unique identifier of the toast to update.
  - `toast`: A partial `Toast` object with the properties to update.

```vue
<script setup lang="ts">
const toast = useToast()

function updateToast(id: string | number) {
  toast.update(id, {
    title: 'Updated Toast',
    description: 'This toast has been updated.'
  })
}
</script>
```

### `remove(id: string | number)`

Removes a toast notification.

- Parameters:
  - `id`: The unique identifier of the toast to remove.

```vue
<script setup lang="ts">
const toast = useToast()

function removeToast(id: string | number) {
  toast.remove(id)
}
</script>
```

### `clear()`

Removes all toast notifications.

```vue
<script setup lang="ts">
const toast = useToast()

function clearAllToasts() {
  toast.clear()
}
</script>
```

### `toasts`

- Type: `Ref<Toast[]>`
- Description: A reactive array containing all current toast notifications.
