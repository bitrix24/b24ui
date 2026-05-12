<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/filter'
import type { ComponentConfig } from '../types/tv'
import type {
  FilterFieldConfig,
  FilterFieldCondition,
  FilterValue,
  FilterPreset,
  FilterLocale,
  FilterBarTag
} from '../types/filter'

type Filter = ComponentConfig<typeof theme, AppConfig, 'filter'>

export interface FilterProps {
  /** All available field configs */
  fields: FilterFieldConfig[]
  /** Saved presets */
  presets?: FilterPreset[]

  /** Current field values. v-model */
  modelValue?: FilterValue
  /** Active field ids in display order. v-model:activeFields */
  activeFields?: string[]
  /** Active preset id, or null. v-model:activePresetId */
  activePresetId?: string | null
  /** Free-text search. v-model:searchQuery */
  searchQuery?: string

  /** Default field set for "Reset to defaults" */
  defaultFields?: string[]
  /** Number of condition chips visible in the bar before collapsing to "+N" */
  visibleTagsCount?: number
  /** Search debounce delay in ms */
  searchDebounce?: number
  /** Loading state for the apply action */
  loading?: boolean
  /** Disabled state for the whole filter */
  disabled?: boolean

  /** Allow saving new presets */
  allowSavePresets?: boolean
  /** Allow editing presets (rename, delete, pin) */
  allowEditPresets?: boolean
  /** Allow drag-and-drop reordering of fields */
  allowReorderFields?: boolean
  /** Allow drag-and-drop reordering of presets */
  allowReorderPresets?: boolean

  /** Locale overrides */
  locale?: Partial<FilterLocale>

  /**
   * @defaultValue 'md'
   */
  size?: Filter['variants']['size']

  as?: any
  class?: any
  b24ui?: Filter['slots']
}

export type FilterEmits = {
  'update:modelValue': [value: FilterValue]
  'update:activeFields': [fields: string[]]
  'update:activePresetId': [id: string | null]
  'update:searchQuery': [query: string]
  /** "Find" pressed or Enter in search. AND between values and query. */
  'apply': [payload: { values: FilterValue, query: string, presetId: string | null }]
  /** "Reset" — clears values, keeps the active field set. */
  'reset': []
  /** "Reset to default fields" — restores the default field set. */
  'fieldsReset': []
  /** Save the current state as a new preset. */
  'presetSave': [payload: { name: string, preset: Omit<FilterPreset, 'id'> }]
  /** Update a preset (rename, pin, order). */
  'presetUpdate': [payload: { id: string, patch: Partial<FilterPreset> }]
  /** Delete a preset. */
  'presetDelete': [id: string]
}

type FieldSlotProps = {
  field: FilterFieldConfig
  condition: FilterFieldCondition | null
  update: (condition: FilterFieldCondition | null) => void
}

export interface FilterSlots {
  /** Custom renderer for a built-in field type or a `custom` type via its `customMeta.kind` */
  [key: `field-${string}`]: (props: FieldSlotProps) => VNode[]
  /** Extra actions inside a preset's DropdownMenu */
  'preset-actions'?(props: { preset: FilterPreset }): VNode[]
  /** Placeholder when there are no active fields */
  'empty-fields'?(): VNode[]
  /** Custom FilterBar (override of the built-in InputTags bar) */
  'bar'?(props: {
    tags: FilterBarTag[]
    searchQuery: string
    open: () => void
    apply: () => void
    reset: () => void
  }): VNode[]
}
</script>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useAppConfig } from '#imports'
import { useDevice } from '../composables/useDevice'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'
import { defaultFilterLocale } from '../locale/filter'
import { isKnownOperator } from '../utils/filter'
import B24Popover from './Popover.vue'
import B24Drawer from './Drawer.vue'
import FilterBar from './FilterBar.vue'
import FilterPanel from './FilterPanel.vue'

const _props = withDefaults(defineProps<FilterProps>(), {
  visibleTagsCount: 3,
  searchDebounce: 300,
  allowSavePresets: true,
  allowEditPresets: true,
  allowReorderFields: true,
  allowReorderPresets: true,
  loading: false,
  disabled: false
})
const emits = defineEmits<FilterEmits>()
const slots = defineSlots<FilterSlots>()

const props = useComponentProps<FilterProps>('filter', _props)

const appConfig = useAppConfig() as Filter['AppConfig']

const { screen } = useDevice()
const isMobile = computed(() => !screen.value.md)

const open = ref(false)

