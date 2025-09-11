---
title: Badge
description: A short descriptor for a status or category.
category: element
---
<script setup>
import BadgeExample from '/examples/badge/Badge.vue';
import LabelExample from '/examples/badge/Label.vue';
import ColorExample from '/examples/badge/Color.vue';
import SizeExample from '/examples/badge/Size.vue';
import IconExample from '/examples/badge/Icon.vue';
import AvatarExample from '/examples/badge/Avatar.vue';
</script>
# Badge

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/badge"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Badge.vue"
  demo="/components/badge"
>
  A short descriptor for a status or category.
</Description>

## Usage

### Label

Use the default slot to set the label of the Badge.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <BadgeExample />
  </ClientOnly>
</div>

<<< @/examples/badge/demo/Badge.vue{2,3,6 vue:line-numbers}

You can achieve the same result by using the `label` prop.

Use the `use-link` prop to show underline.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <LabelExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/badge/demo/Label.vue{12,13,14 vue:line-numbers}
:::

### Color

Use the `color` prop to change the color of the Badge.

Use the `inverted` prop to change the filling of the Badge.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/badge/demo/Color.vue{20-21 vue:line-numbers}
:::

### Depth

`@remove`

### Size

Use the `size` prop to change the size of the Badge.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/badge/demo/Size.vue{23 vue:line-numbers}
:::

### Icon

Use the `icon` prop to show an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) inside the Badge.

Use the `use-close` prop to show close icon.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <IconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/badge/demo/Icon.vue{29,37,38,46 vue:line-numbers}
:::

### Avatar

Use the `avatar` prop to show an [Avatar](/components/avatar) inside the Badge.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <AvatarExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/badge/demo/Avatar.vue{28,36 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Badge" />

### Slots

<ComponentSlots component="Badge" />
