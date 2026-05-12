<script lang="ts">
import type { VNode } from 'vue'
import type {
  FilterFieldConfig,
  FilterFieldCondition,
  FilterLocale,
  FilterOperator,
  FilterDateValue
} from '../types/filter'

export interface FilterFieldProps {
  field: FilterFieldConfig
  condition: FilterFieldCondition | null
  locale: FilterLocale
  loading?: boolean
  disabled?: boolean
  allowReorder?: boolean
  isFirst?: boolean
  isLast?: boolean
  b24ui: any
  uiClasses?: any
}

export interface FilterFieldEmits {
  (e: 'update', condition: FilterFieldCondition | null): void
  (e: 'remove'): void
  (e: 'move-up'): void
  (e: 'move-down'): void
}

type FieldSlotProps = {
  field: FilterFieldConfig
  condition: FilterFieldCondition | null
  update: (condition: FilterFieldCondition | null) => void
}

export interface FilterFieldSlots {
  [key: `field-${string}`]: (props: FieldSlotProps) => VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import DragLIcon from '@bitrix24/b24icons-vue/outline/DragLIcon'
import CrossLIcon from '@bitrix24/b24icons-vue/outline/CrossLIcon'
import MoreVerticalLIcon from '@bitrix24/b24icons-vue/outline/MoreVerticalLIcon'
import B24Input from './Input.vue'
import B24InputNumber from './InputNumber.vue'
import B24Select from './Select.vue'
import B24SelectMenu from './SelectMenu.vue'
import B24RadioGroup from './RadioGroup.vue'
import B24DropdownMenu from './DropdownMenu.vue'
import B24Tooltip from './Tooltip.vue'
import { defaultOperatorsForType, isStateOp } from '../utils/filter'

const props = defineProps<FilterFieldProps>()
const emits = defineEmits<FilterFieldEmits>()
defineSlots<FilterFieldSlots>()

const slotName = computed(() => {
  const kind = (props.field.customMeta?.kind as string | undefined) ?? props.field.type
  return `field-${kind}` as const
})

const operators = computed<FilterOperator[]>(() => {
  return props.field.supportedOperators ?? defaultOperatorsForType(props.field.type)
})

const currentOperator = computed<FilterOperator>(() => {
  if (props.condition) return props.condition.operator
  return operators.value[0] ?? 'eq'
})

const stateOp = computed(() => isStateOp(props.condition))

function setOperator(op: FilterOperator) {
  if (op === 'filled' || op === 'empty') {
    emits('update', { operator: op })
    return
  }
  // Reset value when switching between op shapes.
  if (op === 'between') {
    emits('update', { operator: 'between', value: [undefined, undefined] as [unknown, unknown] })
  } else if (op === 'in') {
    emits('update', { operator: 'in', value: [] })
  } else {
    emits('update', { operator: op, value: undefined } as FilterFieldCondition)
  }
}

function setValue(value: unknown) {
  const op = currentOperator.value
  if (op === 'filled' || op === 'empty') return
  if (op === 'between') {
    const prev: [unknown, unknown] = (props.condition && props.condition.operator === 'between')
      ? props.condition.value
      : [undefined, undefined]
    emits('update', { operator: 'between', value: Array.isArray(value) ? value as [unknown, unknown] : prev })
  } else if (op === 'in') {
    emits('update', { operator: 'in', value: Array.isArray(value) ? value : [] })
  } else {
    emits('update', { operator: op, value } as FilterFieldCondition)
  }
}

function setRangePart(idx: 0 | 1, value: unknown) {
  const prev = (props.condition && props.condition.operator === 'between')
    ? props.condition.value
    : [undefined, undefined]
  const next: [unknown, unknown] = [prev[0], prev[1]]
  next[idx] = value
  emits('update', { operator: 'between', value: next })
}

const currentValue = computed<unknown>(() => {
  if (!props.condition) return undefined
  if (props.condition.operator === 'filled' || props.condition.operator === 'empty') return undefined
  return (props.condition as { value: unknown }).value
})

const datePresetValue = computed<string>(() => {
  const v = currentValue.value as FilterDateValue | undefined
  if (!v) return 'any'
  return v.kind === 'preset' ? v.preset : v.kind
})

const datePresetItems = computed(() => ([
  { value: 'any', label: props.locale.datePresets.any },
  { value: 'today', label: props.locale.datePresets.today },
  { value: 'yesterday', label: props.locale.datePresets.yesterday },
  { value: 'tomorrow', label: props.locale.datePresets.tomorrow },
  { value: 'this-week', label: props.locale.datePresets['this-week'] },
  { value: 'last-week', label: props.locale.datePresets['last-week'] },
  { value: 'this-month', label: props.locale.datePresets['this-month'] },
  { value: 'last-month', label: props.locale.datePresets['last-month'] },
  { value: 'this-quarter', label: props.locale.datePresets['this-quarter'] },
  { value: 'last-quarter', label: props.locale.datePresets['last-quarter'] },
  { value: 'this-year', label: props.locale.datePresets['this-year'] }
]))

function setDatePreset(preset: string) {
  const dateValue: FilterDateValue = preset === 'any'
    ? { kind: 'any' }
    : { kind: 'preset', preset: preset as FilterDateValue extends { preset: infer P } ? P : never }
  emits('update', { operator: 'eq', value: dateValue })
}

const booleanItems = computed(() => ([
  { value: 'any', label: props.locale.boolean.any },
  { value: 'true', label: props.locale.boolean.yes },
  { value: 'false', label: props.locale.boolean.no }
]))

const booleanValue = computed<string>(() => {
  if (!props.condition || props.condition.operator !== 'eq') return 'any'
  return (props.condition.value === true || props.condition.value === 'true') ? 'true' : 'false'
})

function setBoolean(v: string) {
  if (v === 'any') {
    emits('update', null)
  } else {
    emits('update', { operator: 'eq', value: v === 'true' })
  }
}

const operatorItems = computed(() =>
  operators.value
    .filter(op => op !== 'filled' && op !== 'empty')
    .map(op => ({ value: op, label: props.locale.operators[op] }))
)

const menuItems = computed(() => {
  const items: any[] = []
  if (props.field.allowFilled !== false) {
    items.push([
      {
        label: props.locale.actions.fieldFilled,
        onSelect: () => emits('update', { operator: 'filled' }),
        checked: props.condition?.operator === 'filled'
      },
      {
        label: props.locale.actions.fieldEmpty,
        onSelect: () => emits('update', { operator: 'empty' }),
        checked: props.condition?.operator === 'empty'
      }
    ])
  }
  if (props.condition) {
    items.push([{
      label: props.locale.actions.clearValue,
      onSelect: () => emits('update', null)
    }])
  }
  if (props.allowReorder) {
    items.push([
      {
        label: props.locale.actions.moveUp,
        disabled: props.isFirst,
        onSelect: () => emits('move-up')
      },
      {
        label: props.locale.actions.moveDown,
        disabled: props.isLast,
        onSelect: () => emits('move-down')
      }
    ])
  }
  return items
})

const hideValueControl = computed(() => stateOp.value)
</script>

<template>
  <div
    data-slot="field"
    :class="props.b24ui.field({ class: [props.uiClasses?.field] })"
  >
    <B24Tooltip
      v-if="props.allowReorder && !props.field.pinned"
      :text="props.locale.tooltips.dragField"
    >
      <button
        type="button"
        data-drag-handle
        :aria-label="props.locale.tooltips.dragField"
        :class="props.b24ui.fieldDragHandle({ class: [props.uiClasses?.fieldDragHandle] })"
      >
        <DragLIcon class="size-4" />
      </button>
    </B24Tooltip>

