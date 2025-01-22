---
title: Toast
description: A succinct message to provide information or feedback to the user.
outline: deep
---
<script setup>
import TitleExample from '/examples/toast/Title.vue';
import DescriptionExample from '/examples/toast/Description.vue';
</script>
# Toast

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/toast"
  reka-ui="https://reka-ui.com/docs/components/toast"
  reka-ui-title="Toast"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Toast.vue"
>
  A succinct message to provide information or feedback to the user.
</Description>

## Usage

Use the [useToast](composables/use-toast) composable to display a toast in your application.

::: warning
Be certain to wrap your app with the [`App`](/components/app) component, which integrates our [`Toaster`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Toaster.vue) component, leveraging the [`ToastProvider`](https://reka-ui.com/docs/components/toast#provider) from Reka UI.
:::

::: tip
You can check the [`App`](/components/app#props) component `toaster` prop to see how to configure the Toaster globally.
:::

### Title

Pass a `title` field to the `toast.add` method to display a title.

<ClientOnly>
  <TitleExample />
</ClientOnly>

<<< @/examples/toast/demo/Title.vue{7,13 vue:line-numbers}

### Description

Pass a `description` field to the `toast.add` method to display a description.

<ClientOnly>
  <DescriptionExample />
</ClientOnly>

<<< @/examples/toast/demo/Description.vue{8-9,15 vue:line-numbers}

### Icon

Pass an `icon` field to the `toast.add` method to display an [Icon](/components/icon).

::component-example

### Avatar

Pass an `avatar` field to the `toast.add` method to display an [Avatar](/components/avatar).

::component-example

### Color

Pass a `color` field to the `toast.add` method to change the color of the Toast.

::component-example

### Close

Pass a `close` field to customize or hide the close button (with `false` value).

::component-example

### Close Icon

Pass a `closeIcon` field to customize the close button [Icon](/components/icon). Default to `i-lucide-x`.

::component-example

### Actions

Pass an `actions` field to add some [Button](/components/button) actions to the Alert.

::component-example

::: info
Actions renders differently when the description is not set. You can try to remove it.
:::

## Examples

### Change global position

Change the `toaster.position` prop on the [App](/components/app#props) component to change the position of the toasts.

::component-example

::: info
In this example, we use the `AppConfig` to configure the `position` prop of the `Toaster` component globally.
:::

### Change global duration

Change the `toaster.duration` prop on the [App](/components/app#props) component to change the duration of the toasts.

::component-example

::: info
In this example, we use the `AppConfig` to configure the `duration` prop of the `Toaster` component globally.
:::

### Stacked toasts

Set the `toaster.expand` prop to `false` on the [App](/components/app#props) component to display stacked toasts.

::: tip
You can hover over the toasts to expand them. This will also pause the timer of the toasts.
:::

::component-example

::: info
In this example, we use the `AppConfig` to configure the `duration` prop of the `Toaster` component globally.
:::

## API

### Props

<ComponentProps component="Toast" />

### Slots

<ComponentSlots component="Toast" />

### Emits

<ComponentEmits component="Toast" />

