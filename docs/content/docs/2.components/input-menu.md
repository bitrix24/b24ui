---
title: InputMenu
description: An input field with live autocomplete suggestions.
category: form
---
<script setup>
import InputMenuExample from '/examples/inputmenu/InputMenu.vue';
import ArrayExample from '/examples/inputmenu/Array.vue';
import ArrayGroupExample from '/examples/inputmenu/ArrayGroup.vue';
import ValueKeyExample from '/examples/inputmenu/ValueKey.vue';
import MultipleExample from '/examples/inputmenu/Multiple.vue';
import DeleteIconExample from '/examples/inputmenu/DeleteIcon.vue';
import PlaceholderExample from '/examples/inputmenu/Placeholder.vue';
import ContentExample from '/examples/inputmenu/Content.vue';
import ArrowExample from '/examples/inputmenu/Arrow.vue';
import ColorExample from '/examples/inputmenu/Color.vue';
import TagExample from '/examples/inputmenu/Tag.vue';
import SizeExample from '/examples/inputmenu/Size.vue';
import IconExample from '/examples/inputmenu/Icon.vue';
import TrailingIconExample from '/examples/inputmenu/TrailingIcon.vue';
import SelectedIconExample from '/examples/inputmenu/SelectedIcon.vue';
import AvatarExample from '/examples/inputmenu/Avatar.vue';
import LoadingExample from '/examples/inputmenu/Loading.vue';
import DisabledExample from '/examples/inputmenu/Disabled.vue';
import WithItemsTypeExample from '/examples/inputmenu/WithItemsType.vue';
import WithIconsInItemsExample from '/examples/inputmenu/WithIconsInItems.vue';
import WithAvatarInItemsExample from '/examples/inputmenu/WithAvatarInItems.vue';
import WithChipInItemsExample from '/examples/inputmenu/WithChipInItems.vue';
import ControlOpenStateExample from '/examples/inputmenu/ControlOpenState.vue';
import ControlOpenStateOnFocusExample from '/examples/inputmenu/ControlOpenStateOnFocus.vue';
import ControlSearchTermExample from '/examples/inputmenu/ControlSearchTerm.vue';
import WithRotatingIconExample from '/examples/inputmenu/WithRotatingIcon.vue';
import WithCreateItemExample from '/examples/inputmenu/WithCreateItem.vue';
import WithFetchedItemsExample from '/examples/inputmenu/WithFetchedItems.vue';
import WithIgnoreFilterExample from '/examples/inputmenu/WithIgnoreFilter.vue';
import WithFilterFieldsExample from '/examples/inputmenu/WithFilterFields.vue';
</script>
# InputMenu

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/input-menu"
  reka-ui="https://reka-ui.com/docs/components/combobox"
  reka-ui-title="Combobox"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/InputMenu.vue"
  demo="/components/input-menu"
>
  An input field with live autocomplete suggestions.
</Description>

## Usage

Use the `v-model` directive to control the value of the InputMenu or the `default-value` prop to set the initial value when you do not need to control its state.

::: tip
Use this over an [`Input`](/docs/components/input/) to take advantage of Reka UI's [`Combobox`](https://reka-ui.com/docs/components/combobox) component that offers autocomplete capabilities.
:::

