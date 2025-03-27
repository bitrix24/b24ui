---
title: Collapsible
description: A collapsible component for showing or hiding its content.
outline: deep
---
<script setup>
import CollapsibleExample from '/examples/collapsible/Collapsible.vue';
import UnmountExample from '/examples/collapsible/Unmount.vue';
import DisabledExample from '/examples/collapsible/Disabled.vue';
import ControlOpenStateExample from '/examples/collapsible/ControlOpenState.vue';
</script>
# Collapsible

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/collapsible"
  reka-ui="https://reka-ui.com/docs/components/collapsible"
  reka-ui-title="Collapsible"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Collapsible.vue"
  demo="/components/collapsible"
>
  A collapsible component for showing or hiding its content.
</Description>

## Usage

::: info
[Reduced movement](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion) is taken into account
:::

Use a [Button](/components/button) or any other component in the default slot of the Collapsible.

Then, use the `#content` slot to add the content displayed when the Collapsible is open.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CollapsibleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/collapsible/demo/Collapsible.vue{vue:line-numbers}
:::

### Unmount

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the Collapsible is collapsed. Defaults to `true`.

::: info
You can inspect the DOM to see the content being rendered.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <UnmountExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/collapsible/demo/Unmount.vue{15 vue:line-numbers}
:::

### Disabled

Use the `disabled` prop to disable the Collapsible.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/collapsible/demo/Disabled.vue{15 vue:line-numbers}
:::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::: info
In this example, leveraging [`defineShortcuts`](composables/define-shortcuts), you can toggle the Collapsible by pressing `O`.
:::

::: tip
This allows you to move the trigger outside of the Collapsible or remove it entirely.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ControlOpenStateExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/collapsible/demo/ControlOpenState.vue{8,14 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Collapsible" />

### Slots

<ComponentSlots component="Collapsible" />

### Emits

<ComponentEmits component="Collapsible" />

