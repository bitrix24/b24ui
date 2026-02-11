---
title: Breadcrumb
description: A breadcrumb navigation component.
category: navigation
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Breadcrumb.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/breadcrumb
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/breadcrumb
---

## Usage

Use the Breadcrumb component to show the current page's location in your site's hierarchy.

::component-code
---
collapse: true
ignore:
  - items
external:
  - items
externalTypes:
  - BreadcrumbItem[]
props:
  items:
    - label: 'Docs'
      to: '/docs'
    - label: 'Components'
      to: '/docs/components'
    - label: 'Breadcrumb'
      to: '/docs/components/breadcrumb'
---
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{lang="ts-type"}
- [`icon?: IconComponent`{lang="ts-type"}](#with-custom-slot)
- `avatar?: AvatarProps`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, link?: ClassNameValue, linkLeadingIcon?: ClassNameValue, linkLeadingAvatar?: ClassNameValue, linkLabel?: ClassNameValue, separator?: ClassNameValue, separatorIcon?: ClassNameValue }`{lang="ts-type"}

You can pass any property from the [Link](/docs/components/link/#props) component such as `to`, `target`, etc.

::component-code
---
ignore:
  - items
external:
  - items
externalTypes:
  - BreadcrumbItem[]
props:
  items:
    - label: 'Docs'
      to: '/docs'
    - label: 'Components'
      to: '/docs/components'
    - label: 'Breadcrumb'
      to: '/docs/components/breadcrumb'
---
::

::note
A `span` is rendered instead of a link when the `to` property is not defined.
::

### Separator Icon

Use the `separator-icon` prop to customize the [Icon](https://bitrix24.github.io/b24icons/icons/) between each item.

::component-code
---
ignore:
  - items
  - separatorIcon
external:
  - items
externalTypes:
  - BreadcrumbItem[]
cast:
  separatorIcon: 'RocketIcon'
props:
  separatorIcon: 'RocketIcon'
  items:
    - label: 'Docs'
      to: '/docs'
    - label: 'Components'
      to: '/docs/components'
    - label: 'Breadcrumb'
      to: '/docs/components/breadcrumb'
---
::

## Examples

### With separator slot

Use the `#separator` slot to customize the separator between each item.

:component-example{name="breadcrumb-separator-slot-example"}

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{lang="ts-type"}
- `#{{ item.slot }}-leading`{lang="ts-type"}
- `#{{ item.slot }}-label`{lang="ts-type"}
- `#{{ item.slot }}-trailing`{lang="ts-type"}

:component-example{name="breadcrumb-custom-slot-example"}

::tip{to="#slots"}
You can also use the `#item`, `#item-leading`, `#item-label` and `#item-trailing` slots to customize all items.
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
