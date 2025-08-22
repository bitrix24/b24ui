---
title: Toast
description: A short message to offer information or feedback to the user.
outline: deep
---
<script setup>
import TitleExample from '/examples/toast/Title.vue';
import DescriptionExample from '/examples/toast/Description.vue';
import IconExample from '/examples/toast/Icon.vue';
import AvatarExample from '/examples/toast/Avatar.vue';
import ColorExample from '/examples/toast/Color.vue';
import CloseExample from '/examples/toast/Close.vue';
import CloseIconExample from '/examples/toast/CloseIcon.vue';
import ActionsExample from '/examples/toast/Actions.vue';
import ProgressExample from '/examples/toast/Progress.vue';
import OrientationExample from '/examples/toast/Orientation.vue';
</script>
# Toast

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/toast"
  reka-ui="https://reka-ui.com/docs/components/toast"
  reka-ui-title="Toast"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Toast.vue"
  demo="/components/toast"
>
  A short message to offer information or feedback to the user.
</Description>

## Usage

Use the [useToast](composables/use-toast) composable to display a toast in your application.

::: warning
Be certain to wrap your app with the [`App`](/components/app) component, which integrates our [`Toaster`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Toaster.vue) component, leveraging the [`ToastProvider`](https://reka-ui.com/docs/components/toast#provider) from Reka UI.
:::

::: tip
You can check the [`App`](/components/app#props) component `toaster` prop to see how to configure the Toaster globally.
:::

### Title

Pass a `title` field to the `toast.add` method to display a title.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TitleExample />
  </ClientOnly>
</div>

<<< @/examples/toast/demo/Title.vue{7,13 vue:line-numbers}

### Description

Pass a `description` field to the `toast.add` method to display a description.

<div class="lg:min-h-[310px]">
  <ClientOnly>
    <DescriptionExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/toast/demo/Description.vue{8-9,15 vue:line-numbers}
:::

### Icon

Pass an `icon` field to the `toast.add` method to display an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html).

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/toast/demo/Icon.vue{2,10 vue:line-numbers}
:::

### Avatar

Pass an `avatar` field to the `toast.add` method to display an [Avatar](/components/avatar).

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <AvatarExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/toast/demo/Avatar.vue{9 vue:line-numbers}
:::

### Color

Pass a `color` field to the `toast.add` method to change the color of the Toast.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/toast/demo/Color.vue{16 vue:line-numbers}
:::

### Close

Pass a `close` field to customize or hide the close [Button](/components/button) (with `false` value).

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CloseExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/toast/demo/Close.vue{11-15 vue:line-numbers}
:::

### Close Icon

Pass a `closeIcon` field to customize the close button [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html).

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CloseIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/toast/demo/CloseIcon.vue{12 vue:line-numbers}
:::

### Actions

Pass an `actions` field to add some [Button](/components/button) actions to the Toast.

<div class="lg:min-h-[310px]">
  <ClientOnly>
    <ActionsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/toast/demo/Actions.vue{22-29 vue:line-numbers}
:::

### Progress

Pass a `progress` field to customize or hide the [Progress](/components/progress) bar (with `false` value).

::: tip
The Progress bar inherits the Toast color by default, but you can override it using the `progress.color` field.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ProgressExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/toast/demo/Progress.vue{11 vue:line-numbers}
:::


### Orientation

Pass an `orientation` field to the `toast.add` method to change the orientation of the Toast.

<div class="lg:min-h-[316px]">
  <ClientOnly>
    <OrientationExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/toast/demo/Orientation.vue{vue:line-numbers}
:::

## Examples

::: tip
Bitrix24 UI provides an [**App**](/components/app) component that wraps your app to provide global configurations.
:::

### Change global position

Change the `toaster.position` prop on the [App](/components/app#props) component to change the position of the toasts.

```vue [app.vue]
<script setup lang="ts">
const toaster = { position: 'bottom-right' }
</script>

<template>
  <B24App :toaster="toaster">
    <NuxtPage />
  </B24App>
</template>
```

### Change global duration

Change the `toaster.duration` prop on the [App](/components/app#props) component to change the duration of the toasts.

```vue [app.vue]
<script setup lang="ts">
const toaster = { duration: 5000 }
</script>

<template>
  <B24App :toaster="toaster">
    <NuxtPage />
  </UApp>
</template>
```

### Stacked toasts

Set the `toaster.expand` prop to `false` on the [App](/components/app#props) component to display stacked toasts.

::: tip
You can hover over the toasts to expand them. This will also pause the timer of the toasts.
:::

```vue [app.vue]
<script setup lang="ts">
const toaster = { expand: true }
</script>

<template>
  <B24App :toaster="toaster">
    <NuxtPage />
  </UApp>
</template>
```

## API

### Props

<ComponentProps component="Toast" />

### Slots

<ComponentSlots component="Toast" />

### Emits

```ts
/**
 * Emitted events for the Toast component
 */
interface ToastEmits {
  pause: (payload: []) => void;
  escapeKeyDown: (payload: [event: KeyboardEvent]) => void;
  resume: (payload: []) => void;
  swipeStart: (payload: [event: SwipeEvent]) => void;
  swipeMove: (payload: [event: SwipeEvent]) => void;
  swipeCancel: (payload: [event: SwipeEvent]) => void;
  swipeEnd: (payload: [event: SwipeEvent]) => void;
  update:open: (payload: [value: boolean]) => void;
}
```