    <div :class="props.b24ui.fieldBody({ class: [props.uiClasses?.fieldBody] })">
      <label
        :class="props.b24ui.fieldLabel({ class: [props.uiClasses?.fieldLabel] })"
      >
        {{ props.field.label }}
      </label>

      <slot
        :name="slotName"
        :field="props.field"
        :condition="props.condition"
        :update="(c: FilterFieldCondition | null) => emits('update', c)"
      >
        <template v-if="props.field.type === 'string'">
          <B24Input
            :model-value="hideValueControl ? '' : (currentValue as string | undefined) ?? ''"
            :placeholder="props.field.placeholder ?? props.locale.placeholders.value"
            :disabled="props.disabled || hideValueControl"
            class="w-full"
            @update:model-value="(v: string) => setValue(v)"
          />
        </template>

        <template v-else-if="props.field.type === 'number' || props.field.type === 'money'">
          <div :class="props.b24ui.fieldControl({ class: [props.uiClasses?.fieldControl] })">
            <B24Select
              v-if="operatorItems.length > 1"
              :model-value="currentOperator as any"
              :items="operatorItems"
              :disabled="props.disabled || hideValueControl"
              class="min-w-[120px]"
              @update:model-value="(v: any) => setOperator(v as FilterOperator)"
            />
            <template v-if="currentOperator === 'between'">
              <B24InputNumber
                :model-value="((currentValue as any[])?.[0]) as number | undefined"
                :disabled="props.disabled || hideValueControl"
                class="flex-1"
                @update:model-value="(v: number) => setRangePart(0, v)"
              />
              <B24InputNumber
                :model-value="((currentValue as any[])?.[1]) as number | undefined"
                :disabled="props.disabled || hideValueControl"
                class="flex-1"
                @update:model-value="(v: number) => setRangePart(1, v)"
              />
            </template>
            <template v-else>
              <B24InputNumber
                :model-value="(currentValue as number | undefined)"
                :disabled="props.disabled || hideValueControl"
                class="flex-1"
                @update:model-value="(v: number) => setValue(v)"
              />
            </template>
          </div>
        </template>

