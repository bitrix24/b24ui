---
title: PageFeature
description: 'A feature showcase component to present your app's main functionalities.'
category: page
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageFeature.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/page-feature
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-feature
navigation.badge: Soon
---

## Usage

The PageFeature component is used by the [PageSection](/docs/components/page-section/) component to display [features](/docs/components/page-section/#features).

### Title

Use the `title` prop to set the title of the feature.

::component-code
---
hide:
  - class
props:
  title: 'Theme'
  class: 'w-96'
---
::

### Description

Use the `description` prop to set the description of the feature.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
props:
  title: 'Theme'
  description: 'Customize Bitrix24 UI.'
  class: 'w-96'
---
::

### Icon

Use the `icon` prop to set the icon of the feature.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
  - description
  - icon
cast:
  icon: 'RocketIcon'
props:
  title: 'Theme'
  description: 'Customize Bitrix24 UI.'
  icon: 'RocketIcon'
  class: 'w-96'
---
::

### Link

You can pass any property from the [`<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link) component such as `to`, `target`, `rel`, etc.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
  - description
  - icon
  - target
cast:
  icon: 'RocketIcon'
props:
  title: 'Theme'
  description: 'Customize Bitrix24 UI.'
  icon: 'RocketIcon'
  to: '/docs/getting-started/theme/design-system/'
  target: _blank
  class: 'w-96'
---
::

### Orientation

Use the `orientation` prop to change the orientation of the feature. Defaults to `horizontal`.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
  - description
  - icon
cast:
  icon: 'RocketIcon'
props:
  orientation: 'vertical'
  title: 'Theme'
  description: 'Customize Bitrix24 UI.'
  icon: 'RocketIcon'
  class: 'w-96'
---
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
