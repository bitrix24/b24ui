---
title: Textarea
description: A textarea for entering multi-line text.
outline: deep
---
<script setup>
import TextareaExample from '/examples/textarea/Textarea.vue';
import PlaceholderExample from '/examples/textarea/Placeholder.vue';
import ColorExample from '/examples/textarea/Color.vue';
import TagExample from '/examples/textarea/Tag.vue';
import DisabledExample from '/examples/textarea/Disabled.vue';
import RowsExample from '/examples/textarea/Rows.vue';
import AutoresizeExample from '/examples/textarea/Autoresize.vue';
import MaxrowsExample from '/examples/textarea/Maxrows.vue';
</script>
# Textarea

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/textarea"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Textarea.vue"
>
  A textarea for entering multi-line text.
</Description>

## Usage

Use the `v-model` directive to control the value of the Textarea.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <TextareaExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/textarea/demo/Textarea.vue{4,8 vue:line-numbers}
:::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <PlaceholderExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/textarea/demo/Placeholder.vue{12 vue:line-numbers}
:::

### Color

Use the `color` prop to change the ring color when the Textarea is focused.

::: info
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/textarea/demo/Color.vue{17-18 vue:line-numbers}
:::

### Tag

Use the `tag` property to display a small legend on top of the Textarea.

Use the `tagColor` property to set the color for `tag`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TagExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/textarea/demo/Tag.vue{17-18 vue:line-numbers}
:::

### Disabled

Use the `disabled` prop to disable the Textarea.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/textarea/demo/Disabled.vue{15 vue:line-numbers}
:::

### Rows

Use the `rows` prop to set the number of rows. Defaults to `3`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <RowsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/textarea/demo/Rows.vue{13 vue:line-numbers}
:::

### Autoresize

Use the `autoresize` prop to enable autoresizing the height of the Textarea.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <AutoresizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/textarea/demo/Autoresize.vue{18 vue:line-numbers}
:::

Use the `maxrows` prop to set the maximum number of rows when autoresizing. If set to `0`, the Textarea will grow indefinitely.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <MaxrowsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/textarea/demo/Maxrows.vue{18 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Textarea" />

### Slots

<ComponentSlots component="Textarea" />

### Emits

<ComponentEmits component="Textarea" />

### Expose

When accessing the component via a template ref, you can use the following:

| Name                      | Type                                           |
|---------------------------|------------------------------------------------|
| `textareaRef`{lang="ts"}  | `Ref<HTMLTextAreaElement \| null>`{lang="ts"}  |
