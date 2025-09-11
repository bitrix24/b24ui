---
title: DropdownMenu
description: A contextual menu for actions triggered by clicking an element.
category: overlay
---
<script setup>
import DropdownMenuExample from '/examples/dropdownmenu/DropdownMenu.vue';
import ContentExample from '/examples/dropdownmenu/Content.vue';
import ArrowExample from '/examples/dropdownmenu/Arrow.vue';
import DisabledExample from '/examples/dropdownmenu/Disabled.vue';
import WithCheckboxItemsExample from '/examples/dropdownmenu/WithCheckboxItems.vue';
import WithColorItemsExample from '/examples/dropdownmenu/WithColorItems.vue';
import ControlOpenStateExample from '/examples/dropdownmenu/ControlOpenState.vue';
import WithCustomSlotExample from '/examples/dropdownmenu/WithCustomSlot.vue';
</script>
# DropdownMenu

<Description
nuxt-ui="https://ui3.nuxt.dev/components/dropdown-menu"
reka-ui="https://reka-ui.com/docs/components/dropdown-menu"
reka-ui-title="DropdownMenu"
git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/DropdownMenu.vue"
demo="/components/dropdown-menu"
>
A contextual menu for actions triggered by clicking an element.
</Description>

## Usage

Use a [Button](/components/button) or any other component in the default slot of the DropdownMenu.

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{lang="ts"}
- `icon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts"}
- `avatar?: AvatarProps`{lang="ts"}
- `kbds?: string[] | KbdProps[]`{lang="ts"}
- [`type?: "link" | "label" | "separator" | "checkbox"`{lang="ts"}](#with-checkbox-items)
- [`color?: "air-primary" | "air-primary-success" | "air-primary-alert" | "air-primary-copilot" | "air-primary-warning" `{lang="ts"}](#with-color-items)
- [`checked?: boolean`{lang="ts"}](#with-checkbox-items)
- `disabled?: boolean`{lang="ts-"}
- [`slot?: string`{lang="ts"}](#with-custom-slot)
- `onSelect?(e: Event): void`{lang="ts"}
- [`onUpdateChecked?(checked: boolean): void`{lang="ts"}](#with-checkbox-items)
- `children?: DropdownMenuItem[] | DropdownMenuItem[][]`{lang="ts-type"}
- `class?: any`{lang="ts-type"}
- `b24ui?: { item?: ClassNameValue, label?: ClassNameValue, separator?: ClassNameValue, itemLeadingIcon?: ClassNameValue, itemLeadingAvatarSize?: ClassNameValue, itemLeadingAvatar?: ClassNameValue, itemLabel?: ClassNameValue, itemLabelExternalIcon?: ClassNameValue, itemTrailing?: ClassNameValue, itemTrailingIcon?: ClassNameValue, itemTrailingKbds?: ClassNameValue, itemTrailingKbdsSize?: ClassNameValue }`{lang="ts-type"}

You can pass any property from the [Link](/components/link#props) component such as `to`, `target`, etc.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <DropdownMenuExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/dropdownmenu/demo/DropdownMenu.vue{vue:line-numbers}
:::

::: details dropdownMenuItems
<<< @/examples/dropdownmenu/dictionary.ts#snippetItems{ts:line-numbers}
:::

::: info
You can also pass an array of arrays to the `items` prop to create separated groups of items.

::: details
<<< @/examples/dropdownmenu/dictionary.ts{ts:line-numbers}
:::

::: details dropdownMenuSimpleItems
<<< @/examples/dropdownmenu/dictionary.ts#snippetSimpleItems{ts:line-numbers}
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
<<< @/examples/dropdownmenu/demo/Content.vue{31 vue:line-numbers}
:::

### Arrow

Use the `arrow` prop to display an arrow on the DropdownMenu.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ArrowExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/dropdownmenu/demo/Arrow.vue{30 vue:line-numbers}
:::

### Size

`@remove`

### Disabled

Use the `disabled` prop to disable the DropdownMenu.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/dropdownmenu/demo/Disabled.vue{vue:line-numbers}
:::

## Examples

### With checkbox items

You can use the `type` property with `checkbox` and use the `checked` / `onUpdateChecked` properties to control the checked state of the item.

::: info
To ensure reactivity for the `checked` state of items, it's recommended to wrap your `items` array inside a `computed`.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithCheckboxItemsExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/dropdownmenu/demo/WithCheckboxItems.vue{24,25-27,28-30,36,37-39 vue:line-numbers}
:::

::: details showCopy, showEdit, dropdownMenuSimpleItemsCheckbox
<<< @/examples/dropdownmenu/dictionary.ts#snippetCheckbox{ts:line-numbers}
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

::: details dropdownMenuSimpleItems
<<< @/examples/dropdownmenu/dictionary.ts#snippetSimpleItems{20 ts:line-numbers}
:::

### Control open state

You can control the open state by using the `default-open` prop or the `v-model:open` directive.

::: info
In this example, leveraging [`defineShortcuts`](composables/define-shortcuts), you can toggle the DropdownMenu by pressing `O`.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ControlOpenStateExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/dropdownmenu/demo/ControlOpenState.vue{27,29-31,36 vue:line-numbers}
:::

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

```ts
#{{ item.slot }}
#{{ item.slot }}-leading
#{{ item.slot }}-label
#{{ item.slot }}-trailing
```

::: tip
You can also use the `#item`, `#item-leading`, `#item-label` and `#item-trailing` [slots](#slots) to customize all items.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithCustomSlotExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/dropdownmenu/demo/WithCustomSlot.vue{36-38 vue:line-numbers}
:::

::: details dropdownMenuSimpleItems
<<< @/examples/dropdownmenu/dictionary.ts#snippetSimpleItems{5 ts:line-numbers}
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
On **macOS** in this example, `⌘` `E`, `⌘` `I` and `⌘` `N`  would trigger the `select` function of the corresponding item.

On **Windows** in this example, `Ctrl` `E`, `Ctrl` `I` and `Ctrl` `N` would trigger the `select` function of the corresponding item.
:::

## API

### Props

<ComponentProps component="DropdownMenu" />

### Slots

<ComponentSlots component="DropdownMenu" />

### Emits

<ComponentEmits component="DropdownMenu" />

## Theme

<ComponentTheme component="DropdownMenu" />
