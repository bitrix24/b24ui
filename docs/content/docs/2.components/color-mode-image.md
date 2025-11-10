---
title: ColorModeImage
description: 'An image element with a different source for light and dark mode.'
category: color-mode
badge: new
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/color-mode/ColorModeImage.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/color-mode
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/color-mode-image
---

## Usage

The ColorModeImage component uses the `<NuxtImg>` component when [`@nuxt/image`](https://github.com/nuxt/image) is installed, falling back to `img` otherwise.

::component-code{prefix="color-mode"}
---
prettier: true
ignore:
  - width
  - height
  - light
  - dark
props:
  light: 'https://github.com/bitrix24.png'
  dark: 'https://github.com/bitrix-tools.png'
  width: 200
  height: 200
---
::

::note
Switch between light and dark mode to see the different images: :b24-color-mode-select{size="sm"}
::

## API

### Props

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes" target="_blank"}
This component also supports all native `<img>` HTML attributes.
::
