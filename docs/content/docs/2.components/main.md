---
title: Main
description: 'A main content element that expands to fill the full viewport height.'
category: layout
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Main.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/main
navigation.badge: New
---

## Usage

The Main component renders a `<main>` element that works together with the [Header](/docs/components/header/) component to create a full-height layout that extends to the viewport's available height.

::tip{to="/docs/getting-started/theme/css-variables/#header"}
The Main component uses the `--b24ui-header-height` CSS variable to position itself correctly below the `Header`.
::

## Examples

### Within `app.vue`

Use the Main component in your `app.vue` or in a layout:

```vue [app.vue]{5-9}
<template>
  <B24App>
    <B24Header />

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

## Theme

:component-theme
