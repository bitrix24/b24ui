---
title: Tabs
description: A collection of tab panels shown individually.
category: navigation
---
<script setup>
import TabsExample from '/examples/tabs/Tabs.vue';
import ContentExample from '/examples/tabs/Content.vue';
import UnmountExample from '/examples/tabs/Unmount.vue';
import VariantExample from '/examples/tabs/Variant.vue';
import SizeExample from '/examples/tabs/Size.vue';
import OrientationExample from '/examples/tabs/Orientation.vue';
import ModelValueExample from '/examples/tabs/ModelValue.vue';
import SlotExample from '/examples/tabs/Slot.vue';
import CustomSlotExample from '/examples/tabs/CustomSlot.vue';
</script>
# Tabs

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/tabs"
  reka-ui="https://reka-ui.com/docs/components/tabs"
  reka-ui-title="Tabs"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Tabs.vue"
  demo="/components/tabs"
>
  A collection of tab panels shown individually.
</Description>

## Usage

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{lang="ts"}
- `icon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts"}
- `avatar?: AvatarProps`{lang="ts"}
- `badge?: string | number | BadgeProps`{lang="ts"}
- `content?: string`{lang="ts"}
- `value?: string | number`{lang="ts"}
- `disabled?: boolean`{lang="ts"}
- [`slot?: string`{lang="ts"}](#with-custom-slot)
- `class?: any`{lang="ts"}
- `b24ui?: { trigger?: ClassNameValue, leadingIcon?: ClassNameValue, leadingAvatar?: ClassNameValue, leadingAvatarSize?: ClassNameValue, label?: ClassNameValue, trailingBadge?: ClassNameValue, trailingBadgeSize?: ClassNameValue, content?: ClassNameValue }`{lang="ts"}

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <TabsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tabs/demo/Tabs.vue{5-16,20 vue:line-numbers}
:::

### Content

Set the `content` prop to `false` to turn the Tabs into a toggle-only control without displaying any content. Defaults to `true`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ContentExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tabs/demo/Content.vue{21 vue:line-numbers}
:::

### Unmount

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the Tabs is collapsed. Defaults to `true`.

::: info
You can inspect the DOM to see each item's content being rendered.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <UnmountExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tabs/demo/Unmount.vue{29 vue:line-numbers}
:::

### Color

`@remove`

### Variant

Use the `variant` prop to change the variant of the Tabs.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <VariantExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tabs/demo/Variant.vue{25 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the Tabs.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tabs/demo/Size.vue{28 vue:line-numbers}
:::

### Orientation

Use the `orientation` prop to change the orientation of the Tabs. Defaults to `horizontal`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <OrientationExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tabs/demo/Orientation.vue{28 vue:line-numbers}
:::

## Examples

### Control active item

You can control the active item by using the `default-value` prop or the `v-model` directive with the index of the item.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ModelValueExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tabs/demo/ModelValue.vue{28 vue:line-numbers}
:::

### With content slot

Use the `#content` slot to customize the content of each item.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SlotExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tabs/demo/Slot.vue{9,14,21-23 vue:line-numbers}
:::

### With custom slot

Use the `slot` property to customize a specific item.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CustomSlotExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tabs/demo/CustomSlot.vue{11,17,32,49 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Tabs" />

### Slots

<ComponentSlots component="Tabs" />

### Emits

```ts
/**
 * Emitted events for the Tabs component
 */
interface TabsEmits {
  update:modelValue: (payload: [payload: string | number]) => void;
}
```

### Expose

When accessing the component via a template ref, you can use the following:

| Name                     | Type                                        |
|--------------------------|---------------------------------------------|
| `triggersRef`{lang="ts"} | `Ref<ComponentPublicInstance[]>`{lang="ts"} |
