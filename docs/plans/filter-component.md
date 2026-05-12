# Filter component for b24ui

Specification of a filter component that mirrors the native Bitrix24 filter, plus a phased implementation plan.

**Sources:**
- Annotated screenshot (see chat)
- [How to search items in CRM](https://helpdesk.bitrix24.ru/open/25505108/)
- [How CRM filters work](https://helpdesk.bitrix24.ru/open/24206616/)
- [b24ui llms.txt](https://bitrix24.github.io/b24ui/llms.txt)

---

# Part I. Specification

## 0. Principles

Locked in after discussion:

1. **View-only component.** No REST calls inside. All data comes in through `props`, all changes go out through `events`. Loading users, entities, and persisting presets is the consumer's job.
2. **Generic.** Not tied to CRM. No CRM-specific types in the core. Fields are described by a `FieldConfig` schema, types are extended via slots or by registering custom renderers.
3. **Field grouping is a generic mechanism.** The "Deal + Company" section from the Bitrix docs is just two fields from different groups. The field picker has a `group`, and nothing more CRM-specific.
4. **Search and fields are combined with `AND`.** The free-text search is a separate value that is always combined with field conditions. It lives separately from field values in `FilterValue`.

---

## 1. Anatomy (subcomponents)

A single big `Filter` is logically split into 5 parts — it simplifies the API and reuse:

1. **`FilterBar`** — the collapsed strip with search (what you see in the list header).
2. **`FilterPanel`** — the popover/drawer that expands on click.
3. **`FilterPresets`** — the left column with saved filters.
4. **`FilterFieldsEditor`** — the right column with active fields.
5. **`FilterField`** — a single field row (label + control + `...` menu + drag handle + remove button).

---

## 2. FilterBar — collapsed view

**Root component — `InputTags`.** It combines search and condition chips into one container, which maps cleanly onto the required UX.

Structure:

- **The internal `<input>` of `InputTags`** is our "+search" (free-text input). Combined with field conditions via **AND**.
- **Chips inside `InputTags`** are the active filter conditions. Built programmatically after "Find", not by typing into the input.
- **Chip display logic:**
  - The first **3 tags** are individual chips (`Amount > 1000 ×`, `This month ×`, `Stage group: ... ×`).
  - The rest collapse into a single counter tag `+N` (or `N more`). Clicking it opens `FilterPanel`.
  - If a preset is active, its name is the **first tag** (`Deals in progress ×`, removal = unset the preset).
- **`trailing` slot of `InputTags`** — magnifier / × (full reset) / settings icons.
- **Click on the bar background** (outside chips and input) — opens `FilterPanel`.

### InputTags usage notes

Because tags are built programmatically, native tag-adding through the input is **not needed**:

- `addOnBlur={false}`, `addOnTab={false}`, no `delimiter` — Enter in the input does not add a tag.
- Enter in the search = `@apply` (with debounce for live-search — exposed as a separate prop).
- Chip removal (`removeTag`) is dispatched by tag kind: unset the preset / drop a condition / open the panel (for the counter chip).
- We use `convertValue` / `displayValue` to keep structured objects in `v-model`, not strings.

---

## 3. FilterPresets (saved filters)

- A list of presets with the active one highlighted.
- System presets (cannot be deleted) + user presets. Distinguished by `system: true` in `Preset`.
- **On first open of the section:**
  - If a preset is pinned → **search + this preset** become active.
  - If nothing is pinned → only **search** is active, no preset selected.
- **Pin ("set as default")** decides which preset is auto-activated on first load. Only one preset can be pinned.
- Hovering a preset reveals a menu (⚙️ or contextual):
  - move (drag) — reorder;
  - toggle pin;
  - rename;
  - delete.
- **Drag & drop of presets** is enabled (see section 7).
- A **`+ Save filter`** button at the bottom saves the current field set and values as a new preset.

### Preset workflow

1. User clicks a preset (or it auto-activates on first load via pin).
2. The preset loads its field set and values into the editor.
3. User can **add more fields** via "Add field" and **change values**.
4. Presses **`Find`** — state applies.
5. The `FilterBar` shows the active state: `Badge` with the preset name + `Chip` with a condition counter.
6. `@apply` is emitted to the parent with final values and search text.

### Saving a preset — UI depends on the device

| Device   | UI |
|---|---|
| Desktop  | **Inline input** right in the preset list (like file rename) |
| Mobile   | **`Modal`** — inline editing inside a `Drawer` is awkward |

The choice is made automatically via `useDevice`.

---

## 4. FilterFieldsEditor (right column)

- A dynamic list of active filter fields (order is user-configurable).
- **Drag & drop** for sorting (☰ icon on the left + tooltip "Drag to reorder fields").
- **Removing a field** with the × icon on the right when hovered.
- A **`Add field`** link opens a picker of all available fields.
- A **`Reset to default fields`** link **only resets the field set**. Values of fields that survive the default set are preserved. The active preset is also not cleared.
- At the bottom — **`Find`** (primary) and **`Reset`** (secondary). `Reset` clears all values without touching the field set.

### Add-field picker

- Search by label (fuzzy via `CommandPalette`).
- **Field grouping** (`FieldConfig.group`). Groups are any logical split: "System / User", "Deal / Company / Contact", "Main / Extra". The component is agnostic about group semantics — it just renders sections.
- Already-active fields are marked (disabled or with a checkmark).

---

## 5. FilterField — a single field row

A field = label on top + control + `...` menu on the right.

### Built-in control types

Only generic types. No `crm-status` and the like — those go on the consumer's side via the `#field-{type}` slot.

| Type            | Behaviour |
|---|---|
| `string`        | Plain input |
| `number`        | Operator selector (`Exact`, `Greater`, `Less`, `Between`) + one or two fields |
| `money`         | Number + currency select |
| `date`          | Range preset selector: `Any date`, `Today`, `Yesterday`, `This week`, `This month`, `This quarter`, `Exact date`, `Range`, `Last N days` |
| `time`          | Time |
| `select`        | Single select |
| `multiselect`   | Chips (e.g. "Stage group 'Deal in progress' ×") |
| `boolean`       | Yes / No / Any |
| `custom`        | `#field-{type}` slot — consumer renders it |

**User picker, Entity picker, CRM stages** are implemented as `custom` types on top.

### `...` menu on every field

- **Filled** / **Not filled** are **special filter operators** that check the data state in the record (value present / absent), not a UI mode. Stored in `FilterValue` as `{ operator: 'filled' }` / `{ operator: 'empty' }`. Available for most types (excluding file / list / booking). When chosen, the UI hides or disables the value input — the operator alone defines the condition.
- Clear value.
- (Optional) Pin field — so it is not removed by "Reset to defaults".

---

## 6. Mapping onto b24ui components

### 6.1 FilterBar

Root — **`InputTags`** (instead of stitching together Input + Badge + Chip + Buttons).

| Element | Implementation | Comment |
|---|---|---|
| FilterBar root | **`InputTags`** | Combines search and condition chips |
| "+search" input | native `<input>` inside `InputTags` | No `addOnBlur`/`addOnTab`/`delimiter` — Enter emits `@apply` |
| Preset name chip (first tag) | item in `v-model` array of `InputTags` | Via `convertValue`/`displayValue` |
| Condition chips (tags 2–4) | items in the same array | Custom render via `item-text` slot |
| `+N` counter chip for the hidden ones | last item in the array | Click opens `FilterPanel` |
| Magnifier / × / settings icons | `trailing` slot of `InputTags` + `Button` | — |
| Hover hints | `Tooltip` | — |

### 6.2 FilterPanel — expanded panel

Adaptive strategy via `useDevice`:

- **Desktop** → `Popover` (non-modal, anchored to the FilterBar).
- **Mobile** → **`Drawer`** (locked in). Matches the Bitrix24 mobile-app UX.

`Modal` and `Slideover` are not used.

### 6.3 FilterPresets (left column)

| Element | Component | Comment |
|---|---|---|
| Preset list | `NavigationMenu` (`orientation="vertical"`) | Active state + icons |
| Pin icon on the default preset | slot in `NavigationMenu` + `B24Icons` | — |
| Preset action menu | `DropdownMenu` | Triggered by ⋮ |
| `+ Save filter` button | `Button` (`variant="link"` or `"ghost"`) | — |
| Drag-and-drop of presets | ❌ not in b24ui | See section 7 |
| Inline rename / save | `Input` (in place of the menu item) | — |
| Save-preset modal (mobile) | `Modal` + `Form` | Mobile only; inline on desktop |
| Delete-preset confirm | `Modal` (or `useOverlay`) | — |

### 6.4 FilterFieldsEditor (right column)

| Element | Component | Comment |
|---|---|---|
| Scroll container for a long field list | `ScrollArea` | Virtualisation |
| Single field wrapper | `FormField` | Container with validation |
| Whole form | `Form` | Submit on Enter / "Find" |
| `...` menu next to a field | `DropdownMenu` | — |
| Remove-field × button | `Button` (icon-only, `variant="ghost"`) | On hover |
| Drag handle ☰ | custom icon-button + DnD wiring | See section 7 |
| "Add field" | `Button` (`variant="link"`) | Opens the picker |
| "Reset to default fields" | `Button` (`variant="link"`) | — |
| Add-field picker | **`CommandPalette`** (in `Popover` or `Drawer`) | Fuzzy search + grouping |
| "Drag to reorder" tooltip | `Tooltip` | — |
| `Find` / `Reset` buttons | `Button` (`primary` / `secondary`) | — |

### 6.5 FilterField — controls by type

| Field type | Component | Notes |
|---|---|---|
| `string` | `Input` | — |
| `number` | `InputNumber` | — |
| `money` | `InputNumber` + `Select` (currency) | — |
| Comparison operator | `Select` | Left of the value input |
| `date` (single) | `InputDate` | — |
| `daterange` with presets | `Select` + `Calendar` below on "Exact date" | `InputDate` itself doesn't provide presets |
| `time` | `InputTime` | — |
| `select` (single) | `Select` or `SelectMenu` | `SelectMenu` if search is needed |
| `multiselect` with chips | `SelectMenu` (multiple) or `InputTags` | — |
| `boolean` | `RadioGroup` or `Select` | — |
| `custom` | `#field-{type}` slot | Consumer decides |

**Custom types (outside the core, recommended recipes):**
- `user` → `SelectMenu` (multiple, custom `#item`) + `User` / `Avatar` / `AvatarGroup`.
- `entity` (deal / contact / company) → `SelectMenu` with async loading.
- File → `FileUpload` (if needed at all).
- Colour → `ColorPicker`.
- CRM stages with sub-kinds → `SelectMenu` with groups + `Tabs`.

### 6.6 System elements

| What | Component / composable |
|---|---|
| "Filter saved" notification | `useToast` + `Toast` (consumer triggers) |
| Loading skeleton | `Skeleton` |
| Empty state | `Empty` |
| Programmatic modal opening | `useOverlay` |
| Popover ↔ drawer adaptive switch | `useDevice` |
| Hotkeys (Esc close, Enter apply) | `defineShortcuts` |
| Long-list scroll shadow | `useScrollShadow` |

---

## 7. Drag-and-drop

b24ui has no sortable component. We need one **for both presets and fields**.

Options:

1. **`@vueuse/integrations/useSortable`** (built on SortableJS) — recommended. Lightweight, touch-friendly.
2. **`vue-draggable-plus`** — if a declarative syntax is preferred.
3. Hand-rolled on the HTML5 Drag API — not advised.

DnD is wrapped in a thin internal `<FilterSortableList>` component so the implementation can be swapped easily.

---

## 8. Component composition

```
<Filter>                                  ← root
├── <FilterBar>
│   └── InputTags                         ← one component instead of a stitched bar
│       ├── v-model: [preset tag, condition tag, condition tag, condition tag, +N counter]
│       ├── input inside (search)
│       └── trailing slot: Button × N (magnifier, ×, settings)
│
└── <Popover> | <Drawer>                  ← via useDevice
    └── <FilterPanel>
        ├── <FilterPresets>
        │   ├── NavigationMenu        ← wrapped in FilterSortableList
        │   ├── DropdownMenu (on each preset)
        │   ├── Input (inline save / rename)
        │   └── Button (+ Save filter)
        │
        └── <Form>                        ← the whole right part
            └── <FilterFieldsEditor>
                ├── ScrollArea
                │   └── FilterSortableList
                │       └── <FilterField> × N
                │           ├── FormField
                │           ├── [Input | InputNumber | InputDate | Select | SelectMenu | slot]
                │           └── DropdownMenu (...)
                ├── Button (Add field) ──► CommandPalette in Popover/Drawer
                ├── Button (Reset to defaults)
                └── Button × 2 (Find, Reset)
```

---

## 9. TypeScript interfaces

### 9.1 Base types

```ts
import type { IconComponent } from '@bitrix24/b24icons-vue'
import type { AvatarProps } from '@bitrix24/b24ui-nuxt'

/**
 * Field types supported in the core.
 * Extend via type 'custom' + slot `field-{type}`.
 */
export type FieldType =
  | 'string'
  | 'number'
  | 'money'
  | 'date'
  | 'time'
  | 'select'
  | 'multiselect'
  | 'boolean'
  | 'custom'

/**
 * Filter operators.
 * `filled` / `empty` describe the data state in the record (value present / absent), not a UI mode.
 */
export type FilterOperator =
  | 'eq'          // equals
  | 'neq'         // not equals
  | 'gt'          // greater than
  | 'gte'         // greater than or equal
  | 'lt'          // less than
  | 'lte'         // less than or equal
  | 'between'     // range [from, to]
  | 'in'          // one of values (for multiselect)
  | 'contains'    // contains substring (for string)
  | 'startsWith'  // starts with (for string)
  | 'filled'      // field has a value in the record
  | 'empty'       // field is empty in the record
```

### 9.2 FieldConfig — single field configuration

```ts
export interface FieldOption {
  value: string | number
  label: string
  icon?: IconComponent
  avatar?: AvatarProps
  disabled?: boolean
}

export interface FieldConfig {
  /** Unique field id */
  id: string
  /** Label above the control */
  label: string
  /** Control type */
  type: FieldType

  /** Group for the field picker. Any logical split (system/user, entity, etc.) */
  group?: string
  /** Visible group name (defaults to id) */
  groupLabel?: string

  /** Always active: cannot be removed, not reset by "Reset to defaults" */
  pinned?: boolean
  /** Whether the field can be removed from the active set. Default true (unless pinned) */
  removable?: boolean

  /** Available operators. Falls back to type defaults if omitted */
  supportedOperators?: FilterOperator[]
  /** Whether "Filled / Not filled" appears in the `...` menu. Default true */
  allowFilled?: boolean

  /** Input placeholder */
  placeholder?: string
  /** Helper text under the field */
  description?: string

  // Type-specific options
  /** For select / multiselect */
  options?: FieldOption[]
  /** For money — fixed field-level currency. Otherwise currency lives in the value */
  currency?: string
  /** For number / date */
  min?: number | string
  /** For number / date */
  max?: number | string

  /** Arbitrary metadata for the custom-type slot */
  customMeta?: Record<string, unknown>
}
```

### 9.3 FieldCondition + FilterValue

```ts
/**
 * Single-field condition = operator + (optional) value.
 * Discriminated union by `operator` for strict value typing.
 */
export type FieldCondition =
  | { operator: 'filled' }
  | { operator: 'empty' }
  | { operator: 'between'; value: [unknown, unknown] }
  | { operator: 'in'; value: unknown[] }
  | {
      operator:
        | 'eq'
        | 'neq'
        | 'gt'
        | 'gte'
        | 'lt'
        | 'lte'
        | 'contains'
        | 'startsWith'
      value: unknown
    }

/**
 * Value map: field id → its condition.
 * Fields without a value are NOT in the map (use `activeFields` for the active set).
 * The "+6" badge in FilterBar is computed from the number of keys here.
 */
export type FilterValue = Record<string, FieldCondition>
```

### 9.4 DateValue — value shape for the `date` type

A separate section because of the Bitrix range presets.

```ts
/** Bitrix-style date range presets */
export type DatePreset =
  | 'today'
  | 'yesterday'
  | 'tomorrow'
  | 'this-week'
  | 'last-week'
  | 'this-month'
  | 'last-month'
  | 'this-quarter'
  | 'last-quarter'
  | 'this-year'

/**
 * Value for FieldCondition.value when the field type is 'date'.
 */
export type DateValue =
  | { kind: 'any' }
  | { kind: 'preset'; preset: DatePreset }
  | { kind: 'exact'; date: string /* ISO 8601 */ }
  | { kind: 'range'; from: string; to: string }
  | { kind: 'relative'; days: number; direction: 'past' | 'future' }
```

### 9.5 Preset — saved filter

```ts
export interface Preset {
  /** Unique id */
  id: string
  /** Visible name */
  name: string

  /** Field ids in the active set and their order */
  fields: string[]
  /** Values per field */
  values: FilterValue
  /** Saved text search (optional) */
  searchQuery?: string

  /** System preset — cannot be deleted or renamed */
  system?: boolean
  /**
   * Activated on first load.
   * The system expects at most one pinned preset
   * (the component does not validate — this is the consumer's responsibility).
   */
  pinned?: boolean
  /** Position in the preset list */
  order?: number
}
```

### 9.6 FilterBarTag — tags inside `InputTags`

```ts
/**
 * A single item in the v-model array of InputTags inside FilterBar.
 * Slot item-text renders each tag based on kind.
 */
export type FilterBarTag =
  | {
      kind: 'preset'
      presetId: string
      label: string
    }
  | {
      kind: 'condition'
      fieldId: string
      label: string         // e.g. "Amount > 1000"
      condition: FieldCondition
    }
  | {
      kind: 'counter'
      hiddenCount: number   // how many conditions are hidden behind "+N"
    }
```

### 9.7 Props of `<Filter>`

```ts
export interface FilterProps {
  // schema and presets — immutable from the outside
  /** All available fields */
  fields: FieldConfig[]
  /** Saved presets */
  presets?: Preset[]

  // v-model (several separate models)
  /** Values of active fields. v-model */
  modelValue: FilterValue
  /** Active field ids in display order. v-model:activeFields */
  activeFields: string[]
  /** Active preset id. null — no preset selected. v-model:activePresetId */
  activePresetId: string | null
  /** Text search. v-model:searchQuery */
  searchQuery: string

  /** Default field set for "Reset to defaults" */
  defaultFields?: string[]
  /** How many condition chips are visible in FilterBar before collapsing (default 3) */
  visibleTagsCount?: number
  /** Loading state for "Find" */
  loading?: boolean

  // capability flags (default true)
  allowSavePresets?: boolean
  allowEditPresets?: boolean
  allowReorderFields?: boolean
  allowReorderPresets?: boolean
}
```

### 9.8 Emits of `<Filter>`

```ts
export type FilterEmits = {
  // v-model updates
  'update:modelValue': [value: FilterValue]
  'update:activeFields': [fields: string[]]
  'update:activePresetId': [id: string | null]
  'update:searchQuery': [query: string]

  // actions
  /** "Find" pressed or Enter in search. AND between values and query */
  apply: [payload: { values: FilterValue; query: string; presetId: string | null }]
  /** "Reset" — clears values, does not touch the field set */
  reset: []
  /** "Reset to default fields" — restores the default field set only */
  fieldsReset: []

  // preset management
  /** Save the current state as a new preset */
  presetSave: [payload: { name: string; preset: Omit<Preset, 'id'> }]
  /** Update a preset (rename, pin, order) */
  presetUpdate: [payload: { id: string; patch: Partial<Preset> }]
  /** Delete a preset */
  presetDelete: [id: string]
}
```

### 9.9 Slots of `<Filter>`

```ts
export interface FilterSlots {
  /**
   * Custom renderer for a specific field type.
   * Required for type 'custom'. Optional override for built-in types.
   * Slot name: `field-{type}`, e.g. `field-user`, `field-entity`.
   */
  [key: `field-${string}`]: (props: {
    field: FieldConfig
    condition: FieldCondition | null
    update: (condition: FieldCondition | null) => void
  }) => any

  /** Extra actions in a preset's DropdownMenu */
  'preset-actions'?: (props: { preset: Preset }) => any

  /** Placeholder when there are no active fields */
  'empty-fields'?: () => any

  /** Custom FilterBar (when you want your own trigger instead of the built-in InputTags) */
  bar?: (props: {
    tags: FilterBarTag[]
    searchQuery: string
    open: () => void
    apply: () => void
    reset: () => void
  }) => any
}
```

### 9.10 Usage example

```ts
// FieldConfig example
const fields: FieldConfig[] = [
  { id: 'name', label: 'Name', type: 'string', group: 'main' },
  { id: 'amount', label: 'Amount', type: 'money', group: 'main' },
  {
    id: 'closeDate',
    label: 'Close date',
    type: 'date',
    group: 'main',
  },
  {
    id: 'stageGroup',
    label: 'Stage group',
    type: 'multiselect',
    group: 'crm',
    options: [
      { value: 'in-progress', label: 'Deal in progress' },
      { value: 'won', label: 'Deal won' },
      { value: 'lost', label: 'Deal lost' },
    ],
  },
  // Custom type — rendered via the field-user slot
  { id: 'responsible', label: 'Assignee', type: 'custom', customMeta: { kind: 'user' } },
]

// FilterValue example (what lives in v-model)
const value: FilterValue = {
  amount: { operator: 'gt', value: 1000 },
  closeDate: {
    operator: 'eq',
    value: { kind: 'preset', preset: 'this-month' } satisfies DateValue,
  },
  stageGroup: { operator: 'in', value: ['in-progress'] },
  // 'name' was not filled → not present in the map
  responsible: { operator: 'filled' },
}

// Preset example
const preset: Preset = {
  id: 'deals-in-progress',
  name: 'Deals in progress',
  fields: ['name', 'amount', 'closeDate', 'stageGroup'],
  values: {
    stageGroup: { operator: 'in', value: ['in-progress'] },
  },
  system: true,
  pinned: true,
}
```

---

## 10. Logic that is easy to forget

- **Debounce** on `searchQuery`, so `@apply` is not fired on every keystroke.
- **Dirty state**: values changed but "Find" not yet pressed — highlight the button visually.
- **Localisation** of operators and date presets.
- **Accessibility**: keyboard drag, ARIA for the popup, focus trap inside the panel. More in section 12.
- **Range validation**: "from" is not greater than "to" for dates and numbers.
- **AND logic for search + fields**: `@apply` always carries both, even if one is empty.

---

## 11. Performance

Only the things that are easy to miss specifically for this component.

### Large field schemas
- A single CRM entity in Bitrix24 can have hundreds of user fields. Internally we build a `Map<string, FieldConfig>` via `computed` — all lookups by id are O(1), no `.find()` in templates.
- The field picker (`CommandPalette`) is **lazy-mounted**: rendering and Fuse.js initialisation happen only on open. The index is rebuilt via `shallowRef` + `watch` on `fields`.
- Virtualisation in `ScrollArea` (both for the picker and the active-fields list) is enabled only when fields **> 50**. Below that we skip virtualisation so DnD behaves correctly.

### DnD + virtualisation
These mix poorly: SortableJS does not see unmounted items. Options:
- enable virtualisation only when DnD is not active;
- or switch to position-based DnD (drop changes `order`, the list re-sorts itself).

Pick at implementation time; we'll measure both.

### FilterBar tag recomputation
- `FilterBarTag[]` — `computed` from `(activeFields, modelValue, activePresetId, visibleTagsCount)`. Not recomputed on every keystroke.
- The custom `#item-text` slot of `InputTags` must be cheap: text + optional icon. Don't shove heavy components in there.
- Search debounce is separate, default 300 ms, configurable via prop.

### FilterValue reactivity
- `Record<string, FieldCondition>` — Vue tracks deeply. When updating a single field, replace the **whole record** (`{ ...value, [id]: newCondition }`), don't mutate in place. Cleaner and cheaper to track.

### Batching on preset change
Applying a preset touches 4 v-models. Emitting one by one means 4 re-renders in the parent.

Fix: batch updates inside the component via `nextTick` so the parent re-renders once. Optionally expose an imperative `applyPreset(id)` through `defineExpose`.

### SSR
- DnD instances are created on the client only, via `onMounted`.
- `useDevice` must return a stable SSR default (typically desktop), otherwise hydration mismatches and the wrong Drawer/Popover opens.

---

## 12. Security

### XSS
- **No `v-html` in the core.** All external strings (`FieldConfig.label`, `Preset.name`, `FieldOption.label`, tag labels in `FilterBarTag`) go through interpolation. Vue escapes them.
- For authors of custom-type slots this is a **contractual requirement** — pinned in the library README.

### Runtime validation
TypeScript only protects at compile time. At runtime the component must gracefully ignore garbage:
- `activeFields` ids missing from `fields` → silently filtered out.
- `FilterValue` with unknown keys → not rendered, but **not discarded** (so stale presets re-mounted don't lose data).
- `FieldCondition.operator` outside the allowed set → skip the condition, `console.warn` in dev.

### Size limits
Protection against accidental bloat (e.g. programmatic filter generation or server-side bugs):
- `maxSearchLength` (default 2000).
- `maxActiveFields` (default 50).
- `in`-operator array size — recommendation for the consumer, soft-check + warn in the core.

Limits are not hard-coded — configurable via props, defaults are generous.

### Prototype pollution
Presets are often loaded from the server. **Parsing is the consumer's responsibility**: strip `__proto__`, `constructor`, `prototype` keys before writing into `FilterValue` / `fields`.

The core does not call `Object.assign({}, untrusted)` without filtering.

### `customMeta` as an attack vector
The core **never reads or calls** the content of `customMeta` — it just proxies it to the slot. Attacking the core through it is impossible; content is the slot author's responsibility.

### Isolation from the parent form
- All internal `<button>` elements use `type="button"`. Otherwise, inside a page-level `<form>`, Find/Reset would submit the outer form.
- The internal `<Form>` used for validation has no native `action`.

### Accessibility as risk
DnD without a keyboard alternative violates WCAG (a legal risk for the integrator in several jurisdictions).

We implement "up / down" arrows in each field's `...` menu as the keyboard alternative to drag. Same for presets.

### Confidentiality (relevant for URL sync later)
When we get to URL sync (see section 14), add a `urlSync: 'all' | 'safe' | 'none'` prop and a `FieldConfig.sensitive` flag. In `safe` mode, sensitive fields are excluded from the URL.

### Logging
In dev mode do not log `FilterValue` in full — it may contain PII. Log only the structure (keys + condition types, without `value`).

---

## 13. What to extract into separate library components

These are broader than the filter and will be useful elsewhere:

- `DateRangePicker` with Bitrix-style range presets.
- `NumberRangeInput` with an operator.
- `SortableList` (for drag-and-drop of fields and presets).

Not in the filter core, but recommended recipes for consumers:
- `UserPicker` (multi-select of employees) — built via the `custom` type.
- `EntityPicker` — same.

---

## 14. Deferred

- **URL synchronisation** of filter values into the query string. Not now; figure out separately.

---

## 15. Open questions

1. **`currency` in the money field schema** — where it lives:
   - (a) on `FieldConfig` (as today) — currency is fixed per field;
   - (b) inside the value, e.g. `value: { amount: number; currency: string }` — the user picks currency in the filter.
   Option (b) is needed if the project has a multi-currency CRM. Otherwise keep (a).
2. **Type guards for `FieldCondition`** — TypeScript narrows the discriminated union by `operator` well in code, but in Vue templates `v-if`-based narrowing sometimes drops. We may need helpers (`isFilled`, `isRangeOp`, `isInOp` and so on). Decide during implementation if we hit it.

---

## 16. Locked-in decisions

- **Tags in FilterBar:** show the first **3 active conditions** as individual chips, collapse the rest into a single `+N` counter chip. The preset name is the separate (first) chip when a preset is active. Implemented via `InputTags`.
  - The visible-tags count is exposed as `visibleTagsCount` (default `3`).
- **"Filled / Not filled"** are special filter operators (`filled` / `empty`) describing the data state in the record. Stored in `FilterValue` next to the regular operators (`eq`, `gt`, `lt`, `between`). This is **not a separate UI mode** — just an operator value the field renderer reacts to (the value input is hidden or disabled).

---

# Part II. Implementation plan

The plan is split into phases. Each phase is its own commit (conventional commits) that can be reviewed and reverted. All artefacts (component, theme, types, tests, docs, playground) follow the workflow in `AGENTS.md`.

## Implementation principles

1. **View-only.** No REST calls inside. Everything via `props`/`emits`.
2. **Compose from existing b24ui primitives.** Don't write our own low-level components when one exists (`InputTags`, `Popover`, `Drawer`, `CommandPalette`, `NavigationMenu`, `DropdownMenu`, `Form`, `FormField`, `ScrollArea`, `Button`, `Calendar`, `InputDate`, `InputNumber`, `InputTime`, `Select`, `SelectMenu`, `Tooltip`, `Empty`, `Skeleton`).
3. **One public component `Filter`** + a set of internal subcomponents, not exported externally (for now). If consumers ask for parts, we expose them once the API stabilises.
4. **Adaptive:** `useDevice` → `Popover` on desktop, `Drawer` on mobile.
5. **DnD:** a `<FilterSortableList>` wrapper around `@vueuse/integrations/useSortable`. Switching implementations later changes one file.
6. **Theming:** `tailwind-variants` per repo convention (`src/theme/filter.ts` + slots for subcomponents).
7. **Localisation:** all UI strings ("Find", "Reset", "Any date", operators, etc.) come via `props` with Russian defaults. Don't hard-code in templates.

---

## Phase 1 — Types and public contract

**Commit:** `feat(Filter): define public types`

**Files:**
- `src/runtime/types/filter.ts` (new):
  - `FieldType`, `FilterOperator`, `FieldOption`, `FieldConfig`
  - `FieldCondition` (discriminated union by `operator`)
  - `FilterValue = Record<string, FieldCondition>`
  - `DatePreset`, `DateValue`
  - `Preset`
  - `FilterBarTag`
  - `FilterProps`, `FilterEmits`, `FilterSlots`
- `src/runtime/types/index.ts` — re-export filter types.
- Type-guard utilities (`isFilledOp`, `isEmptyOp`, `isRangeOp`, `isInOp`) — `src/runtime/utils/filter.ts`. Needed for narrowing in Vue templates (see open question #2 in the spec).

**Check before commit:** `pnpm run typecheck`.

---

## Phase 2 — Theme

**Commit:** `feat(Filter): add theme`

**Files:**
- `src/theme/filter.ts` — slots for the whole anatomy:
  - `root`, `bar`, `panel`, `presets`, `presetsList`, `presetItem`, `presetItemActive`, `fieldsEditor`, `field`, `fieldLabel`, `fieldControl`, `fieldMenuTrigger`, `dragHandle`, `actions`, `submitButton`, `resetButton`, `addFieldButton`, `defaultsButton`.
  - Variants: `size` (`sm`/`md`/`lg`), `orientation` (`horizontal`/`vertical`), `color` (`air-primary` by default).
- Register in `ThemeDefaults` in `src/runtime/composables/useComponentProps.ts`.
- Wire up in `src/module.ts` (if existing patterns require it — check analogues).

**Check:** `pnpm run dev:prepare && pnpm run typecheck`.

---

## Phase 3 — Scaffold + base structure

**Commit:** `feat(Filter): scaffold component`

Use the CLI:

```
bitrix24-ui make component Filter
```

Then add subcomponents by hand (the CLI scaffolds one file at a time):

**Files:**
- `src/runtime/components/Filter.vue` — root, orchestrates state, proxies props/emits, renders `FilterBar` + `Popover`/`Drawer` with `FilterPanel`.
- `src/runtime/components/FilterBar.vue` — internal, wraps `InputTags`, builds `FilterBarTag[]` via `computed`.
- `src/runtime/components/FilterPanel.vue` — internal, two columns (`FilterPresets` + `FilterFieldsEditor`).
- `src/runtime/components/FilterPresets.vue` — internal.
- `src/runtime/components/FilterFieldsEditor.vue` — internal.
- `src/runtime/components/FilterField.vue` — internal, a single control.
- `src/runtime/components/FilterSortableList.vue` — internal `useSortable` wrapper.

**Export decision:** only `Filter` is exported from `module.ts`. The rest is internal. If a consumer wants to assemble a custom bar, the `bar` slot in `FilterProps` already covers it.

---

## Phase 4 — FilterBar (collapsed view)

**Commit:** `feat(Filter): implement FilterBar`

- Root is `InputTags` with `addOnBlur={false}`, `addOnTab={false}`, no `delimiter`.
- `convertValue`/`displayValue` — keep `FilterBarTag` objects in `v-model`, render via the `item-text` slot (the name in InputTags may differ — verify in `InputTags.vue` and align).
- A `computed` `tagsToShow`:
  - first tag — `preset` (when one is active);
  - next up to `visibleTagsCount` — `condition`;
  - last — `counter`, if anything is hidden.
- `removeTag` handler:
  - `kind: 'preset'` → emit `update:activePresetId` with `null`;
  - `kind: 'condition'` → drop from `FilterValue`, emit `update:modelValue`;
  - `kind: 'counter'` → open `FilterPanel`.
- `trailing` slot — `Button × 3` (magnifier, ×, settings). Settings opens the panel.
- Click on the background (outside chip/input) — open the panel. Done via `data-slot="root"` + `@click.self`.
- Debounce `searchQuery` via `useDebounceFn` (vueuse). Default 300 ms — `searchDebounce` prop.
- Enter in the input → `@apply`.

---

## Phase 5 — FilterPanel + adaptive

**Commit:** `feat(Filter): adaptive panel via useDevice`

- `useDevice` to pick `Popover` (desktop) vs `Drawer` (mobile).
- Panel renders two columns on desktop, tabs or a vertical stack on mobile (inside `Drawer`).
- Focus trap and Esc-close are built into `Popover`/`Drawer` — nothing extra needed.
- `defineShortcuts`: Enter → apply (when focus is inside the panel), Esc → close.

---

## Phase 6 — FilterPresets

**Commit:** `feat(Filter): implement presets column`

- `NavigationMenu` (`orientation="vertical"`) for the preset list.
- Active preset — visual highlight (via theme slot `presetItemActive`).
- System presets (`system: true`) — can't be deleted or renamed (we hide menu items in `DropdownMenu`).
- Pin icon (`B24Icons` pin) on presets with `pinned: true`.
- `DropdownMenu` on every preset: move (drag — separate handle), pin/unpin, rename, delete.
- **Drag & drop** via `FilterSortableList`.
- Inline save (`Desktop`) — an `Input` appears at the end of the list after clicking `+ Save filter`. Enter → emit `presetSave`, Esc → cancel.
- Modal save (`Mobile`) — `useOverlay` + a minimal `Modal` + a `Form` with one `Input`.
- Delete confirm — `useOverlay` + `Modal`.
- **Keyboard alternative to DnD:** `↑ Up` / `↓ Down` items in the `DropdownMenu` — emit `presetUpdate` with the new `order`. This is the WCAG safety net.

---

## Phase 7 — FilterFieldsEditor + field picker

**Commit:** `feat(Filter): implement fields editor`

- `ScrollArea` (virtualisation — only when active fields > 50; see the performance section of the spec).
- Each field — `FormField` + `FilterField`.
- Drag handle ☰ on the left (icon-only `Button`) + tooltip "Drag to reorder fields".
- × remove button on the right (`Button`, `variant="ghost"`, icon-only) — only on hover (CSS hover state, via the theme).
- `DropdownMenu` `...`:
  - "Filled" → emit `{ operator: 'filled' }`;
  - "Not filled" → `{ operator: 'empty' }`;
  - "Clear value" → drop the key from `FilterValue`;
  - "↑ Up" / "↓ Down" — keyboard alternative to DnD.
- `Add field` button → `CommandPalette` inside `Popover` (desktop) or `Drawer` (mobile).
  - Fuzzy search by `field.label`.
  - Grouping by `field.group` (visible label — `field.groupLabel`).
  - Already-added fields are `disabled`.
- `Reset to default fields` button → emits `fieldsReset`. Per the spec semantics: only resets the field set (`activeFields ← defaultFields`); values and the active preset are not touched.
- `Find` (primary) / `Reset` (secondary) buttons.
  - `Find` — emits `apply` with `{ values, query, presetId }`.
  - `Reset` — emits `reset` (clears `FilterValue`, leaves `activeFields`).

**Important:** every `<button>` is `type="button"` (protection against submitting the parent `<form>`).

---

## Phase 8 — FilterField — controls per type

**Commit:** `feat(Filter): field controls per type`

- `string` → `Input`.
- `number` → `Select` (operator) + `InputNumber` × 1 or 2 (for `between`).
- `money` → `Select` (operator) + `InputNumber` + `Select` (currency). If `field.currency` is set, the currency select is hidden.
- `date` → `Select` of presets (`DatePreset`) + `Calendar`/`InputDate` below for `kind: 'exact'` or `'range'`, + `InputNumber` for `'relative'`.
- `time` → `InputTime`.
- `select` → `Select` or `SelectMenu` (switch to `SelectMenu` if `options.length > 10` for search).
- `multiselect` → `SelectMenu` (multiple) with chips.
- `boolean` → `RadioGroup` (Yes / No / Any). "Any" = drop the condition from `FilterValue`.
- `custom` → `field-{customMeta.kind}` or `field-custom` slot. Slot gets `{ field, condition, update }`.

**Behaviour on `filled`/`empty`:** hide (or disable with dim outline) the value input — the operator alone defines the condition.

**Reactivity:** when updating one field, **replace the whole `FilterValue`** (`{ ...value, [id]: newCondition }`); don't mutate. See the performance section of the spec.

---

## Phase 9 — DnD wrapper

**Commit:** `feat(Filter): sortable list wrapper`

- `src/runtime/components/FilterSortableList.vue`:
  - Takes a `v-model` array, renders items via a slot.
  - Inside — `useSortable` from `@vueuse/integrations`. Created in `onMounted` (SSR-safe).
  - Options: `handle: '[data-drag-handle]'`, `animation: 150`.
- Add `sortablejs` (+ types) as a dependency and make sure `@vueuse/integrations` is in `package.json`. Add if missing.

---

## Phase 10 — Localisation and constants

**Commit:** `feat(Filter): expose locale prop`

- `locale: Partial<FilterLocale>` prop with the default being an object of Russian strings.
- `FilterLocale` type in `src/runtime/types/filter.ts`:
  - `actions.apply`, `actions.reset`, `actions.addField`, `actions.resetFields`, `actions.saveFilter`
  - `operators.eq`, `operators.gt`, …
  - `datePresets.today`, `datePresets.thisMonth`, …
  - `boolean.yes`, `boolean.no`, `boolean.any`
  - `tooltips.dragField`, `tooltips.removeField`
  - `placeholders.search`
- Inside the component — `mergeWith(defaultLocale, props.locale)`.

---

## Phase 11 — Tests

**Commit:** `test(Filter): add component tests`

**Files:**
- `test/components/Filter.spec.ts` (snapshot + behaviour).
- `test/components/FilterBar.spec.ts`.
- `test/components/FilterPresets.spec.ts`.
- `test/components/FilterFieldsEditor.spec.ts`.
- `test/components/FilterField.spec.ts`.

**Coverage:**

1. **Snapshots** — three or four configurations (empty, with a preset, with 6 active fields, with a custom slot).
2. **FilterBar:**
   - the first `visibleTagsCount` conditions are individual chips, the rest collapse into `+N`;
   - removing a `preset` chip emits `update:activePresetId` with `null`;
   - removing a `condition` chip emits `update:modelValue` without that key;
   - clicking the `counter` chip opens the panel;
   - Enter in the search emits `apply`;
   - `searchQuery` debounce — `update:searchQuery` after the pause.
3. **Presets:**
   - clicking a preset — emits `update:activePresetId` + (via `nextTick`) `update:modelValue` + `update:activeFields`;
   - a system preset has no "delete"/"rename" menu items;
   - saving a preset (desktop) is inline, (mobile) is a modal.
4. **FieldsEditor:**
   - "Find" emits `apply` with `{ values, query, presetId }`;
   - "Reset" emits `reset` without touching `activeFields`;
   - "Reset to default fields" emits `fieldsReset`.
5. **FilterField:**
   - picking operator `filled` hides the value input;
   - a custom type renders via the `field-user` slot;
   - `update` from the slot updates `FilterValue`.
6. **A11y:**
   - all buttons are `type="button"`;
   - the drag handle has an `aria-label` + a keyboard alternative (arrows in `DropdownMenu`);
   - focus trap inside `Popover`/`Drawer` (tested with `tab` and `shift+tab`).
7. **Runtime validation:**
   - `activeFields` with a missing id — filtered out without error;
   - an unknown `operator` — `console.warn` in dev, the field is skipped.

Use the existing `component-render.ts` helper.

---

## Phase 12 — Documentation

**Commit:** `docs(Filter): add component docs`

**File:** `docs/content/docs/2.components/filter.md`.

Structure follows the rest of the components (see `command-palette.md`, `navigation-menu.md`):

1. **Description** (1-2 paragraphs) + `Soon` badge.
2. **Usage:**
   - Basic example (`FieldConfig[]` + `v-model:modelValue` + `@apply`).
   - With presets.
   - With a custom type (`field-user` slot).
   - Adaptive (mention `useDevice`).
3. **Examples** (collapsible code blocks):
   - The example from spec section 9.10.
   - A complex example with CRM stages (via `custom`).
   - Loading presets from the server (showing where REST goes on the consumer's side).
4. **API:**
   - Props table (auto-generated via the docs component parser — check how `CommandPalette` does it).
   - Emits.
   - Slots.
   - Theme (slots from `src/theme/filter.ts`).

---

## Phase 13 — Playground

**Commit:** `chore(Filter): add playground page`

**Files:**
- `playgrounds/nuxt/app/pages/components/filter.vue` — interactive demo.
- `playgrounds/vue/src/pages/components/filter.vue` — same for the Vue playground.

In the demo:
- toggles for `loading`, `visibleTagsCount`, `allowSavePresets`, `allowReorderFields`;
- 6-7 fields of different types, including `custom`;
- 2-3 presets (one system, one pinned);
- a "simulate REST" button: 500 ms delay before presets refresh.

---

## Phase 14 — Skill

**Commit:** `docs(skill): document Filter`

- `skills/b24-ui-nuxt/references/components.md` — add a `Filter` section with links to the docs and a short description.
- If `recipes/` exists — add a "CRM filter with employee list" recipe (optional).
- Make sure `skills/b24-ui-nuxt/index.json` or its equivalent indexes the new component (if such a scheme is used — look at how the last component was added).

---

## Phase 15 — Production checks

**Commit:** `chore(Filter): final QA`

- `pnpm run lint` — fix everything.
- `pnpm run typecheck` — no errors.
- `pnpm run test` — snapshots ok, new tests green.
- `pnpm run docs` — builds with no warnings.
- Manual smoke in `pnpm run dev` (Nuxt playground) and `pnpm run dev:vue`.
- Mobile snapshot: open the Chrome DevTools device toolbar, verify the `Drawer` shows up and DnD works on touch.

---

## Dependencies and decisions to confirm

1. **DnD library:** plan is `@vueuse/integrations/useSortable` + `sortablejs`. Alternative — `vue-draggable-plus`. Decide when phase 9 starts.
2. **Currency on `FieldConfig` vs in `FilterValue.value`:** keep as in the spec — on `FieldConfig`. Migrate to `value: { amount, currency }` later if multi-currency is needed.
3. **Subcomponent exports:** only `Filter` for now. Expose `FilterBar`/`FilterPresets`/`FilterFieldsEditor` later without a breaking change if asked.
4. **URL synchronisation:** not now (spec section 14 — deferred).
5. **`Modal` for delete confirm:** use `useOverlay` + the existing `Modal` (verify it exists).

---

## Phase dependency graph

```
1 (types)
├── 2 (theme)
└── 3 (scaffold)
    ├── 4 (FilterBar)
    ├── 5 (Panel + adaptive)
    ├── 6 (Presets) ─── depends on 9 (DnD)
    ├── 7 (FieldsEditor) ─── depends on 9 (DnD)
    ├── 8 (FilterField controls)
    ├── 9 (DnD wrapper)
    └── 10 (locale)
        └── 11 (tests)
            └── 12 (docs)
                └── 13 (playground)
                    └── 14 (skill)
                        └── 15 (QA)
```

Phases 4–8 + 9 + 10 can run in parallel after 3. Do 9 (DnD wrapper) first, then 6 and 7 on top.

---

## Effort estimate

- Phases 1–3: half a day.
- Phases 4–8: 2-3 days (the meat — `FilterField` for all types).
- Phase 9: half a day.
- Phase 10: 2-3 hours.
- Phase 11: a day (tests for every field type and scenario).
- Phases 12–15: a day.

Realistic total: **5-6 working days** for a single engineer, assuming all the necessary primitives (`InputTags`, `Popover`, `Drawer`, `CommandPalette`, `NavigationMenu`, `DropdownMenu`, `Form`, `Modal`, `SelectMenu`, `useOverlay`, `useDevice`) are stable — and they are.
