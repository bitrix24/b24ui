---
title: InputMenu
description: An input field with live autocomplete suggestions.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputMenu.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/input-menu
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/input-menu
  - label: Combobox
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/combobox
---

## Usage

Use the `v-model` directive to control the value of the InputMenu or the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
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
---
::

::tip
Use this over an [`Input`](/docs/components/input/) to take advantage of Reka UI's [`Combobox`](https://reka-ui.com/docs/components/combobox) component that offers autocomplete capabilities.
::

::note
This component is similar to the [`SelectMenu`](/docs/components/select-menu/) but it's using an Input instead of a Select.
::

### Items

Use the `items` prop as an array of strings, numbers or booleans:

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
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
---
::

You can also pass an array of objects with the following properties:

- `label?: string`{lang="ts-type"}
- [`value?: string`{lang="ts-type"}](#value-key)
- [`type?: "label" | "separator" | "item"`{lang="ts-type"}](#with-items-type)
- [`icon?: IconComponent`{lang="ts-type"}](#with-icons-in-items)
- [`avatar?: AvatarProps`{lang="ts-type"}](#with-avatar-in-items)
- [`color?: InputMenu['color']`{lang="ts-type"}](#with-colors-items)
- [`chip?: ChipProps`{lang="ts-type"}](#with-chip-in-items)
- `disabled?: boolean`{lang="ts-type"}
- `onSelect?: (e: Event) => void`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { tagsItem?: ClassNameValue, tagsItemText?: ClassNameValue, tagsItemDelete?: ClassNameValue, tagsItemDeleteIcon?: ClassNameValue, label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{lang="ts-type"}

::component-code
---
ignore:
  - modelValue.label
  - items
external:
  - items
  - modelValue
externalTypes:
  - InputMenuItem[]
props:
  modelValue:
    label: 'Todo'
  items:
    - label: 'Backlog'
    - label: 'Todo'
    - label: 'In Progress'
    - label: 'Done'
---
::

You can also pass an array of arrays to the `items` prop.
Use the element type `separator` as a separator.

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
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
external:
  - items
  - modelValue
externalTypes:
  - InputMenuItem[]
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
---
::

::tip
Use the `by` prop to compare objects by a field instead of reference when the `model-value` is an object.
::

### Multiple

Use the `multiple` prop to allow multiple selections, the selected items will be displayed as tags.

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
  - multiple
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
---
::

::caution
Ensure to pass an array to the `default-value` prop or the `v-model` directive.
::

### Delete Icon

With `multiple`, use the `delete-icon` prop to customize the delete [Icon](https://bitrix24.github.io/b24icons/icons/) in the tags.

::component-code
---
prettier: true
ignore:
  - modelValue
  - items
  - multiple
  - deleteIcon
external:
  - items
  - modelValue
cast:
  deleteIcon: 'RocketIcon'
props:
  modelValue:
    - Backlog
    - Todo
  multiple: true
  deleteIcon: 'RocketIcon'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

::component-code
---
prettier: true
ignore:
  - items
external:
  - items
props:
  placeholder: 'Select status'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

### Content

Use the `content` prop to control how the InputMenu content is rendered, like its `align` or `side` for example.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
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
---
::

### Arrow

Use the `arrow` prop to display an arrow on the InputMenu.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
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
---
::

### Color

Use the `color` prop to change the ring color when the InputMenu is focused.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
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
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Tag

Use the `tag` property to display a [Badge](/docs/components/badge/) on top of the Input.

::component-code
---
prettier: true
ignore:
  - placeholder
  - items
  - modelValue
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
---
::

::note
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
::

### Size

Use the `size` prop to change the size of the InputMenu.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
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
---
::

### Icon

Use the `icon` prop to show an [Icon](https://bitrix24.github.io/b24icons/icons/) inside the InputMenu.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
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
---
::

### Clear

Use the `clear` prop to display a clear button when a value is selected.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
external:
  - items
  - modelValue
items:
  clear:
    - true
    - false
props:
  modelValue: 'Backlog'
  clear: true
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

### Clear Icon

Use the `clear-icon` prop to customize the clear button [Icon](https://bitrix24.github.io/b24icons/icons/).

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - clearIcon
cast:
    clearIcon: 'RocketIcon'
external:
  - items
  - modelValue
items:
  clear:
    - true
    - false
props:
  modelValue: 'Backlog'
  clear: true
  clearIcon: 'RocketIcon'
  items:
    - Backlog
    - Todo
    - In Progress
    - Done
---
::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/) inside the InputMenu.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
  - avatar.src
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
---
::

### Loading

Use the `loading` prop to show a loading icon on the InputMenu.

::component-code
---
prettier: true
ignore:
  - items
  - modelValue
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
---
::

### Disabled

Use the `disabled` prop to disable the InputMenu.

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
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
---
::

### No border

Use the `noBorder` prop to removes all borders (rings) from the InputMenu.

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
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
---
::

::note
The `highlight` prop is used here to indicate that there is no focus state.
::

### Underline

Use the `underline` prop to removes all borders (rings) except the bottom one from the InputMenu.

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
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
---
::

::note
The `highlight` prop is used here to show the focus state.
::

### Rounded

Use the `rounded` prop to round the InputMenu.

::component-code
---
prettier: true
ignore:
  - items
  - placeholder
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
external:
  - items
  - modelValue
externalTypes:
  - InputMenuItem[]
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
---
::

### With colors items

You can use the `color` property to change the color of items.

::component-example
---
collapse: true
name: 'input-menu-items-color-example'
---
::

### With icon in items

You can use the `icon` property to display an [Icon](https://bitrix24.github.io/b24icons/icons/) inside the items.

::component-example
---
collapse: true
name: 'input-menu-items-icon-example'
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
name: 'input-menu-items-avatar-example'
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
name: 'input-menu-items-chip-example'
---
::

::note
In this example, the `#leading` slot is used to display the selected chip.
::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::component-example
---
name: 'input-menu-open-example'
---
::

::note
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts/), you can toggle the InputMenu by pressing :kbd{value="O"}.
::

### Control open state on focus

You can use the `open-on-focus` or `open-on-click` props to open the menu when the input is focused or clicked.

::component-example
---
name: 'input-menu-open-focus-example'
---
::

### Control search term

Use the `v-model:search-term` directive to control the search term.

::component-example
---
name: 'input-menu-search-term-example'
---
::

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the InputMenu.

::component-example
---
name: 'input-menu-icon-example'
---
::

### With create item

Use the `create-item` prop to enable users to add custom values that aren't in the predefined options.

::component-example
---
collapse: true
name: 'input-menu-create-item-example'
---
::

::note
The create option shows when no match is found by default. Set it to `always` to show it even when similar values exist.
::

::tip{to="#emits"}
Use the `@create` event to handle the creation of the item. You will receive the event and the item as arguments.
::

### With fetched items

You can fetch items from an API and use them in the InputMenu.

::component-example
---
collapse: true
name: 'input-menu-fetch-example'
---
::

### With ignore filter

Set the `ignore-filter` prop to `true` to disable the internal search and use your own search logic.

::component-example
---
collapse: true
name: 'input-menu-ignore-filter-example'
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
name: 'input-menu-filter-fields-example'
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
name: 'input-menu-virtualize-example'
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
name: 'input-menu-infinite-scroll-example'
---
::

### With full content width

You can expand the content to the full width of its items by adding the `min-w-fit` class on the `b24ui.content`,`b24ui.item` and `b24ui.viewport` slots.

::component-example
---
name: 'input-menu-content-width-example'
collapse: true
---
::

### As a CountryPicker

This example demonstrates using the InputMenu as a country picker with lazy loading - countries are only fetched when the menu is opened.

::component-example
---
collapse: true
name: 'input-menu-countries-example'
---
::

## API

### Props

:component-props

::callout{color="air-secondary-accent-2" icon-name="MdnWebDocIcon" to="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes" target="_blank"}
This component also supports all native `<input>` HTML attributes.
::

### Slots

:component-slots

### Emits

:component-emits

### Expose

When accessing the component via a template ref, you can use the following:

| Name | Type |
| ---- | ---- |
| `inputRef`{lang="ts-type"} | `Ref<HTMLInputElement \| null>`{lang="ts-type"} |
| `viewportRef`{lang="ts-type"} | `Ref<HTMLDivElement \| null>`{lang="ts-type"} |

## Theme

:component-theme
