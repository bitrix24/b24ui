---
title: Avatar
description: An img element that includes fallback and supports Nuxt Image.
category: element
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Avatar.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/avatar
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/avatar
---

## Usage

The Avatar uses the `<NuxtImg>` component when [`@nuxt/image`](https://github.com/nuxt/image) is installed, falling back to `img` otherwise.

::component-code
---
prettier: true
ignore:
  - src
  - alt
props:
  src: '/b24ui/avatar/employee.png'
  alt: 'employee'
---
::

::note
You can pass any property from the HTML `<img>` element such as `alt`, `loading`, etc.
::

::tip
To opt-out of `@nuxt/image`, use the `as` prop: `:as="{ img: 'img' }"`.
::


### Src

Use the `src` prop to set the image URL.

::component-code
---
prettier: true
props:
  src: 'https://github.com/bitrix24.png'
---
::

### Size

Use the `size` prop to set the size of the Avatar.

::component-code
---
prettier: true
ignore:
  - src
props:
  size: 2xl
  src: '/b24ui/avatar/assistant.png'
---
::

::note
The `<img>` element's `width` and `height` are automatically set based on the `size` prop.
::

### Icon

Use the `icon` prop to display a fallback [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
ignore:
  - icon
cast:
  icon: 'RocketIcon'
props:
  icon: 'RocketIcon'
  size: md
---
::

### Text

Use the `text` prop to display a fallback text.

::component-code
---
prettier: true
props:
  text: '+24'
  size: xl
---
::


### Alt

When no icon or text is provided, the **initials** of the `alt` prop is used as fallback.

::component-code
---
prettier: true
props:
  alt: 'Employee Name'
  size: xl
---
::

::note
The `alt` prop is passed to the `img` element as the `alt` attribute.
::

### Chip

Use the `chip` prop to display a chip around the Avatar.

::component-code
---
prettier: true
ignore:
  - src
  - chip.inset
  - chip.hideZero
props:
  src: '/b24ui/avatar/assistant.png'
  chip:
    text: '+1'
    inset: true
    hideZero: true
---
::

## Examples

### With tooltip

You can use a [Tooltip](/docs/components/tooltip/) component to display a tooltip when hovering the Avatar.

:component-example{name="avatar-tooltip-example"}

### With mask

You can use a CSS mask to display an Avatar with a custom shape instead of a simple circle.

:component-example{name="avatar-mask-example"}

## API

### Props

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes" target="_blank"}
This component also supports all native `<img>` HTML attributes.
::

## Theme

:component-theme
