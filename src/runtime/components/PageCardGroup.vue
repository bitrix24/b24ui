<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page-card-group'
import type { IconComponent, BadgeProps, PageCardProps } from '../types'
import type { AcceptableValue } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type PageCardGroup = ComponentConfig<typeof theme, AppConfig, 'pageCardGroup'>

export type PageCardGroupValue = AcceptableValue

export interface PageCardGroupItem {
  label?: string
  description?: string
  icon?: IconComponent
  value?: PageCardGroupValue
  disabled?: boolean
  category?: string
  class?: any
  [key: string]: any
}

export interface PageCardGroupProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  legend?: string
  items?: PageCardGroupItem[]
  /** The controlled value. Can be bound with `v-model`. Single value when `multiple` is false, array otherwise. */
  modelValue?: PageCardGroupValue | PageCardGroupValue[]
  /** The initial value when uncontrolled. */
  defaultValue?: PageCardGroupValue | PageCardGroupValue[]
  /**
   * @defaultValue 'value'
   */
  valueKey?: string
  /**
   * @defaultValue 'label'
   */
  labelKey?: string
  /**
   * @defaultValue 'description'
   */
  descriptionKey?: string
  /**
   * @defaultValue 'icon'
   */
  iconKey?: string
  /**
   * Item field used to group cards into sections. Set to an empty string to disable grouping.
   * @defaultValue 'category'
   */
  categoryKey?: string
  /**
   * Switch to multi-select mode (checkbox semantics, value is an array).
   * @defaultValue false
   */
  multiple?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  /**
   * Variant forwarded to each `PageCard`.
   * @defaultValue 'outline'
   */
  variant?: PageCardProps['variant']
  /**
   * Highlight color forwarded to the selected `PageCard`.
   * @defaultValue 'air-primary-success'
   */
  highlightColor?: PageCardProps['highlightColor']
  /**
   * Card orientation forwarded to each `PageCard`.
   * @defaultValue 'horizontal'
   */
  orientation?: PageCardProps['orientation']
  /**
   * Color of the corner badge shown on the selected card.
   * @defaultValue 'air-primary-success'
   */
  badgeColor?: BadgeProps['color']
  /**
   * Max columns on desktop.
   * @defaultValue 3
   */
  columns?: PageCardGroup['variants']['columns']
  class?: any
  b24ui?: PageCardGroup['slots']
}

export interface PageCardGroupSlots {
  legend?(props?: { b24ui: PageCardGroup['b24ui'] }): VNode[]
  categoryLabel?(props: { category: string, items: PageCardGroupItem[], b24ui: PageCardGroup['b24ui'] }): VNode[]
  leading?(props: { item: PageCardGroupItem, selected: boolean, b24ui: PageCardGroup['b24ui'] }): VNode[]
  badge?(props: { item: PageCardGroupItem, selected: boolean, b24ui: PageCardGroup['b24ui'] }): VNode[]
}

export type PageCardGroupEmits = {
  'update:modelValue': [value: PageCardGroupValue | PageCardGroupValue[] | undefined]
  'change': [event: Event]
}
</script>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useFormField } from '../composables/useFormField'
import { get } from '../utils'
import { tv } from '../utils/tv'
import CheckLIcon from '@bitrix24/b24icons-vue/outline/CheckLIcon'
import B24PageCard from './PageCard.vue'
import B24Badge from './Badge.vue'

const _props = withDefaults(defineProps<PageCardGroupProps>(), {
  as: 'div',
  valueKey: 'value',
  labelKey: 'label',
  descriptionKey: 'description',
  iconKey: 'icon',
  categoryKey: 'category',
  multiple: false,
  orientation: 'horizontal',
  variant: 'outline',
  highlightColor: 'air-primary-success',
  badgeColor: 'air-primary-success'
})

const emits = defineEmits<PageCardGroupEmits>()
const slots = defineSlots<PageCardGroupSlots>()

const props = useComponentProps<PageCardGroupProps>('pageCardGroup', _props)

const appConfig = useAppConfig() as PageCardGroup['AppConfig']

// Pass raw `_props` so a wrapping `<B24FormField>` keeps precedence over
// `<B24Theme :props>` / `withDefaults` / `app.config` defaults. Fall back to
// the proxy in `tv()` reads (`disabled.value` is sufficient here because the
// composable's own fallback already accepts `_props.disabled`).
const { emitFormChange, emitFormInput, name, id: _id, disabled, ariaAttrs } = useFormField<PageCardGroupProps>(_props, { bind: false })
const groupId = _id.value ?? useId()

const localValue = ref<PageCardGroupValue | PageCardGroupValue[] | undefined>(
  props.modelValue !== undefined
    ? props.modelValue
    : (props.defaultValue ?? (props.multiple ? [] : undefined))
)

const currentValue = computed<PageCardGroupValue | PageCardGroupValue[] | undefined>(() => {
  return props.modelValue !== undefined ? props.modelValue : localValue.value
})

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pageCardGroup || {}) })({
  columns: props.columns,
  disabled: disabled.value
}))