::: info
This component is similar to the [`SelectMenu`](/docs/components/select-menu/) but it's using an Input instead of a Select.
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
- `color?: "default" | "danger" | "success" | "warning" | "primary" | "secondary" | "collab" | "ai"`{lang="ts"}
- [`type?: "label" | "separator" | "item"`{lang="ts"}](#with-items-type)
- [`icon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts"}](#with-icons-in-items)
- [`avatar?: AvatarProps`{lang="ts"}](#with-avatar-in-items)
- [`chip?: ChipProps`{lang="ts"}](#with-chip-in-items)
- `disabled?: boolean`{lang="ts"}
- `onSelect?(e: Event): void`{lang="ts"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { tagsItem?: ClassNameValue, tagsItemText?: ClassNameValue, tagsItemDelete?: ClassNameValue, tagsItemDeleteIcon?: ClassNameValue, label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{lang="ts-type"}

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrayExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/Array.vue{4-17,19,25 vue:line-numbers}
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

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ValueKeyExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/ValueKey.vue{7,11,15,18,24 vue:line-numbers}
:::

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

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <DeleteIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/DeleteIcon.vue{3,15 vue:line-numbers}
:::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <PlaceholderExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/Placeholder.vue{33 vue:line-numbers}
:::

### Content

Use the `content` prop to control how the InputMenu content is rendered, like its `align` or `side` for example.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ContentExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/Content.vue{45 vue:line-numbers}
:::


### Arrow

Use the `arrow` prop to display an arrow on the InputMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrowExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/Arrow.vue{25 vue:line-numbers}
:::

### Color

Use the `color` prop to change the ring color when the InputMenu is focused.

::: info
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/Color.vue{34-35 vue:line-numbers}
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
<<< @/examples/inputmenu/demo/Tag.vue{34-35 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the InputMenu.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/Size.vue{32 vue:line-numbers}
:::

### Icon

Use the `icon` prop to show an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) inside the InputMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/Icon.vue{26 vue:line-numbers}
:::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html). Defaults to `ChevronDownIcon`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <TrailingIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/TrailingIcon.vue{26 vue:line-numbers}
:::

### Selected Icon

Use the `selected-icon` prop to customize the icon [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) when an item is selected. Defaults to `CheckIcon`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SelectedIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/SelectedIcon.vue{26 vue:line-numbers}
:::

### Avatar

Use the `avatar` prop to show an [Avatar](/docs/components/avatar/) inside the InputMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <AvatarExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/Avatar.vue{26,32 vue:line-numbers}
:::

### Loading

Use the `loading` prop to show a loading icon on the InputMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <LoadingExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/Loading.vue{33 vue:line-numbers}
:::

### Disabled

Use the `disabled` prop to disable the InputMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/Disabled.vue{33 vue:line-numbers}
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
<<< @/examples/inputmenu/demo/WithItemsType.vue{7,15,22 vue:line-numbers}
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
<<< @/examples/inputmenu/demo/WithIconsInItems.vue{11,16,21,22 vue:line-numbers}
:::

### With avatar in items

You can use the `avatar` property to display an [Avatar](/docs/components/avatar/) inside the items.

::: tip
You can also use the `#leading` slot to display the selected avatar.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithAvatarInItemsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/WithAvatarInItems.vue{8-11,16-19,29 vue:line-numbers}
:::

### With chip in items

You can use the `chip` property to display a [Chip](/docs/components/chip/) inside the items.

::: info
In this example, the `#leading` slot is used to display the selected chip.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithChipInItemsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/WithChipInItems.vue{8-10,15-17,29-38 vue:line-numbers}
:::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::: info
In this example, leveraging [`defineShortcuts`](/docs/composables/define-shortcuts), you can toggle the InputMenu by pressing `O`.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ControlOpenStateExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/ControlOpenState.vue{20,22-24,30 vue:line-numbers}
:::

### Control open state on focus

You can use the `open-on-focus` or `open-on-click` props to open the menu when the input is focused or clicked.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ControlOpenStateOnFocusExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/ControlOpenStateOnFocus.vue{26 vue:line-numbers}
:::

### Control search term

Use the `v-model:search-term` directive to control the search term.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ControlSearchTermExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/ControlSearchTerm.vue{20,26 vue:line-numbers}
:::

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the InputMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithRotatingIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/WithRotatingIcon.vue{25-27 vue:line-numbers}
:::

### With create item

Use the `create-item` prop to enable users to add custom values that aren't in the predefined options.

::: info
The create option shows when no match is found by default. Set it to `always` to show it even when similar values exist.
:::

::: tip
Use the [`@create`](#emits) event to handle the creation of the item. You will receive the event and the item as arguments.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithCreateItemExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/WithCreateItem.vue{11-15,21,24 vue:line-numbers}
:::

### With fetched items

You can fetch items from an API and use them in the InputMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithFetchedItemsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/WithFetchedItems.vue{vue:line-numbers}
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
<<< @/examples/inputmenu/demo/WithIgnoreFilter.vue{3,7-8,11,25,28 vue:line-numbers}
:::

### With filter fields

Use the `filter-fields` prop with an array of fields to filter on. Defaults to `[labelKey]`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithFilterFieldsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/inputmenu/demo/WithFilterFields.vue{9,22 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="InputMenu" />

### Slots

<ComponentSlots component="InputMenu" />

### Emits

```ts
/**
 * Emitted events for the InputMenu component
 */
interface InputMenuEmits {
  blur: (payload: [event: FocusEvent]) => void;
  change: (payload: [event: Event]) => void;
  focus: (payload: [event: FocusEvent]) => void;
  update:open: (payload: [value: boolean]) => void;
  create: (payload: [item: string]) => void;
  highlight: (payload: [payload: { ref: HTMLElement; value: any; } | undefined]) => void;
  remove-tag: (payload: [item: any]) => void;
  update:modelValue: (payload: [value: any]) => void;
  update:searchTerm: (payload: [value: string]) => void;
}
```

### Expose

When accessing the component via a template ref, you can use the following:

| Name                  | Type                                                           |
|-----------------------|----------------------------------------------------------------|
| `inputRef`{lang="ts"} | `Ref<InstanceType<typeof ComboboxTrigger> \| null>`{lang="ts"} |
