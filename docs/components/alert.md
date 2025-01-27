---
title: Alert
description: An alert designed to capture the user's attention.
outline: deep
---
<script setup>
import AlertExample from '/examples/alert/Alert.vue';
import DescriptionExample from '/examples/alert/Description.vue';
import IconExample from '/examples/alert/Icon.vue';
import AvatarExample from '/examples/alert/Avatar.vue';
import ColorExample from '/examples/alert/Color.vue';
import SizeExample from '/examples/alert/Size.vue';
import CloseExample from '/examples/alert/Close.vue';
import CloseButtonExample from '/examples/alert/CloseButton.vue';
import ActionsExample from '/examples/alert/Actions.vue';
</script>
# Alert

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/alert"
git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Alert.vue"
>
  An alert designed to capture the user's attention.
</Description>

## Usage

### Title

Use the `title` prop to set the title of the Alert.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <AlertExample />
  </ClientOnly>
</div>

<<< @/examples/alert/demo/Alert.vue{12 vue:line-numbers}

### Description

Use the `description` prop to set the description of the Alert.

<div class="lg:min-h-[389px]">
  <ClientOnly>
    <DescriptionExample />
  </ClientOnly>
</div>

<<< @/examples/alert/demo/Description.vue{16 vue:line-numbers}

### Icon

Use the `icon` prop to show an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html).

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IconExample />
  </ClientOnly>
</div>

<<< @/examples/alert/demo/Icon.vue{2,7 vue:line-numbers}

### Avatar

Use the `avatar` prop to show an [Avatar](/components/avatar).

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <AvatarExample />
  </ClientOnly>
</div>

<<< @/examples/alert/demo/Avatar.vue{7,12 vue:line-numbers}

### Color

Use the `color` prop to change the color of the Alert.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

<<< @/examples/alert/demo/Color.vue{16 vue:line-numbers}

### Size

Use the `size` prop to change the size of the Alert.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

<<< @/examples/alert/demo/Size.vue{16 vue:line-numbers}

### Close

Use the `close` prop to display a [Button](/components/button) to dismiss the Alert.

::: tip
An `update:open` event will be emitted when the close button is clicked.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CloseExample />
  </ClientOnly>
</div>

<<< @/examples/alert/demo/Close.vue{10 vue:line-numbers}

You can pass any property from the [Button](/components/button) component to customize it.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CloseButtonExample />
  </ClientOnly>
</div>

<<< @/examples/alert/demo/CloseButton.vue{10 vue:line-numbers}

### Actions

Use the `actions` prop to add some [Button](/components/button) actions to the Alert.

::: info
Actions renders differently when the description is not set. You can try to remove it.
:::

<div class="lg:min-h-[316px]">
  <ClientOnly>
    <ActionsExample />
  </ClientOnly>
</div>

<<< @/examples/alert/demo/Actions.vue{10 vue:line-numbers}

## API

### Props

<ComponentProps component="Alert" />

### Slots

<ComponentSlots component="Alert" />

### Emits

<ComponentEmits component="Alert" />