function getItemValue(item: PageCardGroupItem): PageCardGroupValue {
  if (item === null || typeof item !== 'object') return item as unknown as PageCardGroupValue
  const v = get(item, props.valueKey!)
  return (v ?? (item as any)[props.labelKey!]) as PageCardGroupValue
}

function isSelected(item: PageCardGroupItem): boolean {
  const v = getItemValue(item)
  const cur = currentValue.value
  if (props.multiple) {
    return Array.isArray(cur) && cur.includes(v)
  }
  return cur === v
}

function setValue(next: PageCardGroupValue | PageCardGroupValue[] | undefined, event: Event) {
  localValue.value = next
  emits('update:modelValue', next)
  emits('change', event)
  emitFormChange()
  emitFormInput()
}

function onItemChange(item: PageCardGroupItem, event: Event) {
  if (item.disabled || disabled.value) return
  const v = getItemValue(item)
  if (props.multiple) {
    const arr = Array.isArray(currentValue.value) ? [...currentValue.value] : []
    const idx = arr.indexOf(v)
    if (idx >= 0) arr.splice(idx, 1)
    else arr.push(v)
    setValue(arr, event)
  } else {
    setValue(v, event)
  }
}

const groupedItems = computed<{ category?: string, items: PageCardGroupItem[] }[]>(() => {
  const items = props.items ?? []
  if (!props.categoryKey) return [{ items }]
  const map = new Map<string | undefined, PageCardGroupItem[]>()
  const order: (string | undefined)[] = []
  for (const item of items) {
    const cat = (typeof item === 'object' && item !== null) ? (item as any)[props.categoryKey] as string | undefined : undefined
    if (!map.has(cat)) {
      map.set(cat, [])
      order.push(cat)
    }
    map.get(cat)!.push(item)
  }
  return order.map(cat => ({ category: cat, items: map.get(cat)! }))
})
</script>

<template>
  <component
    :is="props.as"
    :id="groupId"
    :role="props.multiple ? 'group' : 'radiogroup'"
    :aria-disabled="disabled || undefined"
    :aria-required="props.required || undefined"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
  >
    <fieldset data-slot="fieldset" :class="b24ui.fieldset({ class: props.b24ui?.fieldset })" v-bind="ariaAttrs" :disabled="disabled">
      <legend v-if="props.legend || !!slots.legend" data-slot="legend" :class="b24ui.legend({ class: props.b24ui?.legend })">
        <slot name="legend" :b24ui="b24ui">
          {{ props.legend }}
        </slot>
      </legend>

      <div
        v-for="(group, gi) in groupedItems"
        :key="group.category ?? `group:${gi}`"
        data-slot="group"
        :class="b24ui.group({ class: props.b24ui?.group })"
      >
        <div
          v-if="group.category"
          data-slot="categoryLabel"
          :class="b24ui.categoryLabel({ class: props.b24ui?.categoryLabel })"
        >
          <slot name="categoryLabel" :category="group.category" :items="group.items" :b24ui="b24ui">
            {{ group.category }}
          </slot>
        </div>

        <div data-slot="grid" :class="b24ui.grid({ class: props.b24ui?.grid })">
          <label
            v-for="item in group.items"
            :key="String(getItemValue(item))"
            data-slot="item"
            :class="b24ui.item({ class: [props.b24ui?.item, item.class] })"
          >
            <input
              :type="props.multiple ? 'checkbox' : 'radio'"
              :name="name ?? groupId"
              :value="getItemValue(item)"
              :checked="isSelected(item)"
              :disabled="item.disabled || disabled"
              :required="props.required && !props.multiple"
              class="sr-only"
              @change="onItemChange(item, $event)"
            >

            <B24PageCard
              :title="get(item, props.labelKey!)"
              :description="get(item, props.descriptionKey!)"
              :variant="props.variant"
              :orientation="props.orientation"
              :highlight="isSelected(item)"
              :highlight-color="props.highlightColor"
              :class="b24ui.card({ class: props.b24ui?.card })"
            >
              <template v-if="get(item, props.iconKey!) || !!slots.leading" #leading>
                <slot name="leading" :item="item" :selected="isSelected(item)" :b24ui="b24ui">
                  <span data-slot="iconWrap" :class="b24ui.iconWrap({ class: props.b24ui?.iconWrap })">
                    <component :is="get(item, props.iconKey!)" data-slot="icon" :class="b24ui.icon({ class: props.b24ui?.icon })" />
                  </span>
                </slot>
              </template>

              <template v-if="isSelected(item)">
                <span data-slot="badge" :class="b24ui.badge({ class: props.b24ui?.badge })">
                  <slot name="badge" :item="item" :selected="true" :b24ui="b24ui">
                    <B24Badge
                      :icon="CheckLIcon"
                      :color="props.badgeColor"
                      square
                      :size="((props.b24ui?.badgeIconSize || b24ui.badgeIconSize()) as BadgeProps['size'])"
                      :class="b24ui.badgeIcon({ class: props.b24ui?.badgeIcon })"
                    />
                  </slot>
                </span>
              </template>
            </B24PageCard>
          </label>
        </div>
      </div>
    </fieldset>
  </component>
</template>
