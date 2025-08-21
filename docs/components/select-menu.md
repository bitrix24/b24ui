---
title: SelectMenu
description: A refined and searchable selection component.
outline: deep
---
<script setup>
import SelectMenuExample from '/examples/selectmenu/SelectMenu.vue';
import ArrayExample from '/examples/selectmenu/Array.vue';
import ArrayGroupExample from '/examples/selectmenu/ArrayGroup.vue';
import ValueKeyExample from '/examples/selectmenu/ValueKey.vue';
import MultipleExample from '/examples/selectmenu/Multiple.vue';
import PlaceholderExample from '/examples/selectmenu/Placeholder.vue';
import SearchInputExample from '/examples/selectmenu/SearchInput.vue';
import ContentExample from '/examples/selectmenu/Content.vue';
import ArrowExample from '/examples/selectmenu/Arrow.vue';
import ColorExample from '/examples/selectmenu/Color.vue';
import TagExample from '/examples/selectmenu/Tag.vue';
import SizeExample from '/examples/selectmenu/Size.vue';
import IconExample from '/examples/selectmenu/Icon.vue';
import TrailingIconExample from '/examples/selectmenu/TrailingIcon.vue';
import SelectedIconExample from '/examples/selectmenu/SelectedIcon.vue';
import AvatarExample from '/examples/selectmenu/Avatar.vue';
import LoadingExample from '/examples/selectmenu/Loading.vue';
import DisabledExample from '/examples/selectmenu/Disabled.vue';
import WithItemsTypeExample from '/examples/selectmenu/WithItemsType.vue';
import WithIconsInItemsExample from '/examples/selectmenu/WithIconsInItems.vue';
import WithAvatarInItemsExample from '/examples/selectmenu/WithAvatarInItems.vue';
import WithChipInItemsExample from '/examples/selectmenu/WithChipInItems.vue';
import ControlOpenStateExample from '/examples/selectmenu/ControlOpenState.vue';
import ControlSearchTermExample from '/examples/selectmenu/ControlSearchTerm.vue';
import WithRotatingIconExample from '/examples/selectmenu/WithRotatingIcon.vue';
import WithCreateItemExample from '/examples/selectmenu/WithCreateItem.vue';
import WithFetchedItemsExample from '/examples/selectmenu/WithFetchedItems.vue';
import WithIgnoreFilterExample from '/examples/selectmenu/WithIgnoreFilter.vue';
import WithFilterFieldsExample from '/examples/selectmenu/WithFilterFields.vue';
</script>
# SelectMenu

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/select-menu"
  reka-ui="https://reka-ui.com/docs/components/combobox"
  reka-ui-title="Combobox"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/SelectMenu.vue"
  demo="/components/select-menu"
>
  A refined and searchable selection component.
</Description>

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

