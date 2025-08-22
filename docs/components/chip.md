---
title: Chip
description: An indicator that shows either a number or a state.
outline: deep
---
<script setup>
import ChipExample from '/examples/chip/Chip.vue';
import ColorExample from '/examples/chip/Color.vue';
import SizeExample from '/examples/chip/Size.vue';
import TextExample from '/examples/chip/Text.vue';
import PositionExample from '/examples/chip/Position.vue';
import InsetExample from '/examples/chip/Inset.vue';
import StandaloneExample from '/examples/chip/Standalone.vue';
import WithShowExample from '/examples/chip/WithShow.vue';
</script>
# Chip

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/chip"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Chip.vue"
  demo="/components/chip"
>
  An indicator that shows either a number or a state.
</Description>

## Usage

Wrap any component with a Chip to display an indicator.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ChipExample />
  </ClientOnly>
</div>

<<< @/examples/chip/demo/Chip.vue{6,8 vue:line-numbers}

### Color

Use the `color` prop to change the color of the Chip.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/chip/demo/Color.vue{16 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the Chip.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/chip/demo/Size.vue{16vue:line-numbers}
:::

### Text

Use the `text` prop to set the text of the Chip.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TextExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/chip/demo/Text.vue{18 vue:line-numbers}
:::

### Position

Use the `position` prop to change the position of the Chip.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <PositionExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/chip/demo/Position.vue{18 vue:line-numbers}
:::

### Inset

Use the `inset` prop to display the Chip inside the component. This is useful when dealing with rounded components.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <InsetExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/chip/demo/Inset.vue{16,22,27 vue:line-numbers}
:::

### Standalone

Use the `standalone` prop alongside the `inset` prop to display the Chip inline.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <StandaloneExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/chip/demo/Standalone.vue{15 vue:line-numbers}
:::

::: info
It's used this way in the [`Select`](/components/select) components for example.
:::

## Examples

### Control visibility

You can control the visibility of the Chip using the `show` prop.

::: info
In this example, the Chip has a color per status and is displayed when the status is not `offline`.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithShowExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/chip/demo/WithShow.vue{30 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Chip" />

### Slots

<ComponentSlots component="Chip" />
