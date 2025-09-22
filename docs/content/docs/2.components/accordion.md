---
title: Accordion
description: This is a stacked set of collapsible panels
category: data
---
<script setup>
import AccordionExample from '/examples/accordion/Accordion.vue';
import MultipleExample from '/examples/accordion/Multiple.vue';
import CollapsibleExample from '/examples/accordion/Collapsible.vue';
import UnmountExample from '/examples/accordion/Unmount.vue';
import DisabledExample from '/examples/accordion/Disabled.vue';
import TrailingIconExample from '/examples/accordion/TrailingIcon.vue';
import ControlActiveItemExample from '/examples/accordion/ControlActiveItem.vue';
import WithDragAndDropExample from '/examples/accordion/WithDragAndDrop.vue';
import WithBodySlotExample from '/examples/accordion/WithBodySlot.vue';
import WithContentSlotExample from '/examples/accordion/WithContentSlot.vue';
import WithCustomSlotExample from '/examples/accordion/WithCustomSlot.vue';
</script>
# Accordion

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

<Description
  nuxt-ui="https://ui3.nuxt.dev/components/accordion"
  reka-ui="https://reka-ui.com/docs/components/accordion"
  reka-ui-title="Accordion"
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Accordion.vue"
  demo="/components/accordion"
>
This is a stacked set of collapsible panels.
</Description>

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

<<< @/examples/accordion/demo/Accordion.vue{28 vue:line-numbers}

### Multiple

Set the `type` prop to `multiple` to allow multiple items to be active at the same time. Defaults to `single`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <MultipleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/accordion/demo/Multiple.vue{30 vue:line-numbers}
:::

### Collapsible

When `type` is `single`, you can set the `collapsible` prop to `false` to prevent the active item from collapsing.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <CollapsibleExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/accordion/demo/Collapsible.vue{30 vue:line-numbers}
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
<<< @/examples/accordion/demo/Unmount.vue{38 vue:line-numbers}
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
<<< @/examples/accordion/demo/Disabled.vue{26,39 vue:line-numbers}
:::

### Trailing Icon

Use the `trailing-icon` prop to customize the trailing [Icon](https://bitrix24.github.io/b24icons/guide/icons.html) of each item. Defaults to `Actions::ChevronDownIcon`.

::: info
You can also set an icon for a specific item by using the `trailingIcon` property in the item object.
:::

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <TrailingIconExample />
  </ClientOnly>
</div>

::: details
<<< @/examples/accordion/demo/TrailingIcon.vue{19 vue:line-numbers}
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

<div class="lg:min-h-[260px]">
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

```ts
#{{ item.slot }}
#{{ item.slot }}-body
```

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

```ts
/**
 * Emitted events for the Accordion component
 */
interface AccordionEmits {
  update:modelValue: (payload: [value: string | string[] | undefined]) => void;
}
```
