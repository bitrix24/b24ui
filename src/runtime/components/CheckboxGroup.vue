<script lang="ts">
import type { CheckboxGroupRootProps, CheckboxGroupRootEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/checkbox-group'
import type { CheckboxProps } from '../types'
import type { AcceptableValue, GetItemKeys, GetModelValue, GetModelValueEmits } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type CheckboxGroup = ComponentConfig<typeof theme, AppConfig, 'checkboxGroup'>

export type CheckboxGroupValue = AcceptableValue

export type CheckboxGroupItem = CheckboxGroupValue | {
  label?: string
  description?: string
  disabled?: boolean
  value?: string
  class?: any
  b24ui?: Pick<CheckboxGroup['slots'], 'item'> & Omit<Required<CheckboxProps>['b24ui'], 'root'>
  [key: string]: any
}

export interface CheckboxGroupProps<T extends CheckboxGroupItem[] = CheckboxGroupItem[], VK extends GetItemKeys<T> = 'value'> extends Pick<CheckboxGroupRootProps, 'disabled' | 'loop' | 'name' | 'required'>, Pick<CheckboxProps, 'color' | 'indicator'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  legend?: string
  /**
   * When `items` is an array of objects, select the field to use as the value.
   * @defaultValue 'value'
   */
  valueKey?: VK
  /**
   * When `items` is an array of objects, select the field to use as the label.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>
  /**
   * When `items` is an array of objects, select the field to use as the description.
   * @defaultValue 'description'
   */
  descriptionKey?: GetItemKeys<T>
  items?: T
  /** The controlled value of the CheckboxGroup. Can be bind as `v-model`. */
  modelValue?: GetModelValue<T, VK, true>
  /** The value of the CheckboxGroup when initially rendered. Use when you do not need to control the state of the CheckboxGroup. */
  defaultValue?: GetModelValue<T, VK, true>
  /**
   * @defaultValue 'md'
   */
  size?: CheckboxGroup['variants']['size']
  /**
   * @defaultValue 'list'
   */
  variant?: CheckboxGroup['variants']['variant']
  /**
   * The orientation the checkbox buttons are laid out.
   * @defaultValue 'vertical'
   */
  orientation?: CheckboxGroup['variants']['orientation']
  class?: any
  b24ui?: CheckboxGroup['slots'] & CheckboxProps['b24ui']
}

export type CheckboxGroupEmits<T extends CheckboxGroupItem[] = CheckboxGroupItem[], VK extends GetItemKeys<T> = 'value'> = Omit<CheckboxGroupRootEmits, 'update:modelValue'> & {
  change: [event: Event]
} & GetModelValueEmits<T, VK, true>

type SlotProps<T extends CheckboxGroupItem> = (props: { item: T & { id: string } }) => any

export interface CheckboxGroupSlots<T extends CheckboxGroupItem[] = CheckboxGroupItem[]> {
  legend(props?: {}): any
  label: SlotProps<T[number]>
  description: SlotProps<T[number]>
}
</script>

<script setup lang="ts" generic="T extends CheckboxGroupItem[], VK extends GetItemKeys<T> = 'value'">
import { computed, useId } from 'vue'
import { CheckboxGroupRoot, useForwardProps, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useFormField } from '../composables/useFormField'
import { get, omit } from '../utils'
import { tv } from '../utils/tv'
import B24Checkbox from './Checkbox.vue'

const props = withDefaults(defineProps<CheckboxGroupProps<T, VK>>(), {
  labelKey: 'label',
  descriptionKey: 'description',
  valueKey: 'value' as never,
  orientation: 'vertical',
  color: 'air-primary'
})
const emits = defineEmits<CheckboxGroupEmits<T, VK>>()
const slots = defineSlots<CheckboxGroupSlots<T>>()

const appConfig = useAppConfig() as CheckboxGroup['AppConfig']
const uiProp = useComponentUI('checkboxGroup', props)

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'orientation', 'loop', 'required'), emits)
const checkboxProps = useForwardProps(reactivePick(props, 'variant', 'indicator'))
const getProxySlots = () => omit(slots, ['legend'])

const { emitFormChange, emitFormInput, color, name, size, id: _id, disabled, ariaAttrs } = useFormField<CheckboxGroupProps<T>>(props, { bind: false })
const id = _id.value ?? useId()

// @ts-expect-error We skip test Checkbox.variant
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.checkboxGroup || {}) })({
  size: size.value,
  required: props.required,
  orientation: props.orientation,
  color: props.color,
  variant: props.variant,
  disabled: disabled.value
}))

function normalizeItem(item: any) {
  if (item === null) {
    return {
      id: `${id}:null`,
      value: undefined,
      label: undefined
    }
  }

  if (typeof item === 'string' || typeof item === 'number') {
    return {
      id: `${id}:${item}`,
      value: String(item),
      label: String(item)
    }
  }

  const value = get(item, props.valueKey as string)
  const label = get(item, props.labelKey as string)
  const description = get(item, props.descriptionKey as string)

  return {
    ...item,
    value,
    label,
    description,
    id: `${id}:${value}`
  }
}

const normalizedItems = computed(() => {
  if (!props.items) {
    return []
  }
  return props.items.map(normalizeItem)
})

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)
  emitFormChange()
  emitFormInput()
}
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <CheckboxGroupRoot
    :id="id"
    v-bind="rootProps"
    :name="name"
    :disabled="disabled"
    data-slot="root"
    :class="b24ui.root({ class: [uiProp?.root, props.class] })"
    @update:model-value="onUpdate"
  >
    <fieldset data-slot="fieldset" :class="b24ui.fieldset({ class: uiProp?.fieldset })" v-bind="ariaAttrs">
      <legend v-if="legend || !!slots.legend" data-slot="legend" :class="b24ui.legend({ class: uiProp?.legend })">
        <slot name="legend">
          {{ legend }}
        </slot>
      </legend>
      <B24Checkbox
        v-for="item in normalizedItems"
        :key="item.value"
        v-bind="{ ...item, ...checkboxProps }"
        :color="color"
        :size="size"
        :name="name"
        :disabled="item.disabled || disabled"
        :b24ui="{ ...(uiProp ? omit(uiProp, ['root']) : undefined), ...(item.b24ui || {}) }"
        data-slot="item"
        :class="b24ui.item({ class: [uiProp?.item, item.b24ui?.item, item.class], disabled: item.disabled || disabled })"
      >
        <template v-for="(_, name) in getProxySlots()" #[name]>
          <slot :name="(name as keyof CheckboxGroupSlots<T>)" :item="item" />
        </template>
      </B24Checkbox>
    </fieldset>
  </CheckboxGroupRoot>
</template>
