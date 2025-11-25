---
title: SelectMenu
description: A refined and searchable selection component.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Select.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/select-menu
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/select-menu
  - label: Combobox
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/combobox
---

## Usage

Use the `v-model` directive to control the value of the SelectMenu or the `default-value` prop to set the initial value when you do not need to control its state.

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

::tip
Use this over a [`Select`](/docs/components/select/) to take advantage of Reka UI's [`Combobox`](https://reka-ui.com/docs/components/combobox) component that offers search capabilities and multiple selection.
::

::note
This component is similar to the [`InputMenu`](/docs/components/input-menu/) but it's using a Select instead of an Input with the search inside the menu.
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
- [`color?: SelectMenu['color']`{lang="ts-type"}](#with-colors-items)
- [`chip?: ChipProps`{lang="ts-type"}](#with-chip-in-items)
- `disabled?: boolean`{lang="ts-type"}
- `onSelect?: (e: Event) => void`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{lang="ts-type"}

::caution
Unlike the [`Select`](/docs/components/select/) component, the SelectMenu expects the whole object to be passed to the `v-model` directive or the `default-value` prop by default.
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

You can choose to bind a single property of the object rather than the whole object by using the `value-key` prop. Defaults to `undefined`.

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
  - SelectMenuItem[]
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

### Search Input

Use the `search-input` prop to customize or hide the search input (with `false` value).

You can pass any property from the [Input](/docs/components/input/) component to customize it.

::component-code
---
prettier: true
ignore:
  - modelValue.label
  - searchInput.icon
  - items
external:
  - items
  - modelValue
externalTypes:
  - SelectMenuItem[]
props:
  modelValue:
    label: 'Backlog'
  searchInput:
    placeholder: 'Filter...'
  items:
    - label: Backlog
    - label: Todo
    - label: In Progress
    - label: Done
  class: 'w-[192px]'
---
::

::tip
You can set the `search-input` prop to `false` to hide the search input.
::

### Content

Use the `content` prop to control how the SelectMenu content is rendered, like its `align` or `side` for example.

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

Use the `arrow` prop to display an arrow on the SelectMenu.

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

Use the `color` prop to change the ring color when the SelectMenu is focused.

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

Use the `tag` property to display a [Badge](/docs/components/badge/) on top of the SelectMenu.

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

Use the `size` prop to change the size of the SelectMenu.

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

Use the `icon` prop to show an [Icon](https://bitrix24.github.io/b24icons/icons/) inside the SelectMenu.

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

Use the `avatar` prop to display an [Avatar](/docs/components/avatar/) inside the SelectMenu.

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

Use the `loading` prop to show a loading icon on the SelectMenu.

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

Use the `disabled` prop to disable the SelectMenu.

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

Use the `noPadding` prop to removes padding from the SelectMenu.

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

Use the `noBorder` prop to removes all borders (rings) from the SelectMenu.

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

Use the `underline` prop to removes all borders (rings) except the bottom one from the SelectMenu.

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

Use the `rounded` prop to round the SelectMenu.

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
  - SelectMenuItem[]
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
name: 'select-menu-items-color-example'
---
::

### With icon in items

You can use the `icon` property to display an [Icon](https://bitrix24.github.io/b24icons/icons/) inside the items.

::component-example
---
collapse: true
name: 'select-menu-items-icon-example'
---
::

::tip
You can also use the `#leading` slot to display the selected icon.
::

### With avatar in items

You can use the `avatar` property to display an [Avatar](/docs/components/avatar/) inside the items.

::component-example
---
collapse: true
name: 'select-menu-items-avatar-example'
---
::

::tip
You can also use the `#leading` slot to display the selected avatar.
::

### With chip in items

You can use the `chip` property to display a [Chip](/docs/components/chip/) inside the items.

::component-example
---
collapse: true
name: 'select-menu-items-chip-example'
---
::

::note
In this example, the `#leading` slot is used to display the selected chip.
::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::component-example
---
name: 'select-menu-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts/), you can toggle the SelectMenu by pressing :kbd{value="O"}.
::

### Control search term

Use the `v-model:search-term` directive to control the search term.

::component-example
---
name: 'select-menu-search-term-example'
---
::

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the SelectMenu.

::component-example
---
name: 'select-menu-icon-example'
---
::

### With create item

Use the `create-item` prop to enable users to add custom values that aren't in the predefined options.

::component-example
---
collapse: true
name: 'select-menu-create-item-example'
---
::

::note
The create option shows when no match is found by default. Set it to `always` to show it even when similar values exist.
::

::tip{to="#emits"}
Use the `@create` event to handle the creation of the item. You will receive the event and the item as arguments.
::

### With fetched items

You can fetch items from an API and use them in the SelectMenu.

::component-example
---
collapse: true
name: 'select-menu-fetch-example'
---
::

### With ignore filter

Set the `ignore-filter` prop to `true` to disable the internal search and use your own search logic.

::component-example
---
collapse: true
name: 'select-menu-ignore-filter-example'
---
::

::note
This example uses [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced) to debounce the API calls.
::

### With filter fields

Use the `filter-fields` prop with an array of fields to filter on. Defaults to `[labelKey]`.

::component-example
---
collapse: true
name: 'select-menu-filter-fields-example'
---
::
### With virtualization

Use the `virtualize` prop to enable virtualization for large lists as a boolean or an object with options like `{ estimateSize: 32, overscan: 12 }`.

::warning{to="https://github.com/unovue/reka-ui/issues/1885" target="_blank"}
When enabled, all groups are flattened into a single list due to a limitation of Reka UI.
::

::component-example
---
prettier: true
name: 'select-menu-virtualize-example'
---
::

### With full content width

You can expand the content to the full width of its items by adding the `b24ui.content`,`b24ui.item` and `b24ui.viewport` slots.

::component-example
---
name: 'select-menu-content-width-example'
collapse: true
---
::

### As a CountryPicker

This example demonstrates using the SelectMenu as a country picker with lazy loading - countries are only fetched when the menu is opened.

::component-example
---
collapse: true
name: 'select-menu-countries-example'
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

## Theme

:component-theme
