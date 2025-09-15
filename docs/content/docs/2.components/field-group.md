---
title: FieldGroup
description: Organize several button-like elements into a group.
category: element
---
<script setup>
import FieldGroupExample from '/examples/field-group/FieldGroup.vue';
import SizeExample from '/examples/field-group/Size.vue';
import OrientationExample from '/examples/field-group/Orientation.vue';
import WithInputExample from '/examples/field-group/WithInput.vue';
import WithTooltipExample from '/examples/field-group/WithTooltip.vue';
import WithDropdownMenuExample from '/examples/field-group/WithDropdownMenu.vue';
import WithBadgeExample from '/examples/field-group/WithBadge.vue';
</script>

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/field-group"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/FieldGroup.vue"
  demo="/components/field-group"
>
  Organize several button-like elements into a group.
</Description>

## Usage

Wrap multiple [Button](/docs/components/button/) within a FieldGroup to group them together.

::: info
If you use elements with different colors, use the `no-split` property to disable the display of the separator.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <FieldGroupExample />
  </ClientOnly>
</div>

<<< @/examples/field-group/demo/FieldGroup.vue{6,9,10,14 vue:line-numbers}

### Size

Use the `size` prop to change the size of all the buttons.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/field-group/demo/Size.vue{16,22 vue:line-numbers}
:::

### Orientation

Use the `orientation` prop to change the orientation of the buttons. Defaults to `horizontal`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <OrientationExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/field-group/demo/Orientation.vue{18,25 vue:line-numbers}
:::

## Examples

### With input

You can use components like [Input](/docs/components/input/), [InputMenu](/docs/components/input-menu/), [Select](/docs/components/select/) [SelectMenu](/docs/components/select-menu/), etc. within a field group.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithInputExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/field-group/demo/WithInput.vue{vue:line-numbers}
:::

### With tooltip

You can use a [Tooltip](/docs/components/tooltip/#usage) within a field group.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithTooltipExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/field-group/demo/WithTooltip.vue{vue:line-numbers}
:::

### With dropdown

You can use a [DropdownMenu](/docs/components/dropdown-menu/) within a field group.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithDropdownMenuExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/field-group/demo/WithDropdownMenu.vue{vue:line-numbers}
:::


### With badge

You can use a [Badge](/docs/components/badge/) within a field group.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithBadgeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/field-group/demo/WithBadge.vue{3 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="FieldGroup" />

### Slots

<ComponentSlots component="FieldGroup" />
