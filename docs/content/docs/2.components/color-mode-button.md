---
title: ColorModeButton
description: 'A button to toggle between light and dark themes.'
category: color-mode
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/color-mode/ColorModeButton.vue
  - label: Button
    to: /docs/components/button/
    iconName: Bitrix24Icon
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/color-mode
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/color-mode-button
---

## Usage

The ColorModeButton component extends the [Button](/docs/components/button/) component, so you can pass any property such as `color`, `size`, etc.

:component-code{prefix="color-mode"}

::note
The button defaults to `color="air-tertiary-no-accent"`.
::

## Examples

### With fallback slot

As the button is wrapped in a [ClientOnly](https://nuxt.com/docs/api/components/client-only) component, you can pass a `fallback` slot to display a placeholder while the component is loading.

::component-code{prefix="color-mode"}
---
prettier: true
slots:
  fallback: |

    <B24Button loading />
---

#fallback
:B24-button{loading}
::

## API

### Props

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes" target="_blank"}
This component also supports all native `<button>` HTML attributes.
::

### Slots

:component-slots
