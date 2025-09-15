---
title: TableWrapper
description: Wrapper for displaying a html table
category: data
---
<script setup>
import TableWrapperExample from '/examples/tablewrapper/TableWrapper.vue';
import BorderBackgroundExample from '/examples/tablewrapper/BorderBackground.vue';
import HighlightsRowExample from '/examples/tablewrapper/HighlightsRow.vue';
import HighlightsRowHoverExample from '/examples/tablewrapper/HighlightsRowHover.vue';
import ZebraExample from '/examples/tablewrapper/Zebra.vue';
import PinnedRowsExample from '/examples/tablewrapper/PinnedRows.vue';
import PinnedRowsColsExample from '/examples/tablewrapper/PinnedRowsCols.vue';
import SizeExample from '/examples/tablewrapper/Size.vue';
</script>

::warning
We are still updating this page. Some data may be missing here — we will complete it shortly.
::

<Description
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/TableWrapper.vue"
  demo="/components/table-wrapper"
>
  Wrapper for displaying a html table
</Description>

## Usage

TableWrapper is a wrapper for an HTML table that allows flexible control over its appearance.

You are free to style the table as you wish.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <TableWrapperExample light />
  </ClientOnly>
</div>

::: details
<<< @/examples/tablewrapper/demo/TableWrapper.vue{2-4,63 vue:line-numbers}
:::

### Size

By using the `size` property, you can adjust the size of the table.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <SizeExample light />
  </ClientOnly>
</div>

::: details
<<< @/examples/tablewrapper/demo/Size.vue{14 vue:line-numbers}
:::

### Border and background

The background is set separately using the `class`. For example, for a white background: `class="bg-white dark:bg-base-900"`.

To display the table border, use the `bordered` property.

To round the corners, use the `rounded` parameter.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <BorderBackgroundExample light />
  </ClientOnly>
</div>

::: details
<<< @/examples/tablewrapper/demo/BorderBackground.vue{3-8 vue:line-numbers}
:::

### Highlights row

To highlight table rows, use the class of the `tr` tag.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <HighlightsRowExample light />
  </ClientOnly>
</div>

::: details
<<< @/examples/tablewrapper/demo/HighlightsRow.vue{24,38 vue:line-numbers}
:::

### Highlights row on hover

To highlight a row when hovering the cursor, use something like `hover:bg-red-500` in the `tr` tag class.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <HighlightsRowHoverExample light />
  </ClientOnly>
</div>

::: details
<<< @/examples/tablewrapper/demo/HighlightsRowHover.vue{24,38 vue:line-numbers}
:::

### Zebra

If you need alternating rows, use the `zebra` property.

For automatic row highlighting on hover, use the `rowHover` property.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <ZebraExample light />
  </ClientOnly>
</div>

::: details
<<< @/examples/tablewrapper/demo/Zebra.vue{4,5 vue:line-numbers}
:::

### Pinned rows

Rows can be pinned using the `pinRows` property.

Define the pinned-row using `<thead> ... </thead>` or `<tfoot></tfoot>`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <PinnedRowsExample light />
  </ClientOnly>
</div>

::: details
<<< @/examples/tablewrapper/demo/PinnedRows.vue{5 vue:line-numbers}
:::

### Pinned rows and cols

To pin columns, use the `pinCols` property.

Define the columns using `<th>...</th>`.

<div class="lg:min-h-[160px]">
  <ClientOnly>
    <PinnedRowsColsExample light />
  </ClientOnly>
</div>

::: details
<<< @/examples/tablewrapper/demo/PinnedRowsCols.vue{5-6 vue:line-numbers}
:::

## API

### Props

<ComponentProps component="TableWrapper" />

### Slots

<ComponentSlots component="TableWrapper" />
