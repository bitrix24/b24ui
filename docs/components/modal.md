---
title: Modal
description: A popup window for showing messages or gathering user input.
outline: deep
---
<script setup>
import ModalExample from '/examples/modal/Modal.vue';
import TitleExample from '/examples/modal/Title.vue';
import DescriptionExample from '/examples/modal/Description.vue';
import CloseExample from '/examples/modal/Close.vue';
import CloseIconExample from '/examples/modal/CloseIcon.vue';
import OverlayExample from '/examples/modal/Overlay.vue';
import TransitionExample from '/examples/modal/Transition.vue';
import FullscreenExample from '/examples/modal/Fullscreen.vue';
import ControlOpenStateExample from '/examples/modal/ControlOpenState.vue';
import DismissibleExample from '/examples/modal/Dismissible.vue';
import ProgrammaticUsageExample from '/examples/modal/ProgrammaticUsage.vue';
import NestedModalsExample from '/examples/modal/NestedModals.vue';
import WithBodySlotExample from '/examples/modal/WithBodySlot.vue';
import WithFooterSlotExample from '/examples/modal/WithFooterSlot.vue';
</script>
# Modal

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/modal"
  reka-ui="https://reka-ui.com/docs/components/dialog"
  reka-ui-title="Dialog"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Modal.vue"
  demo="/components/modal"
>
  A popup window for showing messages or gathering user input.
</Description>

## Usage

Use a [Button](/components/button) or any other component in the default slot of the Modal.

Then, use the `#content` slot to add the content displayed when the Modal is open.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ModalExample />
  </ClientOnly>
</div>

<<< @/examples/modal/demo/Modal.vue{2,5-7,8 vue:line-numbers}

You can also use the `#header`{lang="ts"}, `#body`{lang="ts"} and `#footer`{lang="ts"} slots to customize the Modal's content.

### Title

Use the `title` prop to set the title of the Modal's header.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TitleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/modal/demo/Title.vue{13 vue:line-numbers}
:::

### Description

Use the `description` prop to set the description of the Modal's header.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DescriptionExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/modal/demo/Description.vue{15-16 vue:line-numbers}
:::

### Close

Use the `close` prop to customize or hide the close button (with `false` value) displayed in the Modal's header.

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
<<< @/examples/modal/demo/Close.vue{5-6 vue:line-numbers}
:::

### Close Icon

Use the `close-icon` prop to customize the close button [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html). Defaults to `Cross30Icon`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CloseIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/modal/demo/CloseIcon.vue{2,9 vue:line-numbers}
:::


### Overlay

Use the `overlay` prop to control whether the Modal has an overlay or not. Defaults to `true`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <OverlayExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/modal/demo/Overlay.vue{13 vue:line-numbers}
:::

### Transition

Use the `transition` prop to control whether the Modal is animated or not. Defaults to `true`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TransitionExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/modal/demo/Transition.vue{13 vue:line-numbers}
:::

### Fullscreen

Use the `fullscreen` prop to make the Modal fullscreen.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <FullscreenExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/modal/demo/Fullscreen.vue{2,9 vue:line-numbers}
:::

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::: info
In this example, leveraging [`defineShortcuts`](composables/define-shortcuts), you can toggle the Modal by pressing `O`.
:::

::: tip
This allows you to move the trigger outside of the Modal or remove it entirely.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ControlOpenStateExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/modal/demo/ControlOpenState.vue{7,13 vue:line-numbers}
:::

### Prevent closing

Set the `dismissible` prop to `false` to prevent the Modal from being closed when clicking outside of it or pressing escape.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <DismissibleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/modal/demo/Dismissible.vue{7,13 vue:line-numbers}
:::

### Programmatic usage

You can use the [`useOverlay`](composables/use-overlay) composable to open a Modal programatically.

::: warning
Make sure to wrap your app with the [`App`](/components/app) component which uses the [`OverlayProvider`](https://github.com/nuxt/ui/blob/v3/src/runtime/components/OverlayProvider.vue) component.
:::

First, create a modal component that will be opened programatically:

::: code-group
<<< @/examples/modal/demo/LazyModal.vue{6,11,12,21,29 vue:line-numbers}
:::

::: note
We are emitting a `close` event when the modal is closed or dismissed here. You can emit any data through the `close` event, however, the event must be emitted in order to capture the return value.
:::

Then, use it in your app:

::: tip
You can close the modal within the modal component by calling `modal.close()`.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ProgrammaticUsageExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/modal/demo/ProgrammaticUsage.vue{8,10-14,16-40,48 vue:line-numbers}
:::

### Nested modals

You can nest modals within each other.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <NestedModalsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/modal/demo/NestedModals.vue{4-5,10,22,25,42 vue:line-numbers}
:::

### With footer slot

Use the `#footer` slot to add content after the Modal's body.

::: tip
You can also close the dialog box using the `B24ModalDialogClose` component.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithFooterSlotExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/modal/demo/WithFooterSlot.vue{5,12-19 vue:line-numbers}
:::

### With body slot

Use the `#body` slot to add content.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithBodySlotExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/modal/demo/WithBodySlot.vue{15-36 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Modal" />

### Slots

<ComponentSlots component="Modal" />

### Emits

<ComponentEmits component="Modal" />

