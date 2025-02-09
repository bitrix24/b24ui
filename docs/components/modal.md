---
title: Modal
description: A popup window for showing messages or gathering user input.
outline: deep
---
<script setup>
import ModalExample from '/examples/modal/Modal.vue';
import CloseExample from '/examples/modal/Close.vue';
import WithBodySlotExample from '/examples/modal/WithBodySlot.vue';
import WithFooterSlotExample from '/examples/modal/WithFooterSlot.vue';
</script>
# Modal

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/modal"
  reka-ui="https://reka-ui.com/docs/components/dialog"
  reka-ui-title="Dialog"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Modal.vue"
>
  A popup window for showing messages or gathering user input.
</Description>

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

## Usage

Use a [Button](/components/button) or any other component in the default slot of the Modal.

Then, use the `#content` slot to add the content displayed when the Modal is open.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ModalExample />
  </ClientOnly>
</div>

<<< @/examples/modal/demo/Modal.vue{2,5-7,8 vue:line-numbers}

You can also use the `#header`{lang="ts-type"}, `#body`{lang="ts-type"} and `#footer`{lang="ts-type"} slots to customize the Modal's content.

### Title

Use the `title` prop to set the title of the Modal's header.

__component-code

### Description

Use the `description` prop to set the description of the Modal's header.

__component-code

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
<<< @/examples/modal/demo/Close.vue{2,5-7,8 vue:line-numbers}
:::

### Close Icon

Use the `close-icon` prop to customize the close button [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html). Defaults to `Cross30Icon`.

### Overlay

Use the `overlay` prop to control whether the Modal has an overlay or not. Defaults to `true`.

__component-code

### Transition

Use the `transition` prop to control whether the Modal is animated or not. Defaults to `true`.

__component-code

### Fullscreen

Use the `fullscreen` prop to make the Modal fullscreen.

__component-code

## Examples

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

__component-code

::: info
In this example, leveraging [`defineShortcuts`](/composables/define-shortcuts), you can toggle the Modal by pressing `O`.
:::

::: tip
This allows you to move the trigger outside of the Modal or remove it entirely.
:::

### Prevent closing

Set the `dismissible` prop to `false` to prevent the Modal from being closed when clicking outside of it or pressing escape.

__component-code

### Programmatic usage

You can use the [`useModal`](composables/use-modal) composable to open a Modal programatically.

::: warning
Make sure to wrap your app with the [`App`](/components/app) component which uses the [`ModalProvider`](https://github.com/nuxt/ui/blob/v3/src/runtime/components/ModalProvider.vue) component.
:::

First, create a modal component that will be opened programatically:

__component-code

Then, use it in your app:

::: tip
You can close the modal within the modal component by calling `modal.close()`.
:::

__component-code

### Nested modals

You can nest modals within each other.

__component-code

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
<<< @/examples/modal/demo/WithBodySlot.vue{14-35 vue:line-numbers}
:::



## API

### Props

<ComponentProps component="Modal" />

### Slots

<ComponentSlots component="Modal" />

### Emits

<ComponentEmits component="Modal" />

