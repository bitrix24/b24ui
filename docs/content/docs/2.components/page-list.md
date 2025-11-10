---
title: PageList
description: 'A vertical list layout for stacking content items.'
category: page
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageList.vue
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-list
---

## Usage

The PageList component provides a flexible way to display content in a vertical list layout. It's perfect for creating stacked lists of [PageCard](/docs/components/page-card/) components or any other elements, with optional dividers between items.

::component-example
---
collapse: true
name: 'page-list-example'
props:
  class: 'w-full'
---
::

### Divide

Use the `divide` prop to add a divider between each child element.

::component-example
---
collapse: true
name: 'page-list-divide-example'
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
