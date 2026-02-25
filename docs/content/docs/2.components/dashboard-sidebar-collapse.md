---
title: DashboardSidebarCollapse
description: 'A desktop toggle button that collapses the sidebar to provide more space for content.'
category: dashboard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardSidebarCollapse.vue
  - label: Button
    iconName: Bitrix24Icon
    to: /docs/components/button/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-sidebar-collapse
navigation.badge: Soon
---

## Usage

The DashboardSidebarCollapse component is used to collapse/expand the [DashboardSidebar](/docs/components/dashboard-sidebar/) component **when its `collapsible` prop is set**.

:component-code

It extends the [Button](/docs/components/button/) component, so you can pass any property such as `color`, `size`, etc.

::component-code
---
ignore:
  - color
props:
    color: 'air-primary'
---
::

::note
The button defaults to `color="air-tertiary"`.
::

## Examples

### Within `header` slot

You can put this component in the `header` slot of the [DashboardSidebar](/docs/components/dashboard-sidebar/) component and use the `collapsed` prop to hide the left part of the header for example:

```vue [layouts/dashboard.vue]{4-8}
<template>
  <B24DashboardGroup>
    <B24DashboardSidebar collapsible>
      <template #header="{ collapsed }">
        <Logo v-if="!collapsed" />

        <B24DashboardSidebarCollapse />
      </template>
    </B24DashboardSidebar>

    <slot />
  </B24DashboardGroup>
</template>
```

### Within `leading` slot

You can put this component in the `leading` slot of the [DashboardNavbar](/docs/components/dashboard-navbar/) component to display it before the title for example:

```vue [pages/index.vue]{11-13}
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <B24DashboardPanel>
    <template #header>
      <B24DashboardNavbar title="Home">
        <template #leading>
          <B24DashboardSidebarCollapse />
        </template>
      </B24DashboardNavbar>
    </template>
  </B24DashboardPanel>
</template>
```

## API

### Props

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
This component also supports all native `<button>` HTML attributes.
::

## Theme

:component-theme
