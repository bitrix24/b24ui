---
title: DashboardGroup
description: 'A fixed-layout dashboard container with sidebar state management and persistent UI state.'
category: dashboard
badge: new
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardGroup.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-group
---

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

## Usage

The DashboardGroup component is the main layout that wraps the [SidebarLayout](/docs/components/sidebar-layout/) components to create a responsive dashboard interface.

Use it in a layout or in your `app.vue`:

```vue [layouts/dashboard.vue]{2,6}
<template>
  <B24DashboardGroup>
    <B24SidebarLayout>
      <slot />
    <B24SidebarLayout>
  </B24DashboardGroup>
</template>
```

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
