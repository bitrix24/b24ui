---
title: ContentToc
description: 'A sticky table of contents component with dynamic active section highlighting.'
category: content
framework: nuxt
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/content/ContentToc.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/content-toc
---

::warning{to="/docs/getting-started/integrations/content/"}
This component is only available when the `@nuxt/content` module is installed.
::

## Usage

Use the `links` prop with the `page?.body?.toc?.links`{lang="ts-type"} you get when fetching a page.

::component-example
---
name: 'content-toc-example'
props:
  class: 'w-full'
---
::

### Title

Use the `title` prop to change the title of the Table of Contents.

::component-code{prefix="content"}
---
prettier: true
collapse: true
hide:
  - class
ignore:
  - links
external:
  - links
externalTypes:
  - ContentTocLink[]
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
::

## Examples

### Within a page

Use the ContentToc component in a page to display the Table of Contents:

```vue [pages/\[...slug\\].vue]{14-16}
<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <template v-if="page">
    <ProseH1>{{ page.title }}</ProseH1>

    <template v-if="page?.body?.toc?.links?.length">
      <B24ContentToc :links="page.body.toc.links" />
    </template>

    <div>
      <ContentRenderer v-if="page.body" :value="page" />

      <B24Separator v-if="surround?.filter(Boolean).length" class="my-4" />

      <B24ContentSurround :surround="(surround as any)" />
    </div>
  </template>
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
