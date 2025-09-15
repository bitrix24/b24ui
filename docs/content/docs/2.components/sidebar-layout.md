---
title: SidebarLayout
description: You incorporate a sidebar in the slider and CRM entity tab embedding. Overall, it's stylish, trendy, and youthful
category: dashboard
---
<script setup>
import SidebarLayoutExample from '/examples/sidebarlayout/SidebarLayout.vue';
import SidebarLayoutInnerExample from '/examples/sidebarlayout/SidebarLayoutInner.vue';
import SidebarLayoutSlideoverExample from '/examples/sidebarlayout/SidebarLayoutSlideover.vue';
</script>

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

<Description
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/SidebarLayout.vue"
  demo="/"
>
  You incorporate a sidebar in the slider and CRM entity tab embedding. Overall, it's stylish, trendy, and youthful
</Description>

## Usage
### Layout
The component must be used as a [`layout`](https://github.com/bitrix24/b24ui/blob/main/playground/app/layouts/default.vue).

::: info styling
The styling process is described on the page [Theme](/docs/guide/getting-started-theme/#customize-theme) 
::: 
<div class="lg:min-h-[400px]">
  <ClientOnly>
    <SidebarLayoutExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/sidebarlayout/demo/SidebarLayout.vue{vue:line-numbers}
:::

::: info
On mobile devices the sidebar is hidden and accessible via `slideover`
:::

### Inner
::: info
If you need to manage loading state in child components, you should use [`useSidebarLayout`](/docs/composables/use-sidebar-layout/)
:::

If the component needs to be placed inside the content, then the props `isInner`  must be set.

You can control the content area scrollbar using the props `offContentScrollbar`.

<div class="lg:min-h-[400px]">
  <ClientOnly>
    <SidebarLayoutInnerExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/sidebarlayout/demo/SidebarLayoutInner.vue{vue:line-numbers}

SidebarLayoutInnerAction

<<< @/examples/sidebarlayout/demo/SidebarLayoutInnerAction.vue{vue:line-numbers}
:::

### Slideover
It should be understood that the [`Slideover`](/docs/components/slideover/) component displays data using the `SidebarLayout` component.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SidebarLayoutSlideoverExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/sidebarlayout/demo/SidebarLayoutSlideover.vue{vue:line-numbers}
:::

::: tip
Many examples can be found on the [playground](https://bitrix24.github.io/b24ui/demo/components/slideover) and also seen in the [demo](https://github.com/bitrix24/b24ui/blob/main/demo/app/pages/components/slideover.vue) version.
:::

## API

### Props

<ComponentProps component="SidebarLayout" />

### Slots

<ComponentSlots component="SidebarLayout" />

### Expose

When accessing the component via a template ref, you can use the following:

| Name                                        | Description                                                     |
|---------------------------------------------|-----------------------------------------------------------------|
| `api: SidebarLayoutApi`{lang="ts"}          | Managing the loading state                                      |
| `isLoading: boolean`{lang="ts"}             | Loading status.                                                 |
| `setLoading(value: boolean)`{lang="ts"}     | Sets the loading state for the current component.               |
| `setRootLoading(value: boolean)`{lang="ts"} | Sets the root loading state (applies to all nested components). |

