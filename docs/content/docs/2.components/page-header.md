---
title: PageHeader
description: 'A responsive page header.'
category: page
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageHeader.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/page-header
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-header
navigation.badge: New
---

## Usage

The PageHeader component displays a header for your page.

Use it inside the default slot of the [Page](/docs/components/page/) component, before the [PageBody](/docs/components/page-body/) component:

```vue {3}
<template>
  <B24Page>
    <B24PageHeader />

    <B24PageBody />
  </B24Page>
</template>
```

### Title

Use the `title` prop to display a title in the header.

::component-code
---
hide:
  - class
props:
  title: 'PageHeader'
  class: 'w-full'
---
::

### Description

Use the `description` prop to display a description in the header.

::component-code
---
prettier: true
ignore:
  - title
hide:
  - class
props:
  title: 'PageHeader'
  description: 'A responsive page header with title, description and actions.'
  class: 'w-full'
---
::

### Headline

Use the `headline` prop to display a headline in the header.

::component-code
---
prettier: true
ignore:
  - title
  - description
hide:
  - class
props:
  title: 'PageHeader'
  description: 'A responsive page header with title, description and actions.'
  headline: 'Components'
  class: 'w-full'
---
::

### Links

Use the `links` prop to display a list of [Button](/docs/components/button/) in the header.

::component-code
---
prettier: true
external:
  - links
externalTypes:
  - ButtonProps[]
ignore:
  - title
  - description
  - headline
  - links
hide:
  - class
props:
  title: 'PageHeader'
  description: 'A responsive page header with title, description and actions.'
  headline: 'Components'
  links:
    - label: 'GitHub'
      to: 'https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageHeader.vue'
      target: '_blank'
  class: 'w-full'
---
::

## Examples

::note
While these examples use [Nuxt Content](https://content.nuxt.com), the components can be integrated with any content management system.
::

### Within a page

Use the PageHeader component in a page to display the header of the page:

```vue [pages/\[...slug\\].vue]{19-24}
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
    <B24PageHeader
      :title="page.title"
      :description="page.description"
      :headline="page.headline"
      :links="page.links"
    />

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

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
