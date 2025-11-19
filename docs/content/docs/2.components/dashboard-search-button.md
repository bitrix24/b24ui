---
title: DashboardSearchButton
description: 'A pre-styled button that opens the Dashboard Search modal.'
category: dashboard
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DashboardSearchButton.vue
  - label: Button
    iconName: Bitrix24Icon
    to: /docs/components/button/
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/dashboard-search-button
---

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

## Usage

The DashboardSearchButton component is used to open the [DashboardSearch](/docs/components/dashboard-search/) modal.

:component-code

It extends the [Button](/docs/components/button/) component, so you can pass any property such as `color`, `size`, etc.

::component-code
---
ignore:
  - color
  - collapsed
props:
  color: 'air-primary'
  collapsed: true
---
::

::note{to="#collapsed"}
The button defaults to `color="air-secondary-no-accent"` when not collapsed, `variant="air-tertiary-no-accent"` when collapsed.
::

### Collapsed

Use the `collapsed` prop to hide the button's label and [kbds](#kbds). Defaults to `false`.

::component-code
---
prettier: true
props:
  collapsed: true
---
::

### Kbds

Use the `kbds` prop to display keyboard keys in the button. Defaults to `['meta', 'K']`{lang="ts-type"} to match the default shortcut of the [DashboardSearch](/docs/components/dashboard-search/#shortcut) component.

::component-code
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

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
This component also supports all native `<button>` HTML attributes.
::

### Slots

:component-slots

## Theme

:component-theme
