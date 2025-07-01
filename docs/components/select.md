---
title: Select
description: A selection field to pick from various options.
outline: deep
---
<script setup>
import SelectExample from '/examples/select/Select.vue';
import ArrayExample from '/examples/select/Array.vue';
import ArrayGroupExample from '/examples/select/ArrayGroup.vue';
import ArrayKeyExample from '/examples/select/ArrayKey.vue';
import MultipleExample from '/examples/select/Multiple.vue';
import PlaceholderExample from '/examples/select/Placeholder.vue';
import ContentExample from '/examples/select/Content.vue';
import ArrowExample from '/examples/select/Arrow.vue';
import ColorExample from '/examples/select/Color.vue';
import TagExample from '/examples/select/Tag.vue';
import SizeExample from '/examples/select/Size.vue';
import IconExample from '/examples/select/Icon.vue';
import TrailingIconExample from '/examples/select/TrailingIcon.vue';
import SelectedIconExample from '/examples/select/SelectedIcon.vue';
import AvatarExample from '/examples/select/Avatar.vue';
import LoadingExample from '/examples/select/Loading.vue';
import DisabledExample from '/examples/select/Disabled.vue';
import WithItemsTypeExample from '/examples/select/WithItemsType.vue';
import WithItemsIconsExample from '/examples/select/WithItemsIcons.vue';
import WithItemsAvatarExample from '/examples/select/WithItemsAvatar.vue';
import WithItemsChipExample from '/examples/select/WithItemsChip.vue';
import WithControlOpenStateExample from '/examples/select/WithControlOpenState.vue';
import WithRotatingIconExample from '/examples/select/WithRotatingIcon.vue';
import WithFetchedItemsExample from '/examples/select/WithFetchedItems.vue';
</script>
# Select

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/select"
  reka-ui="https://reka-ui.com/docs/components/select"
  reka-ui-title="Select"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Select.vue"
>
  A selection field to pick from various options.
</Description>

## Usage

Use the `v-model` directive to control the value of the Select or the `default-value` prop to set the initial value when you do not need to control its state.

### Items

Use the `items` prop as an array of strings, numbers or booleans:

::: info
If you need to limit the height of a dropdown list, you can use custom style parameters.

For example, to set the maximum height of the list to 60 units, add the parameter :b24ui="{ content: 'max-h-60' }".

This will help control the content display and improve the user experience.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SelectExample />
  </ClientOnly>
</div>

<<< @/examples/select/demo/Select.vue{4,5,10,11 vue:line-numbers}

You can also pass an array of objects with the following properties:

