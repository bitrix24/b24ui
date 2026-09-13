---
title: DashboardPanel
description: 'A resizable panel component for dashboards.'
category: dashboard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardPanel.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-panel
---

## Usage

The DashboardPanel component is used to display a panel. Its state (size, collapsed, etc.) will be saved based on the `storage` and `storage-key` props you provide to the [DashboardGroup](/docs/components/dashboard-group/#props) component.

Use it inside the default slot of the [DashboardGroup](/docs/components/dashboard-group/) component, you can put multiple panels next to each other:

```vue [pages/index.vue]{8,10}
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <B24DashboardPanel id="inbox-1" resizable />

  <B24DashboardPanel id="inbox-2" class="hidden lg:flex" />
</template>
```

::caution
It is recommended to set an `id` when using multiple panels in different pages to avoid conflicts.
::

::warning
This component does not have a single root element when using the `resizable` prop, so wrap it in a container (e.g. `<div class="flex flex-1">`) if you use page transitions or require a single root for layout.
::

Use the `header`, `body` and `footer` slots to customize the panel or the default slot if you don't want a scrollable body with padding.

::component-example
---
collapse: true
name: 'dashboard-panel-example'
class: '!p-0 !justify-start'
props:
  minSize: 200
  defaultSize: 240
  maxSize: 250
  class: '!min-h-96 h-136'
---
::

::note
Most of the time, you will use the [`DashboardNavbar`](/docs/components/dashboard-navbar/) component in the `header` slot.
::

### Resizable

Use the `resizable` prop to make the panel resizable.

::note
The dragging, the remembered size and the collapse behaviour all come from the `useResizable` composable, which is exported if you need a resizable region of your own:

```ts
const { el, size, isDragging, isCollapsed, onMouseDown, onTouchStart, onDoubleClick, collapse } = useResizable('my-panel', {
  side: 'left',
  unit: '%',
  defaultSize: 25,
  minSize: 10,
  maxSize: 50,
  collapsible: true,
  storage: 'local'
})
```

Bind `el` to the element being sized and the handlers to your handle. The first argument is the storage key, so give each region its own — two regions sharing a key share a width.
::

::warning
Four defaults are worth setting explicitly, because they are not what the prop names suggest. `unit` is `'px'`{lang="ts-type"}, so bare `minSize`/`maxSize` numbers are pixels, not percentages. `defaultSize` is `0`{lang="ts-type"}. `collapsible` is `false`{lang="ts-type"} in the composable, so `collapse()`{lang="ts"} and `isCollapsed` do nothing until you turn it on. And `storage` is `'cookie'`{lang="ts-type"}, which relies on `useCookie` — outside Nuxt that is a stub and nothing persists, so use `'local'`{lang="ts-type"} in a plain Vue app.
::

::component-code
---
prettier: true
hide:
  - class
props:
  resizable: true
  minSize: 200
  defaultSize: 240
  maxSize: 250
  class: '!min-h-96'
slots:
  body: |

    <Placeholder class="ms-2 mt-4 h-96" />
class: '!p-0 !justify-start'
---

#body
:placeholder{class="ms-2 mt-4 h-96"}
::

### Size

Use the `min-size`, `max-size` and `default-size` props to customize the size of the panel.

::component-code
---
prettier: true
ignore:
  - resizable
hide:
  - class
props:
  resizable: true
  minSize: 200
  defaultSize: 240
  maxSize: 250
  class: '!min-h-96'
slots:
  body: |

    <Placeholder class="ms-2 mt-4 h-96" />
class: '!p-0 !justify-start'
---

#body
:placeholder{class="ms-2 mt-4 h-96"}
::

::tip{to="/docs/components/dashboard-group/#props"}
Sizes are calculated as percentages by default. You can change this using the `unit` prop on the `DashboardGroup` component.
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
