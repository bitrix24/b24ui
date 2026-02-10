---
title: Select
description: A selection field to pick from various options.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Select.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/select
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/select
  - label: Select
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/select
---

## Usage

Use the `v-model` directive to control the value of the Select or the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
prettier: true
hide:
  - class
ignore:
  - modelValue
  - items
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

### Items

Use the `items` prop as an array of strings, numbers or booleans:

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

You can also pass an array of objects with the following properties:

- `label?: string`{lang="ts-type"}
- [`value?: string`{lang="ts-type"}](#value-key)
- [`type?: "label" | "separator" | "item"`{lang="ts-type"}](#with-items-type)
- [`icon?: IconComponent`{lang="ts-type"}](#with-icons-in-items)
- [`avatar?: AvatarProps`{lang="ts-type"}](#with-avatar-in-items)
- [`color?: Select['color']`{lang="ts-type"}](#with-colors-items)
- [`chip?: ChipProps`{lang="ts-type"}](#with-chip-in-items)
- `disabled?: boolean`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{lang="ts-type"}

::component-code
---
ignore:
  - modelValue
  - items
  - class
external:
  - items
  - modelValue
externalTypes:
  - SelectItem[]
props:
  modelValue: 'backlog'
  items:
    - label: 'Backlog'
      value: 'backlog'
    - label: 'Todo'
      value: 'todo'
    - label: 'In Progress'
      value: 'in_progress'
    - label: 'Done'
      value: 'done'
  class: 'w-[192px]'
---
::

::caution
When using objects, you need to reference the `value` property of the object in the `v-model` directive or the `default-value` prop.
::

You can also pass an array of arrays to the `items` prop.
Use the element type `separator` as a separator.

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Apple'
  items:
    - - Apple
      - Banana
      - Blueberry
      - Grapes
      - Pineapple
    - - type: 'separator'
      - Aubergine
      - Broccoli
      - Carrot
      - Courgette
      - Leek
  class: 'w-[192px]'
---
::

### Value Key

You can change the property that is used to set the value by using the `value-key` prop. Defaults to `value`.

::component-code
---
collapse: true
ignore:
  - modelValue
  - valueKey
  - items
  - class
external:
  - items
  - modelValue
externalTypes:
  - SelectItem[]
props:
  modelValue: 'todo'
  valueKey: 'id'
  items:
    - label: 'Backlog'
      id: 'backlog'
    - label: 'Todo'
      id: 'todo'
    - label: 'In Progress'
      id: 'in_progress'
    - label: 'Done'
      id: 'done'
  class: 'w-[192px]'
---
::

::tip
Use the `by` prop to compare objects by a field instead of reference when the `model-value` is an object.
::

### Multiple

Use the `multiple` prop to allow multiple selections, the selected items will be separated by a comma in the trigger.

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
  - multiple
  - class
external:
  - items
  - modelValue
props:
  modelValue:
    - Backlog
    - Todo
  multiple: true
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

::caution
Ensure to pass an array to the `default-value` prop or the `v-model` directive.
::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

::component-code
---
prettier: true
ignore:
  - items
  - class
external:
  - items
props:
  placeholder: 'Select status'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

### Content

Use the `content` prop to control how the Select content is rendered, like its `align` or `side` for example.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
external:
  - items
  - modelValue
items:
  content.align:
    - start
    - center
    - end
  content.side:
    - right
    - left
    - top
    - bottom
props:
  modelValue: 'Backlog'
  content:
    align: center
    side: bottom
    sideOffset: 8
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

### Arrow

Use the `arrow` prop to display an arrow on the Select.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
  - arrow
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  arrow: true
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

### Color

Use the `color` prop to change the ring color when the Select is focused.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  color: air-primary-copilot
  highlight: true
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Tag

Use the `tag` property to display a [Badge](/docs/components/badge/) on top of the Select.

::component-code
---
prettier: true
ignore:
  - placeholder
  - items
  - modelValue
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  tag: note
  color: air-primary-warning
  highlight: true
  placeholder: 'Search...'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

Use the `tagColor` property to set the color for Badge.

::component-code
---
prettier: true
ignore:
  - placeholder
  - items
  - modelValue
  - class
external:
  - items
  - modelValue
items:
  tagColor:
    - air-primary
    - air-primary-success
    - air-primary-alert
    - air-primary-copilot
    - air-primary-warning
    - air-secondary
    - air-secondary-alert
    - air-secondary-accent
    - air-secondary-accent-1
    - air-secondary-accent-2
    - air-tertiary
    - air-selection
props:
  modelValue: 'Backlog'
  tag: note
  tagColor: air-secondary-alert
  color: air-primary-warning
  highlight: true
  placeholder: 'Search...'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Size

Use the `size` prop to change the size of the Select.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  size: xl
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

### Icon

Use the `icon` prop to show an [Icon](https://bitrix24.github.io/b24icons/icons/) inside the Select.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
  - icon
cast:
  icon: 'RocketIcon'
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  icon: 'RocketIcon'
  size: md
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
  - trailingIcon
cast:
  trailingIcon: 'RocketIcon'
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  trailingIcon: 'RocketIcon'
  size: md
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

### Selected Icon

Use the `selected-icon` prop to customize the [Icon](https://bitrix24.github.io/b24icons/icons/) when an item is selected.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
  - selectedIcon
cast:
  selectedIcon: 'RocketIcon'
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  selectedIcon: 'RocketIcon'
  size: md
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/) inside the Select.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - avatar.src
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  avatar.src: '/b24ui/avatar/employee.png'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

### Loading

Use the `loading` prop to show a loading icon on the Select.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - class
external:
  - items
  - modelValue
props:
  modelValue: 'Backlog'
  loading: true
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

### Disabled

Use the `disabled` prop to disable the Select.

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
  - class
external:
  - items
props:
  disabled: true
  placeholder: 'Select status'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

### No padding

Use the `noPadding` prop to removes padding from the Select.

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
  - class
external:
  - items
props:
  noPadding: true
  highlight: true
  placeholder: 'Select status'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

::note
The `highlight` prop is used here to show the focus state.
::

### No border

Use the `noBorder` prop to removes all borders (rings) from the Select.

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
  - class
external:
  - items
props:
  noBorder: true
  highlight: true
  placeholder: 'Select status'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

::note
The `highlight` prop is used here to indicate that there is no focus state.
::

### Underline

Use the `underline` prop to removes all borders (rings) except the bottom one from the Select.

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
  - class
external:
  - items
props:
  underline: true
  highlight: true
  placeholder: 'Select status'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

::note
The `highlight` prop is used here to show the focus state.
::

### Rounded

Use the `rounded` prop to round the Select.

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
  - class
external:
  - items
props:
  rounded: true
  highlight: true
  placeholder: 'Select status'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
  class: 'w-[192px]'
---
::

::note
The `highlight` prop is used here to show the focus state.
::

## Examples

### With items type

You can use the `type` property with `separator` to display a separator between items or `label` to display a label.

::component-code
---
collapse: true
ignore:
  - modelValue
  - items
  - class
external:
  - items
  - modelValue
externalTypes:
  - SelectItem[]
props:
  modelValue: 'Apple'
  items:
    - type: 'label'
      label: 'Fruits'
    - Apple
    - Banana
    - type: 'separator'
    - Blueberry
    - Grapes
    - Pineapple
    - type: 'label'
      label: 'Vegetables'
    - Aubergine
    - Broccoli
    - Carrot
    - Courgette
    - Leek
  class: 'w-[192px]'
---
::

### With colors items

You can use the `color` property to change the color of items.

::component-example
---
collapse: true
name: 'select-items-color-example'
---
::

### With icon in items

You can use the `icon` property to display an [Icon](https://bitrix24.github.io/b24icons/icons/) inside the items.

::component-example
---
collapse: true
name: 'select-items-icon-example'
---
::

::note
In this example, the icon is computed from the `value` property of the selected item.
::

::tip
You can also use the `#leading` slot to display the selected icon.
::

### With avatar in items

You can use the `avatar` property to display an [Avatar](/docs/components/avatar/) inside the items.

::component-example
---
collapse: true
name: 'select-items-avatar-example'
---
::

::note
In this example, the avatar is computed from the `value` property of the selected item.
::

::tip
You can also use the `#leading` slot to display the selected avatar.
::


### With chip in items

You can use the `chip` property to display a [Chip](/docs/components/chip/) inside the items.

::component-example
---
collapse: true
name: 'select-items-chip-example'
---
::

::note
In this example, the `#leading` slot is used to display the selected chip.
::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::component-example
---
name: 'select-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts/), you can toggle the Select by pressing :kbd{value="O"}.
::

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the Select.

::component-example
---
name: 'select-icon-example'
---
::

### With fetched items

You can fetch items from an API and use them in the Select.

::component-example
---
name: 'select-fetch-example'
collapse: true
---
::

### With infinite scroll

You can use the [`useInfiniteScroll`](https://vueuse.org/core/useInfiniteScroll/) composable to load more data as the user scrolls.

::component-example
---
prettier: true
collapse: true
highlights:
  - 41
  - 51
overflowHidden: true
name: 'select-infinite-scroll-example'
---
::

### With full content width

You can expand the content to the full width of its items by adding the `b24ui.content`,`b24ui.item` and `b24ui.viewport` slots.

::component-example
---
name: 'select-content-width-example'
collapse: true
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

### Expose

When accessing the component via a template ref, you can use the following:

| Name | Type |
| ---- | ---- |
| `triggerRef`{lang="ts-type"} | `Ref<HTMLButtonElement \| null>`{lang="ts-type"} |
| `viewportRef`{lang="ts-type"} | `Ref<HTMLDivElement \| null>`{lang="ts-type"} |

## Theme

:component-theme
