---
title: SelectMenu
description: A refined and searchable selection component.
outline: deep
---
<script setup>
import SelectMenuExample from '/examples/selectmenu/SelectMenu.vue';
import ArrayExample from '/examples/selectmenu/Array.vue';
import ArrayGroupExample from '/examples/selectmenu/ArrayGroup.vue';
import MultipleExample from '/examples/selectmenu/Multiple.vue';
</script>
# SelectMenu

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/select-menu"
  reka-ui="https://reka-ui.com/docs/components/combobox"
  reka-ui-title="Combobox"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/SelectMenu.vue"
>
  A refined and searchable selection component.
</Description>

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

## Usage

Use the `v-model` directive to control the value of the SelectMenu or the `default-value` prop to set the initial value when you do not need to control its state.

::: tip
Use this over a [`Select`](/components/select) to take advantage of Reka UI's [`Combobox`](https://reka-ui.com/docs/components/combobox) component that offers search capabilities and multiple selection.
:::

::: info
This component is similar to the [`InputMenu`](/components/input-menu) but it's using a Select instead of an Input with the search inside the menu.
:::

### Items

Use the `items` prop as an array of strings, numbers or booleans:

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SelectMenuExample />
  </ClientOnly>
</div>

<<< @/examples/selectmenu/demo/SelectMenu.vue{4,5,10,11 vue:line-numbers}

You can also pass an array of objects with the following properties:

- `label?: string`{lang="ts-type"}
- [`type?: "label" | "separator" | "item"`{lang="ts-type"}](#with-items-type)
- [`icon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts-type"}](#with-icons-in-items)
- [`avatar?: AvatarProps`{lang="ts-type"}](#with-avatar-in-items)
- [`chip?: ChipProps`{lang="ts-type"}](#with-chip-in-items)
- `disabled?: boolean`{lang="ts-type"}
- `onSelect?(e: Event): void`{lang="ts-type"}

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrayExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/Array.vue{18-21,26-27 vue:line-numbers}
:::

::: danger
Unlike the [`Select`](/components/select) component, the SelectMenu expects the whole object to be passed to the `v-model` directive or the `default-value` prop by default.
:::

You can also pass an array of arrays to the `items` prop to display separated groups of items.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrayGroupExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/ArrayGroup.vue{4-7,14 vue:line-numbers}
:::

### Value Key

You can choose to bind a single property of the object rather than the whole object by using the `value-key` prop. Defaults to `undefined`.

__component-code

### Multiple

Use the `multiple` prop to allow multiple selections, the selected items will be separated by a comma in the trigger.

::: danger
Ensure to pass an array to the `default-value` prop or the `v-model` directive.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <MultipleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/Multiple.vue{4-5,11 vue:line-numbers}
:::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

__component-code

### Search Input

Use the `search-input` prop to customize or hide the search input (with `false` value).

You can pass any property from the [Input](/components/input) component to customize it.

__component-code

::: tip
You can set the `search-input` prop to `false` to hide the search input.
:::

### Content

Use the `content` prop to control how the SelectMenu content is rendered, like its `align` or `side` for example.

__component-code

### Arrow

Use the `arrow` prop to display an arrow on the SelectMenu.

__component-code

### Color

Use the `color` prop to change the ring color when the SelectMenu is focused.

__component-code

::: info
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
:::

### Variant

Use the `variant` prop to change the variant of the SelectMenu.

__component-code

### Size

Use the `size` prop to change the size of the SelectMenu.

__component-code

### Icon

Use the `icon` prop to show an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) inside the SelectMenu.

__component-code

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html). Defaults to `Actions::ChevronDownIcon`.

__component-code

### Selected Icon

Use the `selected-icon` prop to customize the icon when an item is selected. Defaults to `Main::CheckIcon`.

__component-code

### Avatar

Use the `avatar` prop to display an [Avatar](/components/avatar) inside the SelectMenu.

__component-code

### Loading

Use the `loading` prop to show a loading icon on the SelectMenu.

__component-code

### Disabled

Use the `disabled` prop to disable the SelectMenu.

__component-code

## Examples

### With items type

You can use the `type` property with `separator` to display a separator between items or `label` to display a label.

__component-code

### With icons in items

You can use the `icon` property to display an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) inside the items.

::: tip
You can also use the `#leading` slot to display the selected icon.
:::

__component-example

### With avatar in items

You can use the `avatar` property to display an [Avatar](/components/avatar) inside the items.

::: tip
You can also use the `#leading` slot to display the selected avatar.
:::

__component-example

### With chip in items

You can use the `chip` property to display a [Chip](/components/chip) inside the items.

::: info
In this example, the `#leading` slot is used to display the selected chip.
:::

__component-example

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::: info
In this example, leveraging [`defineShortcuts`](composables/define-shortcuts), you can toggle the SelectMenu by pressing `O`.
:::

__component-example

### Control search term

Use the `v-model:search-term` directive to control the search term.

__component-example

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the SelectMenu.

__component-example

### With create item

Use the `create-item` prop to enable users to add custom values that aren't in the predefined options.

::: info
The create option shows when no match is found by default. Set it to `always` to show it even when similar values exist.
:::

__component-example

::: info
Use the [`@create`](#emits) event to handle the creation of the item. You will receive the event and the item as arguments.
:::

### With fetched items

You can fetch items from an API and use them in the SelectMenu.

__component-example

### With ignore filter

Set the `ignore-filter` prop to `true` to disable the internal search and use your own search logic.

::: info
This example uses [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced) to debounce the API calls.
:::

__component-example

### With filter fields

Use the `filter-fields` prop with an array of fields to filter on. Defaults to `[labelKey]`.

__component-example

### As a CountryPicker

This example demonstrates using the SelectMenu as a country picker with lazy loading - countries are only fetched when the menu is opened.

__component-example

## API

### Props

<ComponentProps component="SelectMenu" />

### Slots

<ComponentSlots component="SelectMenu" />

### Emits

<ComponentEmits component="SelectMenu" />

