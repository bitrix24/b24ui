---
title: PageSection
description: 'A responsive section.'
category: page
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageSection.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/page-section
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/page-section
navigation.badge: Soon
---

## Usage

The PageSection component wraps your content in a [Container](/docs/components/container/) while maintaining full-width flexibility making it easy to add background colors, images or patterns. It provides a flexible way to display content with an illustration in the default slot.

::component-example
---
name: 'page-section-example'
class: 'p-8'
preview: true
source: false
---
::

### Title

Use the `title` prop to set the title of the section.

::component-code
---
props:
  title: 'Bitrix24. Your ultimate workspace.'
---
::

### Description

Use the `description` prop to set the description of the section.

::component-code
---
prettier: true
ignore:
  - title
props:
  title: 'Bitrix24. Your ultimate workspace.'
  description: 'An all-in-one free platform to manage your team and run your sales, Bitrix24 is designed to be seamlessly integrated into all your business processes and help you manage them with the highest precision and efficiency.'
---
::

### Headline

Use the `headline` prop to set the headline of the section.

::component-code
---
prettier: true
ignore:
  - title
  - description
props:
  title: 'Bitrix24. Your ultimate workspace.'
  description: 'An all-in-one free platform to manage your team and run your sales, Bitrix24 is designed to be seamlessly integrated into all your business processes and help you manage them with the highest precision and efficiency.'
  headline: 'Features'
---
::

### Icon

Use the `icon` prop to set the icon of the section.

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
  title: 'Bitrix24. Your ultimate workspace.'
  description: 'An all-in-one free platform to manage your team and run your sales, Bitrix24 is designed to be seamlessly integrated into all your business processes and help you manage them with the highest precision and efficiency.'
    icon: 'RocketIcon'
---
::

### Features

Use the `features` prop to display a list of [PageFeature](/docs/components/page-feature/) under the description as an array of objects with the following properties:

- `title?: string`{lang="ts-type"}
- `description?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `orientation?: 'horizontal' | 'vertical'`{lang="ts-type"}

You can pass any property from the [Link](/docs/components/link/#props) component such as `to`, `target`, etc.

::component-example
---
name: 'page-section-example'
class: 'p-8'
---
::

### Links

Use the `links` prop to display a list of [Button](/docs/components/button/) under the description.

::component-code
---
prettier: true
external:
  - links
externalTypes:
  - ButtonProps[]
ignore:
  - title
  - description
  - links
props:
  title: 'Bitrix24. Your ultimate workspace.'
  description: 'An all-in-one free platform to manage your team and run your sales, Bitrix24 is designed to be seamlessly integrated into all your business processes and help you manage them with the highest precision and efficiency.'
  links:
    - label: 'Get started'
      to: '/docs/getting-started/'
      color: 'air-secondary-accent-2'
    - label: 'Explore'
      to: '/docs/components/'
      color: 'air-primary'
---
::

### Orientation

Use the `orientation` prop to change the orientation with the default slot. Defaults to `vertical`.

::component-code
---
prettier: true
external:
  - features
  - links
externalTypes:
  - PageFeatureProps[]
  - ButtonProps[]
ignore:
  - title
  - description
  - icon
  - features
  - links
  - icon
cast:
  icon: 'RocketIcon'
props:
  title: 'Bitrix24. Your ultimate workspace.'
  description: 'An all-in-one free platform to manage your team and run your sales, Bitrix24 is designed to be seamlessly integrated into all your business processes and help you manage them with the highest precision and efficiency.'
  icon: 'RocketIcon'
  orientation: horizontal
  features:
    - title: 'Online workspace for the whole team'
      description: 'Through its wide variety of communication and collaboration tools, Bitrix24 enables teams to work efficiently and smoothly wherever they are – at home, in the office, or on the go.'
      to: 'https://www.bitrix24.com/tools/communications/'
    - title: 'Free CRM software for your business'
      description: 'Sell more. Sell better. Sell faster with Bitrix24 a single platform to cover all your needs.'
      to: 'https://www.bitrix24.com/tools/crm/'
    - title: 'Free task management software for your business'
      description: 'Set tasks, manage deadlines, collect reports, track KPIs, and run projects from wherever you are.'
      to: 'https://www.bitrix24.com/tools/tasks_and_projects/'
  links:
    - label: 'Explore'
      to: '/docs/components/'
      color: 'air-primary'
slots:
  default: |

    <img src="/b24ui/assets/demo/communications-main.png.webp" width="352" height="647" alt="Illustration" class="w-full rounded-lg" />
---

:img{src="/b24ui/assets/demo/communications-main.png.webp" width="352" height="647" alt="Illustration" class="w-full rounded-lg"}
::

### Reverse

Use the `reverse` prop to reverse the orientation of the default slot.

::component-code
---
prettier: true
external:
  - features
  - links
externalTypes:
  - PageFeatureProps[]
  - ButtonProps[]
ignore:
  - title
  - description
  - icon
  - features
  - links
  - icon
cast:
  icon: 'RocketIcon'
props:
  reverse: true
  title: 'Bitrix24. Your ultimate workspace.'
  description: 'An all-in-one free platform to manage your team and run your sales, Bitrix24 is designed to be seamlessly integrated into all your business processes and help you manage them with the highest precision and efficiency.'
  icon: 'RocketIcon'
  orientation: horizontal
  features:
    - title: 'Online workspace for the whole team'
      description: 'Through its wide variety of communication and collaboration tools, Bitrix24 enables teams to work efficiently and smoothly wherever they are – at home, in the office, or on the go.'
      to: 'https://www.bitrix24.com/tools/communications/'
    - title: 'Free CRM software for your business'
      description: 'Sell more. Sell better. Sell faster with Bitrix24 a single platform to cover all your needs.'
      to: 'https://www.bitrix24.com/tools/crm/'
    - title: 'Free task management software for your business'
      description: 'Set tasks, manage deadlines, collect reports, track KPIs, and run projects from wherever you are.'
      to: 'https://www.bitrix24.com/tools/tasks_and_projects/'
  links:
    - label: 'Explore'
      to: '/docs/components/'
      color: 'air-primary'
slots:
  default: |

    <img src="/b24ui/assets/demo/communications-main.png.webp" width="352" height="647" alt="Illustration" class="w-full rounded-lg" />
---

:img{src="/b24ui/assets/demo/communications-main.png.webp" width="352" height="647" alt="Illustration" class="w-full rounded-lg"}
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
