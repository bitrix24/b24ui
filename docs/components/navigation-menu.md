---
title: NavigationMenu
description: A link list that can be arranged in horizontal or vertical orientation.
outline: deep
---
<script setup>
import NavigationMenuExample from '/examples/navigationmenu/NavigationMenu.vue';
import OrientationExample from '/examples/navigationmenu/Orientation.vue';
import TrailingIconExample from '/examples/navigationmenu/TrailingIcon.vue';
import UnmountExample from '/examples/navigationmenu/Unmount.vue';
import WithCustomSlotExample from '/examples/navigationmenu/WithCustomSlot.vue';
</script>
# NavigationMenu

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/navigation-menu"
  reka-ui="https://reka-ui.com/docs/components/navigation-menu"
  reka-ui-title="NavigationMenu"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/NavigationMenu.vue"
  demo="/components/navigation-menu"
>
  A link list that can be arranged in horizontal or vertical orientation.
</Description>

## Usage

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{lang="ts"}
- `icon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts"}
- `avatar?: AvatarProps`{lang="ts"}
- `badge?: string | number | BadgeProps`{lang="ts"}
- `tooltip?: TooltipProps`{lang="ts-type"}
- `trailingIcon?: string`{lang="ts"}
- `type?: 'label' | 'trigger' | 'link'`{lang="ts"}
- `defaultOpen?: boolean`{lang="ts-type"}
- `open?: boolean`{lang="ts-type"}
- `value?: string`{lang="ts"}
- `disabled?: boolean`{lang="ts"}
- [`slot?: string`{lang="ts"}](#with-custom-slot)
- `onSelect?(e: Event): void`{lang="ts"}
- `class?: any`{lang="ts"}
- `b24ui?: { linkLeadingAvatarSize?: ClassNameValue, linkLeadingAvatar?: ClassNameValue, linkLeadingIcon?: ClassNameValue, linkLabel?: ClassNameValue, linkLabelExternalIcon?: ClassNameValue, linkTrailing?: ClassNameValue, linkTrailingBadgeSize?: ClassNameValue, linkTrailingBadge?: ClassNameValue, linkTrailingIcon?: ClassNameValue, label?: ClassNameValue, link?: ClassNameValue, content?: ClassNameValue, childList?: ClassNameValue, childLabel?: ClassNameValue, childItem?: ClassNameValue, childLink?: ClassNameValue, childLinkIcon?: ClassNameValue, childLinkWrapper?: ClassNameValue, childLinkLabel?: ClassNameValue, childLinkLabelExternalIcon?: ClassNameValue, childLinkDescription?: ClassNameValue }`{lang="ts"}

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
- `onSelect?(e: Event): void`
- `class?: any`

:::

### Orientation

Use the `orientation` prop to change the orientation of the NavigationMenu.

::: info
When orientation is `vertical`, a [Accordion](/components/accordion) component is used to display each group. You can control the open state of each item using the `open` and `defaultOpen` properties and change the behavior using the [`collapsible`](/components/accordion#collapsible) and [`type`](/components/accordion#multiple) props.
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

`@remove`

### Color

`@remove`

### Variant

`@remove`

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
