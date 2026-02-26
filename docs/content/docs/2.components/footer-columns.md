---
title: FooterColumns
description: 'A set of link columns to organize navigation and information in the footer.'
category: navigation
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/FooterColumns.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/footer
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/footer-columns
navigation.badge: New
---

## Usage

The FooterColumns component renders a list of columns to display in your Footer.

Use it in the `top` slot of the [Footer](/docs/components/footer/) component:

```vue {3-7}
<template>
  <B24Footer>
    <template #top>
      <B24Container>
        <B24FooterColumns />
      </B24Container>
    </template>
  </B24Footer>
</template>
```

### Columns

Use the `columns` prop as an array of objects with the following properties:

- `label: string`{lang="ts-type"}
- `children?: FooterColumnLink[]`{lang="ts-type"}

Each column contains a `children` array of objects that define the links. Each link can have the following properties:

- `label?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, link?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkLeadingIcon?: ClassNameValue }`{lang="ts-type"}

You can pass any property from the [Link](/docs/components/link/#props) component such as `to`, `target`, etc.

::component-example
---
prettier: true
name: 'footer-columns-example'
class: 'p-8'
props:
  class: 'w-full'
---
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
