import type { IconComponent } from './icons'
import type { AvatarProps } from '../components/Avatar.vue'

/**
 * Field types supported in the core.
 * Extension — via type 'custom' + slot `field-{type}` (or `field-{customMeta.kind}`).
 */
export type FilterFieldType =
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
 * `filled` / `empty` describe data state in the record (value present / absent), not a UI mode.
 */
export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'between'
  | 'in'
  | 'contains'
  | 'startsWith'
  | 'filled'
  | 'empty'

export interface FilterFieldOption {
  value: string | number
  label: string
  icon?: IconComponent
  avatar?: AvatarProps
  disabled?: boolean
}

export interface FilterFieldConfig {
  /** Unique field id */
  id: string
  /** Label above the control */
  label: string
  /** Control type */
  type: FilterFieldType

  /** Group id for the field picker (any logical split: system/user, entity, etc.) */
  group?: string
  /** Visible group label (defaults to `group`) */
  groupLabel?: string

  /** Always active: cannot be removed, not reset by "Reset to defaults" */
  pinned?: boolean
  /** Whether the field can be removed from the active set. Defaults to true (unless pinned) */
  removable?: boolean

  /** Available operators. Falls back to the default set per type if omitted */
  supportedOperators?: FilterOperator[]
  /** Whether "Filled / Not filled" is available in the `...` menu. Default true */
  allowFilled?: boolean

  /** Input placeholder */
  placeholder?: string
  /** Helper text under the field */
  description?: string

  /** For `select` / `multiselect` */
  options?: FilterFieldOption[]
  /** For `money` — fixed field-level currency. If omitted, currency lives in the value */
  currency?: string
  /** For `number` / `date` */
  min?: number | string
  /** For `number` / `date` */
  max?: number | string

  /** Arbitrary metadata for custom-type slots */
  customMeta?: Record<string, unknown>
}

/**
 * Condition for a single field = operator + (optional) value.
 * Discriminated union by `operator` for strict value typing.
 */
export type FilterFieldCondition =
  | { operator: 'filled' }
  | { operator: 'empty' }
  | { operator: 'between', value: [unknown, unknown] }
  | { operator: 'in', value: unknown[] }
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
 * Fields without a value are NOT in the map (use `activeFields` for active set).
 * The "+6" badge in FilterBar is computed from the number of keys here.
 */
export type FilterValue = Record<string, FilterFieldCondition>

/** Bitrix-style date range presets */
export type FilterDatePreset =
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
 * Value for FilterFieldCondition.value when the field type is `date`.
 */
export type FilterDateValue =
  | { kind: 'any' }
  | { kind: 'preset', preset: FilterDatePreset }
  | { kind: 'exact', date: string }
  | { kind: 'range', from: string, to: string }
  | { kind: 'relative', days: number, direction: 'past' | 'future' }

export interface FilterPreset {
  /** Unique id */
  id: string
  /** Visible name */
  name: string

  /** Active fields in order */
  fields: string[]
  /** Field values */
  values: FilterValue
  /** Saved free-text search query (optional) */
  searchQuery?: string

  /** System preset — cannot be deleted or renamed */
  system?: boolean
  /**
   * Activated on initial load.
   * The system expects at most one pinned preset
   * (the component does not validate — the consumer's responsibility).
   */
  pinned?: boolean
  /** Order in the preset list */
  order?: number
}

/**
 * One item in the v-model array of InputTags inside FilterBar.
 * Slot `item-text` renders each tag based on `kind`.
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
    label: string
    condition: FilterFieldCondition
  }
  | {
    kind: 'counter'
    hiddenCount: number
  }

/**
 * Localization strings for the Filter component.
 * Defaults are in Russian, override via the `locale` prop.
 */
export interface FilterLocale {
  actions: {
    apply: string
    reset: string
    addField: string
    resetFields: string
    saveFilter: string
    cancel: string
    rename: string
    delete: string
    pin: string
    unpin: string
    moveUp: string
    moveDown: string
    clearValue: string
    fieldFilled: string
    fieldEmpty: string
  }
  operators: Record<FilterOperator, string>
  datePresets: Record<FilterDatePreset | 'any' | 'exact' | 'range' | 'relative', string>
  boolean: {
    yes: string
    no: string
    any: string
  }
  tooltips: {
    dragField: string
    removeField: string
    search: string
    settings: string
    clear: string
  }
  placeholders: {
    search: string
    presetName: string
    value: string
  }
  empty: {
    fields: string
    presets: string
  }
  confirms: {
    deletePreset: string
  }
}
