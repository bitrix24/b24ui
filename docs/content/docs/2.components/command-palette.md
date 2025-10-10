---
title: CommandPalette
description: A searchable command palette powered by Fuse.js for fast, fuzzy text search.
category: navigation
badge: new
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/CommandPalette.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/command-palette
  - label: Nuxt UI
    iconName: NuxtIcon
    to: https://ui.nuxt.com/docs/components/command-palette
  - label: Fuse.js
    avatar:
      src: /b24ui/avatar/fuse.svg
    to: https://fusejs.io/
    target: _blank
  - label: Listbox
    avatar:
      src: /b24ui/avatar/rekaui.svg
    to: https://reka-ui.com/docs/components/listbox
---

## Usage

Use the `v-model` directive to control the value of the CommandPalette or the `default-value` prop to set the initial value when you do not need to control its state.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - modelValue
  - class
external:
  - groups
  - modelValue
class: '!p-0'
props:
  modelValue: {}
  autofocus: false
  groups:
    - id: 'users'
      label: 'Users'
      items:
        - label: 'Assistant Name'
          suffix: 'assistant'
          avatar:
            src: '/b24ui/avatar/assistant.png'
        - label: 'Bitrix24'
          suffix: 'bitrix24'
          avatar:
            src: 'https://github.com/bitrix24.png'
        - label: 'Employee Name'
          suffix: 'employee'
          avatar:
            src: '/b24ui/avatar/employee.png'
  class: 'flex-1'
---
::

::tip{to="#control-selected-items"}
You can also use the `@update:model-value` event to listen to the selected item(s).
::

### Groups

The CommandPalette component filters groups and ranks matching commands by relevance as users type. It provides dynamic, instant search results for efficient command discovery. Use the `groups` prop as an array of objects with the following properties:

