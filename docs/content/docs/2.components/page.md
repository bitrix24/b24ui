---
description: Page
description: 'A page grid divided into three columns: left sidebar, main content area, and right sidebar.'
category: page
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/nuxt/ui/blob/v4/src/runtime/components/Page.vue
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Page.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page
navigation.badge: Soon
---

## Usage

The Page component helps you create layouts with optional left and right columns. It's perfect for building documentation sites and other content-focused pages.

```vue {2,6}
<template>
  <B24Page>
    <template #left />

    <template #right />
  </B24Page>
</template>
```

::tip
The page will display as a centered single column layout if no slots are specified.
::

## Examples

::note
While these examples use [Nuxt Content](https://content.nuxt.com), the components can be integrated with any content management system.
::

### Within a layout

Use the Page component in a layout with the `left` slot to display a navigation:

```vue [layouts/docs.vue] {9-17}
<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

const navigation = inject<Ref<NavigationMenuItem[]>>('navigation')
</script>

<template>
  <B24Page>
    <template #left>
      <B24PageAside>
        <B24NavigationMenu
          :key="navigationKey"
          :items="navigation"
          orientation="vertical"
        />
      </B24PageAside>
    </template>

    <slot />
  </B24Page>
</template>
```

::note
In this example, we use the [`NavigationMenu`](/docs/components/navigation-menu/) component to display the navigation injected in `app.vue`.
::

### Within a page

Use the Page component in a page with the `right` slot to display a table of contents:

```vue [pages/\[...slug\\].vue]{29-31}
<script setup lang="ts">
const route = useRoute()

definePageMeta({
  layout: 'docs'
})

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('content', route.path)
})
</script>

<template>
  <B24Page>
    <B24PageHeader :title="page.title" :description="page.description" />

    <B24PageBody>
      <ContentRenderer :value="page" />

      <B24Separator />

      <B24ContentSurround :surround="surround" />
    </B24PageBody>

    <template #right>
      <B24ContentToc :links="page.body.toc.links" />
    </template>
  </B24Page>
</template>
```

::note
In this example, we use the `ContentToc` component to display the table of contents.
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
