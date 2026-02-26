---
title: DashboardSidebarToggle
description: 'A mobile menu button that shows or hides the sidebar navigation.'
category: dashboard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardSidebarToggle.vue
  - label: Button
    iconName: Bitrix24Icon
    to: /docs/components/button/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-sidebar-toggle
navigation.badge: New
---

## Usage

The DashboardSidebarToggle component is used by the [DashboardNavbar](/docs/components/dashboard-navbar/) and [DashboardSidebar](/docs/components/dashboard-sidebar/) components.

It is automatically displayed on mobile to toggle the sidebar, **you don't have to add it manually**.

::component-code
---
hide:
  - class
props:
  class: 'lg:flex'
---
::

It extends the [Button](/docs/components/button/) component, so you can pass any property such as `color`, `size`, etc.

::component-code
---
hide:
  - class
ignore:
  - color
props:
  color: 'air-primary'
  class: 'lg:flex'
---
::

::note
The button defaults to `color="air-tertiary"`.
::

## Examples

### Within `toggle` slot

Even though this component is automatically displayed on mobile, you can use the `toggle` slot of the [DashboardNavbar](/docs/components/dashboard-navbar/) and [DashboardSidebar](/docs/components/dashboard-sidebar/) components to customize the button.

::code-group

```vue [layouts/dashboard.vue]{4-6}
<template>
  <B24DashboardGroup>
    <B24DashboardSidebar>
      <template #toggle>
        <B24DashboardSidebarToggle />
      </template>
    </B24DashboardSidebar>

    <slot />
  </B24DashboardGroup>
</template>
```

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
        <template #toggle>
          <B24DashboardSidebarToggle />
        </template>
      </B24DashboardNavbar>
    </template>
  </B24DashboardPanel>
</template>
```

::

::tip
When using the `toggle-side` prop of the `DashboardSidebar` and `DashboardNavbar` components, the button will be displayed on the specified side.
::

## API

### Props

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
This component also supports all native `<button>` HTML attributes.
::

## Theme

:component-theme
