---
title: RadioGroup
description: A collection of radio buttons to pick a single choice from several options.
outline: deep
---
<script setup>
import RadioGroupExample from '/examples/radiogroup/RadioGroup.vue';
import ArrayExample from '/examples/radiogroup/Array.vue';
import ArrayValueKeyExample from '/examples/radiogroup/ArrayValueKey.vue';
import LegendExample from '/examples/radiogroup/Legend.vue';
import OrientationExample from '/examples/radiogroup/Orientation.vue';
import ColorExample from '/examples/radiogroup/Color.vue';
import SizeExample from '/examples/radiogroup/Size.vue';
import DisabledExample from '/examples/radiogroup/Disabled.vue';
</script>
# RadioGroup

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/radio-group"
  reka-ui="https://reka-ui.com/docs/components/radio-group"
  reka-ui-title="RadioGroup"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/RadioGroup.vue"
>
  A collection of radio buttons to pick a single choice from several options.
</Description>

## Usage

Use the `v-model` directive to control the value of the RadioGroup or the `default-value` prop to set the initial value when you do not need to control its state.

### Items

Use the `items` prop as an array of strings, numbers or booleans:

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <RadioGroupExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/radiogroup/demo/RadioGroup.vue{4,5,10,11 vue:line-numbers}
:::

You can also pass an array of objects with the following properties:

- `label?: string`{lang="ts-type"}
- `description?: string`{lang="ts-type"}
- [`value?: string`{lang="ts-type"}](#value-key)
- `disabled?: boolean`{lang="ts-type"}

::: danger
When using objects, you need to reference the `value` property of the object in the `v-model` directive or the `default-value` prop.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrayExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/radiogroup/demo/Array.vue{4-20 vue:line-numbers}
:::

### Value Key

You can change the property that is used to set the value by using the `value-key` prop. Defaults to `value`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrayValueKeyExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/radiogroup/demo/ArrayValueKey.vue{8,13,18,27 vue:line-numbers}
:::

### Legend

Use the `legend` prop to set the legend of the RadioGroup.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <LegendExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/radiogroup/demo/Legend.vue{20 vue:line-numbers}
:::

### Orientation

Use the `orientation` prop to change the orientation of the RadioGroup. Defaults to `vertical`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <OrientationExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/radiogroup/demo/Orientation.vue{20 vue:line-numbers}
:::

### Color

Use the `color` prop to change the color of the RadioGroup.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/radiogroup/demo/Color.vue{20 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the RadioGroup.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/radiogroup/demo/Size.vue{20 vue:line-numbers}
:::

### Disabled

Use the `disabled` prop to disable the RadioGroup.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/radiogroup/demo/Disabled.vue{20 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="RadioGroup" />

### Slots

<ComponentSlots component="RadioGroup" />

### Emits

<ComponentEmits component="RadioGroup" />
