---
title: Alert
description: An alert designed to capture the user's attention.
category: element
---
<script setup>
import AlertExample from '/examples/alert/Alert.vue';
import DescriptionExample from '/examples/alert/Description.vue';
import IconExample from '/examples/alert/Icon.vue';
import AvatarExample from '/examples/alert/Avatar.vue';
import ColorExample from '/examples/alert/Color.vue';
import ColorInvertedExample from '/examples/alert/ColorInverted.vue';
import SizeExample from '/examples/alert/Size.vue';
import CloseExample from '/examples/alert/Close.vue';
import CloseButtonExample from '/examples/alert/CloseButton.vue';
import ActionsExample from '/examples/alert/Actions.vue';
import OrientationExample from '/examples/alert/Orientation.vue';
</script>
# Alert

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/alert"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Alert.vue"
  demo="/components/alert"
>
  An alert designed to capture the user's attention.
</Description>

## Usage

### Title

Use the `title` prop to set the title of the Alert.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <AlertExample />
  </ClientOnly>
</div>

<<< @/examples/alert/demo/Alert.vue{vue:line-numbers}

### Description

Use the `description` prop to set the description of the Alert.

<div class="lg:min-h-[310px]">
  <ClientOnly>
    <DescriptionExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/alert/demo/Description.vue{15-16 vue:line-numbers}
:::

### Icon

Use the `icon` prop to show an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html).

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/alert/demo/Icon.vue{2,17 vue:line-numbers}
:::

### Avatar

Use the `avatar` prop to show an [Avatar](/components/avatar).

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <AvatarExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/alert/demo/Avatar.vue{17,22 vue:line-numbers}
:::

### Color

Use the `color` prop to change the color of the Alert.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/alert/demo/Color.vue{20 vue:line-numbers}
:::

### Inverted

Use the `inverted` prop to invert the color of the Alert.

::: warning
Only available for `air-primary*` colors
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorInvertedExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/alert/demo/ColorInverted.vue{22 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the Alert.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/alert/demo/Size.vue{22 vue:line-numbers}
:::

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

::: details
<<< @/examples/alert/demo/Close.vue{26,27 vue:line-numbers}
:::

You can pass any property from the [Button](/components/button) component to customize it.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CloseButtonExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/alert/demo/CloseButton.vue{27 vue:line-numbers}
:::

### Actions

Use the `actions` prop to add some [Button](/components/button) actions to the Alert.

<div class="lg:min-h-[290px]">
  <ClientOnly>
    <ActionsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/alert/demo/Actions.vue{23 vue:line-numbers}
:::

::: details alertSimpleItems
<<< @/examples/alert/dictionary.ts#snippetSimpleActions{ts:line-numbers}
:::

### Orientation

Use the `orientation` prop to change the orientation of the Alert.

<div class="lg:min-h-[362px]">
  <ClientOnly>
    <OrientationExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/alert/demo/Orientation.vue{24 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Alert" />

### Slots

<ComponentSlots component="Alert" />

### Emits

```ts
/**
 * Emitted events for the Alert component
 */
interface AlertEmits {
  update:open: (payload: [value: boolean]) => void;
}
```
