---
title: PageLinks
description: 'A list of links to display on the page.'
category: page
badge: new
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageLinks.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/page-links
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-links
---

## Usage

### Links

Use the `links` prop as an array of objects with the following properties:

- `label: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, link?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkLeadingIcon?: ClassNameValue }`{lang="ts-type"}

You can pass any property from the [Link](/docs/components/link/#props) component such as `to`, `target`, etc.

::component-code
---
prettier: true
ignore:
  - links
external:
  - links
externalTypes:
  - PageLink[]
props:
  links:
    - label: 'Edit this page'
      to: https://github.com/bitrix24/b24ui/blob/main/docs/content/docs/2.components/page-links.md
    - label: 'Star on GitHub'
      to: https://github.com/bitrix24/b24ui
    - label: 'Releases'
      to: https://github.com/bitrix24/b24ui/releases
---
::

### Title

Use the `title` prop to display a title above the links.

::component-code
---
prettier: true
ignore:
  - links
external:
  - links
externalTypes:
  - PageLink[]
props:
  title: 'Community'
  links:
    - label: 'Edit this page'
      to: https://github.com/bitrix24/b24ui/blob/main/docs/content/docs/2.components/page-links.md
    - label: 'Star on GitHub'
      to: https://github.com/bitrix24/b24ui
    - label: 'Releases'
      to: https://github.com/bitrix24/b24ui/releases
---
::

## Examples

::note
While these examples use [Nuxt Content](https://content.nuxt.com), the components can be integrated with any content management system.
::

### Within a page

Use the PageLinks component in the `bottom` slot of the ContentToc component to display a list of links below the table of contents.

```vue [pages/\[...slug\\].vue]{48-52}
<script setup lang="ts">
import type { PageLink } from '@bitrix24/b24ui-nuxt'
import DocumentSignIcon from '@bitrix24/b24icons-vue/main/DocumentSignIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'

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

const links = computed<PageLink[]>(() => [{
  label: 'Edit this page',
  icon: DocumentSignIcon,
  to: `https://github.com/bitrix24/b24ui/blob/main/docs/content/docs/2.components/${page?.value?.stem}.md`,
  target: '_blank'
}, {
  label: 'Star on GitHub',
  icon: AiStarsIcon,
  to: 'https://github.com/bitrix24/b24ui',
  target: '_blank'
}, {
  label: 'Releases',
  icon: RocketIcon,
  to: 'https://github.com/bitrix24/b24ui/releases'
}])
</script>

<template>
  <div>
    <div>
      <ContentRenderer :value="page" />

      <B24Separator />

      <B24ContentSurround :surround="surround" />
    </div>

    <div>
      <B24ContentToc :links="page.body.toc.links">
        <template #bottom>
          <B24Separator type="dashed" />

          <B24PageLinks title="Community" :links="links" />
        </template>
      </B24ContentToc>
    </div>
  </div>
</template>
```

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
