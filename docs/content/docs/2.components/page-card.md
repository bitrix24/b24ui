---
title: PageCard
description: 'A pre-styled card component featuring a title, description, and optional link.'
category: page
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageCard.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/page-card
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-card
---

## Usage

The PageCard component provides a flexible way to display content in a card with an illustration in the default slot.

::component-example
---
name: 'page-card-example'
class: 'p-8'
---
::

::tip
Use the [PageGrid](/docs/components/page-grid/), [PageColumns](/docs/components/page-columns/) or [PageList](/docs/components/page-list/) components to display multiple PageCard.
::

### Title

Use the `title` prop to set the title of the card.

::component-code
---
hide:
  - class
props:
  title: 'Online workspace for the whole team'
  class: 'w-96'
---
::

### Description

Use the `description` prop to set the description of the card.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
props:
  title: 'Online workspace for the whole team'
  description: 'Through its wide variety of communication and collaboration tools, Bitrix24 enables teams to work efficiently and smoothly wherever they are – at home, in the office, or on the go.'
  class: 'w-96'
---
::

### Icon

Use the `icon` prop to set the [Icon](https://bitrix24.github.io/b24icons/icons/) of the card.

::component-code
---
prettier: true
hide:
  - class
  - icon
cast:
  icon: 'RocketIcon'
ignore:
  - title
  - description
props:
  title: 'Online workspace for the whole team'
  description: 'Through its wide variety of communication and collaboration tools, Bitrix24 enables teams to work efficiently and smoothly wherever they are – at home, in the office, or on the go.'
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
  - icon
cast:
  icon: 'RocketIcon'
ignore:
  - title
  - description
  - icon
  - target
props:
  title: 'Online workspace for the whole team'
  description: 'Through its wide variety of communication and collaboration tools, Bitrix24 enables teams to work efficiently and smoothly wherever they are – at home, in the office, or on the go.'
  icon: 'RocketIcon'
  to: 'https://www.bitrix24.com/tools/communications/'
  target: _blank
  class: 'w-96'
---
::

### Variant

Use the `variant` prop to change the style of the card.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
  - description
  - icon
  - to
  - target
  - icon
cast:
  icon: 'RocketIcon'
props:
  title: 'Online workspace for the whole team'
  description: 'Through its wide variety of communication and collaboration tools, Bitrix24 enables teams to work efficiently and smoothly wherever they are – at home, in the office, or on the go.'
  icon: 'RocketIcon'
  to: 'https://www.bitrix24.com/tools/communications/'
  target: _blank
  variant: outline-no-accent
  class: 'w-96'
---
::

### Orientation

Use the `orientation` prop to change the orientation with the default slot. Defaults to `vertical`.

::component-code
---
prettier: true
ignore:
  - title
  - description
  - icon
cast:
  icon: 'RocketIcon'
props:
  title: 'Online workspace for the whole team'
  description: 'Through its wide variety of communication and collaboration tools, Bitrix24 enables teams to work efficiently and smoothly wherever they are – at home, in the office, or on the go.'
  icon: 'RocketIcon'
  orientation: horizontal
slots:
  default: |

    <img src="/b24ui/assets/demo/communications-main.png.webp" alt="Online workspace for the whole team" class="aspect-3/2 object-cover" />
---

:img{src="/b24ui/assets/demo/communications-main.png.webp" alt="Online workspace for the whole team" class="aspect-3/2 object-cover"}
::

### Reverse

Use the `reverse` prop to reverse the orientation of the default slot.

::component-code
---
prettier: true
ignore:
  - title
  - description
  - icon
cast:
  icon: 'RocketIcon'
props:
  title: 'Online workspace for the whole team'
  description: 'Through its wide variety of communication and collaboration tools, Bitrix24 enables teams to work efficiently and smoothly wherever they are – at home, in the office, or on the go.'
  icon: 'RocketIcon'
  orientation: horizontal
  reverse: true
slots:
  default: |

    <img src="/b24ui/assets/demo/communications-main.png.webp" alt="Online workspace for the whole team" class="aspect-3/2 object-cover" />
---

:img{src="/b24ui/assets/demo/communications-main.png.webp" alt="Online workspace for the whole team" class="aspect-3/2 object-cover"}
::

### Highlight

Use the `highlight` and `highlight-color` props to display a highlighted border around the card.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - title
  - description
  - orientation
  - icon
cast:
  icon: 'RocketIcon'
props:
  title: 'Online workspace for the whole team'
  description: 'Through its wide variety of communication and collaboration tools, Bitrix24 enables teams to work efficiently and smoothly wherever they are – at home, in the office, or on the go.'
  icon: 'RocketIcon'
  orientation: horizontal
  highlight: true
  highlightColor: 'air-primary'
slots:
  default: |

    <img src="/b24ui/assets/demo/communications-main.png.webp" alt="Online workspace for the whole team" class="aspect-3/2 object-cover" />
---

:img{src="/b24ui/assets/demo/communications-main.png.webp" alt="Online workspace for the whole team" class="aspect-3/2 object-cover"}
::

## Examples

### As a testimonial

Use the [User](/docs/components/user/) component in the `header` or `footer` slot to make the card look like a testimonial.

::component-example
---
name: 'page-card-testimonial-example'
---
::

::tip{to="/docs/components/page-columns/"}
You can use the `PageColumns` component to display multiple PageCard in a multi-column layout.
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
