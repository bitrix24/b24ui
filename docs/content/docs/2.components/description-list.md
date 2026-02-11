---
title: DescriptionList
description: 'For instances requiring the conversion of a table row into its own table to enhance page completeness.'
category: data
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DescriptionList.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/description-list
---

## Usage

Use the `items` prop as an array of objects to control the value of the DescriptionList:

- `label?: string`{lang="ts-type"}
- `description?: string`{lang="ts-type"}
- [`icon?: IconComponent`{lang="ts-type"}](#with-icons-in-items)
- [`avatar?: AvatarProps`{lang="ts-type"}](#with-avatar-in-items)
- [`actions?: ButtonProps[]`{lang="ts-type"}](#with-actions-in-items)
- [`orientation?: "horizontal" | "vertical"`{lang="ts-type"}](#with-actions-in-items)
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `class?: any`{lang="ts-type"}
- `b24ui?: { labelWrapper?: ClassNameValue, icon?: ClassNameValue, avatar?: ClassNameValue, label?: ClassNameValue, descriptionWrapper?: ClassNameValue, description?: ClassNameValue, actions?: ClassNameValue }`{lang="ts-type"}

::component-code
---
prettier: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - DescriptionListItem[]
props:
  items:
    - label: 'Full name'
      description: 'Michael Foster'
    - label: 'Event'
      description: 'Payment is made through Atol online'
---
::

### Legend

Use the `legend` prop to set the legend of the DescriptionList.

::component-code
---
prettier: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - DescriptionListItem[]
props:
  legend: 'Applicant Information'
  items:
    - label: 'Full name'
      description: 'Michael Foster'
    - label: 'Event'
      description: 'Payment is made through Atol online'
---
::

### Text

Use the `text` prop to set the description of the DescriptionList.

::component-code
---
prettier: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - DescriptionListItem[]
props:
  legend: 'Applicant Information'
  text: 'Personal details and application.'
  items:
    - label: 'Full name'
      description: 'Michael Foster'
    - label: 'Event'
      description: 'Payment is made through Atol online'
---
::

### Label Key

You can change the property that is used to set the label by using the `label-key` prop. Defaults to `label`.

::component-code
---
prettier: true
ignore:
  - legend
  - text
  - labelKey
  - items
  - class
external:
  - items
externalTypes:
  - DescriptionListItem[]
props:
  legend: 'Applicant Information'
  text: 'Personal details and application.'
  labelKey: 'title'
  items:
    - title: 'Full name'
      description: 'Michael Foster'
    - title: 'Event'
      description: 'Payment is made through Atol online'
---
::

### Description Key

You can change the property that is used to set the description by using the `description-key` prop. Defaults to `description`.

::component-code
---
prettier: true
ignore:
  - legend
  - text
  - labelKey
  - descriptionKey
  - items
  - class
external:
  - items
externalTypes:
  - DescriptionListItem[]
props:
  legend: 'Applicant Information'
  text: 'Personal details and application.'
  labelKey: 'title'
  descriptionKey: 'info'
  items:
    - title: 'Full name'
      info: 'Michael Foster'
    - title: 'Event'
      info: 'Payment is made through Atol online'
---
::

### Size

Use the `size` prop to change the size of the DescriptionList.

::component-code
---
prettier: true
ignore:
  - items
  - class
external:
  - items
externalTypes:
  - DescriptionListItem[]
props:
  size: sm
  legend: 'Applicant Information'
  text: 'Personal details and application.'
  items:
    - label: 'Full name'
      description: 'Michael Foster'
    - label: 'Event'
      description: 'Payment is made through Atol online'
---
::

## Examples

### With icon in items

You can use the `icon` property to display an [Icon](https://bitrix24.github.io/b24icons/icons/) inside the items.

::component-example
---
collapse: true
name: 'description-list-icon-example'
---
::

### With avatar in items

You can use the `avatar` property to display an [Avatar](/docs/components/avatar/) inside the items.

::component-example
---
collapse: true
name: 'description-list-avatar-example'
---
::

### With actions in items

Use the `actions` property to add some [Button](/docs/components/button/) actions to the items of the DescriptionList.

Use the `orientation` property to change the orientation actions of the items.

::component-example
---
collapse: true
name: 'description-list-actions-example'
---
::

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{lang="ts-type"}

::component-example
---
collapse: true
name: 'description-list-custom-slot-example'
---
::

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
