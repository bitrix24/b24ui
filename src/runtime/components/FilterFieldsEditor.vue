<script lang="ts">
import type { VNode } from 'vue'
import type {
  FilterFieldConfig,
  FilterFieldCondition,
  FilterValue,
  FilterLocale
} from '../types/filter'

export interface FilterFieldsEditorProps {
  fields: FilterFieldConfig[]
  fieldMap: Map<string, FilterFieldConfig>
  activeFields: string[]
  values: FilterValue
  defaultFields?: string[]
  allowReorderFields?: boolean
  loading?: boolean
  disabled?: boolean
  locale: FilterLocale
  b24ui: any
  uiClasses?: any
  isMobile?: boolean
}

export type FilterFieldsEditorEmits = {
  'apply': []
  'reset': []
  'fields-reset': []
  'add-field': [id: string]
  'remove-field': [id: string]
  'reorder-fields': [ids: string[]]
  'update-condition': [id: string, condition: FilterFieldCondition | null]
}

type FieldSlotProps = {
  field: FilterFieldConfig
  condition: FilterFieldCondition | null
  update: (condition: FilterFieldCondition | null) => void
}

export interface FilterFieldsEditorSlots {
  [key: `field-${string}`]: (props: FieldSlotProps) => VNode[]
  'empty-fields'?(): VNode[]
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import B24Button from './Button.vue'
import B24CommandPalette from './CommandPalette.vue'
import B24Popover from './Popover.vue'
import FilterField from './FilterField.vue'
import FilterSortableList from './FilterSortableList.vue'

const props = defineProps<FilterFieldsEditorProps>()
const emits = defineEmits<FilterFieldsEditorEmits>()
const slots = defineSlots<FilterFieldsEditorSlots>()

const activeFieldConfigs = computed(() =>
  props.activeFields
    .map(id => props.fieldMap.get(id))
    .filter((f): f is FilterFieldConfig => !!f)
)

const showAddField = ref(false)

const availableFields = computed(() => {
  const activeSet = new Set(props.activeFields)
  return props.fields.filter(f => !activeSet.has(f.id))
})

const fieldGroups = computed(() => {
  const groups = new Map<string, { id: string, label: string, items: any[] }>()
  for (const f of availableFields.value) {
    const groupId = f.group ?? '_default'
    const groupLabel = f.groupLabel ?? f.group ?? ''
    if (!groups.has(groupId)) groups.set(groupId, { id: groupId, label: groupLabel, items: [] })
    groups.get(groupId)!.items.push({
      id: f.id,
      label: f.label,
      onSelect: () => {
        emits('add-field', f.id)
        showAddField.value = false
      }
    })
  }
  return Array.from(groups.values()).map(g => ({
    id: g.id,
    label: g.label,
    items: g.items
  }))
})

function onUpdate(id: string, condition: any) {
  emits('update-condition', id, condition)
}

function onMoveUp(id: string) {
  const i = props.activeFields.indexOf(id)
  if (i <= 0) return
  const next = [...props.activeFields]
  ;[next[i - 1], next[i]] = [next[i]!, next[i - 1]!]
  emits('reorder-fields', next)
}

function onMoveDown(id: string) {
  const i = props.activeFields.indexOf(id)
  if (i < 0 || i >= props.activeFields.length - 1) return
  const next = [...props.activeFields]
  ;[next[i], next[i + 1]] = [next[i + 1]!, next[i]!]
  emits('reorder-fields', next)
}

const sortableValue = computed({
  get: () => activeFieldConfigs.value,
  set: (value: FilterFieldConfig[]) => {
    emits('reorder-fields', value.map(f => f.id))
  }
})
</script>

<template>
  <div
    data-slot="fields-editor"
    :class="props.b24ui.fieldsEditor({ class: [props.uiClasses?.fieldsEditor] })"
  >
    <div
      v-if="activeFieldConfigs.length === 0"
      :class="props.b24ui.emptyFields({ class: [props.uiClasses?.emptyFields] })"
    >
      <slot name="empty-fields">
        {{ props.locale.empty.fields }}
      </slot>
    </div>

    <div
      v-else
      :class="props.b24ui.fieldsList({ class: [props.uiClasses?.fieldsList] })"
    >
      <FilterSortableList
        v-model="sortableValue"
        :disabled="!props.allowReorderFields || props.disabled"
        :as="'div'"
        class="contents"
      >
        <template #default="{ item, index }">
          <FilterField
            :key="item.id"
            :field="item"
            :condition="props.values[item.id] ?? null"
            :locale="props.locale"
            :loading="props.loading"
            :disabled="props.disabled"
            :allow-reorder="props.allowReorderFields"
            :is-first="index === 0"
            :is-last="index === props.activeFields.length - 1"
            :b24ui="props.b24ui"
            :ui-classes="props.uiClasses"
            @update="(c) => onUpdate(item.id, c)"
            @remove="emits('remove-field', item.id)"
            @move-up="onMoveUp(item.id)"
            @move-down="onMoveDown(item.id)"
          >
            <template
              v-for="(_, name) in slots"
              #[name]="slotProps"
            >
              <slot :name="name" v-bind="slotProps as any" />
            </template>
          </FilterField>
        </template>
      </FilterSortableList>
    </div>

    <div :class="props.b24ui.addFieldRow({ class: [props.uiClasses?.addFieldRow] })">
      <B24Popover v-model:open="showAddField">
        <B24Button
          variant="link"
          type="button"
          :disabled="props.disabled || availableFields.length === 0"
        >
          + {{ props.locale.actions.addField }}
        </B24Button>
        <template #content>
          <div class="w-[320px]">
            <B24CommandPalette
              :groups="fieldGroups as any"
              :placeholder="props.locale.placeholders.search"
              :close="false"
            />
          </div>
        </template>
      </B24Popover>

      <B24Button
        v-if="props.defaultFields && props.defaultFields.length"
        variant="link"
        color="air-secondary-no-accent"
        type="button"
        :disabled="props.disabled"
        @click="emits('fields-reset')"
      >
        {{ props.locale.actions.resetFields }}
      </B24Button>
    </div>

    <div :class="props.b24ui.actions({ class: [props.uiClasses?.actions] })">
      <B24Button
        color="air-primary"
        type="button"
        :loading="props.loading"
        :disabled="props.disabled"
        @click="emits('apply')"
      >
        {{ props.locale.actions.apply }}
      </B24Button>
      <B24Button
        color="air-secondary-no-accent"
        type="button"
        :disabled="props.disabled"
        @click="emits('reset')"
      >
        {{ props.locale.actions.reset }}
      </B24Button>
    </div>
  </div>
</template>
