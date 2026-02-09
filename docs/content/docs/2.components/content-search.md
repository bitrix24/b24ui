---
title: ContentSearch
description: 'A ready-to-use Command Palette component for your documentation.'
category: content
framework: nuxt
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/content/ContentSearch.vue
  - label: CommandPalette
    iconName: Bitrix24Icon
    to: /docs/components/command-palette/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/content-search
---

::warning{to="/docs/getting-started/integrations/content/"}
This component is only available when the `@nuxt/content` module is installed.
::

## Usage

The ContentSearch component extends the [CommandPalette](/docs/components/command-palette/) component, so you can pass any property such as `icon`, `placeholder`, etc.

Use the `files` and `navigation` props with the `files`{lang="ts-type"} and `navigation`{lang="ts-type"} values you fetched using the `queryCollectionSearchSections` and `queryCollectionNavigation` composables from `@nuxt/content`.

::component-example
---
iframe:
  height: 500px;
iframeMobile: true
overflowHidden: true
source: false
name: 'content-search-example'
---
::

::tip
You can open the CommandPalette by pressing :kbd{value="meta"} :kbd{value="K" class="ms-px"}, by using the [ContentSearchButton](/docs/components/content-search-button/) component or by using the `useContentSearch` composable: `const { open } = useContentSearch()`{lang="ts"}.
::

### Shortcut

Use the `shortcut` prop to change the shortcut used in [defineShortcuts](/docs/composables/define-shortcuts/) to open the ContentSearch component. Defaults to `meta_k` (:kbd{value="meta"} :kbd{value="K"}).

```vue [app.vue]{6}
<template>
  <B24App>
    <ClientOnly>
      <LazyB24ContentSearch
        v-model:search-term="searchTerm"
        shortcut="meta_k"
        :files="files"
        :navigation="navigation"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </B24App>
</template>
```

### Color Mode

By default, a group of commands will be added to the command palette so you can switch between light and dark mode. This will only take effect if the `colorMode` is not forced in a specific page which can be achieved through `definePageMeta`:

```vue [pages/index.vue]
<script setup lang="ts">
definePageMeta({
  colorMode: 'dark'
})
</script>
```

You can disable this behavior by setting the `color-mode` prop to `false`:

```vue [app.vue]{6}
<template>
  <B24App>
    <ClientOnly>
      <LazyB24ContentSearch
        v-model:search-term="searchTerm"
        :color-mode="false"
        :files="files"
        :navigation="navigation"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </B24App>
</template>
```

## Examples

### Within `app.vue`

Use the ContentSearch component in your `app.vue` or in a layout:

```vue [app.vue]
<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('content'), {
  server: false
})

const links = [{
  label: 'Docs',
  to: '/docs/getting-started'
}, {
  label: 'Components',
  to: '/docs/components'
}, {
  label: 'Showcase',
  to: '/showcase'
}]

const searchTerm = ref('')
</script>

<template>
  <B24App>
    <ClientOnly>
      <LazyB24ContentSearch
        v-model:search-term="searchTerm"
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </B24App>
</template>
```

::tip
It is recommended to wrap the `ContentSearch` component in a [ClientOnly](https://nuxt.com/docs/api/components/client-only) component so it's not rendered on the server.
::

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

### Expose

When accessing the component via a template ref, you can use the following:

| Name | Type |
| ---- | ---- |
| `commandPaletteRef`{lang="ts-type"} | `Ref<InstanceType<typeof B24CommandPalette> \| null>`{lang="ts-type"} |

## Theme

:component-theme
