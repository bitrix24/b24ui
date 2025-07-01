---
title: Tooltip
description: A small window that shows details when you move your mouse over an item.
outline: deep
---
<script setup>
import TextExample from '/examples/tooltip/Text.vue';
import KbdsExample from '/examples/tooltip/Kbds.vue';
import DelayExample from '/examples/tooltip/Delay.vue';
import ContentExample from '/examples/tooltip/Content.vue';
import ArrowExample from '/examples/tooltip/Arrow.vue';
import DisabledExample from '/examples/tooltip/Disabled.vue';
import OpenExample from '/examples/tooltip/Open.vue';
import HardcodedExample from '/examples/tooltip/Hardcoded.vue';
import HelpIconExample from '/examples/tooltip/HelpIcon.vue';
import WithFollowingCursorExample from '/examples/tooltip/WithFollowingCursor.vue';
</script>
# Tooltip

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/tooltip"
  reka-ui="https://reka-ui.com/docs/components/tooltip"
  reka-ui-title="Tooltip"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Tooltip.vue"
>
  A small window that shows details when you move your mouse over an item.
</Description>

## Usage

Place a [Button](/components/button) or any other component in the Tooltip's default slot.

::: warning
Ensure your application is enclosed with the [`App`](/components/app) component, which incorporates the [`TooltipProvider`](https://reka-ui.com/docs/components/tooltip#provider) from Reka UI.
:::

::: tip
You can [review](/components/app#props}) the `tooltip` property of the `App` component to learn how to set up the Tooltip globally.
:::

### Text

Apply the `text` prop to specify what the Tooltip will display.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TextExample />
  </ClientOnly>
</div>

<<< @/examples/tooltip/demo/Text.vue{15 vue:line-numbers}

### Kbds

Apply the `kbds` prop to render [Kbd](/components/kbd) components inside the Tooltip.

::: warning
`Kbds` are displayed starting from breakpoint `lg`
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <KbdsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tooltip/demo/Kbds.vue{8 vue:line-numbers}
:::

:::tip
You can utilize special keys such as `meta`, which appears as `⌘` on macOS and `Ctrl` on other systems.
:::

### Delay

Apply the `delay-duration` prop to modify the delay before the Tooltip becomes visible. You can make it appear immediately by setting it to `0`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DelayExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tooltip/demo/Delay.vue{9,16 vue:line-numbers}
:::

### Content

Apply the `content` prop to dictate how the Tooltip content is displayed, including options like `align` or `side`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ContentExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tooltip/demo/Content.vue{11-15,29 vue:line-numbers}
:::

### Arrow

Apply the `arrow` prop to add an arrow to the Tooltip.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrowExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tooltip/demo/Arrow.vue{8 vue:line-numbers}
:::

### Disabled

Apply the `disabled` prop to turn off the Tooltip.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tooltip/demo/Disabled.vue{16 vue:line-numbers}
:::

## Examples

### Control open state

You can manage the open state with the `default-open` prop or the `v-model:open` directive.

::: info
In this example, using [`defineShortcuts`](composables/define-shortcuts). Press `O` to toggle the Tooltip.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <OpenExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tooltip/demo/Open.vue{5,7-9,14,16 vue:line-numbers}
:::

### Hardcoded appearance change

Discover ways to alter the tooltip's appearance. Don't forget to verify its appearance in the dark theme.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <HardcodedExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tooltip/demo/Hardcoded.vue{7-11,12-21,29 vue:line-numbers}
:::

### Help Icon

You can use the [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) and the Tooltip.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <HelpIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tooltip/demo/HelpIcon.vue{8-12,14,16 vue:line-numbers}
:::

### With following cursor

You can make the Tooltip follow the cursor when hovering over an element using the [`reference`](https://reka-ui.com/docs/components/tooltip#trigger) prop:

::: info
This example is based on Reka UI's [Tooltip Cursor](https://reka-ui.com/examples/tooltip-cursor) example.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithFollowingCursorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/tooltip/demo/WithFollowingCursor.vue{vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Tooltip" />

### Slots

<ComponentSlots component="Tooltip" />

### Emits

<ComponentEmits component="Tooltip" />
