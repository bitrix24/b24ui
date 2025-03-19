---
title: Collapsible
description: A collapsible component for showing or hiding its content.
outline: deep
---
<script setup>
import CollapsibleExample from '/examples/collapsible/Collapsible.vue';
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

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

## Usage

::: info
[Reduced movement](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion) is taken into account
:::

Use a [Button](/components/button) or any other component in the default slot of the Collapsible.

Then, use the `#content` slot to add the content displayed when the Collapsible is open.

__component-code

### Unmount

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the Collapsible is collapsed. Defaults to `true`.

__component-code

::: info
You can inspect the DOM to see the content being rendered.
:::

### Disabled

Use the `disabled` prop to disable the Collapsible.

__component-code

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

__component-code

::: info
In this example, leveraging [`defineShortcuts`](composables/define-shortcuts), you can toggle the Collapsible by pressing `O`.
:::

::: tip
This allows you to move the trigger outside of the Collapsible or remove it entirely.
:::

### With rotating icon

Here is an example with a rotating icon in the Button that indicates the open state of the Collapsible.

__component-code

## API

### Props

<ComponentProps component="Collapsible" />

### Slots

<ComponentSlots component="Collapsible" />

### Emits

<ComponentEmits component="Collapsible" />

