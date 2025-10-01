---
title: TableWrapper
description: Wrapper for displaying a html table
category: data
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/TableWrapper.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/table-wrapper
---

## Usage

TableWrapper is a wrapper for an HTML table that allows flexible control over its appearance.

You are free to style the table as you wish.

::component-example
---
collapse: true
name: 'table-wrapper-example'
---
::

### Size

By using the `size` property, you can adjust the size of the table.

::component-example
---
collapse: true
name: 'table-wrapper-size-example'
---
::

### Border and background

To display the table border, use the `bordered` property.

The background is set separately using the `class`. For example, for a white background: `class="bg-white"`.

Or you can use the [Card](/docs/components/card/) component to set the background.

::component-example
---
collapse: true
name: 'table-wrapper-border-background-example'
---
::

### Rounded

To round the corners, use the `rounded` parameter.

::component-example
---
collapse: true
name: 'table-wrapper-rounded-example'
---
::

### Zebra

If you need alternating rows, use the `zebra` property.

To highlight table rows, use the class of the `tr` tag.

To highlight a row when hovering the cursor, use something like `hover:bg-red-500` in the `tr` tag class.

::component-example
---
collapse: true
name: 'table-wrapper-zebra-example'
---
::

### Row hover

For automatic row highlighting on hover, use the `rowHover` property.

::component-example
---
collapse: true
name: 'table-wrapper-hover-example'
---
::

### Pinned rows

Rows can be pinned using the `pinRows` property.

Define the pinned-row using `<thead>...</thead>` or `<tfoot>...</tfoot>`.

::component-example
---
collapse: true
name: 'table-wrapper-pin-rows-example'
---
::

### Pinned columns

To pin columns, use the `pinCols` property.

Define the columns using `<th>...</th>`.

::component-example
---
collapse: true
name: 'table-wrapper-pin-cols-example'
---
::

## API

### Props

:component-props

## Theme

:component-theme