        <template v-else-if="props.field.type === 'date'">
          <B24Select
            :model-value="datePresetValue"
            :items="datePresetItems"
            :disabled="props.disabled || hideValueControl"
            class="w-full"
            @update:model-value="(v: any) => setDatePreset(v as string)"
          />
        </template>

        <template v-else-if="props.field.type === 'time'">
          <B24Input
            type="time"
            :model-value="(currentValue as string | undefined) ?? ''"
            :disabled="props.disabled || hideValueControl"
            class="w-full"
            @update:model-value="(v: string) => setValue(v)"
          />
        </template>

        <template v-else-if="props.field.type === 'select'">
          <B24Select
            :model-value="currentValue"
            :items="(props.field.options ?? []) as any"
            :disabled="props.disabled || hideValueControl"
            class="w-full"
            @update:model-value="(v: any) => setValue(v)"
          />
        </template>

        <template v-else-if="props.field.type === 'multiselect'">
          <B24SelectMenu
            :model-value="(currentValue as unknown[]) ?? []"
            :items="(props.field.options ?? []) as any"
            multiple
            :disabled="props.disabled || hideValueControl"
            class="w-full"
            @update:model-value="(v: any) => setValue(v as unknown[])"
          />
        </template>

        <template v-else-if="props.field.type === 'boolean'">
          <B24RadioGroup
            :model-value="booleanValue"
            :items="booleanItems"
            :disabled="props.disabled || hideValueControl"
            orientation="horizontal"
            @update:model-value="(v: any) => setBoolean(v as string)"
          />
        </template>
      </slot>
    </div>

    <B24DropdownMenu
      :items="menuItems"
    >
      <button
        type="button"
        :class="props.b24ui.fieldMenuTrigger({ class: [props.uiClasses?.fieldMenuTrigger] })"
        :aria-label="props.locale.tooltips.settings"
      >
        <MoreVerticalLIcon class="size-4" />
      </button>
    </B24DropdownMenu>

    <button
      v-if="!props.field.pinned && props.field.removable !== false"
      type="button"
      :class="props.b24ui.fieldRemove({ class: [props.uiClasses?.fieldRemove] })"
      :aria-label="props.locale.tooltips.removeField"
      @click="emits('remove')"
    >
      <CrossLIcon class="size-4" />
    </button>
  </div>
</template>