- `id: string`{lang="ts-type"}
- `label?: string`{lang="ts-type"}
- `slot?: string`{lang="ts-type"}
- `items?: CommandPaletteItem[]`{lang="ts-type"}
- [`ignoreFilter?: boolean`{lang="ts-type"}](#with-ignore-filter)
- [`postFilter?: (searchTerm: string, items: T[]) => T[]`{lang="ts-type"}](#with-post-filtered-items)
- `highlightedIcon?: IconComponent`{lang="ts-type"}

::caution
You must provide an `id` for each group otherwise the group will be ignored.
::

Each group contains an `items` array of objects that define the commands. Each item can have the following properties:

- `prefix?: string`{lang="ts-type"}
- `label?: string`{lang="ts-type"}
- `suffix?: string`{lang="ts-type"}
- `icon?: IconComponent`{lang="ts-type"}
- `avatar?: AvatarProps`{lang="ts-type"}
- `chip?: ChipProps`{lang="ts-type"}
- `kbds?: string[] | KbdProps[]`{lang="ts-type"}
- `active?: boolean`{lang="ts-type"}
- `loading?: boolean`{lang="ts-type"}
- `disabled?: boolean`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `placeholder?: string`{lang="ts-type"}
- `children?: CommandPaletteItem[]`{lang="ts-type"}
- `onSelect?(e?: Event): void`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemLabelPrefix?: ClassNameValue, itemLabelBase?: ClassNameValue, itemLabelSuffix?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingKbds?: ClassNameValue, itemTrailingKbdsSize?: ClassNameValue, itemTrailingHighlightedIcon?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{lang="ts-type"}

You can pass any property from the [Link](/docs/components/link/#props) component such as `to`, `target`, etc.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - modelValue
  - class
external:
  - groups
  - modelValue
class: '!p-0'
props:
  modelValue: {}
  autofocus: false
  groups:
    - id: 'users'
      label: 'Users'
      items:
        - label: 'Assistant Name'
          suffix: 'assistant'
          avatar:
            src: '/b24ui/avatar/assistant.png'
        - label: 'Bitrix24'
          suffix: 'bitrix24'
          avatar:
            src: 'https://github.com/bitrix24.png'
        - label: 'Employee Name'
          suffix: 'employee'
          avatar:
            src: '/b24ui/avatar/employee.png'
  class: 'flex-1'
---
::

::tip{to="#with-children-in-items"}
Each item can take a `children` array of objects with the following properties to create submenus:
::

### Multiple

Use the `multiple` prop to allow multiple selections.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - modelValue
  - multiple
  - class
external:
  - groups
  - modelValue
class: '!p-0'
props:
  multiple: true
  autofocus: false
  modelValue: []
  groups:
    - id: 'users'
      label: 'Users'
      items:
        - label: 'Assistant Name'
          suffix: 'assistant'
          avatar:
            src: '/b24ui/avatar/assistant.png'
        - label: 'Bitrix24'
          suffix: 'bitrix24'
          avatar:
            src: 'https://github.com/bitrix24.png'
        - label: 'Employee Name'
          suffix: 'employee'
          avatar:
            src: '/b24ui/avatar/employee.png'
  class: 'flex-1'
---
::

::caution
Ensure to pass an array to the `default-value` prop or the `v-model` directive.
::

### Placeholder

Use the `placeholder` prop to change the placeholder text.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
external:
  - groups
class: '!p-0'
props:
  autofocus: false
  placeholder: 'Search an app...'
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
        - label: 'Music'
        - label: 'Maps'
  class: 'flex-1'
---
::

### Icon

Use the `icon` prop to customize the input [Icon](https://bitrix24.github.io/b24icons/guide/icons.html).

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
  - icon
external:
  - groups
cast:
  icon: 'RocketIcon'
class: '!p-0'
props:
  autofocus: false
  icon: 'RocketIcon'
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
        - label: 'Music'
        - label: 'Maps'
  class: 'flex-1'
---
::

### Selected Icon

Use the `selected-icon` prop to customize the selected item [Icon](https://bitrix24.github.io/b24icons/guide/icons.html).

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - modelValue
  - multiple
  - class
  - selectedIcon
external:
  - groups
  - modelValue
cast:
  selectedIcon: 'RocketIcon'
class: '!p-0'
props:
  multiple: true
  autofocus: false
  modelValue:
    - label: 'Bitrix24'
      suffix: 'bitrix24'
      avatar:
        src: 'https://github.com/bitrix24.png'
  selectedIcon: 'RocketIcon'
  groups:
    - id: 'users'
      label: 'Users'
      items:
        - label: 'Assistant Name'
          suffix: 'assistant'
          avatar:
            src: '/b24ui/avatar/assistant.png'
        - label: 'Bitrix24'
          suffix: 'bitrix24'
          avatar:
            src: 'https://github.com/bitrix24.png'
        - label: 'Employee Name'
          suffix: 'employee'
          avatar:
            src: '/b24ui/avatar/employee.png'
  class: 'flex-1'
---
::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [Icon](https://bitrix24.github.io/b24icons/guide/icons.html) when an item has children.

::component-code
---
collapse: true
prettier: true
hide:
  - autofocus
ignore:
  - groups
  - class
  - trailingIcon
external:
  - groups
cast:
  trailingIcon: 'RocketIcon'
class: '!p-0'
props:
  autofocus: false
  trailingIcon: 'RocketIcon'
  groups:
    - id: 'actions'
      items:
        - label: 'Share'
          children:
            - label: 'Email'
            - label: 'Copy'
            - label: 'Link'
  class: 'flex-1'
---
::

### Loading

Use the `loading` prop to show a loading icon on the CommandPalette.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
external:
  - groups
class: '!p-0'
props:
  autofocus: false
  loading: true
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
        - label: 'Music'
        - label: 'Maps'
  class: 'flex-1'
---
::

### Close

Use the `close` prop to display a [Button](/docs/components/button/) to dismiss the CommandPalette.

::tip
An `update:open` event will be emitted when the close button is clicked.
::

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
  - close
external:
  - groups
class: '!p-0'
props:
  autofocus: false
  close: true
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
        - label: 'Music'
        - label: 'Maps'
  class: 'flex-1'
---
::

You can pass any property from the [Button](/docs/components/button/) component to customize it.

::component-code
---
collapse: true
prettier: true
hide:
  - autofocus
ignore:
  - close.color
  - close.rounded
  - close.size
  - groups
  - class
external:
  - groups
class: '!p-0'
props:
  autofocus: false
  close:
    color: air-primary
    rounded: true
    size: md
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
        - label: 'Music'
        - label: 'Maps'
  class: 'flex-1'
---
::

### Close Icon

Use the `close-icon` prop to customize the close button [Icon](https://bitrix24.github.io/b24icons/guide/icons.html).

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
  - closeIcon
  - icon
cast:
  closeIcon: 'RocketIcon'
external:
  - groups
class: '!p-0'
props:
  autofocus: false
  close: true
  closeIcon: 'RocketIcon'
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
        - label: 'Music'
        - label: 'Maps'
  class: 'flex-1'
---
::

### Back

Use the `back` prop to customize or hide the back button (with `false` value) displayed when navigating into a submenu.

You can pass any property from the [Button](/docs/components/button/) component to customize it.

::component-code
---
collapse: true
prettier: true
hide:
  - autofocus
ignore:
  - back.color
  - groups
  - class
external:
  - groups
class: '!p-0'
props:
  autofocus: false
  back:
    color: air-primary
  groups:
    - id: 'actions'
      items:
        - label: 'Share'
          children:
            - label: 'Email'
            - label: 'Copy'
            - label: 'Link'
  class: 'flex-1'
---
::

### Back Icon

Use the `back-icon` prop to customize the back button [Icon](https://bitrix24.github.io/b24icons/guide/icons.html).

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - class
  - groups
  - back
  - backIcon
cast:
  backIcon: 'RocketIcon'
external:
  - groups
class: '!p-0'
props:
  autofocus: false
  back: true
  backIcon: 'RocketIcon'
  groups:
    - id: 'actions'
      items:
        - label: 'Share'
          children:
            - label: 'Email'
            - label: 'Copy'
            - label: 'Link'
  class: 'flex-1'
---
::

### Disabled

Use the `disabled` prop to disable the CommandPalette.

::component-code
---
collapse: true
hide:
  - autofocus
ignore:
  - groups
  - class
external:
  - groups
class: '!p-0'
props:
  autofocus: false
  disabled: true
  groups:
    - id: 'apps'
      items:
        - label: 'Calendar'
        - label: 'Music'
        - label: 'Maps'
  class: 'flex-1'
---
::

## Examples

### Control selected item(s)

You can control the selected item(s) by using the `default-value` prop or the `v-model` directive, by using the `onSelect` field on each item or by using the `@update:model-value` event.

::component-example
---
collapse: true
name: 'command-palette-select-example'
class: '!p-0'
props:
  autofocus: false
---
::

### Control search term

Use the `v-model:search-term` directive to control the search term.

::component-example
---
collapse: true
name: 'command-palette-search-term-example'
class: '!p-0'
props:
  autofocus: false
---
::

::note
This example uses the `@update:model-value` event to reset the search term when an item is selected.
::

### With children in items

You can create hierarchical menus by using the `children` property in items. When an item has children, it will automatically display a chevron icon and enable navigation into a submenu.

::component-example
---
collapse: true
prettier: true
name: 'command-palette-items-children-example'
class: '!p-0'
props:
  autofocus: false
---
::

::note
When navigating into a submenu:
- The search term is reset
- A back button appears in the input
- You can go back to the previous group by pressing the :kbd{value="backspace"} key
::

### With fetched items

You can fetch items from an API and use them in the CommandPalette.

::component-example
---
collapse: true
name: 'command-palette-fetch-example'
class: '!p-0'
props:
  autofocus: false
---
::

### With ignore filter

You can set the `ignoreFilter` field to `true` on a group to disable the internal search and use your own search logic.

::component-example
---
collapse: true
name: 'command-palette-ignore-filter-example'
class: '!p-0'
props:
  autofocus: false
---
::

::note
This example uses [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced) to debounce the API calls.
::

### With post-filtered items

You can use the `postFilter` field on a group to filter items after the search happened.

::component-example
---
collapse: true
name: 'command-palette-post-filter-example'
class: '!p-0'
props:
  autofocus: false
---
::

::note
Start typing to see items with higher level appear.
::

### With custom fuse search

You can use the `fuse` prop to override the options of [useFuse](https://vueuse.org/integrations/useFuse) which defaults to:

```ts
{
  fuseOptions: {
    ignoreLocation: true,
    threshold: 0.1,
    keys: ['label', 'suffix']
  },
  resultLimit: 12,
  matchAllWhenSearchEmpty: true
}
```

::tip
The `fuseOptions` are the options of [Fuse.js](https://www.fusejs.io/api/options.html), the `resultLimit` is the maximum number of results to return and the `matchAllWhenSearchEmpty` is a boolean to match all items when the search term is empty.
::

You can for example set `{ fuseOptions: { includeMatches: true } }`{lang="ts-type"} to highlight the search term in the items.

::component-example
---
collapse: true
name: 'command-palette-fuse-example'
class: '!p-0'
props:
  autofocus: false
---
::

### With virtualization :badge{label="Soon"}

Use the `virtualize` prop to enable virtualization for large lists as a boolean or an object with options like `{ estimateSize: 32, overscan: 12 }`.

::warning{to="https://github.com/unovue/reka-ui/issues/1885" target="_blank"}
When enabled, all groups are flattened into a single list due to a limitation of Reka UI.
::

::component-example
---
collapse: true
name: 'command-palette-virtualize-example'
class: '!p-0'
props:
  autofocus: false
---
::

### Within a Popover

You can use the CommandPalette component inside a [Popover](/docs/components/popover/)'s content.

::component-example
---
collapse: true
name: 'popover-command-palette-example'
props:
  autofocus: false
---
::

### Within a Modal

You can use the CommandPalette component inside a [Modal](/docs/components/modal/)'s content.

::component-example
---
collapse: true
name: 'modal-command-palette-example'
props:
  autofocus: false
---
::

### Listen open state

When using the `close` prop, you can listen to the `update:open` event when the button is clicked.

::component-example
---
collapse: true
name: 'command-palette-open-example'
props:
  autofocus: false
---
::

::note
This can be useful when using the CommandPalette inside a [`Modal`](/docs/components/modal/) for example.
::

### With footer slot

Use the `#footer` slot to add custom content at the bottom of the CommandPalette, such as keyboard shortcuts help or additional actions.

::component-example
---
collapse: true
name: 'command-palette-footer-slot-example'
class: '!p-0'
props:
  autofocus: false
---
::

### With custom slot

Use the `slot` property to customize a specific item or group.

You will have access to the following slots:

- `#{{ item.slot }}`{lang="ts-type"}
- `#{{ item.slot }}-leading`{lang="ts-type"}
- `#{{ item.slot }}-label`{lang="ts-type"}
- `#{{ item.slot }}-trailing`{lang="ts-type"}

- `#{{ group.slot }}`{lang="ts-type"}
- `#{{ group.slot }}-leading`{lang="ts-type"}
- `#{{ group.slot }}-label`{lang="ts-type"}
- `#{{ group.slot }}-trailing`{lang="ts-type"}

::component-example
---
collapse: true
name: 'command-palette-custom-slot-example'
class: '!p-0'
props:
  autofocus: false
---
::

::tip{to="#slots"}
You can also use the `#item`, `#item-leading`, `#item-label` and `#item-trailing` slots to customize all items.
::

## API

### Props

:component-props

### Slots

:component-slots

### Emits

:component-emits

## Theme

:component-theme
