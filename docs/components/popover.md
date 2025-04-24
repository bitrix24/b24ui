---
title: Popover
description: A non-modal popup window for showing messages or gathering user input.
outline: deep
---
<script setup>
import PopoverExample from '/examples/popover/Popover.vue';
import ModeExample from '/examples/popover/Mode.vue';
import DelayExample from '/examples/popover/Delay.vue';
import ContentExample from '/examples/popover/Content.vue';
import ArrowExample from '/examples/popover/Arrow.vue';
import ControlOpenStateExample from '/examples/popover/ControlOpenState.vue';
import PreventClosingExample from '/examples/popover/PreventClosing.vue';
import WithBodySlotExample from '/examples/popover/WithBodySlot.vue';
</script>
# Popover

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/popover"
  reka-ui="https://reka-ui.com/docs/components/popover"
  reka-ui-title="Popover"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Popover.vue"
  demo="/components/popover"
>
  A non-modal popup window for showing messages or gathering user input.
</Description>

## Usage

Use a [Button](/components/button) or any other component in the default slot of the Popover.

Then, use the `#content` slot to add the content displayed when the Popover is open.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <PopoverExample />
  </ClientOnly>
</div>

<<< @/examples/popover/demo/Popover.vue{2,5-7,8 vue:line-numbers}

### Mode

Use the `mode` prop to change the mode of the Popover. Defaults to `click`.

::: tip
When using the `hover` mode, the Reka UI [`HoverCard`](https://reka-ui.com/docs/components/hover-card) component is used instead of the [`Popover`](https://reka-ui.com/docs/components/popover).
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ModeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/popover/demo/Mode.vue{15 vue:line-numbers}
:::

### Delay

When using the `hover` mode, you can use the `open-delay` and `close-delay` props to control the delay before the Popover is opened or closed.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DelayExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/popover/demo/Delay.vue{16-18 vue:line-numbers}
:::

### Content

Use the `content` prop to control how the Popover content is rendered, like its `align` or `side` for example.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ContentExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/popover/demo/Content.vue{28 vue:line-numbers}
:::

### Arrow

Use the `arrow` prop to display an arrow on the Popover.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrowExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/popover/demo/Arrow.vue{4,14-17 vue:line-numbers}
:::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::: tip
In this example, leveraging [`defineShortcuts`](composables/define-shortcuts), you can toggle the Popover by pressing `O`.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ControlOpenStateExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/popover/demo/ControlOpenState.vue{4,6-8,13 vue:line-numbers}
:::

### Prevent closing

Set the `dismissible` prop to `false` to prevent the Popover from being closed when clicking outside of it or pressing escape. A `close:prevent` event will be emitted when the user tries to close it.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <PreventClosingExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/popover/demo/PreventClosing.vue{5,10,12,26 vue:line-numbers}
:::

### Some content

Can be used for various purposes

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithBodySlotExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/popover/demo/WithBodySlot.vue{vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Popover" />

### Slots

<ComponentSlots component="Popover" />

### Emits

<ComponentEmits component="Popover" />
