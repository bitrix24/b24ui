---
title: PageCardGroup
description: 'A selectable group of PageCard items. Single or multi-select with optional grouping by category.'
category: page
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/PageCardGroup.vue
  - label: Demo
    iconName: DemonstrationOnIcon
    to: https://bitrix24.github.io/b24ui/demo/components/page-card-group
---

## Usage

`PageCardGroup` renders a responsive grid of selectable [PageCard](/docs/components/page-card/) items. The selected card gets a highlighted ring and a corner badge. Items can be grouped into category sections.

::component-example
---
name: 'page-card-group-example'
class: 'p-8'
---
::

::tip
Use `PageCardGroup` for picking one option (or several) out of a small set of presented choices. For plain checkbox/radio lists prefer [CheckboxGroup](/docs/components/checkbox-group/) or [RadioGroup](/docs/components/radio-group/).
::

### Items

Pass an array of objects via the `items` prop. Each item supports `label`, `description`, `icon`, `value`, `disabled` and an optional `category` for grouping. Customize the field names with `value-key`, `label-key`, `description-key`, `icon-key`, `category-key`.

### Multiple

Set the `multiple` prop to switch to multi-select mode. The `v-model` binds to an array of values.

```vue
<B24PageCardGroup v-model="picks" :items="items" multiple />
```

### Columns

Use the `columns` prop (`'1'`, `'2'`, `'3'`, `'4'`) to set the maximum number of columns on desktop. The grid is always responsive — 1 column on mobile, 2 on tablet, then up to `columns` on `lg+`.

### Size

Use the `size` prop (`'sm'`, `'md'`, `'lg'`) to scale the icon circle, the inner icon, the inner gap, and the title/description font sizes. Defaults to `'md'`. The corner badge size is derived from `size` unless `badge-size` is set explicitly.

### Variant

The `variant` prop is forwarded to each inner [PageCard](/docs/components/page-card/) and controls its base style. See PageCard variants for the full list.

### Color

The `color` prop is the umbrella accent — it drives both the highlighted border on the selected card and the corner badge color. Defaults to `air-primary-success`.

```vue
<B24PageCardGroup v-model="value" :items="items" color="air-primary" />
```

### Highlight color

Override the umbrella `color` for the card border only with `highlight-color`. Falls back to `color` when not set.

### Badge color

Override the umbrella `color` for the corner [Badge](/docs/components/badge/) only with `badge-color`. Falls back to `color` when not set.

### Badge size

Override the badge size derived from `size` with `badge-size`.

### Icon vs Avatar

Each item picks one of two leading visuals:

- `icon` field — plain icon, no circle. Theme controls size via `leadingIcon`. Use this for compact, non-decorated lists.
- `avatar` field — [B24Avatar](/docs/components/avatar/) with full color control (`color`, `src`, `chip`, `icon`). Avatar size is derived from the group `size` (`sm` → `lg`, `md` → `xl`, `lg` → `2xl`) and the avatar's `alt` falls back to the item's `label`.

`icon` wins when both are set on the same item — the plain icon renders and `avatar` is ignored. Pick one per item:

```ts
// shows the icon via B24Avatar (color circle around the icon)
{ avatar: { color: 'air-primary-warning', icon: FeedbackIcon }, label: 'Feedback' }

// shows the plain icon only — `icon` at the top level takes precedence
{ icon: FeedbackIcon, avatar: { color: 'air-primary-warning' }, label: 'Feedback' }
```

Set a group-level Avatar default that every avatar-mode item inherits:

```vue
<B24PageCardGroup v-model="value" :items="items" :avatar="{ color: 'air-secondary' }" />
```

Per-item `avatar` config merges on top of the group default:

:component-example{name="page-card-group-avatar-example"}

The `avatar` field accepts the full [B24Avatar](/docs/components/avatar/) API — same hook drives `src` (photo), `chip`, or a different `icon` per item.

### Category grouping

When items contain a `category` field (or another field set via `category-key`), the group renders one section per category with a heading above each grid. Pass `category-key=""` to disable grouping.

## Prompt

::prompt
---
description: Render a payment-methods picker on the settings page.
actions:
  - copy
  - cursor
  - windsurf
class: 'w-full my-0'
---
On a settings page, render the list of payment methods as a grid of cards. Each card carries an icon and a short description. The user can enable several methods at once.

Requirements:
- Use `B24PageCardGroup` with `multiple` and bind `v-model` to a `ref<string[]>`
- Each item exposes `value`, `label`, `description` and `icon` (an icon component imported from `@bitrix24/b24icons-vue`)
- Keep the umbrella accent in sync — set `color` on the group instead of `highlight-color` / `badge-color` separately
- Wrap the group in `B24FormField` with a label so it integrates with the surrounding settings form
- Pick a sensible `size` (`md` by default) and `columns` (`2` or `3`) for the layout
::

## Examples

### Click / change handler

Listen to the `change` event to react to user selections. The event fires after `v-model` updates and receives the native `change` event.

```vue
<script setup lang="ts">
const value = ref('callback')
function onChange(event: Event) {
  console.log('selected', value.value, event)
}
</script>

<template>
  <B24PageCardGroup v-model="value" :items="items" @change="onChange" />
</template>
```

### Disable an item

Set `disabled: true` on an individual item to lock it out without removing it from the grid.

```ts
const items = [
  { value: 'callback', label: 'Callback', icon: PhoneIcon },
  { value: 'pay', label: 'Payment', icon: CardIcon, disabled: true }
]
```

### Custom badge

Override the corner badge through the `badge` slot. Receives `{ item, selected }`.

```vue
<B24PageCardGroup v-model="value" :items="items">
  <template #badge="{ selected }">
    <B24Badge v-if="selected" label="Picked" color="air-primary-success" size="sm" />
  </template>
</B24PageCardGroup>
```

### Custom leading icon

The leading slot is an escape hatch for cases where the built-in [B24Avatar](/docs/components/avatar/) (driven by the `avatar` prop / item `avatar` field) isn't flexible enough. Override the icon circle through the `leading` slot — receives `{ item, selected }`.

```vue
<B24PageCardGroup v-model="value" :items="items">
  <template #leading="{ item, selected }">
    <B24Avatar
      :alt="item.label"
      :icon="item.icon"
      :color="selected ? 'air-primary' : 'air-secondary-no-accent'"
    />
  </template>
</B24PageCardGroup>
```

### Custom category label

Override category headings through the `categoryLabel` slot. Receives `{ category, items }`.

```vue
<B24PageCardGroup v-model="value" :items="items">
  <template #categoryLabel="{ category, items }">
    <h3 class="text-(length:--ui-font-size-lg) font-(--ui-font-weight-semi-bold)">
      {{ category }} <span class="text-(--ui-color-design-outline-content-secondary)">({{ items.length }})</span>
    </h3>
  </template>
</B24PageCardGroup>
```

## API

### Props

:component-props

### Slots

:component-slots

## Theme

:component-theme
