---
title: Switch
description: A toggle control for switching between two states.
category: form
---
<script setup>
import SwitchExample from '/examples/switch/Switch.vue';
import SwitchDefExample from '/examples/switch/SwitchDef.vue';
import LabelExample from '/examples/switch/Label.vue';
import DescriptionExample from '/examples/switch/Description.vue';
import IconExample from '/examples/switch/Icon.vue';
import LoadingExample from '/examples/switch/Loading.vue';
import LoadingIconExample from '/examples/switch/LoadingIcon.vue';
import ColorExample from '/examples/switch/Color.vue';
import SizeExample from '/examples/switch/Size.vue';
import DisabledExample from '/examples/switch/Disabled.vue';
</script>
# Switch

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/switch"
  reka-ui="https://reka-ui.com/docs/components/switch"
  reka-ui-title="Switch"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Switch.vue"
  demo="/components/switch"
>
  A toggle control for switching between two states.
</Description>

## Usage

Use the `v-model` directive to control the checked state of the Switch.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SwitchExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/switch/demo/Switch.vue{4,8 vue:line-numbers}
:::

Use the `default-value` prop to set the initial value when you do not need to control its state.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SwitchDefExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/switch/demo/SwitchDef.vue{2 vue:line-numbers}
:::

### Label

Use the `label` prop to set the label of the Switch.

When using the `required` prop, an asterisk is added next to the label.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <LabelExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/switch/demo/Label.vue{15,16 vue:line-numbers}
:::

### Description

Use the `description` prop to set the description of the Switch.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DescriptionExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/switch/demo/Description.vue{14 vue:line-numbers}
:::

### Icon

Use the `checked-icon` and `unchecked-icon` props to set the icons of the Switch when checked and unchecked.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/switch/demo/Icon.vue{8,9 vue:line-numbers}
:::

### Loading

Use the `loading` prop to show a loading icon on the Switch.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <LoadingExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/switch/demo/Loading.vue{13 vue:line-numbers}
:::

### Loading Icon

Use the `loading-icon` prop to customize the loading icon [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html). Defaults to `Refresh6Icon`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <LoadingIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/switch/demo/LoadingIcon.vue{16 vue:line-numbers}
:::

### Color

Use the `color` prop to change the color of the Switch.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/switch/demo/Color.vue{15 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the Switch.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/switch/demo/Size.vue{13 vue:line-numbers}
:::

### Disabled

Use the `disabled` prop to disable the Switch.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/switch/demo/Disabled.vue{13 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Switch" />

### Slots

<ComponentSlots component="Switch" />

### Emits

```ts
/**
 * Emitted events for the Switch component
 */
interface SwitchEmits {
  change: (payload: [event: Event]) => void;
  update:modelValue: (payload: [value: boolean]) => void;
}
```
