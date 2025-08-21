---
title: ButtonGroup
description: Organize several button-type elements into a group.
outline: deep
---
<script setup>
import ButtonGroupExample from '/examples/buttongroup/ButtonGroup.vue';
import SizeExample from '/examples/buttongroup/Size.vue';
import OrientationExample from '/examples/buttongroup/Orientation.vue';
import WithInputExample from '/examples/buttongroup/WithInput.vue';
import WithTooltipExample from '/examples/buttongroup/WithTooltip.vue';
import WithBadgeExample from '/examples/buttongroup/WithBadge.vue';
</script>
# ButtonGroup

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/button-group"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ButtonGroup.vue"
  demo="/components/button-group"
>
  Organize several button-type elements into a group.
</Description>

## Usage

Wrap multiple [Button](/components/button) within a ButtonGroup to group them together.

::: info
If you use elements with different colors, use the `no-split` property to disable the display of the separator.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ButtonGroupExample />
  </ClientOnly>
</div>

<<< @/examples/buttongroup/demo/ButtonGroup.vue{6,9,10,14 vue:line-numbers}

### Size

Use the `size` prop to change the size of all the buttons.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/buttongroup/demo/Size.vue{16,22 vue:line-numbers}
:::

### Orientation

Use the `orientation` prop to change the orientation of the buttons. Defaults to `horizontal`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <OrientationExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/buttongroup/demo/Orientation.vue{16,22 vue:line-numbers}
:::

## Examples

### With input

You can use components like [Input](/components/input), [Select](/components/select) etc. within a button group.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithInputExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/buttongroup/demo/WithInput.vue{vue:line-numbers}
:::

### With tooltip

You can use a [Tooltip](/components/tooltip.html#usage) within a button group.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithTooltipExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/buttongroup/demo/WithTooltip.vue{vue:line-numbers}
:::


### With badge

You can use a [Badge](/components/badge) within a button group.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithBadgeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/buttongroup/demo/WithBadge.vue{3 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="ButtonGroup" />

### Slots

<ComponentSlots component="ButtonGroup" />
