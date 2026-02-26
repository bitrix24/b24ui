---
title: DashboardToolbar
description: 'A secondary action bar positioned beneath the main navigation in dashboards.'
category: dashboard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardToolbar.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-toolbar
navigation.badge: New
---

## Usage

The DashboardToolbar component is used to display a toolbar under the [DashboardNavbar](/docs/components/dashboard-navbar/) component.

Use it inside the `header` slot of the [DashboardPanel](/docs/components/dashboard-panel/) component:

```vue [pages/index.vue]{9-13}
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <B24DashboardPanel>
    <template #header>
      <B24DashboardNavbar />

      <B24DashboardToolbar />
    </template>
  </B24DashboardPanel>
</template>
```

Use the `left`, `default` and `right` slots to customize the toolbar.

::component-example
---
prettier: true
name: 'dashboard-toolbar-example'
class: '!px-0 !pt-0'
props:
  class: 'w-full'
---
::

::note
In this example, we use the [NavigationMenu](/docs/components/navigation-menu/) component to render some links.
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
