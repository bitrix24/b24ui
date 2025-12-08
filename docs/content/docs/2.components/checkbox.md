---
title: Checkbox
description: A toggle input for marking as checked or unchecked.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Checkbox.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/checkbox
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/checkbox
  - label: Checkbox
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/checkbox
---

## Usage

Use the `v-model` directive to control the checked state of the Checkbox.

::component-code
---
prettier: true
ignore:
  - modelValue
external:
  - modelValue
props:
  modelValue: true
---
::

Use the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
prettier: true
ignore:
  - defaultValue
props:
  defaultValue: true
---
::

### Indeterminate

Use the `indeterminate` value in the `v-model` directive or `default-value` prop to set the Checkbox to an [indeterminate state](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes).

::component-code
---
prettier: true
ignore:
  - defaultValue
props:
  defaultValue: 'indeterminate'
---
::

### Label

Use the `label` prop to set the label of the Checkbox.

::component-code
---
prettier: true
props:
  label: All employees can post to Feed
---
::

When using the `required` prop, an asterisk is added next to the label.

::component-code
---
prettier: true
ignore:
  - label
props:
  required: true
  label: All employees can post to Feed
---
::

### Description

Use the `description` prop to set the description of the Checkbox.

::component-code
---
prettier: true
ignore:
  - label
props:
  label: All employees can post to Feed
  description: 'Broadcast posting is allowed in Feed. These posts will be visible to everyone.'
---
::

### Color

Use the `color` prop to change the color of the Checkbox.

::component-code
---
prettier: true
ignore:
  - label
  - defaultValue
props:
  color: 'air-primary-copilot'
  defaultValue: true
  label: Enable rich link previews
---
::

### Variant

Use the `variant` prop to change the variant of the Checkbox.

::component-code
---
prettier: true
ignore:
  - label
  - defaultValue
props:
  variant: 'card'
  color: 'air-primary-copilot'
  defaultValue: true
  label: All employees can post to Feed
  description: 'Broadcast posting is allowed in Feed. These posts will be visible to everyone.'
---
::

### Size

Use the `size` prop to change the size of the Checkbox.

::component-code
---
prettier: true
ignore:
  - label
  - description
  - defaultValue
props:
  size: lg
  variant: list
  defaultValue: true
  label: All employees can post to Feed
  description: 'Broadcast posting is allowed in Feed. These posts will be visible to everyone.'
---
::

### Indicator

Use the `indicator` prop to change the position or hide the indicator. Defaults to `start`.

::component-code
---
ignore:
  - label
  - defaultValue
props:
  indicator: 'end'
  variant: 'card'
  defaultValue: true
  label: All employees can post to Feed
---
::

### Disabled

Use the `disabled` prop to disable the Checkbox.

::component-code
---
ignore:
  - label
  - description
props:
  disabled: true
  label: All employees can post to Feed
  description: 'Broadcast posting is allowed in Feed. These posts will be visible to everyone.'
  variant: list
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

### Emits

:component-emits

## Theme

:component-theme
