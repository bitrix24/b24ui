---
title: Range
description: A control for selecting a numeric value within a specified range.
category: form
---
<script setup>
import RangeExample from '/examples/range/Range.vue';
import MinMaxExample from '/examples/range/MinMax.vue';
import StepExample from '/examples/range/Step.vue';
import MultipleExample from '/examples/range/Multiple.vue';
import MinStepsBetweenThumbsExample from '/examples/range/MinStepsBetweenThumbs.vue';
import OrientationExample from '/examples/range/Orientation.vue';
import ColorExample from '/examples/range/Color.vue';
import SizeExample from '/examples/range/Size.vue';
import DisabledExample from '/examples/range/Disabled.vue';
import InvertedExample from '/examples/range/Inverted.vue';
</script>
# Range

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/slider"
  reka-ui="https://reka-ui.com/docs/components/slider"
  reka-ui-title="Slider"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Range.vue"
  demo="/components/range"
>
  A control for selecting a numeric value within a specified range.
</Description>

## Usage

Use the `v-model` directive to control the value of the Range.

Use the `default-value` prop to set the initial value when you do not need to control its state.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <RangeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/range/demo/Range.vue{9,12 vue:line-numbers}
:::

### Min / Max

Use the `min` and `max` props to set the minimum and maximum values of the Range. Defaults to `0` and `100`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <MinMaxExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/range/demo/MinMax.vue{15,16 vue:line-numbers}
:::

### Step

Use the `step` prop to set the increment value of the Range. Defaults to `1`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <StepExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/range/demo/Step.vue{13 vue:line-numbers}
:::

### Multiple

Use the `v-model` directive or the `default-value` prop with an array of values to create a range Range.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <MultipleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/range/demo/Multiple.vue{12 vue:line-numbers}
:::

Use the `min-steps-between-thumbs` prop to limit the minimum distance between the thumbs.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <MinStepsBetweenThumbsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/range/demo/MinStepsBetweenThumbs.vue{21 vue:line-numbers}
:::

### Orientation

Use the `orientation` prop to change the orientation of the Range. Defaults to `horizontal`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <OrientationExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/range/demo/Orientation.vue{13,15 vue:line-numbers}
:::

### Color

Use the `color` prop to change the color of the Range.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/range/demo/Color.vue{15 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the Range.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/range/demo/Size.vue{13 vue:line-numbers}
:::

### Disabled

Use the `disabled` prop to disable the Range.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/range/demo/Disabled.vue{4,7,13 vue:line-numbers}
:::

### Inverted

Use the `inverted` prop to visually invert the Range.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <InvertedExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/range/demo/Inverted.vue{3 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Range" />

### Emits

```ts
/**
 * Emitted events for the Range component
 */
interface RangeEmits {
  change: (payload: [event: Event]) => void;
  update:modelValue: (payload: [value: number | number[] | undefined]) => void;
}
```
