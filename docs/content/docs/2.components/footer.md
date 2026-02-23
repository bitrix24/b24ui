---
title: Footer
description: 'A responsive footer for displaying copyright, links, and additional information.'
category: layout
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Footer.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/footer
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/footer
navigation.badge: Soon
---

## Usage

The Footer component renders a `<footer>` element.

Use the `left`, `default` and `right` slots to customize the footer.

::component-example
---
prettier: true
collapse: true
name: 'footer-example'
class: '!p-0'
props:
  class: 'w-full'
---
::

::note
In this example, we use the [NavigationMenu](/docs/components/navigation-menu/) component to render the footer links in the center.
::

::tip{to="/docs/components/footer-columns/"}
You can use the `FooterColumns` component to display a list of links inside the `top` slot.
::

## Examples

### Within `app.vue`

Use the Footer component in your `app.vue` or in a layout:

```vue [app.vue]{32-67}
<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-b24/Bitrix24Icon'

const items: NavigationMenuItem[] = [
  {
    label: 'REST API',
    to: 'https://apidocs.bitrix24.com',
    target: '_blank'
  },
  {
    label: 'Releases',
    to: 'https://github.com/bitrix24/b24ui/releases',
    target: '_blank'
  }
]
</script>

<template>
  <B24App>
    <B24Header />

    <B24Main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </B24Main>

    <B24Separator type="dashed" class="h-px" />

    <B24Footer>
      <template #left>
        <p class="text-muted text-sm">
          Copyright © {{ new Date().getFullYear() }}
        </p>
      </template>

      <B24NavigationMenu :items="items" variant="link" />

      <template #right>
        <B24Button
          color="air-selection"
          :icon="Bitrix24Icon"
          to="https://apidocs.bitrix24.com"
          target="_blank"
          aria-label="Bitrix24 REST API"
        />
        <B24Button
          :icon="GitHubIcon"
          to="https://github.com/bitrix24/b24ui"
          target="_blank"
          aria-label="GitHub"
        />
      </template>
    </B24Footer>
  </B24App>
</template>
```

::note
In this example, we use the [Separator](/docs/components/separator/) component to add a border above the footer.
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
