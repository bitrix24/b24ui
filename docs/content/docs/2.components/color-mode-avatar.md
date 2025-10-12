---
title: ColorModeAvatar
description: 'An Avatar that automatically switches its image based on the current theme (light/dark).'
category: color-mode
badge: new
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/color-mode/ColorModeAvatar.vue
  - label: Avatar
    to: /docs/components/avatar/
    icon: Bitrix24Icon
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/color-mode
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/color-mode-avatar
---

## Usage

The ColorModeAvatar component extends the [Avatar](/docs/components/avatar/) component, so you can pass any property such as `size`, `icon`, etc.

Use the `light` and `dark` props to define the source for light and dark mode.

::component-code{prefix="color-mode"}
---
props:
  light: 'https://github.com/vuejs.png'
  dark: 'https://github.com/nuxt.png'
---
::

::note
Switch between light and dark mode to see the different images: :b24-color-mode-select{size="sm"}
::

## API

### Props

:component-props
