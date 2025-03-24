---
title: NavigationMenu
description: A link list that can be arranged in horizontal or vertical orientation.
outline: deep
---
<script setup>
import NavigationMenuExample from '/examples/navigationmenu/NavigationMenu.vue';
import OrientationExample from '/examples/navigationmenu/Orientation.vue';
import HighlightExample from '/examples/navigationmenu/Highlight.vue';
import ColorExample from '/examples/navigationmenu/Color.vue';
import VariantExample from '/examples/navigationmenu/Variant.vue';
import TrailingIconExample from '/examples/navigationmenu/TrailingIcon.vue';
import UnmountExample from '/examples/navigationmenu/Unmount.vue';
import WithCustomSlotExample from '/examples/navigationmenu/WithCustomSlot.vue';
</script>
# NavigationMenu

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/navigation-menu"
  reka-ui="https://reka-ui.com/docs/components/navigation-menu"
  reka-ui-title="NavigationMenu"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/NavigationMenu.vue"
  demo="/components/navigation-menu"
>
  A link list that can be arranged in horizontal or vertical orientation.
</Description>

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

## Usage

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{lang="ts"}
- `icon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts"}
- `avatar?: AvatarProps`{lang="ts"}
- `badge?: string | number | BadgeProps`{lang="ts"}
- `trailingIcon?: string`{lang="ts"}
- `type?: 'label' | 'link'`{lang="ts"}
- `value?: string`{lang="ts"}
- `disabled?: boolean`{lang="ts"}
- `class?: any`{lang="ts"}
- [`slot?: string`{lang="ts"}](#with-custom-slot)
- `onSelect?(e: Event): void`{lang="ts"}

You can pass any property from the [Link](/components/link#props) component such as `to`, `target`, etc.

<div class="lg:min-h-[340px]">
  <ClientOnly>
    <NavigationMenuExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/navigationmenu/demo/NavigationMenu.vue{vue:line-numbers}
:::

::: info
You can also pass an array of arrays to the `items` prop to display groups of items.
:::

::: tip
Each item can take a `children` array of objects with the following properties to create submenus:

- `label: string`
- `description?: string`
- `icon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts"}
- `class?: any`
- `onSelect?(e: Event): void`

:::

### Orientation

Use the `orientation` prop to change the orientation of the NavigationMenu.

::: info
When orientation is `vertical`, a [Collapsible](/components/collapsible) component is used to display children. You can control the open state of each item using the `open` and `defaultOpen` properties.
:::

::: info
Groups will be spaced when orientation is `horizontal` and separated when orientation is `vertical`.
:::

::: info
For the last menu item, you should use the `viewportRtl` port for proper positioning.
:::

<div class="lg:min-h-[340px]">
  <ClientOnly>
    <OrientationExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/navigationmenu/demo/Orientation.vue{vue:line-numbers}
:::

### Highlight

Use the `highlight` prop to display a highlighted border for the active item.

Use the `highlight-color` prop to change the color of the border. It defaults to the `color` prop.

::: info
In this example, the `border-b` class is applied to display a border in `horizontal` orientation, this is not done by default to let you have a clean slate to work with.
:::

::: danger
In `vertical` orientation, the `highlight` prop only highlights the border of active children.
:::

<div class="lg:min-h-[340px]">
  <ClientOnly>
    <HighlightExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/navigationmenu/demo/Highlight.vue{vue:line-numbers}
:::

### Color

Use the `color` prop to change the color of the NavigationMenu.

<div class="lg:min-h-[340px]">
  <ClientOnly>
    <ColorExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/navigationmenu/demo/Color.vue{vue:line-numbers}
:::

### Variant

Use the `variant` parameter to change the variant of the NavigationMenu.

<div class="lg:min-h-[340px]">
  <ClientOnly>
    <VariantExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/navigationmenu/demo/Variant.vue{vue:line-numbers}
:::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) of each item. Defaults to `chevron-down`. This icon is only displayed when an item has children.

::: tip
You can also set an icon for a specific item by using the `trailingIcon` property in the item object.
:::

<div class="lg:min-h-[340px]">
  <ClientOnly>
    <TrailingIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/navigationmenu/demo/TrailingIcon.vue{vue:line-numbers}
:::

### Unmount

Use the `unmount-on-hide` prop to control the content unmounting behavior. Defaults to `true`.

::: info
You can inspect the DOM to see each item's content being rendered.
:::

<div class="lg:min-h-[340px]">
  <ClientOnly>
    <UnmountExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/navigationmenu/demo/Unmount.vue{vue:line-numbers}
:::

## Examples

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

```
#{{ item.slot }}
#{{ item.slot }}-leading
#{{ item.slot }}-label
#{{ item.slot }}-trailing
#{{ item.slot }}-content
```

<div class="lg:min-h-[340px]">
  <ClientOnly>
    <WithCustomSlotExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/navigationmenu/demo/WithCustomSlot.vue{vue:line-numbers}
:::

::: tip
You can also use the `#item`, `#item-leading`, `#item-label`, `#item-trailing` and `#item-content` [slots](#slots) to customize all items.
:::

## API

### Props

<ComponentProps component="NavigationMenu" />

### Slots

<ComponentSlots component="NavigationMenu" />

### Emits

<ComponentEmits component="NavigationMenu" />
