---
title: Button
description: A button capable of linking or performing an action.
category: element
---
<script setup>
import ButtonExample from '/examples/button/Button.vue';
import ButtonLabelExample from '/examples/button/ButtonLabel.vue';
import LinkExample from '/examples/button/Link.vue';
import LinkActiveColorExample from '/examples/button/LinkActiveColor.vue';
import LinkActiveClassExample from '/examples/button/LinkActiveClass.vue';
import ColorExample from '/examples/button/Color.vue';
import SizeExample from '/examples/button/Size.vue';
import IconExample from '/examples/button/Icon.vue';
import UseDropdownExample from '/examples/button/UseDropdown.vue';
import AvatarExample from '/examples/button/Avatar.vue';
import LoadingExample from '/examples/button/Loading.vue';
import LoadingAutoExample from '/examples/button/LoadingAuto.vue';
import FormExample from '/examples/button/Form.vue';
import DisabledExample from '/examples/button/Disabled.vue';
import RoundedExample from '/examples/button/Rounded.vue';
import BlockExample from '/examples/button/Block.vue';
import NormalCaseExample from '/examples/button/NormalCase.vue';
</script>
# Button

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/button"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Button.vue"
  demo="/components/button"
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

::: details
<<< @/examples/button/demo/ButtonLabel.vue{13 vue:line-numbers}
:::

### Color

Use the `color` prop to change the color of the Button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/Color.vue{15 vue:line-numbers}
:::

### Depth

`@deprecate`

### Size

Use the `size` prop to change the size of the Button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/Size.vue{15 vue:line-numbers}
:::

### Icon

Use the `icon` prop to show an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) inside the Button.

The `label` as prop or slot is optional so you can use the Button as an icon-only button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <IconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/Icon.vue{3,23 vue:line-numbers}
:::

Use the `use-dropdown` prop to show trailing-icon.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <UseDropdownExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/UseDropdown.vue{7 vue:line-numbers}
:::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/) inside the Button.

The `label` as prop or slot is optional so you can use the Button as an avatar-only button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <AvatarExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/Avatar.vue{22 vue:line-numbers}
:::

### Link

You can pass any property from the [Link](/docs/components/link/#props) component such as `to`, `target`, etc.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <LinkExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/Link.vue{3,4 vue:line-numbers}
:::

When the Button is a link or when using the `active` prop, you can use the `active-color` and `active-variant` props to customize the active state.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <LinkActiveColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/LinkActiveColor.vue{15-16,23-24 vue:line-numbers}
:::

You can also use the `active-class` and `inactive-class` props to customize the active state.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <LinkActiveClassExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/LinkActiveClass.vue{3-5,11-13 vue:line-numbers}
:::

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

::: details
<<< @/examples/button/demo/Loading.vue{22,28-29,36-37 vue:line-numbers}
:::

Use the `loading-auto` prop to show the loading icon automatically while the `@click` promise is pending.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <LoadingAutoExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/LoadingAuto.vue{23,31-32,40-41 vue:line-numbers}
:::

This also works with the [Form](/docs/components/form/) component.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <FormExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/Form.vue{28,32-40 vue:line-numbers}
:::

### Disabled

Use the `disabled` prop to disable the Button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/Disabled.vue{20 vue:line-numbers}
:::

### Rounded

Use the `rounded` prop to round the Button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <RoundedExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/Rounded.vue{21,26 vue:line-numbers}
:::

### Block

Use the `block` property to set `w-full` for the Button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <BlockExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/Block.vue{21,26 vue:line-numbers}
:::

### NormalCase

Use the `NormalCase` property to set `uppercase` for the Button.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <NormalCaseExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/button/demo/NormalCase.vue{21,28 vue:line-numbers}
:::

## API

### Props

::: info
The `Button` component extends the `Link` component. Check out the source code on [GitHub](https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Link.vue#L13).
:::

<ComponentProps component="Button" />

### Slots

<ComponentSlots component="Button" />
