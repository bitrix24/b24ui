---
title: PageAside
description: 'A sticky navigation aside.'
category: page
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Header.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-aside
navigation.badge: New
---

## Usage

The PageAside component is a sticky `<aside>` element that is only displayed starting from the [`lg` breakpoint](https://tailwindcss.com/docs/breakpoints).

::tip{to="/docs/getting-started/theme/css-variables/#header"}
The PageAside component uses the `--b24ui-header-height` CSS variable to position itself correctly below the `Header`.
::

Use it inside the `left` or `right` slot of the [Page](/docs/components/page/) component:

```vue {4}
<template>
  <B24Page>
    <template #left>
      <B24PageAside />
    </template>
  </B24Page>
</template>
```

## Examples

### Within a layout

Use the PageAside component in a layout to display the navigation:

```vue [layouts/docs.vue]{10-16}
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

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
