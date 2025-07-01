---
title: Accordion
description: This is a stacked set of collapsible panels
outline: deep
---
<script setup>
import AccordionExample from '/examples/advice/Accordion.vue';
import MultipleExample from '/examples/advice/Multiple.vue';
import CollapsibleExample from '/examples/advice/Collapsible.vue';
import UnmountExample from '/examples/advice/Unmount.vue';
import DisabledExample from '/examples/advice/Disabled.vue';
import ControlActiveItemExample from '/examples/advice/ControlActiveItem.vue';
import WithDragAndDropExample from '/examples/advice/WithDragAndDrop.vue';
import WithBodySlotExample from '/examples/advice/WithBodySlot.vue';
import WithContentSlotExample from '/examples/advice/WithContentSlot.vue';
import WithCustomSlotExample from '/examples/advice/WithCustomSlot.vue';
</script>
# Accordion

<Description
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Accordion.vue"
  demo="/components/accordion"
>
This is a stacked set of collapsible panels.
</Description>

::: warning We are still updating this page
Some data may be missing here — we will complete it shortly.
:::

## Usage

### Items

Use the `items` prop as an array of objects with the following properties:

- `label?: string`{lang="ts"}
- `icon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts"}
- `trailingIcon?: FunctionalComponent<HTMLAttributes & VNodeProps>`{lang="ts"}
- `content?: string`{lang="ts"}
- `value?: string`{lang="ts"}
- `disabled?: boolean`{lang="ts"}
- [`slot?: string`{lang="ts"}](#with-custom-slot)
- `class?: any`{lang="ts"}
- `b24ui?: { item?: ClassNameValue, header?: ClassNameValue, trigger?: ClassNameValue, leadingIcon?: ClassNameValue, label?: ClassNameValue, trailingIcon?: ClassNameValue, content?: ClassNameValue, body?: ClassNameValue }`{lang="ts"}

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <AccordionExample />
  </ClientOnly>
</div>

<<< @/examples/accordion/demo/Accordion.vue{vue:line-numbers}

### Multiple

Set the `type` prop to `multiple` to allow multiple items to be active at the same time. Defaults to `single`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <MultipleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/accordion/demo/Multiple.vue{vue:line-numbers}
:::

### Collapsible

When `type` is `single`, you can set the `collapsible` prop to `false` to prevent the active item from collapsing.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CollapsibleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/accordion/demo/Collapsible.vue{vue:line-numbers}
:::

### Unmount

Use the `unmount-on-hide` prop to prevent the content from being unmounted when the accordion is collapsed. Defaults to `true`.

::: info
You can inspect the DOM to see each item's content being rendered.
:::

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <UnmountExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/accordion/demo/Unmount.vue{vue:line-numbers}
:::

### Disabled

Use the `disabled` property to disable the Accordion.

You can also disable a specific item by using the `disabled` property in the item object.

<div class="lg:min-h-[275px]">
  <ClientOnly>
    <DisabledExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/accordion/demo/Disabled.vue{vue:line-numbers}
:::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [@bitrix24/b24icons](https://bitrix24.github.io/b24icons/guide/icons.html) of each item. Defaults to `Actions::ChevronDownIcon`.

::: info
You can also set an icon for a specific item by using the `trailingIcon` property in the item object.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <TrailingIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/accordion/demo/TrailingIcon.vue{vue:line-numbers}
:::

## Examples

### Control active item(s)

You can control the active item(s) by using the `default-value` prop or the `v-model` directive with the index of the item.

::: info
You can also pass the `value` of one of the items if provided.
:::

::: warning
When `type="multiple"`, ensure to pass an array to the `default-value` prop or the `v-model` directive.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ControlActiveItemExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/accordion/demo/ControlActiveItem.vue{vue:line-numbers}
:::

### With drag and drop

Use the [`useSortable`](https://vueuse.org/integrations/useSortable/) composable from [`@vueuse/integrations`](https://vueuse.org/integrations/README.html) to enable drag and drop functionality on the Accordion. This integration wraps [Sortable.js](https://sortablejs.github.io/Sortable/) to provide a seamless drag and drop experience.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithDragAndDropExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/accordion/demo/WithDragAndDrop.vue{vue:line-numbers}
:::

### With body slot

Use the `#body` slot to customize the body of each item.

::: info
The `#body` slot includes some pre-defined styles, use the [`#content` slot](#with-content-slot) if you want to start from scratch.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithBodySlotExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/accordion/demo/WithBodySlot.vue{vue:line-numbers}
:::

### With content slot

Use the `#content` slot to customize the content of each item.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithContentSlotExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/accordion/demo/WithContentSlot.vue{vue:line-numbers}
:::

### With custom slot

Use the `slot` property to customize a specific item.

You will have access to the following slots:

- `#{{ item.slot }}`{lang="ts"}
- `#{{ item.slot }}-body`{lang="ts"}

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <WithCustomSlotExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/accordion/demo/WithCustomSlot.vue{vue:line-numbers}
:::
## API

### Props

<ComponentProps component="Accordion" />

### Slots

<ComponentSlots component="Accordion" />

### Emits

<ComponentEmits component="Accordion" />
