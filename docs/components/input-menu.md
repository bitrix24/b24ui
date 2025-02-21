---
title: InputMenu
description: An input field with live autocomplete suggestions.
outline: deep
---
<script setup>
import InputMenuExample from '/examples/inputmenu/InputMenu.vue';
import ArrayExample from '/examples/inputmenu/Array.vue';
import ArrayGroupExample from '/examples/inputmenu/ArrayGroup.vue';
import MultipleExample from '/examples/inputmenu/Multiple.vue';
</script>
# InputMenu

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/input-menu"
  reka-ui="https://reka-ui.com/docs/components/combobox"
  reka-ui-title="Combobox"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputMenu.vue"
>
  An input field with live autocomplete suggestions.
</Description>

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

## Usage

Use the `v-model` directive to control the value of the InputMenu or the `default-value` prop to set the initial value when you do not need to control its state.

::: tip
Use this over an [`Input`](/components/input) to take advantage of Reka UI's [`Combobox`](https://reka-ui.com/docs/components/combobox) component that offers autocomplete capabilities.
:::

::: info
This component is similar to the [`SelectMenu`](/components/select-menu) but it's using an Input instead of a Select.
:::

### Items

Use the `items` prop as an array of strings, numbers or booleans:

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <InputMenuExample />
  </ClientOnly>
</div>

<<< @/examples/inputmenu/demo/InputMenu.vue{4,5,10,11 vue:line-numbers}

You can also pass an array of objects with the following properties:

- `label?: string`{lang="ts"}
- [`type?: "label" | "separator" | "item"`{lang="ts"}](#with-items-type)
- [`icon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts"}](#with-icons-in-items)
- [`avatar?: AvatarProps`{lang="ts"}](#with-avatar-in-items)
- [`chip?: ChipProps`{lang="ts"}](#with-chip-in-items)
- `disabled?: boolean`{lang="ts"}
- `onSelect?(e: Event): void`{lang="ts"}

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrayExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/Array.vue{18-21,26-27 vue:line-numbers}
:::

You can also pass an array of arrays to the `items` prop to display separated groups of items.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrayGroupExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/ArrayGroup.vue{4-7,14 vue:line-numbers}
:::

### Value Key

You can choose to bind a single property of the object rather than the whole object by using the `value-key` prop. Defaults to `undefined`.

__component-code

### Multiple

Use the `multiple` prop to allow multiple selections, the selected items will be displayed as badges.

::: danger
Ensure to pass an array to the `default-value` prop or the `v-model` directive.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <MultipleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/Multiple.vue{4-5,11 vue:line-numbers}
:::

### Delete Icon

With `multiple`, use the `delete-icon` prop to customize the delete icon [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) in the badges. Defaults to `Cross30Icon`.

__component-code

### Placeholder

Use the `placeholder` prop to set a placeholder text.

__component-code

### Content

Use the `content` prop to control how the InputMenu content is rendered, like its `align` or `side` for example.

__component-code

### Arrow

Use the `arrow` prop to display an arrow on the InputMenu.

__component-code

### Color

Use the `color` prop to change the ring color when the InputMenu is focused.

__component-code

::: info
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
:::

### Size

Use the `size` prop to change the size of the InputMenu.

__component-code

### Icon

Use the `icon` prop to show an [`defineShortcuts`](composables/define-shortcuts) inside the InputMenu.

__component-code

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing icon [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html). Defaults to `ChevronDownIcon`.

__component-code

### Selected Icon

Use the `selected-icon` prop to customize the icon [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) when an item is selected. Defaults to `CheckIcon`.

__component-code

### Avatar

Use the `avatar` prop to show an [Avatar](/components/avatar) inside the InputMenu.

__component-code

### Loading

Use the `loading` prop to show a loading icon on the InputMenu.

__component-code

### Disabled

Use the `disabled` prop to disable the InputMenu.

__component-code

## Examples

### With items type

You can use the `type` property with `separator` to display a separator between items or `label` to display a label.

__component-code

### With icons in items

You can use the `icon` property to display an [`defineShortcuts`](composables/define-shortcuts) inside the items.

__component-code

::: tip
You can also use the `#leading` slot to display the selected icon.
:::

### With avatar in items

You can use the `avatar` property to display an [Avatar](/components/avatar) inside the items.

__component-code

::: tip
You can also use the `#leading` slot to display the selected avatar.
:::

### With chip in items

You can use the `chip` property to display a [Chip](/components/chip) inside the items.

__component-code

::: info
In this example, the `#leading` slot is used to display the selected chip.
:::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

__component-code

::: info
In this example, leveraging [`defineShortcuts`](composables/define-shortcuts), you can toggle the InputMenu by pressing `O`.
:::

### Control open state on focus

You can also use the `@focus` directive to control the open state.

__component-code

### Control search term

Use the `v-model:search-term` directive to control the search term.

__component-code

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the InputMenu.

__component-code

### With create item

Use the `create-item` prop to enable users to add custom values that aren't in the predefined options.

__component-code

::: info
The create option shows when no match is found by default. Set it to `always` to show it even when similar values exist.
:::

::: tip
Use the [`@create`](#emits) event to handle the creation of the item. You will receive the event and the item as arguments.
:::

### With fetched items

You can fetch items from an API and use them in the InputMenu.

__component-code

### With ignore filter

Set the `ignore-filter` prop to `true` to disable the internal search and use your own search logic.

__component-code

::: info
This example uses [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced) to debounce the API calls.
:::

### With filter fields

Use the `filter-fields` prop with an array of fields to filter on. Defaults to `[labelKey]`.

__component-code

### As a CountryPicker

This example demonstrates using the InputMenu as a country picker with lazy loading - countries are only fetched when the menu is opened.

__component-example

## API

### Props

<ComponentProps component="InputMenu" />

### Slots

<ComponentSlots component="InputMenu" />

### Emits

<ComponentEmits component="InputMenu" />
