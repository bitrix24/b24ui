<script lang="ts">
import type { VNode } from 'vue'
import type {
  FilterFieldConfig,
  FilterFieldCondition,
  FilterValue,
  FilterPreset,
  FilterLocale
} from '../types/filter'

export interface FilterPanelProps {
  fields: FilterFieldConfig[]
  fieldMap: Map<string, FilterFieldConfig>
  activeFields: string[]
  values: FilterValue
  presets: FilterPreset[]
  activePresetId: string | null
  defaultFields?: string[]
  allowSavePresets?: boolean
  allowEditPresets?: boolean
  allowReorderFields?: boolean
  allowReorderPresets?: boolean
  loading?: boolean
  disabled?: boolean
  locale: FilterLocale
  b24ui: any
  uiClasses?: any
  isMobile?: boolean
}

export type FilterPanelEmits = {
  'apply': []
  'reset': []
  'fields-reset': []
  'add-field': [id: string]
  'remove-field': [id: string]
  'reorder-fields': [ids: string[]]
  'update-condition': [id: string, condition: FilterFieldCondition | null]
  'apply-preset': [id: string]
  'save-preset': [name: string]
  'update-preset': [id: string, patch: Partial<FilterPreset>]
  'delete-preset': [id: string]
}

type FieldSlotProps = {
  field: FilterFieldConfig
  condition: FilterFieldCondition | null
  update: (condition: FilterFieldCondition | null) => void
}

export interface FilterPanelSlots {
  [key: `field-${string}`]: (props: FieldSlotProps) => VNode[]
  'preset-actions'?(props: { preset: FilterPreset }): VNode[]
  'empty-fields'?(): VNode[]
}
</script>

<script setup lang="ts">
import FilterPresets from './FilterPresets.vue'
import FilterFieldsEditor from './FilterFieldsEditor.vue'

const props = defineProps<FilterPanelProps>()
const emits = defineEmits<FilterPanelEmits>()
const slots = defineSlots<FilterPanelSlots>()
</script>

<template>
  <div
    data-slot="panel"
    :class="props.b24ui.panel({ class: [props.uiClasses?.panel] })"
  >
    <FilterPresets
      :presets="props.presets"
      :active-preset-id="props.activePresetId"
      :allow-save-presets="props.allowSavePresets"
      :allow-edit-presets="props.allowEditPresets"
      :allow-reorder-presets="props.allowReorderPresets"
      :loading="props.loading"
      :disabled="props.disabled"
      :locale="props.locale"
      :b24ui="props.b24ui"
      :ui-classes="props.uiClasses"
      :is-mobile="props.isMobile"
      @apply-preset="(id) => emits('apply-preset', id)"
      @save-preset="(name) => emits('save-preset', name)"
      @update-preset="(id, patch) => emits('update-preset', id, patch)"
      @delete-preset="(id) => emits('delete-preset', id)"
    >
      <template
        v-if="slots['preset-actions']"
        #preset-actions="slotProps"
      >
        <slot name="preset-actions" v-bind="slotProps" />
      </template>
    </FilterPresets>

    <FilterFieldsEditor
      :fields="props.fields"
      :field-map="props.fieldMap"
      :active-fields="props.activeFields"
      :values="props.values"
      :default-fields="props.defaultFields"
      :allow-reorder-fields="props.allowReorderFields"
      :loading="props.loading"
      :disabled="props.disabled"
      :locale="props.locale"
      :b24ui="props.b24ui"
      :ui-classes="props.uiClasses"
      :is-mobile="props.isMobile"
      @apply="emits('apply')"
      @reset="emits('reset')"
      @fields-reset="emits('fields-reset')"
      @add-field="(id) => emits('add-field', id)"
      @remove-field="(id) => emits('remove-field', id)"
      @reorder-fields="(ids) => emits('reorder-fields', ids)"
      @update-condition="(id, c) => emits('update-condition', id, c)"
    >
      <template
        v-for="(_, name) in slots"
        #[name]="slotProps"
      >
        <slot :name="name" v-bind="slotProps as any" />
      </template>
    </FilterFieldsEditor>
  </div>
</template>