const localeStrings = computed<FilterLocale>(() => {
  const override = props.locale ?? {}
  return {
    ...defaultFilterLocale,
    ...override,
    actions: { ...defaultFilterLocale.actions, ...(override.actions ?? {}) },
    operators: { ...defaultFilterLocale.operators, ...(override.operators ?? {}) },
    datePresets: { ...defaultFilterLocale.datePresets, ...(override.datePresets ?? {}) },
    boolean: { ...defaultFilterLocale.boolean, ...(override.boolean ?? {}) },
    tooltips: { ...defaultFilterLocale.tooltips, ...(override.tooltips ?? {}) },
    placeholders: { ...defaultFilterLocale.placeholders, ...(override.placeholders ?? {}) },
    empty: { ...defaultFilterLocale.empty, ...(override.empty ?? {}) },
    confirms: { ...defaultFilterLocale.confirms, ...(override.confirms ?? {}) }
  }
})

const allFields = computed(() => props.fields ?? [])
const fieldMap = computed(() => {
  const map = new Map<string, FilterFieldConfig>()
  for (const f of allFields.value) map.set(f.id, f)
  return map
})

const safeActiveFields = computed(() => {
  const ids = props.activeFields ?? []
  return ids.filter(id => fieldMap.value.has(id))
})

const safeValues = computed<FilterValue>(() => {
  const v = props.modelValue ?? {}
  const out: FilterValue = {}
  for (const [k, cond] of Object.entries(v)) {
    if (!fieldMap.value.has(k)) continue
    if (!cond || !isKnownOperator((cond as any).operator)) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[Filter] skipping field "${k}" — unknown operator`, cond)
      }
      continue
    }
    out[k] = cond
  }
  return out
})

const sortedPresets = computed(() => {
  return [...(props.presets ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
})

const activePreset = computed(() => {
  if (props.activePresetId == null) return null
  return sortedPresets.value.find(p => p.id === props.activePresetId) ?? null
})

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.filter || {}) })({
  size: props.size,
  open: open.value,
  loading: props.loading
}))

function setValues(value: FilterValue) {
  emits('update:modelValue', value)
}

function setActiveFields(value: string[]) {
  emits('update:activeFields', value)
}

function setSearchQuery(query: string) {
  emits('update:searchQuery', query)
}

function setActivePresetId(id: string | null) {
  emits('update:activePresetId', id)
}

function updateCondition(fieldId: string, condition: FilterFieldCondition | null) {
  if (condition === null) {
    const next: FilterValue = {}
    for (const [k, v] of Object.entries(safeValues.value)) {
      if (k !== fieldId) next[k] = v
    }
    setValues(next)
  } else {
    setValues({ ...safeValues.value, [fieldId]: condition })
  }
}

function addField(fieldId: string) {
  if (safeActiveFields.value.includes(fieldId)) return
  setActiveFields([...safeActiveFields.value, fieldId])
}

function removeField(fieldId: string) {
  const field = fieldMap.value.get(fieldId)
  if (field?.pinned) return
  setActiveFields(safeActiveFields.value.filter(id => id !== fieldId))
  if (safeValues.value[fieldId]) {
    const next: FilterValue = {}
    for (const [k, v] of Object.entries(safeValues.value)) {
      if (k !== fieldId) next[k] = v
    }
    setValues(next)
  }
}

function reorderFields(ids: string[]) {
  setActiveFields(ids)
}

async function applyPreset(presetId: string) {
  const preset = sortedPresets.value.find(p => p.id === presetId)
  if (!preset) return
  setActivePresetId(presetId)
  await nextTick()
  setActiveFields([...preset.fields])
  setValues({ ...preset.values })
  if (preset.searchQuery !== undefined) {
    setSearchQuery(preset.searchQuery)
  }
}

function apply() {
  emits('apply', {
    values: safeValues.value,
    query: props.searchQuery ?? '',
    presetId: props.activePresetId ?? null
  })
}

function reset() {
  setValues({})
  emits('reset')
}

function fieldsReset() {
  if (props.defaultFields) {
    setActiveFields([...props.defaultFields])
  }
  emits('fieldsReset')
}

function savePreset(name: string) {
  emits('presetSave', {
    name,
    preset: {
      name,
      fields: [...safeActiveFields.value],
      values: { ...safeValues.value },
      searchQuery: props.searchQuery
    }
  })
}

function updatePreset(id: string, patch: Partial<FilterPreset>) {
  emits('presetUpdate', { id, patch })
}

function deletePreset(id: string) {
  emits('presetDelete', id)
  if (props.activePresetId === id) {
    setActivePresetId(null)
  }
}

function openPanel() {
  if (props.disabled) return
  open.value = true
}

function closePanel() {
  open.value = false
}

// Auto-pin: activate the pinned preset on first mount when nothing is selected.
let appliedInitialPin = false
watch(
  () => [sortedPresets.value, props.activePresetId] as const,
  ([presets, activeId]) => {
    if (appliedInitialPin) return
    if (activeId) {
      appliedInitialPin = true
      return
    }
    const pinned = presets.find(p => p.pinned)
    if (pinned) {
      appliedInitialPin = true
      applyPreset(pinned.id)
    }
  },
  { immediate: true }
)

defineExpose({
  applyPreset,
  apply,
  reset,
  openPanel,
  closePanel
})
</script>

<template>
  <div
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
  >
    <slot
      name="bar"
      :tags="[]"
      :search-query="props.searchQuery ?? ''"
      :open="openPanel"
      :apply="apply"
      :reset="reset"
    >
      <FilterBar
        :fields="allFields"
        :field-map="fieldMap"
        :active-fields="safeActiveFields"
        :values="safeValues"
        :search-query="props.searchQuery ?? ''"
        :active-preset="activePreset"
        :visible-tags-count="props.visibleTagsCount"
        :search-debounce="props.searchDebounce"
        :loading="props.loading"
        :disabled="props.disabled"
        :locale="localeStrings"
        :b24ui="b24ui"
        :ui-classes="props.b24ui"
        @open="openPanel"
        @apply="apply"
        @reset="reset"
        @update:search-query="setSearchQuery"
        @update:active-preset-id="setActivePresetId"
        @remove-condition="(id: string) => updateCondition(id, null)"
      />
    </slot>

    <B24Popover
      v-if="!isMobile"
      v-model:open="open"
      :reference="undefined"
      :content="{ side: 'bottom', align: 'start', sideOffset: 6 }"
    >
      <template #anchor>
        <span class="block" />
      </template>
      <template #content>
        <FilterPanel
          :fields="allFields"
          :field-map="fieldMap"
          :active-fields="safeActiveFields"
          :values="safeValues"
          :presets="sortedPresets"
          :active-preset-id="props.activePresetId ?? null"
          :default-fields="props.defaultFields"
          :allow-save-presets="props.allowSavePresets"
          :allow-edit-presets="props.allowEditPresets"
          :allow-reorder-fields="props.allowReorderFields"
          :allow-reorder-presets="props.allowReorderPresets"
          :loading="props.loading"
          :disabled="props.disabled"
          :locale="localeStrings"
          :b24ui="b24ui"
          :ui-classes="props.b24ui"
          :is-mobile="false"
          @apply="apply"
          @reset="reset"
          @fields-reset="fieldsReset"
          @add-field="addField"
          @remove-field="removeField"
          @reorder-fields="reorderFields"
          @update-condition="updateCondition"
          @apply-preset="applyPreset"
          @save-preset="savePreset"
          @update-preset="updatePreset"
          @delete-preset="deletePreset"
        >
          <template
            v-for="(_, name) in slots"
            #[name]="slotProps"
          >
            <slot :name="name" v-bind="slotProps as any" />
          </template>
        </FilterPanel>
      </template>
    </B24Popover>

    <B24Drawer
      v-else
      v-model:open="open"
    >
      <template #body>
        <FilterPanel
          :fields="allFields"
          :field-map="fieldMap"
          :active-fields="safeActiveFields"
          :values="safeValues"
          :presets="sortedPresets"
          :active-preset-id="props.activePresetId ?? null"
          :default-fields="props.defaultFields"
          :allow-save-presets="props.allowSavePresets"
          :allow-edit-presets="props.allowEditPresets"
          :allow-reorder-fields="props.allowReorderFields"
          :allow-reorder-presets="props.allowReorderPresets"
          :loading="props.loading"
          :disabled="props.disabled"
          :locale="localeStrings"
          :b24ui="b24ui"
          :ui-classes="props.b24ui"
          :is-mobile="true"
          @apply="apply"
          @reset="reset"
          @fields-reset="fieldsReset"
          @add-field="addField"
          @remove-field="removeField"
          @reorder-fields="reorderFields"
          @update-condition="updateCondition"
          @apply-preset="applyPreset"
          @save-preset="savePreset"
          @update-preset="updatePreset"
          @delete-preset="deletePreset"
        >
          <template
            v-for="(_, name) in slots"
            #[name]="slotProps"
          >
            <slot :name="name" v-bind="slotProps as any" />
          </template>
        </FilterPanel>
      </template>
    </B24Drawer>
  </div>
</template>
