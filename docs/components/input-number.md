---
title: InputNumber
description: Provide numerical input with a flexible range setting.
outline: deep
---
<script setup>
import InputNumberExample from '/examples/inputnumber/InputNumber.vue';
import DefaultExample from '/examples/inputnumber/Default.vue';
import MinMaxExample from '/examples/inputnumber/MinMax.vue';
import StepExample from '/examples/inputnumber/Step.vue';
import OrientationExample from '/examples/inputnumber/Orientation.vue';
import PlaceholderExample from '/examples/inputnumber/Placeholder.vue';
import ColorExample from '/examples/inputnumber/Color.vue';
import TagExample from '/examples/inputnumber/Tag.vue';
import SizeExample from '/examples/inputnumber/Size.vue';
import DisabledExample from '/examples/inputnumber/Disabled.vue';
import IncrementDecrementExample from '/examples/inputnumber/IncrementDecrement.vue';
import IncrementDecrementIconsExample from '/examples/inputnumber/IncrementDecrementIcons.vue';
import WithDecimalFormatExample from '/examples/inputnumber/WithDecimalFormat.vue';
import WithPercentageFormatExample from '/examples/inputnumber/WithPercentageFormat.vue';
import WithCurrencyFormatExample from '/examples/inputnumber/WithCurrencyFormat.vue';
import WithFormFieldExample from '/examples/inputnumber/WithFormField.vue';
import WithSlotsExample from '/examples/inputnumber/WithSlots.vue';
</script>
# InputNumber

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/input-number"
  reka-ui="https://reka-ui.com/docs/components/number-field"
  reka-ui-title="Number Field"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputNumber.vue"
>
  Provide numerical input with a flexible range setting.
</Description>

::: info
This component relies on the [`@internationalized/number`](https://react-spectrum.adobe.com/internationalized/number/index.html) package which provides utilities for formatting and parsing numbers across locales and numbering systems.
:::

## Usage

Use the `v-model` directive to control the value of the InputNumber.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <InputNumberExample />
  </ClientOnly>
</div>

<<< @/examples/inputnumber/demo/InputNumber.vue{8 vue:line-numbers}


Use the `default-value` prop to set the initial value when you do not need to control its state.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <DefaultExample />
  </ClientOnly>
</div>

<<< @/examples/inputnumber/demo/Default.vue{2 vue:line-numbers}

### Min / Max

Use the `min` and `max` props to set the minimum and maximum values of the InputNumber.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <MinMaxExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/MinMax.vue{15,16 vue:line-numbers}
:::

### Step

Use the `step` prop to set the step value of the InputNumber.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <StepExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/Step.vue{13 vue:line-numbers}
:::

### Orientation

Use the `orientation` prop to change the orientation of the InputNumber.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <OrientationExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/Orientation.vue{18 vue:line-numbers}
:::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <PlaceholderExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/Placeholder.vue{13 vue:line-numbers}
:::

### Color

Use the `color` prop to change the ring color when the InputNumber is focused.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/Color.vue{17 vue:line-numbers}
:::

### Tag

Use the `tag` property to display a small legend on top of the Input.

Use the `tagColor` property to set the color for `tag`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TagExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/Tag.vue{17-18 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the InputNumber.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/Size.vue{17 vue:line-numbers}
:::

### Disabled

Use the `disabled` prop to disable the InputNumber.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/Disabled.vue{13 vue:line-numbers}
:::

### Increment / Decrement

Use the `increment` and `decrement` props to customize the increment and decrement buttons with any [Button](/components/button) props. Defaults to `{ color: 'link', depth: 'light' }`{lang="ts"}.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IncrementDecrementExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/IncrementDecrement.vue{12-15,16-19 vue:line-numbers}
:::

### Increment / Decrement Icons

Use the `increment-icon` and `decrement-icon` props to customize the buttons [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html). Defaults to `Plus30Icon` / `Minus30Icon`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IncrementDecrementIconsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/IncrementDecrementIcons.vue{3-4,12-13 vue:line-numbers}
:::

## Examples

### With decimal format

Use the `format-options` prop to customize the format of the value.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithDecimalFormatExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/WithDecimalFormat.vue{10-13 vue:line-numbers}
:::

### With percentage format

Use the `format-options` prop with `style: 'percent'` to customize the format of the value.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithPercentageFormatExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/WithPercentageFormat.vue{4,10-13 vue:line-numbers}
:::

### With currency format

Use the `format-options` prop with `style: 'currency'` to customize the format of the value.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <WithCurrencyFormatExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/WithCurrencyFormat.vue{30,31,32-37 vue:line-numbers}
:::

### Within a FormField

You can use the InputNumber within a [FormField](/components/form-field) component to display a label, help text, required indicator, etc.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithFormFieldExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/WithFormField.vue{8,10 vue:line-numbers}
:::

### With slots

Use the `#increment` and `#decrement` slots to customize the buttons.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithSlotsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputnumber/demo/WithSlots.vue{11-13,15-17 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="InputNumber" />

### Slots

<ComponentSlots component="InputNumber" />

### Emits

<ComponentEmits component="InputNumber" />

### Expose

When accessing the component via a template ref, you can use the following:

| Name                  | Type                                                            |
|-----------------------|-----------------------------------------------------------------|
| `inputRef`{lang="ts"} | `Ref<InstanceType<typeof NumberFieldInput> \| null>`{lang="ts"} |
