---
title: ContentSearchButton
description: 'A pre-styled button that opens the content search modal.'
category: content
framework: nuxt
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/content/ContentSearchButton.vue
  - label: Button
    iconName: Bitrix24Icon
    to: /docs/components/button/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/content-search-button
---

::warning{to="/docs/getting-started/integrations/content/"}
This component is only available when the `@nuxt/content` module is installed.
::

## Usage

The ContentSearchButton component is used to open the [ContentSearch](/docs/components/content-search/) modal.

:component-code{prefix="content"}

It extends the [Button](/docs/components/button/) component, so you can pass any property such as `color`, `size`, etc.

::component-code{prefix="content"}
---
ignore:
  - color
props:
  color: 'air-primary'
---
::

::note{to="#collapsed"}
The button defaults to `color="air-secondary-no-accent"` when not collapsed, `color="air-tertiary-no-accent"` when collapsed.
::

### Collapsed

Use the `collapsed` prop to show the button's label and [kbds](#kbds). Defaults to `true`.

::component-code{prefix="content"}
---
prettier: true
props:
  collapsed: false
---
::

### Kbds

Use the `kbds` prop to display keyboard keys in the button. Defaults to `['meta', 'K']`{lang="ts-type"} to match the default shortcut of the [ContentSearch](/docs/components/content-search/#shortcut) component.

::component-code{prefix="content"}
---
prettier: true
ignore:
  - kbds
props:
  collapsed: false
  kbds:
    - 'alt'
    - 'O'
---
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
