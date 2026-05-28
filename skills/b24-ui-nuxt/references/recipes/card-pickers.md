# Card pickers and item galleries

Patterns for the "show a set of options or destinations as a grid of icon + title + description cards" UX. The user picks one (or several) by clicking a card. Use this whenever a plain `B24RadioGroup` / `B24CheckboxGroup` would feel too dense for the choice — when each option needs explanation, an icon, or a category headline.

The component for these patterns is **`B24PageCardGroup`**.

## When to reach for this pattern

- **Picking a setting from a set of variants** — "which form template?", "which dashboard layout?", "which AI model?". One option is selected at a time, and the user needs to read what each option does before picking.
- **Multi-select feature toggles** — "which capabilities should the form collect?", "which integrations should this scenario use?". Several options can be on at once.
- **Section navigation** — a landing-page-style index of destinations: BP actions, documentation chapters, tool categories. Clicking a card navigates instead of selecting.
- **Wizard step "what do you want to build?"** — first step of a multi-step flow where the user declares intent and the rest of the wizard adapts.

If the choice is binary, or the labels alone make the option self-explanatory, use `B24RadioGroup` / `B24CheckboxGroup` / `B24Switch` instead. `B24PageCardGroup` shines when each option deserves a sentence.

For richer cards with a preview image and an inline "Learn more" link (one option per row, not a grid), use `B24RadioGroup` / `B24CheckboxGroup` with `variant="card"` and a custom `#label` slot — see [settings](./settings.md).

## Single-select settings picker

```vue
<script setup lang="ts">
import LayoutGridIcon from '@bitrix24/b24icons-vue/main/LayoutGridIcon'
import LayoutListIcon from '@bitrix24/b24icons-vue/main/LayoutListIcon'
import LayoutKanbanIcon from '@bitrix24/b24icons-vue/main/LayoutKanbanIcon'

const layout = ref('grid')

const items = [
  { value: 'grid',    icon: LayoutGridIcon,    label: 'Grid',    description: 'Compact cards with the key metrics on top' },
  { value: 'list',    icon: LayoutListIcon,    label: 'List',    description: 'Dense rows, best for scanning many records' },
  { value: 'kanban',  icon: LayoutKanbanIcon,  label: 'Kanban',  description: 'Columns by stage, drag-and-drop between them' }
]
</script>

<template>
  <B24PageCardGroup
    v-model="layout"
    :items="items"
    legend="Default view"
    color="air-primary"
    :columns="3"
  />
</template>
```

## Multi-select capability toggles

```vue
<script setup lang="ts">
const enabled = ref<string[]>(['callback', 'feedback'])

const items = [
  { value: 'callback', category: 'Customer communications', icon: PhoneIcon,   label: 'Callback',     description: 'Capture the phone number and start a callback' },
  { value: 'contacts', category: 'Customer communications', icon: MailIcon,    label: 'Contact details', description: 'Collect phone, email and client name' },
  { value: 'feedback', category: 'Customer communications', icon: StarIcon,    label: 'Feedback',     description: 'Gather customer reviews' },
  { value: 'pay',      category: 'Sales',                   icon: CardIcon,    label: 'Payment',      description: 'Take payment right from the form' }
]
</script>

<template>
  <B24PageCardGroup
    v-model="enabled"
    :items="items"
    multiple
    color="air-primary-success"
  />
</template>
```

The `category` field on each item splits the grid into sections with a heading above each. Set `category-key=""` to disable grouping when the items are already homogeneous.

## Card gallery as navigation

When a card click should navigate instead of select, drop `v-model` and listen on `change` (or use the `value` field as a route key) — but the cleaner pattern is to render plain `B24PageCard` instances inside a custom grid, since "selection state" is meaningless for navigation. Reach for `B24PageCardGroup` only when there is a real selected value to bind.

## Pairing with a form

`B24PageCardGroup` honours `useFormField`, so it integrates with `B24Form` / `B24FormField` like any other input. Wrap it for label + error display:

```vue
<B24FormField label="Default view" name="layout" required>
  <B24PageCardGroup v-model="state.layout" :items="items" />
</B24FormField>
```

The wrapping `<B24FormField>` keeps precedence over `<B24Theme :props>` defaults — see `useComponentProps` notes in [conventions](../guidelines/conventions.md).

## Sizing, color, and hover shadow

- `size` (`sm` | `md` | `lg`) scales the inner avatar, inner gap, and title/description font size. Default `md`.
- `color` is the umbrella accent that drives both the highlighted card border and the corner badge — keep them in sync by setting `color` instead of `highlight-color` / `badge-color` separately.
- Each item picks one leading visual: top-level `icon` field (plain icon, no circle) or `avatar` field (full `B24Avatar` — color, src, chip). `icon` wins when both are set, so move the icon into `avatar.icon` when you want the colored circle. Brand defaults group-wide with the `avatar` prop or per option via the item's `avatar` field — both accept the full Avatar API.
- The card lifts with a subtle shadow on hover, unless the item or the whole group is `disabled`.

```vue
<B24PageCardGroup
  v-model="value"
  :items="items"
  size="lg"
  color="air-primary-copilot"
  :avatar="{ color: 'air-secondary' }"
  :columns="2"
/>
```

```ts
// Avatar mode (colored circle around the icon) — keep the icon inside `avatar.icon`
const items = [
  { value: 'grid', avatar: { color: 'air-primary-success', icon: GridIcon }, label: 'Grid', description: '...' },
  { value: 'list', avatar: { color: 'air-primary-warning', icon: ListIcon }, label: 'List', description: '...' }
]

// Plain-icon mode (no circle) — top-level `icon` wins, `avatar` (if any) is ignored
const compact = [
  { value: 'grid', icon: GridIcon, label: 'Grid', description: '...' },
  { value: 'list', icon: ListIcon, label: 'List', description: '...' }
]
```

## Custom slots

`B24PageCardGroup` exposes overrides for the cases where the defaults are too rigid:

- `#leading="{ item, selected }"` — escape hatch for the leading visual. The default already renders a `B24Avatar`; reach for the slot only when the built-in avatar config (`avatar` prop / item `avatar` field) isn't enough.
- `#badge="{ item, selected }"` — replace the corner check badge (e.g. show the price tag of the selected plan).
- `#categoryLabel="{ category, items }"` — custom heading per section (counters, secondary text).
- `#legend` — heading above the entire group.

Theme slot overrides (`:b24ui="{ card: '...', cardWrapper: '...', avatar: '...' }"`) apply on top of the size/columns variants and are deep-merged automatically — see the proxy notes in [conventions](../guidelines/conventions.md).
