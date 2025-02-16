---
title: InputMenu
description: A contextual menu for actions triggered by clicking an element.
outline: deep
---
<script setup>
import DropdownMenuExample from '/examples/dropdownmenu/DropdownMenu.vue';
import ContentExample from '/examples/dropdownmenu/Content.vue';
import ArrowExample from '/examples/dropdownmenu/Arrow.vue';
import WithColorItemsExample from '/examples/dropdownmenu/WithColorItems.vue';
</script>
# DropdownMenu

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/dropdown-menu"
  reka-ui="https://reka-ui.com/docs/components/dropdown-menu"
  reka-ui-title="DropdownMenu"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DropdownMenu.vue"
>
  A contextual menu for actions triggered by clicking an element.
</Description>

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

## Usage

Use a [Button](/components/button) or any other component in the default slot of the DropdownMenu.

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{lang="ts-type"}
- `icon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts-type"}
- `color?: string`{lang="ts-type"}
- `avatar?: AvatarProps`{lang="ts-type"}
- `kbds?: string[] | KbdProps[]`{lang="ts-type"}
- [`type?: "link" | "label" | "separator" | "checkbox"`{lang="ts-type"}](#with-checkbox-items)
- [`color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"`{lang="ts-type"}](#with-color-items)
- [`checked?: boolean`{lang="ts-type"}](#with-checkbox-items)
- `disabled?: boolean`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- [`slot?: string`{lang="ts-type"}](#with-custom-slot)
- `onSelect?(e: Event): void`{lang="ts-type"}
- [`onUpdateChecked?(checked: boolean): void`{lang="ts-type"}](#with-checkbox-items)

You can pass any property from the [Link](/components/link#props) component such as `to`, `target`, etc.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <DropdownMenuExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/dropdownmenu/demo/DropdownMenu.vue{vue:line-numbers}
:::

::: info
You can also pass an array of arrays to the `items` prop to create separated groups of items.
:::

::: tip
Each item can take a `children` array of objects with the same properties as the `items` prop to create a nested menu which can be controlled using the `open`, `defaultOpen` and `content` properties.
:::

### Content

Use the `content` prop to control how the DropdownMenu content is rendered, like its `align` or `side` for example.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <ContentExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/dropdownmenu/demo/Content.vue{vue:line-numbers}
:::

### Arrow

Use the `arrow` prop to display an arrow on the DropdownMenu.

__component-code

### Size

Use the `size` prop to control the size of the DropdownMenu.

__component-code

::: warning
The `size` prop will not be proxied to the Button, you need to set it yourself.
:::

::: info
When using the same size, the DropdownMenu items will be perfectly aligned with the Button.
:::

### Disabled

Use the `disabled` prop to disable the DropdownMenu.

__component-code

## Examples

### With checkbox items

You can use the `type` property with `checkbox` and use the `checked` / `onUpdateChecked` properties to control the checked state of the item.

__component-code

::: info
To ensure reactivity for the `checked` state of items, it's recommended to wrap your `items` array inside a `computed`.
:::

### With color items

You can use the `color` property to highlight certain items with a color.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithColorItemsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/dropdownmenu/demo/WithColorItems.vue{25 vue:line-numbers}
:::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

__component-code

::: info
In this example, leveraging [`defineShortcuts`](composables/define-shortcuts), you can toggle the DropdownMenu by pressing `O`.
:::

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

```ts-type
#{{ item.slot }}
#{{ item.slot }}-leading
#{{ item.slot }}-label
#{{ item.slot }}-trailing
```

__component-code

::: tip
You can also use the `#item`, `#item-leading`, `#item-label` and `#item-trailing` [slots](#slots) to customize all items.
:::

### Extract shortcuts

When you have some items with `kbds` property (displaying some [Kbd](/components/kbd)), you can easily make them work with the [defineShortcuts](composables/define-shortcuts) composable.

Inside the `defineShortcuts` composable, there is an `extractShortcuts` utility that will extract the shortcuts recursively from the items and return an object that you can pass to `defineShortcuts`. It will automatically call the `select` function of the item when the shortcut is pressed.

```vue
<script setup lang="ts">
const items = [
  {
    label: 'Invite users',
    children: [
      {
        label: 'Invite by email',
        kbds: ['meta', 'e'],
        onSelect() {
          console.log('Invite by email clicked')
        }
      },
      {
        label: 'Invite by link',
        kbds: ['meta', 'i'],
        onSelect() { console.log('Invite by link clicked') }
      }
    ]
  },
  {
    label: 'New team',
    kbds: ['meta', 'n'],
    onSelect() { console.log('New team clicked') }
  }
]

defineShortcuts(extractShortcuts(items))
</script>
```

::: info
In this example, `⊞` `E`, `⊞` `I` and `⊞` `N` would trigger the `select` function of the corresponding item.
:::

## API

### Props

<ComponentProps component="DropdownMenu" />

### Slots

<ComponentSlots component="DropdownMenu" />

### Emits

<ComponentEmits component="DropdownMenu" />
