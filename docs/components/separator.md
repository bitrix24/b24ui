---
title: Separator
description: Divides content in a horizontal or vertical manner.
outline: deep
---
<script setup>
import SeparatorExample from '/examples/separator/Separator.vue';
import OrientationExample from '/examples/separator/Orientation.vue';
import LabelExample from '/examples/separator/Label.vue';
import IconExample from '/examples/separator/Icon.vue';
import AvatarExample from '/examples/separator/Avatar.vue';
import ColorExample from '/examples/separator/Color.vue';
import TypeExample from '/examples/separator/Type.vue';
import SizeExample from '/examples/separator/Size.vue';
</script>
# Separator

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/separator"
  reka-ui="https://reka-ui.com/docs/components/separator"
  reka-ui-title="Separator"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Separator.vue"
>
  Divides content in a horizontal or vertical manner.
</Description>

## Usage

Use the Separator component as-is to separate content.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SeparatorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/separator/demo/Separator.vue{2 vue:line-numbers}
:::

### Orientation

Use the `orientation` prop to change the orientation of the Separator. Defaults to `horizontal`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <OrientationExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/separator/demo/Orientation.vue{13 vue:line-numbers}
:::

### Label

Use the `label` prop to display a label in the middle of the Separator.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <LabelExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/separator/demo/Label.vue{13 vue:line-numbers}
:::

### Icon

Use the `icon` prop to display an icon in the middle of the Separator.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/separator/demo/Icon.vue{2,7 vue:line-numbers}
:::

### Avatar

Use the `avatar` prop to display an avatar in the middle of the Separator.

<div class="lg:min-h-[172px]">
  <ClientOnly>
    <AvatarExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/separator/demo/Avatar.vue{2,7,10 vue:line-numbers}
:::

### Type

Use the `type` prop to change the type of the Separator. Defaults to `solid`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TypeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/separator/demo/Type.vue{14 vue:line-numbers}
:::

### Color

Use the `color` prop to change the color of the Separator. Defaults to `default`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/separator/demo/Color.vue{15 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the Separator. Defaults to `xs`.

<div class="lg:min-h-[333px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/separator/demo/Size.vue{19 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Separator" />

### Slots

<ComponentSlots component="Separator" />
