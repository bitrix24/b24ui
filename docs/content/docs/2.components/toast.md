---
title: Toast
description: A short message to offer information or feedback to the user.
category: overlay
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Toast.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/toast
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/toast
  - label: Toast
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/toast
---

## Usage

Use the [useToast](/docs/composables/use-toast/) composable to display a toast in your application.

::component-example
---
collapse: true
prettier: true
name: 'toast-example'
---
::

::warning
Make sure to wrap your app with the [`App`](/docs/components/app/) component which uses our [`Toaster`](https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Toaster.vue) component which uses the [`ToastProvider`](https://reka-ui.com/docs/components/toast#provider) component from Reka UI.
::

::tip{to="/docs/components/app/#props"}
You can check the `App` component `toaster` prop to see how to configure the Toaster globally.
::

### Title

Pass a `title` field to the `toast.add` method to display a title.

::component-example
---
options:
  - name: 'title'
    label: 'title'
    default: 'Uh oh! Something went wrong.'
name: 'toast-title-example'
---
::

### Description

Pass a `description` field to the `toast.add` method to display a description.

::component-example
---
options:
  - name: 'title'
    label: 'title'
    default: 'Uh oh! Something went wrong.'
  - name: 'description'
    label: 'description'
    default: 'There was a problem with your request.'
name: 'toast-description-example'
---
::

### Icon

Pass an `icon` field to the `toast.add` method to display an [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-example
---
name: 'toast-icon-example'
---
::

### Avatar

Pass an `avatar` field to the `toast.add` method to display an [Avatar](/docs/components/avatar/).

::component-example
---
name: 'toast-avatar-example'
---
::

### Color

Pass a `color` field to the `toast.add` method to change the color of the Toast.

::component-example
---
options:
  - name: 'color'
    label: 'color'
    default: air-primary-success
    items:
      - air-primary
      - air-primary-success
      - air-primary-alert
      - air-primary-copilot
      - air-primary-warning
      - air-secondary
name: 'toast-color-example'
---
::

### Close

Pass a `close` field to customize or hide the close [Button](/docs/components/button/) (with `false` value).

::component-example
---
name: 'toast-close-example'
---
::

### Close Icon

Pass a `closeIcon` field to customize the close button [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-example
---
name: 'toast-close-icon-example'
---
::

### Actions

Pass an `actions` field to add some [Button](/docs/components/button/) actions to the Toast.

::component-example
---
options:
  - name: 'description'
    label: 'description'
    default: 'There was a problem with your request.'
name: 'toast-actions-example'
---
::

### Progress

Pass a `progress` field to customize or hide the [Progress](/docs/components/progress/) bar (with `false` value).

::tip
The Progress bar inherits the Toast color by default, but you can override it using the `progress.color` field.
::

::component-example
---
name: 'toast-progress-example'
---
::

### Orientation

Pass an `orientation` field to the `toast.add` method to change the orientation of the Toast.

::component-example
---
options:
  - name: 'orientation'
    label: 'orientation'
    default: 'horizontal'
    items:
      - horizontal
      - vertical
name: 'toast-orientation-example'
---
::

## Examples

::note{to="/docs/components/app/"}
Bitrix24 UI provides an **App** component that wraps your app to provide global configurations.
::

### Change global position

Change the `toaster.position` prop on the [App](/docs/components/app/#props) component to change the position of the toasts.

```vue [app.vue]
<script setup lang="ts">
const toaster = { position: 'bottom-right' }
</script>

<template>
  <B24App :toaster="toaster">
    <NuxtPage />
  </B24App>
</template>
```

::component-example
---
prettier: true
name: 'toast-example'
---

#options
:toaster-position-example
::

::note{to="https://github.com/bitrix24/b24ui/blob/main/docs/app/app.config.ts#L3"}
In this example, we use the `AppConfig` to configure the `position` prop of the `Toaster` component globally.
::

### Change global duration

Change the `toaster.duration` prop on the [App](/docs/components/app/#props) component to change the duration of the toasts.

```vue [app.vue]
<script setup lang="ts">
const toaster = { duration: 5000 }
</script>

<template>
  <B24App :toaster="toaster">
    <NuxtPage />
  </B24App>
</template>
```

::component-example
---
prettier: true
name: 'toast-example'
---

#options
:toaster-duration-example
::

::note{to="https://github.com/bitrix24/b24ui/blob/main/docs/app/app.config.ts#L4"}
In this example, we use the `AppConfig` to configure the `duration` prop of the `Toaster` component globally.
::

### Change global max

Change the `toaster.max` prop on the [App](/docs/components/app/#props) component to change the max number of toasts displayed at once.

```vue [app.vue]
<script setup lang="ts">
const toaster = { max: 3 }
</script>

<template>
  <B24App :toaster="toaster">
    <NuxtPage />
  </B24App>
</template>
```

::component-example
---
prettier: true
name: 'toast-example'
---

#options
:toaster-max-example
::

::note{to="https://github.com/bitrix24/b24ui/blob/main/docs/app/app.config.ts#L5"}
In this example, we use the `AppConfig` to configure the `max` prop of the `Toaster` component globally.
::

### Stacked toasts

Set the `toaster.expand` prop to `false` on the [App](/docs/components/app/#props) component to display stacked toasts (inspired by [Sonner](https://sonner.emilkowal.ski/)).

```vue [app.vue]
<script setup lang="ts">
const toaster = { expand: true }
</script>

<template>
  <B24App :toaster="toaster">
    <NuxtPage />
  </B24App>
</template>
```

::tip
You can hover over the toasts to expand them. This will also pause the timer of the toasts.
::

::component-example
---
prettier: true
name: 'toast-example'
---

#options
:toaster-expand-example
::

::note{to="https://github.com/bitrix24/b24ui/blob/main/docs/app/app.config.ts#L6"}
In this example, we use the `AppConfig` to configure the `expand` prop of the `Toaster` component globally.
::

### With callback

Pass an `onUpdateOpen` field to execute a callback when the toast is closed (either by expiration or user dismissal).

::component-example
---
collapse: true
name: 'toast-callback-example'
---
::

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

### Expose

When accessing the component via a template ref, you can use the following:

| Name | Type |
| ---- | ---- |
| `height`{lang="ts-type"} | `Ref<number>`{lang="ts-type"} |

## Theme

:component-theme
