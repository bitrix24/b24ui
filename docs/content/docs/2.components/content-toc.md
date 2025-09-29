---
title: ContentToc
description: 'A sticky Table of Contents with automatic active anchor link highlighting.'
category: content
badge: new
framework: nuxt
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/nuxt/ui/blob/v4/src/runtime/components/content/ContentToc.vue
---

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

::warning{to="/docs/guide/content-nuxt/"}
This component is only available when the `@nuxt/content` module is installed.
::

## Usage

Use the `links` prop with the `page?.body?.toc?.links`{lang="ts-type"} you get when fetching a page.

__component-example
---
name: 'content-toc-example'
props:
  class: 'w-full'
---
__

### Title

Use the `title` prop to change the title of the Table of Contents.

__component-code{prefix="content"}
---
prettier: true
collapse: true
hide:
  - class
ignore:
  - links
external:
  - links
props:
  title: 'On this page'
  class: 'w-full'
  links:
  - id: usage
    depth: 2
    text: Usage
    children:
    - id: title
      depth: 3
      text: Title
    - id: color
      depth: 3
      text: Color
    - id: highlight
      depth: 3
      text: Highlight
  - id: api
    depth: 2
    text: API
    children:
    - id: props
      depth: 3
      text: Props
    - id: slots
      depth: 3
      text: Slots
  - id: theme
    depth: 2
    text: Theme
---
__

### Color

Use the `color` prop to change the color of the links.

__component-code{prefix="content"}
---
prettier: true
collapse: true
hide:
  - class
ignore:
  - links
external:
  - links
props:
  color: 'neutral'
  class: 'w-full'
  links:
    - id: usage
      depth: 2
      text: Usage
      children:
        - id: title
          depth: 3
          text: Title
        - id: color
          depth: 3
          text: Color
        - id: highlight
          depth: 3
          text: Highlight
---
__

### Highlight

Use the `highlight` prop to display a highlighted border for the active item.

Use the `highlight-color` prop to change the color of the border. It defaults to the `color` prop.

__component-code{prefix="content"}
---
prettier: true
collapse: true
hide:
  - class
ignore:
  - links
external:
  - links
props:
  highlight: true
  highlightColor: 'neutral'
  color: 'neutral'
  class: 'w-full'
  links:
    - id: usage
      depth: 2
      text: Usage
      children:
        - id: title
          depth: 3
          text: Title
        - id: color
          depth: 3
          text: Color
        - id: highlight
          depth: 3
          text: Highlight
---
__

## Examples

### Within a page

Use the ContentToc component in a page to display the Table of Contents:

```vue [pages/\[...slug\\].vue]{22-24}
<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <UPage v-if="page">
    <UPageHeader :title="page.title" />

    <UPageBody>
      <ContentRenderer v-if="page.body" :value="page" />

      <USeparator v-if="surround?.filter(Boolean).length" />

      <UContentSurround :surround="(surround as any)" />
    </UPageBody>

    <template v-if="page?.body?.toc?.links?.length" #right>
      <UContentToc :links="page.body.toc.links" />
    </template>
  </UPage>
</template>
```

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme
