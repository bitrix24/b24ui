---
title: Avatar
description: An img element that includes fallback and supports Nuxt Image.
outline: deep
---
<script setup>
import AvatarExample from '/examples/avatar/Avatar.vue';
import SizeExample from '/examples/avatar/Size.vue';
import IconExample from '/examples/avatar/Icon.vue';
import TextExample from '/examples/avatar/Text.vue';
import AltExample from '/examples/avatar/Alt.vue';
import WithTooltipExample from '/examples/avatar/WithTooltip.vue';
import WithChipExample from '/examples/avatar/WithChip.vue';
</script>
# Avatar

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/avatar"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Avatar.vue"
  demo="/components/avatar"
>
  An img element that includes fallback and supports Nuxt Image.
</Description>

## Usage

The Avatar uses the `<NuxtImg>` component when [`@nuxt/image`](https://github.com/nuxt/image) is installed, falling back to `img` otherwise.

::: info
You can pass any property from the HTML `<img>` element such as `alt`, `loading`, etc.
:::

### Src

Use the `src` prop to set the image URL.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <AvatarExample />
  </ClientOnly>
</div>

<<< @/examples/avatar/demo/Avatar.vue{2 vue:line-numbers}

### Size

Use the `size` prop to set the size of the Avatar.

::: info
The `<img>` element's `width` and `height` are automatically set based on the `size` prop.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/avatar/demo/Size.vue{17 vue:line-numbers}
:::

### Icon

Use the `icon` prop to display a fallback [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html).

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/avatar/demo/Icon.vue{2,7 vue:line-numbers}
:::

### Text

Use the `text` prop to display a fallback text.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TextExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/avatar/demo/Text.vue{17 vue:line-numbers}
:::

### Alt

When no icon or text is provided, the **initials** of the `alt` prop is used as fallback.

::: info
The `alt` prop is passed to the `img` element as the `alt` attribute.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <AltExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/avatar/demo/Alt.vue{17 vue:line-numbers}
:::

### Chip

Use the `chip` prop to display a chip around the Avatar.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithChipExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/avatar/demo/WithChip.vue{7 vue:line-numbers}
:::

## Examples

### With tooltip

You can use a [Tooltip](/components/tooltip) component to display a tooltip when hovering the Avatar.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithTooltipExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/avatar/demo/WithTooltip.vue{2,4 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Avatar" />
