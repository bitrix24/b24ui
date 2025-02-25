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
import OrientationExample from '/examples/toast/Orientation.vue';
</script>
# Toast

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

Pass a `close` field to customize or hide the close button (with `false` value).

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

### Orientation

Use the `orientation` prop to change the orientation of the Toast.

<div class="lg:min-h-[316px]">
  <ClientOnly>
    <OrientationExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/toast/demo/Orientation.vue{vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Toast" />

### Slots

<ComponentSlots component="Toast" />

### Emits

<ComponentEmits component="Toast" />

