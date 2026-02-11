---
title: ContentSurround
description: ' A pair of "Previous" and "Next" buttons for sequential page navigation.'
category: content
framework: nuxt
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/content/ContentSurround.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/content-surround
---

::warning{to="/docs/getting-started/integrations/content/"}
This component is only available when the `@nuxt/content` module is installed.
::

## Usage

Use the `surround` prop with the `surround`{lang="ts-type"} value you get when fetching a page surround.

::component-example
---
name: 'content-surround-example'
props:
  class: 'w-full'
---
::

### Prev / Next

Use the `prev-icon` and `next-icon` props to customize the buttons [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-code{prefix="content"}
---
prettier: true
collapse: true
ignore:
  - surround
  - prevIcon
  - nextIcon
cast:
  prevIcon: 'RocketIcon'
  nextIcon: 'RocketIcon'
external:
  - surround
externalTypes:
  - ContentSurroundLink[]
props:
  prevIcon: 'RocketIcon'
  nextIcon: 'RocketIcon'
  surround:
  - title: ContentSearchButton
    path: /docs/components/content-search-button/
    stem: 3.components/content-search-button
    description: A pre-styled Button to open the ContentSearch modal.
  - title: ContentToc
    path: /docs/components/content-toc/
    stem: 3.components/content-toc
    description: A sticky Table of Contents with customizable slots.
---
::

## Examples

### Within a page

Use the ContentSurround component in a page to display the prev and next links:

```vue [pages/\[...slug\\].vue]{23}
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

## Theme

:component-theme
