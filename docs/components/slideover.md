---
title: Slideover
description: A dialog that slides in from any side of the screen.
outline: deep
---
<script setup>
import SlideoverExample from '/examples/slideover/Slideover.vue';
import TitleExample from '/examples/slideover/Title.vue';
import DescriptionExample from '/examples/slideover/Description.vue';
import CloseExample from '/examples/slideover/Close.vue';
import CloseIconExample from '/examples/slideover/CloseIcon.vue';
import SideExample from '/examples/slideover/Side.vue';
import OverlayExample from '/examples/slideover/Overlay.vue';
import OverlayBlurExample from '/examples/slideover/OverlayBlur.vue';
import TransitionExample from '/examples/slideover/Transition.vue';
import ControlOpenStateExample from '/examples/slideover/ControlOpenState.vue';
import DismissibleExample from '/examples/slideover/Dismissible.vue';
import ProgrammaticUsageExample from '/examples/slideover/ProgrammaticUsage.vue';
import NestedSlideoverExample from '/examples/slideover/NestedSlideover.vue';
import WithFooterSlotExample from '/examples/slideover/WithFooterSlot.vue';
</script>
# Slideover

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/slideover"
  reka-ui="https://reka-ui.com/docs/components/dialog"
  reka-ui-title="Dialog"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Slideover.vue"
  demo="/components/slideover"
>
  A dialog that slides in from any side of the screen.
</Description>

## Usage

Use a [Button](/components/button) or any other component in the default slot of the Slideover.

Then, use the `#content` slot to add the content displayed when the Slideover is open.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SlideoverExample />
  </ClientOnly>
</div>

<<< @/examples/slideover/demo/Slideover.vue{2,5-7,8 vue:line-numbers}

You can also use the `#header`{lang="ts"}, `#body`{lang="ts"} and `#footer`{lang="ts"} slots to customize the Slideover's content.

### Title

Use the `title` prop to set the title of the Slideover's header.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TitleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/slideover/demo/Title.vue{13 vue:line-numbers}
:::

### Description

Use the `description` prop to set the description of the Slideover's header.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DescriptionExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/slideover/demo/Description.vue{15-16 vue:line-numbers}
:::

### Close

Use the `close` prop to customize or hide the close button (with `false` value) displayed in the Slideover's header.

You can pass any property from the [Button](/components/button) component to customize it.

::: tip
The close button is not displayed if the `#content` slot is used as it's a part of the header.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CloseExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/slideover/demo/Close.vue{5-6,18 vue:line-numbers}
:::

### Close Icon

Use the `close-icon` prop to customize the close button [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html). Defaults to `Cross30Icon`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CloseIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/slideover/demo/CloseIcon.vue{2,9 vue:line-numbers}
:::

### Side

Use the `side` prop to set the side of the screen where the Slideover will slide in from. Defaults to `right`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SideExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/slideover/demo/Side.vue{15 vue:line-numbers}
:::

### Overlay

Use the `overlay` prop to control whether the Modal has an overlay or not. Defaults to `true`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <OverlayExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/slideover/demo/Overlay.vue{13 vue:line-numbers}
:::

If you want to disable background blur, you should use the `overlayBlur` prop.
The `overlayBlur` prop has 3 options:

- `auto`: (default) when the user has **not requested** [reduced motion](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion)
- `on`: always use blur
- `off`: do not use blur

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <OverlayBlurExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/modal/demo/OverlayBlur.vue{13 vue:line-numbers}
:::

### Transition

Use the `transition` prop to control whether the Slideover is animated or not. Defaults to `true`.

::: info
[Reduced movement](https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion) is taken into account
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TransitionExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/slideover/demo/Transition.vue{13 vue:line-numbers}
:::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::: info
In this example, leveraging [`defineShortcuts`](composables/define-shortcuts), you can toggle the Slideover by pressing `O`.
:::

::: tip
This allows you to move the trigger outside of the Slideover or remove it entirely.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ControlOpenStateExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/slideover/demo/ControlOpenState.vue{7,13 vue:line-numbers}
:::

### Disable dismissal

Set the `dismissible` prop to `false` to prevent the Slideover from being closed when clicking outside of it or pressing escape. A `close:prevent` event will be emitted when the user tries to close it.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <DismissibleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/slideover/demo/Dismissible.vue{3 vue:line-numbers}
:::

### Programmatic usage

You can use the [`useOverlay`](composables/use-overlay) composable to open a Slideover programatically.

::: warning
Make sure to wrap your app with the [`App`](/components/app) component which uses the [`OverlayProvider`](https://github.com/nuxt/ui/blob/v3/src/runtime/components/OverlayProvider.vue) component.
:::

First, create a slideover component that will be opened programatically:

::: code-group
<<< @/examples/slideover/demo/LazySlideover.vue{6,11,12,25,33 vue:line-numbers}
:::

::: info
We are emitting a `close` event when the slideover is closed or dismissed here. You can emit any data through the `close` event, however, the event must be emitted in order to capture the return value.
:::

Then, use it in your app:

::: tip
You can close the slideover within the slideover component by emitting `emit('close')`.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ProgrammaticUsageExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/slideover/demo/ProgrammaticUsage.vue{8,10-14,16-40,48 vue:line-numbers}
:::

### Nested slideovers

You can nest slideovers within each other.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <NestedSlideoverExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/slideover/demo/NestedSlideover.vue{4-5,10,12,22,29,31,55 vue:line-numbers}
:::

### With footer slot

Use the `#footer` slot to add content after the Slideover's body.

::: tip
You can also close the dialog box using the `B24ModalDialogClose` component.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithFooterSlotExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/slideover/demo/WithFooterSlot.vue{5,12-19 vue:line-numbers}
:::


## API

### Props

<ComponentProps component="Slideover" />

### Slots

<ComponentSlots component="Slideover" />

### Emits

<ComponentEmits component="Slideover" />

