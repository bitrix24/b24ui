---
title: Tooltip
description: A popup that reveals information when hovering over an element.
outline: deep
---
<script setup>
import TooltipExample from '/examples/tooltip/TooltipExample.vue';
import TooltipKbdsExample from '/examples/tooltip/TooltipKbdsExample.vue';
import TooltipDelayExample from '/examples/tooltip/TooltipDelayExample.vue';
import TooltipContentExample from '/examples/tooltip/TooltipContentExample.vue';
import TooltipArrowExample from '/examples/tooltip/TooltipArrowExample.vue';
import TooltipDisabledExample from '/examples/tooltip/TooltipDisabledExample.vue';
import TooltipOpenExample from '/examples/tooltip/TooltipOpenExample.vue';
import TooltipHardcodedExample from '/examples/tooltip/TooltipHardcodedExample.vue';
</script>
# Tooltip

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/tooltip"
  reka-ui="https://reka-ui.com/docs/components/tooltip"
  reka-ui-title="Tooltip"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Tooltip.vue"
>
  A popup that reveals information when hovering over an element.
</Description>

## Usage

Use a [Button](/components/button) or any other component in the default slot of the Tooltip.

::: warning
Make sure to wrap your app with the [`App`](/components/app) component which uses the [`TooltipProvider`](https://reka-ui.com/docs/components/tooltip#provider) component from Reka UI.
:::

::: tip
You can [check](/components/app#props}) the `App` component `tooltip` prop to see how to configure the Tooltip globally.
:::

### Text

Use the `text` prop to set the content of the Tooltip.

<ComponentShowExample >
  <iframe data-why class="min-h-[500px] sm:min-h-[300px]" allowtransparency="true">
    <B24App>
      <TooltipExample />
    </B24App>
  </iframe>
</ComponentShowExample>

<<< @/examples/tooltip/TooltipExample.vue

### Kbds

Use the `kbds` prop to render [Kbd](/components/kbd) components in the Tooltip.

::: warning
`Kbds` are displayed starting from breakpoint `lg`
:::

<ComponentShowExample >
  <iframe data-why class="w-[1200px] min-h-[300px] sm:min-h-[100px]" allowtransparency="true">
    <B24App>
      <TooltipKbdsExample />
    </B24App>
  </iframe>
</ComponentShowExample>

<<< @/examples/tooltip/TooltipKbdsExample.vue

:::tip
You can use special keys like `meta` that displays as `⌘` on macOS and `Ctrl` on other platforms.
:::

### Delay

Use the `delay-duration` prop to change the delay before the Tooltip appears. For example, you can make it appear instantly by setting it to `0`.

<ComponentShowExample >
  <iframe data-why class="min-h-[500px] sm:min-h-[300px]" allowtransparency="true">
    <B24App>
      <TooltipDelayExample />
    </B24App>
  </iframe>
</ComponentShowExample>

<<< @/examples/tooltip/TooltipDelayExample.vue

### Content

Use the `content` prop to control how the Tooltip content is rendered, like its `align` or `side` for example.

<ComponentShowExample >
  <iframe data-why class="min-h-[650px] sm:min-h-[450px]" allowtransparency="true">
    <B24App>
      <TooltipContentExample />
    </B24App>
  </iframe>
</ComponentShowExample>

<<< @/examples/tooltip/TooltipContentExample.vue

### Arrow

Use the `arrow` prop to display an arrow on the Tooltip.

<ComponentShowExample >
  <iframe data-why class="min-h-[400px] sm:min-h-[100px]" allowtransparency="true">
    <B24App>
      <TooltipArrowExample />
    </B24App>
  </iframe>
</ComponentShowExample>

<<< @/examples/tooltip/TooltipArrowExample.vue

### Disabled

Use the `disabled` prop to disable the Tooltip.

<ComponentShowExample >
  <iframe data-why class="min-h-[500px] sm:min-h-[300px]" allowtransparency="true">
    <B24App>
      <TooltipDisabledExample />
    </B24App>
  </iframe>
</ComponentShowExample>

<<< @/examples/tooltip/TooltipDisabledExample.vue

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::: info
In this example, leveraging [`defineShortcuts`](composables/define-shortcuts).

You can toggle the Tooltip by click in frame and pressing `O`.
:::

<ComponentShowExample >
  <iframe data-why class="min-h-[300px] sm:min-h-[100px]" allowtransparency="true">
    <B24App>
      <TooltipOpenExample />
    </B24App>
  </iframe>
</ComponentShowExample>

<<< @/examples/tooltip/TooltipOpenExample.vue

### Hardcoded appearance change

See how you can change the appearance of the tooltip. Don't forget to check how it all looks in the dark theme

<ComponentShowExample >
  <iframe data-why class="min-h-[300px] sm:min-h-[400px]" allowtransparency="true">
    <B24App>
      <TooltipHardcodedExample />
    </B24App>
  </iframe>
</ComponentShowExample>

<<< @/examples/tooltip/TooltipHardcodedExample.vue

## API

### Props

<ComponentProps component="Tooltip" />

### Slots

<ComponentSlots component="Tooltip" />

### Emits

<ComponentEmits component="Tooltip" />
