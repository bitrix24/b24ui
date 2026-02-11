---
title: Banner
description: 'Top banner for important user messages.'
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Banner.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/banner
---

## Usage

### Title

Use the `title` prop to display a title on the Banner.

::component-code
---
prettier: true
class: '!p-0'
props:
  title: 'The subscription trial has ended. Subscribe to continue using all apps.'
---
::

### Icon

Use the `icon` prop to display an icon on the Banner.

::component-code
---
prettier: true
class: '!p-0'
ignore:
  - title
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  title: 'The subscription trial has ended. Subscribe to continue using all apps.'
---
::

### Color

Use the `color` prop to change the color of the Banner.

::component-code
---
prettier: true
class: '!p-0'
ignore:
  - icon
  - title
cast:
  icon: 'RocketIcon'
props:
  color: 'air-secondary-alert'
  icon: 'RocketIcon'
  title: 'The subscription trial has ended. Subscribe to continue using all apps.'
---
::

### Close

Use the `close` prop to display a [Button](/docs/components/button/) to dismiss the Banner. Defaults to `false`.

::tip
A `close` event will be emitted when the close button is clicked.
::

::component-example
---
iframe:
  style: 'height: 48px;'
overflowHidden: true
name: 'banner-example'
---
#code

```vue
<template>
  <B24Banner id="example" title="The subscription trial has ended. Subscribe to continue using all apps." close />
</template>
```

::

::note
When closed, `banner-${id}` will be stored in the local storage to prevent it from being displayed again. :br For the example above, `banner-example` will be stored in the local storage.
::

::caution
To persist the dismissed state across page reloads, you must specify an `id` prop. Without an explicit `id`, the banner will only be hidden for the current session and will reappear on page reload.
::

### Close Icon

Use the `close-icon` prop to customize the close button [Icon](https://bitrix24.github.io/b24icons/icons/). Defaults to `CrossMIcon`.

::component-example
---
iframe:
  style: 'height: 48px;'
overflowHidden: true
name: 'banner-with-title-example'
ignore:
  - title
  - closeIcon
props:
  title: 'The subscription trial has ended. Subscribe to continue using all apps.'
  closeIcon: 'CircleCrossIcon'
---
#code

```vue
<script setup lang="ts">
import CircleCrossIcon from '@bitrix24/b24icons-vue/outline/CircleCrossIcon'
</script>

<template>
  <B24Banner
    title="The subscription trial has ended. Subscribe to continue using all apps."
    close
    :close-icon="CircleCrossIcon"
  />
</template>
```

::

### Actions

Use the `actions` prop to add some [Button](/docs/components/button/) actions to the Banner.

::component-code
---
prettier: true
class: '!p-0'
ignore:
  - title
  - actions
  - variant
external:
  - actions
externalTypes:
  - ButtonProps[]
cast:
  actions: 'ComponentWithIcon'
props:
  title: 'The subscription trial has ended. Subscribe to continue using all apps.'
  actions:
    - label: Buy a subscription
      color: 'air-primary'
      icon: 'RocketIcon'
    - label: Open scanner
      color: 'air-secondary-accent-2'
---
::

::note
The action buttons default to `color="air-secondary-no-accen"` and `size="xs"`. You can customize these values by passing them directly to each action button.
::

### Link

You can pass any property from the [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link) component such as `to`, `target`, `rel`, etc.

::component-code
---
prettier: true
class: '!p-0'
overflowHidden: true
ignore:
  - title
  - target
props:
  to: 'https://apidocs.bitrix24.com/'
  target: '_blank'
  title: 'Explore the Bitrix24 REST API'
  color: 'air-primary'
---
::

::note
The `NuxtLink` component will inherit all other attributes you pass to the `Banner` component.
::

## Examples

### Within `app.vue`

Use the Banner component in your `app.vue` or in a layout:

```vue [app.vue]{3-7}
<template>
  <B24App>
    <B24Banner
      :icon="Bitrix24Icon"
      title="Explore the Bitrix24 REST API"
      to="https://apidocs.bitrix24.com/"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </B24App>
</template>
```

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme
