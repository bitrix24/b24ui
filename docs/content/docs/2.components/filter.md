---
title: Filter :badge{label="Soon" class="align-text-top"}
description: A composite filter component with search, presets, and a draggable field editor — modelled after the native Bitrix24 filter.
category: form
links:
  - label: GitHub
    iconName: GitHubIcon
    to: https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/Filter.vue
---

## Usage

The `Filter` is a *view-only* component: it never performs network requests. The consumer is responsible for loading data, persisting presets, and reacting to the `apply` event.

It is composed of:

- `FilterBar` — the collapsed strip with search, chips, and trailing buttons (search / clear / settings).
- `FilterPanel` — the popover (desktop) or drawer (mobile) that opens from the bar.
- `FilterPresets` — the left column with saved filters.
- `FilterFieldsEditor` — the right column with the active field list.
- `FilterField` — a single field row (label + control + `...` menu + drag handle).

You usually only mount `<B24Filter>` — the subcomponents are internal.

### Minimal example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { FilterFieldConfig, FilterValue } from '@bitrix24/b24ui-nuxt'

const fields: FilterFieldConfig[] = [
  { id: 'name', label: 'Название', type: 'string' },
  { id: 'amount', label: 'Сумма', type: 'money' },
  { id: 'closeDate', label: 'Дата завершения', type: 'date' }
]

const value = ref<FilterValue>({})
const activeFields = ref<string[]>(['name', 'amount'])
const search = ref('')

function onApply(payload: { values: FilterValue, query: string, presetId: string | null }) {
  // payload.values is the AND-combined map of field conditions
  // payload.query is the free-text search
  // payload.presetId is the active preset (or null)
  console.log('apply', payload)
}
</script>

<template>
  <B24Filter
    v-model="value"
    v-model:active-fields="activeFields"
    v-model:search-query="search"
    :fields="fields"
    @apply="onApply"
  />
</template>
```

### With presets

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { FilterPreset } from '@bitrix24/b24ui-nuxt'

const presets = ref<FilterPreset[]>([
  {
    id: 'in-progress',
    name: 'Сделки в работе',
    fields: ['name', 'amount'],
    values: { amount: { operator: 'gt', value: 0 } },
    system: true,
    pinned: true
  }
])
const activePresetId = ref<string | null>(null)

function onSave(payload: { name: string, preset: Omit<FilterPreset, 'id'> }) {
  // Persist on the server; assign a real id; push into `presets`.
  presets.value.push({ id: crypto.randomUUID(), ...payload.preset })
}
function onDelete(id: string) {
  presets.value = presets.value.filter(p => p.id !== id)
}
</script>

<template>
  <B24Filter
    v-model:active-preset-id="activePresetId"
    :presets="presets"
    :fields="fields"
    @preset-save="onSave"
    @preset-delete="onDelete"
  />
</template>
```

### Field types

The core supports the following types out of the box:

| Type           | Control                                  |
|----------------|------------------------------------------|
| `string`       | `Input`                                  |
| `number`       | Operator `Select` + `InputNumber` × 1–2  |
| `money`        | Same as `number` (currency in value)     |
| `date`         | `Select` with Bitrix-style date presets  |
| `time`         | Native `time` input                      |
| `select`       | `Select`                                 |
| `multiselect`  | `SelectMenu` (multiple)                  |
| `boolean`      | `RadioGroup` (Да / Нет / Не важно)       |
| `custom`       | Slot `field-{customMeta.kind}`           |

### Custom field types

Use `type: 'custom'` + the matching `customMeta.kind` to render anything via a slot:

```vue
<B24Filter :fields="fields" v-model="value">
  <template #field-user="{ field, condition, update }">
    <UserPicker
      :model-value="condition?.operator === 'in' ? condition.value : []"
      multiple
      @update:model-value="(v) => update(v.length ? { operator: 'in', value: v } : null)"
    />
  </template>
</B24Filter>
```

```ts
const fields: FilterFieldConfig[] = [
  { id: 'assignee', label: 'Ответственный', type: 'custom', customMeta: { kind: 'user' } }
]
```

The slot receives the field config, the current condition (or `null`), and an `update(condition)` function. Pass `null` to clear the value.

### Adaptive layout

The panel switches between `Popover` (desktop) and `Drawer` (mobile) via `useDevice`. No prop required — the breakpoint is `md`.

### Operators and value shape