- `label?: string`{lang="ts"}
- [`type?: "label" | "separator" | "item"`{lang="ts"}](#with-items-type)
- [`icon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts"}](#with-icons-in-items)
- [`avatar?: AvatarProps`{lang="ts"}](#with-avatar-in-items)
- `color?: "default" | "danger" | "success" | "warning" | "primary" | "secondary" | "collab" | "ai"`{lang="ts"}
- [`chip?: ChipProps`{lang="ts"}](#with-chip-in-items)
- `disabled?: boolean`{lang="ts"}
- `onSelect?(e: Event): void`{lang="ts"}
- `class?: any`{lang="ts"}
- `b24ui?: { label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{lang="ts"}

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrayExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/Array.vue{25-26 vue:line-numbers}
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

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ValueKeyExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/ValueKey.vue{7,11,15,18,24 vue:line-numbers}
:::

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

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <PlaceholderExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/Placeholder.vue{33 vue:line-numbers}
:::

### Search Input

Use the `search-input` prop to customize or hide the search input (with `false` value).

You can pass any property from the [Input](/components/input) component to customize it.

::: tip
You can set the `search-input` prop to `false` to hide the search input.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SearchInputExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/SearchInput.vue{3,37-40,47 vue:line-numbers}
:::

### Content

Use the `content` prop to control how the SelectMenu content is rendered, like its `align` or `side` for example.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ContentExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/Content.vue{35-41,48 vue:line-numbers}
:::

### Arrow

Use the `arrow` prop to display an arrow on the SelectMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrowExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/Arrow.vue{28 vue:line-numbers}
:::

### Color

Use the `color` prop to change the ring color when the SelectMenu is focused.

::: info
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/Color.vue{37,38 vue:line-numbers}
:::

### Tag

Use the `tag` property to display a small legend on top of the SelectMenu.

Use the `tagColor` property to set the color for `tag`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TagExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/Tag.vue{21,22 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the SelectMenu.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/Size.vue{35 vue:line-numbers}
:::

### Icon

Use the `icon` prop to show an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) inside the SelectMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/Icon.vue{29 vue:line-numbers}
:::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html). Defaults to `Actions::ChevronDownIcon`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <TrailingIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/TrailingIcon.vue{29 vue:line-numbers}
:::

### Selected Icon

Use the `selected-icon` prop to customize the icon when an item is selected. Defaults to `Main::CheckIcon`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SelectedIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/SelectedIcon.vue{29 vue:line-numbers}
:::

### Avatar

Use the `avatar` prop to display an [Avatar](/components/avatar) inside the SelectMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <AvatarExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/Avatar.vue{29,35 vue:line-numbers}
:::

### Loading

Use the `loading` prop to show a loading icon on the SelectMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <LoadingExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/Loading.vue{36 vue:line-numbers}
:::

### Disabled

Use the `disabled` prop to disable the SelectMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/Disabled.vue{36 vue:line-numbers}
:::

## Examples

### With items type

You can use the `type` property with `separator` to display a separator between items or `label` to display a label.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithItemsTypeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/WithItemsType.vue{7,15,22 vue:line-numbers}
:::

### With icon in items

You can use the `icon` property to display an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) inside the items.

::: tip
You can also use the `#leading` slot to display the selected icon.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithIconsInItemsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/WithIconsInItems.vue{11,16,21,22 vue:line-numbers}
:::

### With avatar in items

You can use the `avatar` property to display an [Avatar](/components/avatar) inside the items.

::: tip
You can also use the `#leading` slot to display the selected avatar.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithAvatarInItemsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/WithAvatarInItems.vue{8-11,16-19,29 vue:line-numbers}
:::

### With chip in items

You can use the `chip` property to display a [Chip](/components/chip) inside the items.

::: info
In this example, the `#leading` slot is used to display the selected chip.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithChipInItemsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/WithChipInItems.vue{8-10,15-17,29-38 vue:line-numbers}
:::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::: info
In this example, leveraging [`defineShortcuts`](composables/define-shortcuts), you can toggle the SelectMenu by pressing `O`.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ControlOpenStateExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/ControlOpenState.vue{20,22-24,30 vue:line-numbers}
:::

### Control search term

Use the `v-model:search-term` directive to control the search term.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ControlSearchTermExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/ControlSearchTerm.vue{20,26 vue:line-numbers}
:::

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the SelectMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithRotatingIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/WithRotatingIcon.vue{25-27 vue:line-numbers}
:::

### With create item

Use the `create-item` prop to enable users to add custom values that aren't in the predefined options.

::: info
The create option shows when no match is found by default. Set it to `always` to show it even when similar values exist.
:::

::: info
Use the [`@create`](#emits) event to handle the creation of the item. You will receive the event and the item as arguments.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithCreateItemExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/WithCreateItem.vue{11-15,21,24 vue:line-numbers}
:::

### With fetched items

You can fetch items from an API and use them in the SelectMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithFetchedItemsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/WithFetchedItems.vue{vue:line-numbers}
:::

### With ignore filter

Set the `ignore-filter` prop to `true` to disable the internal search and use your own search logic.

::: info
This example uses [`refDebounced`](https://vueuse.org/shared/refDebounced/#refdebounced) to debounce the API calls.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithIgnoreFilterExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/WithIgnoreFilter.vue{3,7-8,11,25,28 vue:line-numbers}
:::

### With filter fields

Use the `filter-fields` prop with an array of fields to filter on. Defaults to `[labelKey]`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithFilterFieldsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/selectmenu/demo/WithFilterFields.vue{9,22 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="SelectMenu" />

### Slots

<ComponentSlots component="SelectMenu" />

### Emits

<ComponentEmits component="SelectMenu" />

### Expose

When accessing the component via a template ref, you can use the following:

| Name                    | Type                                                           |
|-------------------------|----------------------------------------------------------------|
| `triggerRef`{lang="ts"} | `Ref<InstanceType<typeof ComboboxTrigger> \| null>`{lang="ts"} |

