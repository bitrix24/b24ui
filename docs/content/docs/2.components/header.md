---
title: Header
description: 'A header that adapts its structure and content to different screen sizes.'
category: layout
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Header.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/header
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/header
navigation.badge: New
---

## Usage

The Header component renders a `<header>` element.

::tip{to="/docs/getting-started/theme/css-variables/#header"}
Its height is defined through a `--b24ui-header-height` CSS variable.
::

Use the `left`, `default` and `right` slots to customize the header and the `body` or `content` slots to customize the header menu.

::component-example
---
collapse: true
prettier: true
name: 'header-example'
class: '!px-0 !pt-0'
overflowHidden: true
props:
  class: 'w-full'
---
::

::note
In this example, we use the [NavigationMenu](/docs/components/navigation-menu/) component to render the header links in the center.
::

### Title

Use the `title` prop to change the title of the header. Defaults to `Bitrix24 UI`.

::component-code
---
hide:
  - class
props:
  title: 'Bitrix24 UI'
  class: 'w-full'
class: '!px-0 !pt-0'
---
::

You can also use the `title` slot to add your own logo.

::tip{to="#props"}
You should still add the `title` prop to replace the default `aria-label` of the link.
::

::component-code
---
prettier: true
overflowHidden: true
hide:
  - class
props:
  class: 'w-full'
slots:
  title: |

    <Logo class="h-6 w-auto text-(--b24ui-typography-label-color)" />
class: '!px-0 !pt-0'
---

#title
:logo{class="h-6 w-auto text-(--b24ui-typography-label-color)"}
::

### To

Use the `to` prop to change the link of the title. Defaults to `/`.

::component-code
---
hide:
  - class
class: '!px-0 !pt-0'
props:
  to: '/docs/'
  class: 'w-full'
---
::

You can also use the `left` slot to override the link entirely.

::component-code
---
prettier: true
overflowHidden: true
hide:
  - class
class: '!px-0 !pt-0'
props:
  class: 'w-full'
slots:
  left: |

    <NuxtLink to="/docs"">
      <Logo class="h-6 w-auto text-(--b24ui-typography-label-color)" />
    </NuxtLink>
---

#left
::nuxt-link{to="/docs"}
:logo{class="h-6 w-auto text-(--b24ui-typography-label-color)"}
::
::

### Mode

Use the `mode` prop to change the mode of the header menu. Defaults to `modal`.

Use the `body` slot to fill the menu body (under the header) or the `content` slot to fill the entire menu.

::tip{to="#props"}
You can use the `menu` prop to customize the menu of the header, it will adapt depending on the mode you choose.
::

::component-example
---
collapse: true
iframe:
  height: 300px;
iframeMobile: true
overflowHidden: true
name: 'header-menu-example'
options:
  - name: 'mode'
    label: 'mode'
    default: 'drawer'
    items:
      - modal
      - slideover
      - drawer
props:
  class: 'w-full'
---
::

### Toggle

Use the `toggle` prop to customize the toggle button displayed on mobile.

You can pass any property from the [Button](/docs/components/button/) component to customize it.

::component-example
---
collapse: true
iframe:
  height: 300px;
iframeMobile: true
overflowHidden: true
name: 'header-toggle-example'
props:
  class: 'w-full'
---
::

### Toggle Side

Use the `toggle-side` prop to change the side of the toggle button. Defaults to `left`.

::component-example
---
collapse: true
iframe:
  height: 300px;
iframeMobile: true
overflowHidden: true
name: 'header-toggle-side-example'
props:
  class: 'w-full'
---
::

## Examples

### Within `app.vue`

Use the Header component in your `app.vue` or in a layout:

```vue [app.vue]
<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Docs',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs/getting-started')
  },
  {
    label: 'Components',
    to: '/docs/components',
    active: route.path.startsWith('/docs/components')
  },
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
])
</script>

<template>
  <B24App>
    <B24Header>
      <template #title>
        <Logo class="h-6 w-auto" />
      </template>

      <B24NavigationMenu :items="items" />

      <template #right>
        <B24ColorModeButton />

        <B24Button
          to="https://github.com/bitrix24/b24ui"
          target="_blank"
          :icon="GitHubIcon"
          aria-label="GitHub"
        />
      </template>

      <template #body>
        <B24NavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </B24Header>

    <B24Main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </B24Main>

    <B24Footer />
  </B24App>
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