Each condition is a discriminated union by `operator`:

```ts
type FilterFieldCondition
  = | { operator: 'filled' }
    | { operator: 'empty' }
    | { operator: 'between', value: [unknown, unknown] }
    | { operator: 'in', value: unknown[] }
    | { operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith', value: unknown }
```

`filled` / `empty` are **operators**, not UI modes — they describe the data state in the record. When chosen, the value input is hidden.

### Date values

For `type: 'date'`, the condition's value is a `FilterDateValue`:

```ts
type FilterDateValue
  = | { kind: 'any' }
    | { kind: 'preset', preset: FilterDatePreset } // today, yesterday, this-week, ...
    | { kind: 'exact', date: string /* ISO 8601 */ }
    | { kind: 'range', from: string, to: string }
    | { kind: 'relative', days: number, direction: 'past' | 'future' }
```

### Drag & drop

Fields and presets can be reordered by drag. Internally uses `useSortable` from `@vueuse/integrations`. A keyboard alternative is available via the `...` menu on each row (`↑ Вверх` / `↓ Вниз`).

### Locale

Default strings are in Russian. Override partially via the `locale` prop:

```vue
<B24Filter
  :locale="{ actions: { apply: 'Apply', reset: 'Reset' } }"
  :fields="fields"
/>
```

### Imperative API

`<B24Filter>` exposes a few methods through `defineExpose`:

- `applyPreset(id: string): void`
- `apply(): void`
- `reset(): void`
- `openPanel(): void`
- `closePanel(): void`

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'

const filterRef = useTemplateRef('filterRef')
function openProgrammatically() {
  filterRef.value?.openPanel()
}
</script>

<template>
  <B24Filter ref="filterRef" :fields="fields" />
</template>
```

## API

### Props

- `fields: FilterFieldConfig[]`{lang="ts-type"} — required, all available fields.
- `presets?: FilterPreset[]`{lang="ts-type"} — saved filters.
- `modelValue: FilterValue`{lang="ts-type"} — v-model. Map of `fieldId → condition`.
- `activeFields: string[]`{lang="ts-type"} — `v-model:activeFields`. Order matters.
- `activePresetId: string | null`{lang="ts-type"} — `v-model:activePresetId`.
- `searchQuery: string`{lang="ts-type"} — `v-model:searchQuery`.
- `defaultFields?: string[]`{lang="ts-type"} — used by "Вернуть поля по умолчанию".
- `visibleTagsCount?: number`{lang="ts-type"} — chips visible in bar before "+N" (default `3`).
- `searchDebounce?: number`{lang="ts-type"} — search debounce in ms (default `300`).
- `loading?: boolean`{lang="ts-type"}, `disabled?: boolean`{lang="ts-type"}
- `allowSavePresets?: boolean`{lang="ts-type"} (default `true`)
- `allowEditPresets?: boolean`{lang="ts-type"} (default `true`)
- `allowReorderFields?: boolean`{lang="ts-type"} (default `true`)
- `allowReorderPresets?: boolean`{lang="ts-type"} (default `true`)
- `locale?: Partial<FilterLocale>`{lang="ts-type"}

### Emits

- `apply` — `(payload: { values, query, presetId }) => void`. Triggered by `Найти` or Enter in search.
- `reset` — `() => void`. Clears values, keeps the active field set.
- `fieldsReset` — `() => void`. Restores the default field set.
- `presetSave` — `(payload: { name, preset }) => void`.
- `presetUpdate` — `(payload: { id, patch }) => void`.
- `presetDelete` — `(id: string) => void`.
- v-model: `update:modelValue`, `update:activeFields`, `update:activePresetId`, `update:searchQuery`.

### Slots

- `field-{type}` — override the control for a specific type. For `type: 'custom'`, the slot is `field-{customMeta.kind}` (falls back to `field-custom`).
- `preset-actions` — extra menu items in a preset's `DropdownMenu`.
- `empty-fields` — placeholder when no fields are active.
- `bar` — fully custom FilterBar.

## Security

- Internal `<button>` elements use `type="button"`, so they won't accidentally submit a parent `<form>`.
- `customMeta` is never parsed by the core — only forwarded to the slot.
- The component silently ignores unknown field ids in `activeFields` / `modelValue` and `console.warn`s on unknown operators in dev. Parsing presets from the server is the consumer's responsibility — strip `__proto__` / `constructor` / `prototype` keys before passing them in.
