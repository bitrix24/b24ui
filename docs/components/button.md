---
title: Button
description: A button capable of linking or performing an action.
outline: deep
---
<script setup>
import ButtonExample from '/examples/button/Button.vue';
import ButtonLabelExample from '/examples/button/ButtonLabel.vue';
import LinkExample from '/examples/button/Link.vue';
import ColorExample from '/examples/button/Color.vue';
import DepthExample from '/examples/button/Depth.vue';
import SizeExample from '/examples/button/Size.vue';
import IconExample from '/examples/button/Icon.vue';
import UseDropdownExample from '/examples/button/UseDropdown.vue';
import AvatarExample from '/examples/button/Avatar.vue';
import LoadingExample from '/examples/button/Loading.vue';
import LoadingAutoExample from '/examples/button/LoadingAuto.vue';
import FormExample from '/examples/button/Form.vue';
import DisabledExample from '/examples/button/Disabled.vue';
import RoundedExample from '/examples/button/Rounded.vue';
</script>
# Button

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/button"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Button.vue"
>
  A button capable of linking or performing an action.
</Description>

## Usage

### Label

Use the default slot to set the label of the Button.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ButtonExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/Button.vue{2 vue:line-numbers}

You can achieve the same result by using the `label` prop.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ButtonLabelExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/ButtonLabel.vue{13 vue:line-numbers}

### Link

You can pass any property from the [Link](/components/link#props) component such as `to`, `target`, etc.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <LinkExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/Link.vue{3,4 vue:line-numbers}

### Color

Use the `color` prop to change the color of the Button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/Color.vue{15 vue:line-numbers}

### Depth

Use the `depth` parameter to change the intensity of the Button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DepthExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/Depth.vue{10 vue:line-numbers}

### Size

Use the `size` prop to change the size of the Button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/Size.vue{15 vue:line-numbers}

### Icon

Use the `icon` prop to show an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) inside the Button.

The `label` as prop or slot is optional so you can use the Button as an icon-only button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <IconExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/Icon.vue{23 vue:line-numbers}

Use the `use-dropdown` prop to show trailing-icon.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <UseDropdownExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/UseDropdown.vue{7 vue:line-numbers}

### Avatar

Use the `avatar` prop to show an [Avatar](/components/avatar) inside the Button.

The `label` as prop or slot is optional so you can use the Button as an avatar-only button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <AvatarExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/Avatar.vue{25 vue:line-numbers}

### Loading

Use the `loading` prop to show a loading icon and disable the Button.

::: tip
Use `use-clock`, `use-wait` props to show different loading icons.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <LoadingExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/Loading.vue{24,31-32,40-41 vue:line-numbers}

Use the `loading-auto` prop to show the loading icon automatically while the `@click` promise is pending.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <LoadingAutoExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/LoadingAuto.vue{5-7,13-14,19-21,26-28 vue:line-numbers}

This also works with the [Form](/components/form) component.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <FormExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/Form.vue{17,21-23 vue:line-numbers}

### Disabled

Use the `disabled` prop to disable the Button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/Disabled.vue{2414 vue:line-numbers}

### Rounded

Use the `rounded` prop to round the Button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <RoundedExample />
  </ClientOnly>
</div>

<<< @/examples/button/demo/Rounded.vue{14 vue:line-numbers}

## API

### Props

::: info
The `Button` component extends the `Link` component. Check out the source code on [GitHub](https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Link.vue#L13).
:::

<ComponentProps component="Button" />

### Slots

<ComponentSlots component="Button" />