- `label?: string`{lang="ts"}
- [`value?: string`{lang="ts"}](#value-key)
- [`type?: "label" | "separator" | "item"`{lang="ts"}](#with-items-type)
- [`icon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts"}](#with-icons-in-items)
- [`avatar?: AvatarProps`{lang="ts"}](#with-avatar-in-items)
- `color?: "default" | "danger" | "success" | "warning" | "primary" | "secondary" | "collab" | "ai"`{lang="ts"}
- [`chip?: ChipProps`{lang="ts"}](#with-chip-in-items)
- `disabled?: boolean`{lang="ts"}
- `class?: any`{lang="ts"}
- `b24ui?: { label?: ClassNameValue, separator?: ClassNameValue, item?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLeadingChipSize?: ClassNameValue, itemLeadingChip?: ClassNameValue, itemLabel?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue }`{lang="ts"}

::: danger
When using objects, you need to reference the `value` property of the object in the `v-model` directive or the `default-value` prop.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrayExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/Array.vue{4-17,19,24-25 vue:line-numbers}
:::

You can also pass an array of arrays to the `items` prop to display separated groups of items.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrayGroupExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/ArrayGroup.vue{4-7,14 vue:line-numbers}
:::

### Value Key

You can change the property that is used to set the value by using the `value-key` prop. Defaults to `value`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrayKeyExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/ArrayKey.vue{7,11,15,24 vue:line-numbers}
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
<<< @/examples/select/demo/Multiple.vue{5,11 vue:line-numbers}
:::

### Placeholder

Use the `placeholder` prop to set a placeholder text.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <PlaceholderExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/Placeholder.vue{20 vue:line-numbers}
:::

### Content

Use the `content` prop to control how the Select content is rendered, like its `align` or `side` for example.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ContentExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/Content.vue{32 vue:line-numbers}
:::

### Arrow

Use the `arrow` prop to display an arrow on the Select.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrowExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/Arrow.vue{11 vue:line-numbers}
:::

### Color

Use the `color` prop to change the ring color when the Select is focused.

::: info
The `highlight` prop is used here to show the focus state. It's used internally when a validation error occurs.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/Color.vue{21,22 vue:line-numbers}
:::

### Tag

Use the `tag` property to display a small legend on top of the Select.

Use the `tagColor` property to set the color for `tag`.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <TagExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/Tag.vue{37,38 vue:line-numbers}
:::

### Size

Use the `size` prop to change the size of the Select.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <SizeExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/Size.vue{19 vue:line-numbers}
:::

### Icon

Use the `icon` prop to show an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) inside the Select.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <IconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/Icon.vue{3,13 vue:line-numbers}
:::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html). Defaults to `Actions::ChevronDownIcon`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <TrailingIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/TrailingIcon.vue{3,13 vue:line-numbers}
:::

### Selected Icon

Use the `selected-icon` prop to customize the icon when an item is selected. Defaults to `Main::CheckIcon`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SelectedIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/SelectedIcon.vue{3,13 vue:line-numbers}
:::

### Avatar

Use the `avatar` prop to show an [Avatar](/components/avatar) inside the Select.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <AvatarExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/Avatar.vue{3,13,18 vue:line-numbers}
:::

### Loading

Use the `loading` prop to show a loading icon on the Select.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <LoadingExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/Loading.vue{20 vue:line-numbers}
:::

### Disabled

Use the `disabled` prop to disable the Select.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/Disabled.vue{20 vue:line-numbers}
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
<<< @/examples/select/demo/WithItemsType.vue{5-8,12-14,15-18 vue:line-numbers}
:::

### With icon in items

You can use the `icon` property to display an [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) inside the items.

::: info
In this example, the icon is computed from the `value` property of the selected item.
:::

::: tip
You can also use the `#leading` slot to display the selected icon.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithItemsIconsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/WithItemsIcons.vue{11,16-17,21,25,33 vue:line-numbers}
:::

### With avatar in items

You can use the `avatar` property to display an [Avatar](/components/avatar) inside the items.

::: info
In this example, the avatar is computed from the `value` property of the selected item.
:::

::: tip
You can also use the `#leading` slot to display the selected avatar.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithItemsAvatarExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/WithItemsAvatar.vue{9-12,17-20,25,32 vue:line-numbers}
:::


### With chip in items

You can use the `chip` property to display a [Chip](/components/chip) inside the items.

::: info
In this example, the `#leading` slot is used to display the selected chip.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithItemsChipExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/WithItemsChip.vue{8-10,15-17,20,22-24,33-42 vue:line-numbers}
:::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::: info
In this example, leveraging [`defineShortcuts`](composables/define-shortcuts), you can toggle the Select by pressing `O`.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithControlOpenStateExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/WithControlOpenState.vue{8-10,17 vue:line-numbers}
:::

### With rotating icon

Here is an example with a rotating icon that indicates the open state of the Select.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithRotatingIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/WithRotatingIcon.vue{14-16 vue:line-numbers}
:::

### With fetched items

You can fetch items from an API and use them in the Select.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithFetchedItemsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/select/demo/WithFetchedItems.vue{vue:line-numbers}
:::

## API

### Props

<ComponentProps component="Select" />

### Slots

<ComponentSlots component="Select" />

### Emits

<ComponentEmits component="Select" />

### Expose

When accessing the component via a template ref, you can use the following:

| Name                    | Type                                                         |
|-------------------------|--------------------------------------------------------------|
| `triggerRef`{lang="ts"} | `Ref<InstanceType<typeof SelectTrigger> \| null>`{lang="ts"} |
