---
title: DashboardResizeHandle
description: 'A resize handle for sidebars or panels.'
category: dashboard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardResizeHandle.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-resize-handle
navigation.badge: Soon
---

## Usage

The DashboardResizeHandle component is used by the [DashboardSidebar](/docs/components/dashboard-sidebar/) and [DashboardPanel](/docs/components/dashboard-panel/) components.

It is automatically displayed when the `resizable` prop is set, **you don't have to add it manually**.

## Examples

### Within `resize-handle` slot

Even though this component is automatically displayed when the `resizable` prop is set, you can use the `resize-handle` slot of the [DashboardSidebar](/docs/components/dashboard-sidebar/) and [DashboardPanel](/docs/components/dashboard-panel/) components to customize the handle.

::code-group

```vue [layouts/dashboard.vue]{4-11}
<template>
  <B24DashboardGroup>
    <B24DashboardSidebar resizable>
      <template #resize-handle="{ onMouseDown, onTouchStart, onDoubleClick }">
        <B24DashboardResizeHandle
          class="after:absolute after:inset-y-0 after:right-0 after:w-px hover:after:bg-(--ui-color-accent-soft-element-blue) after:transition"
          @mousedown="onMouseDown"
          @touchstart="onTouchStart"
          @dblclick="onDoubleClick"
        />
      </template>
    </B24DashboardSidebar>

    <slot />
  </B24DashboardGroup>
</template>
```

```vue [pages/index.vue]{9-16}
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <B24DashboardPanel resizable>
    <template #resize-handle="{ onMouseDown, onTouchStart, onDoubleClick }">
      <B24DashboardResizeHandle
        class="after:absolute after:inset-y-0 after:right-0 after:w-px hover:after:bg-(--ui-color-accent-soft-element-blue) after:transition"
        @mousedown="onMouseDown"
        @touchstart="onTouchStart"
        @dblclick="onDoubleClick"
      />
    </template>
  </B24DashboardPanel>
</template>
```

::

::note
In this example, we add an `after` pseudo-element to display a vertical line on hover.
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
