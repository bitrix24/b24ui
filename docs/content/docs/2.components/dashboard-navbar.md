---
title: DashboardNavbar
description: 'A responsive navigation bar for dashboards.'
category: dashboard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardNavbar.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-navbar
navigation.badge: Soon
---

## Usage`

The DashboardNavbar component is a responsive navigation bar that integrates with the [DashboardSidebar](/docs/components/dashboard-sidebar/) component. It includes a mobile toggle button to enable responsive navigation in dashboard layouts.

Use it inside the `header` slot of the [DashboardPanel](/docs/components/dashboard-panel/) component:

```vue [pages/index.vue]{9-11}
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <B24DashboardPanel>
    <template #header>
      <B24DashboardNavbar />
    </template>
  </B24DashboardPanel>
</template>
```

Use the `left`, `default` and `right` slots to customize the navbar.

::component-example
---
prettier: true
name: 'dashboard-navbar-example'
class: '!px-0 !pt-0'
props:
  class: 'w-full'
---
::

### Title

Use the `title` prop to set the title of the navbar.

::component-code
---
hide:
  - class
props:
  title: 'Dashboard'
  class: 'w-full'
class: '!px-0 !pt-0'
---
::

### Icon

Use the `icon` prop to set the icon of the navbar.

::component-code
---
hide:
  - class
ignore:
  - title
  - icon
cast:
  icon: 'RocketIcon'
props:
  title: 'Dashboard'
  icon: 'RocketIcon'
  class: 'w-full'
class: '!px-0 !pt-0'
---
::

### Toggle

Use the `toggle` prop to customize the toggle button displayed on mobile that opens the [DashboardSidebar](/docs/components/dashboard-sidebar/) component.

You can pass any property from the [Button](/docs/components/button/) component to customize it.

::component-example
---
iframe: true
iframeMobile: true
overflowHidden: true
name: 'dashboard-navbar-toggle-example'
props:
  class: 'w-full'
---
::

### Toggle Side

Use the `toggle-side` prop to change the side of the toggle button. Defaults to `left`.

::component-example
---
iframe: true
iframeMobile: true
overflowHidden: true
name: 'dashboard-navbar-toggle-side-example'
props:
  class: 'w-full'
---
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
