---
title: Checkbox
description: A toggle input for marking as checked or unchecked.
outline: deep
---
<script setup>
import CheckboxExample from '/examples/checkbox/Checkbox.vue';
import CheckboxDefExample from '/examples/checkbox/CheckboxDef.vue';
import IndeterminateExample from '/examples/checkbox/Indeterminate.vue';
import LabelExample from '/examples/checkbox/Label.vue';
import DescriptionExample from '/examples/checkbox/Description.vue';
import ColorExample from '/examples/checkbox/Color.vue';
import SizeExample from '/examples/checkbox/Size.vue';
import DisabledExample from '/examples/checkbox/Disabled.vue';
</script>
# Checkbox

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/checkbox"
  reka-ui="https://reka-ui.com/docs/components/checkbox"
  reka-ui-title="Checkbox"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Checkbox.vue"
>
  A toggle input for marking as checked or unchecked.
</Description>

## Usage

Use the `v-model` directive to control the checked state of the Checkbox.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CheckboxExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/checkbox/demo/Checkbox.vue{4,8 vue:line-numbers}
:::

Use the `default-value` prop to set the initial value when you do not need to control its state.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CheckboxDefExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/checkbox/demo/CheckboxDef.vue{2 vue:line-numbers}
:::

### Indeterminate

Use the `indeterminate` value in the `v-model` directive or `default-value` prop to set the Checkbox to an [indeterminate state](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes).

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IndeterminateExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/checkbox/demo/Indeterminate.vue{2 vue:line-numbers}
:::

### Label

Use the `label` prop to set the label of the Checkbox.

When using the `required` prop, an asterisk is added next to the label.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <LabelExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/checkbox/demo/Label.vue{15,16 vue:line-numbers}
:::

### Description

Use the `description` prop to set the description of the Checkbox.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DescriptionExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/checkbox/demo/Description.vue{14 vue:line-numbers}
:::

### Color

Use the `color` prop to change the color of the Checkbox.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/checkbox/demo/Color.vue{15 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the Checkbox.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/checkbox/demo/Size.vue{15 vue:line-numbers}
:::

### Disabled

Use the `disabled` prop to disable the Checkbox.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/checkbox/demo/Disabled.vue{13 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Checkbox" />

### Slots

<ComponentSlots component="Checkbox" />

### Emits

<ComponentEmits component="Checkbox" />
