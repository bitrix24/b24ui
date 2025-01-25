---
title: ComponentName
description: An input box designed for text entry.
outline: deep
---
<script setup>
import InputExample from '/examples/input/Input.vue';
import TypeExample from '/examples/input/Type.vue';
import PlaceholderExample from '/examples/input/Placeholder.vue';
import ColorExample from '/examples/input/Color.vue';
import TagExample from '/examples/input/Tag.vue';
import SizeExample from '/examples/input/Size.vue';
import IconExample from '/examples/input/Icon.vue';
import IconLeadingTrailingExample from '/examples/input/IconLeadingTrailing.vue';
import AvatarExample from '/examples/input/Avatar.vue';
import LoadingExample from '/examples/input/Loading.vue';
import DisabledExample from '/examples/input/Disabled.vue';
</script>
# Input

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/Input"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Input.vue"
>
  An input box designed for text entry.
</Description>

## Usage

Use the `v-model` directive to control the value of the Input.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <InputExample />
  </ClientOnly>
</div>

<<< @/examples/input/demo/Input.vue{4,8 vue:line-numbers}

### Type

Use the `type` prop to change the input type. Defaults to `text`.

Some types have been implemented in their own components such as [Checkbox](/components/checkbox), [Radio](/components/radio-group) etc. and others have been styled like `file` for example.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TypeExample />
  </ClientOnly>
</div>

<<< @/examples/input/demo/Type.vue{13 vue:line-numbers}

::: info
You can check all the available types on the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types).
:::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <PlaceholderExample />
  </ClientOnly>
</div>

<<< @/examples/input/demo/Placeholder.vue{13 vue:line-numbers}

### Color

Use the `color` prop to change the ring color when the Input is focused.

::: info
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

<<< @/examples/input/demo/Color.vue{17,18 vue:line-numbers}

### Tag

Use the `tag` property to display a small legend on top of the Input.

Use the `tagColor` property to set the color for `tag`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TagExample />
  </ClientOnly>
</div>

<<< @/examples/input/demo/Tag.vue{17-18 vue:line-numbers}

### Size

Use the `size` prop to change the size of the Input.

### Size

Use the `size` prop to change the size of the Switch.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

<<< @/examples/input/demo/Size.vue{15 vue:line-numbers}

### Icon

Use the `icon` prop to show an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) inside the Input.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IconExample />
  </ClientOnly>
</div>

<<< @/examples/input/demo/Icon.vue{7 vue:line-numbers}

Use the `leading-icon` and `trailing-icon` props to set a different icon for each position.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IconLeadingTrailingExample />
  </ClientOnly>
</div>

<<< @/examples/input/demo/IconLeadingTrailing.vue{8,9 vue:line-numbers}

### Avatar

Use the `avatar` prop to show an [Avatar](/components/avatar) inside the Input.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <AvatarExample />
  </ClientOnly>
</div>

<<< @/examples/input/demo/Avatar.vue{7,11 vue:line-numbers}

### Loading

Use the `loading` prop to show a loading icon on the Input.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <LoadingExample />
  </ClientOnly>
</div>

<<< @/examples/input/demo/Loading.vue{14 vue:line-numbers}

### Disabled

Use the `disabled` prop to disable the Input.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

<<< @/examples/input/demo/Disabled.vue{14 vue:line-numbers}

## API

### Props

<ComponentProps component="Input" />

### Slots

<ComponentSlots component="Input" />

### Emits

<ComponentEmits component="Input" />

### Expose

When accessing the component via a template ref, you can use the following:

| Name                       | Type                                            |
|----------------------------|-------------------------------------------------|
| `inputRef`{lang="ts-type"} | `Ref<HTMLInputElement \| null>`{lang="ts-type"} |
