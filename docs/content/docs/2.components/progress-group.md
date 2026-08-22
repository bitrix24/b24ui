---
title: ProgressGroup
description: One progress bar carrying several values at once, each drawn as its own coloured part.
category: element
navigation.badge: New
keywords:
  - meter group
  - segmented progress
  - stacked bar
  - breakdown
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/ProgressGroup.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/progress-group
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/progress-group
---

## Usage

Use the ProgressGroup component to display multiple values as segments of a single progress bar.

::component-code
---
collapse: true
ignore:
  - items
  - max
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  max: 128
  items:
    - label: 'System'
      value: 24
      color: 'air-secondary'
    - label: 'Apps'
      value: 8
      color: 'air-primary-alert'
    - label: 'Documents'
      value: 12
      color: 'air-primary-warning'
    - label: 'Multimedia'
      value: 42
      color: 'air-primary-success'
  class: 'w-96'
---
::

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `value?: number`{lang="ts-type"}
- `color?: "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-copilot" | "air-primary-warning" | "air-secondary"`{lang="ts-type"}
- `slot?: string`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { segment?: ClassNameValue, indicator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingDot?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue }`{lang="ts-type"}

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  items:
    - label: 'Compute'
      value: 42
      color: 'air-primary'
    - label: 'Storage'
      value: 18
      color: 'air-secondary'
    - label: 'Bandwidth'
      value: 9
      color: 'air-primary-warning'
  class: 'w-96'
---
::

::note
Items without an `icon` get a coloured dot in the list instead.
::

### Max

Use the `max` prop to set the value all items add up to. Defaults to `100`.

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  max: 128
  items:
    - label: 'System'
      value: 24
    - label: 'Apps'
      value: 8
  class: 'w-96'
---
::

::note
A `max` that is not a positive number falls back to `100`, so the segments keep their proportions instead of collapsing.
::

### Status

Use the `status` prop to display the summed progress value.

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  max: 128
  status: true
  items:
    - label: 'System'
      value: 24
      color: 'air-secondary'
    - label: 'Apps'
      value: 8
      color: 'air-primary-alert'
  class: 'w-96'
---
::

::tip
The status tracks the end of the bar, use `:b24ui="{ status: 'w-full' }"` to make it span the full width instead.
::

### Color

Use the `color` prop to set the colour every item falls back to.

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  color: 'air-secondary'
  max: 128
  items:
    - label: 'System'
      value: 24
    - label: 'Apps'
      value: 8
  class: 'w-96'
---
::

### Size

Use the `size` prop to change the thickness of the bar.

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  size: 'lg'
  max: 128
  items:
    - label: 'System'
      value: 24
    - label: 'Apps'
      value: 8
  class: 'w-96'
---
::

### Orientation

Use the `orientation` prop to change the direction of the bar. Defaults to `horizontal`.

::component-code
---
collapse: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - ProgressGroupItem[]
props:
  orientation: 'vertical'
  max: 128
  items:
    - label: 'System'
      value: 24
    - label: 'Apps'
      value: 8
  class: 'h-96'
---
::

## Examples

### With status slot

Use the `status` slot to replace the summed value with your own content.

::component-example
---
collapse: true
name: 'progress-group-status-example'
---
::

### With item slots

Use the `item-label` and `item-trailing` slots to change what the legend shows for every item.

::component-example
---
collapse: true
name: 'progress-group-item-example'
---
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme

## Changelog

:component-changelog
