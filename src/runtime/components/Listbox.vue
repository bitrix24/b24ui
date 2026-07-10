<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { VNode } from 'vue'
import { computed, toRaw, toRef } from 'vue'
import type { ListboxRootEmits, ListboxRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/listbox'
import type { AvatarProps } from './Avatar.vue'
import type { ChipProps } from './Chip.vue'
import type { IconComponent } from '../types/icons'
import type { InputProps } from './Input.vue'
import type { ModelModifiers, ApplyModifiers } from '../types/input'
import type { ArrayOrNested, GetItemKeys, GetModelValue, NestedItem } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type Listbox = ComponentConfig<typeof theme, AppConfig, 'listbox'>

export interface ListboxItem {
  label?: string
  description?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps
  chip?: ChipProps
  /**
   * The item type.
   * @defaultValue 'item'
   */
  type?: 'label' | 'separator' | 'item'
  disabled?: boolean
  onSelect?: (e: Event) => void
  class?: any
  b24ui?: Pick<Listbox['slots'], 'label' | 'separator' | 'item' | 'itemLeadingIcon' | 'itemLeadingAvatar' | 'itemLeadingAvatarSize' | 'itemLeadingChip' | 'itemLeadingChipSize' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemTrailing' | 'itemTrailingIcon'>
  [key: string]: any
}

export interface ListboxProps<T extends ArrayOrNested<ListboxItem> = ArrayOrNested<ListboxItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>> extends Pick<ListboxRootProps, 'by' | 'disabled' | 'highlightOnHover' | 'name' | 'orientation' | 'required' | 'selectionBehavior'> {
  id?: string
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * @defaultValue 'air-primary'
   */
  color?: Listbox['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: Listbox['variants']['size']
  /**
   * The items to display in the list.
   */
  items?: T
  /**
   * The controlled value of the Listbox. Can be bound with `v-model`.
   */
  modelValue?: ApplyModifiers<GetModelValue<T, VK, M>, Mod>
  modelModifiers?: Mod
  /**
   * The default value when not controlled.
   */
  defaultValue?: ApplyModifiers<GetModelValue<T, VK, M>, Mod>
  /**
   * Whether multiple items can be selected.
   * @defaultValue false
   */
  multiple?: M & boolean
  /**
   * When `items` is an array of objects, select the field to use as the value instead of the object itself.
   * @defaultValue undefined
   */
  valueKey?: VK
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>
  /**
   * The key used to get the description from the item.
   * @defaultValue 'description'
   */
  descriptionKey?: GetItemKeys<T>
  /**
   * Whether the list is in a loading state.
   */
  loading?: boolean
  /**
   * The icon displayed when loading.
   * @defaultValue icons.loading
   * @IconComponent
   */
  loadingIcon?: IconComponent
  /**
   * Whether to display a filter input or not.
   * Can be an object to pass additional props to the input.
   * `{ placeholder: 'Search...', variant: 'none' }`{lang="ts-type"}
   * @defaultValue false
   */
  filter?: boolean | Omit<InputProps, 'modelValue' | 'defaultValue'>
  /**
   * The fields to filter by.
   * @defaultValue [labelKey]
   */
  filterFields?: string[]
  /**
   * When `true`, disable the default filters, useful for custom filtering (useAsyncData, useFetch, etc.).
   * @defaultValue false
   */
  ignoreFilter?: boolean
  /**
   * The icon displayed when an item is selected.
   * @defaultValue icons.check
   * @IconComponent
   */
  selectedIcon?: IconComponent
  /**
   * Enable virtualization for large lists.
   * @defaultValue false
   */
  virtualize?: boolean | {
    /**
     * Number of items rendered outside the visible area
     * @defaultValue 12
     */
    overscan?: number
    /**
     * Estimated size (in px) of each item, or a function that returns the size for a given index
     * @defaultValue 32
     */
    estimateSize?: number | ((index: number) => number)
  }
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  class?: any
  b24ui?: Listbox['slots']
}

export type ListboxEmits<T extends ArrayOrNested<ListboxItem> = ArrayOrNested<ListboxItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>> = Pick<ListboxRootEmits, 'entryFocus' | 'highlight' | 'leave'> & {
  'change': [event: Event]
  'update:modelValue': [value: ApplyModifiers<GetModelValue<T, VK, M>, Mod>]
}

type SlotProps<T> = (props: { item: T, index: number, b24ui: Listbox['b24ui'] }) => VNode[]

export type ListboxSlots<T extends ArrayOrNested<ListboxItem> = ArrayOrNested<ListboxItem>> = {
  'loading'?(props?: {}): VNode[]
  'empty'?(props: { searchTerm: string }): VNode[]
  'item'?: SlotProps<NestedItem<T>>
  'item-leading'?: SlotProps<NestedItem<T>>
  'item-label'?(props: { item: NestedItem<T>, index: number }): VNode[]
  'item-description'?(props: { item: NestedItem<T>, index: number }): VNode[]
  'item-trailing'?: SlotProps<NestedItem<T>>
}

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<ListboxItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>">
import { ListboxRoot, ListboxContent, ListboxGroup, ListboxGroupLabel, ListboxVirtualizer, ListboxItem as RekaListboxItem, ListboxItemIndicator, ListboxFilter } from 'reka-ui'
import { useForwardProps } from '../composables/useForwardProps'
import { createReusableTemplate, reactivePick } from '@vueuse/core'
import { defu } from 'defu'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useFilter } from '../composables/useFilter'
import { useFormField } from '../composables/useFormField'
import { useLocale } from '../composables/useLocale'
import { get, isArrayOfArray, looseToNumber } from '../utils'
import { getEstimateSize } from '../utils/virtualizer'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Avatar from './Avatar.vue'
import B24Chip from './Chip.vue'
import B24Input from './Input.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<ListboxProps<T, VK, M, Mod>>(), {
  labelKey: 'label',
  descriptionKey: 'description',
  highlightOnHover: true,
  filter: false,
  autofocusDelay: 0,
  virtualize: false
})
const emits = defineEmits<ListboxEmits<T, VK, M, Mod>>()
const slots = defineSlots<ListboxSlots<T>>()

const props = useComponentProps<ListboxProps<T, VK, M, Mod>>('listbox', _props)

const searchTerm = defineModel<string>('searchTerm', { default: '' })

const { t } = useLocale()
const appConfig = useAppConfig() as Listbox['AppConfig']
const { filterGroups } = useFilter()

const rootProps = useForwardProps(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'multiple', 'selectionBehavior', 'highlightOnHover', 'by', 'orientation', 'required'), emits)

const virtualizerProps = toRef(() => {
  if (!props.virtualize) return false

  return defu(typeof props.virtualize === 'boolean' ? {} : props.virtualize, {
    estimateSize: getEstimateSize(filteredItems.value, size.value || 'md', props.descriptionKey as string, !!slots['item-description'])
  })
})
const inputProps = toRef(() => defu(typeof props.filter === 'object' ? props.filter : {}, { placeholder: t('listbox.search'), variant: 'none' }) as Omit<InputProps, 'modelValue' | 'defaultValue'>)

// @todo error ts: fix this -> this for input ?? color
const { emitFormChange, emitFormInput, name, size, id, highlight, disabled, ariaAttrs } = useFormField<InputProps>(_props, { bind: false })

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: ListboxItem, index: number }>({
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: false
    }
  }
})

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.listbox || {}) })({
  // @todo error ts: fix this -> this for input ?? color
  // color: color.value ?? props.color,
  color: props.color,
  size: size.value ?? props.size,
  highlight: highlight.value ?? props.highlight,
  disabled: disabled.value,
  virtualize: !!props.virtualize
}))

function onUpdate(value: any) {
  if (toRaw(props.modelValue) === value) {
    return
  }

  if (props.modelModifiers?.trim && (typeof value === 'string' || value === null || value === undefined)) {
    value = value?.trim() ?? null
  }

  if (props.modelModifiers?.number) {
    value = looseToNumber(value)
  }

  if (props.modelModifiers?.nullable) {
    value ??= null
  }

  if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
    value ??= undefined
  }

  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)
  emitFormChange()
  emitFormInput()
}

function onSelect(e: Event, item: ListboxItem) {
  if (item.disabled) {
    e.preventDefault()
    return
  }

  item.onSelect?.(e)
}

const groups = computed<ListboxItem[][]>(() =>
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : []
)

function isStructuralItem(item: ListboxItem): boolean {
  return !!item.type && ['label', 'separator'].includes(item.type)
}

const filteredGroups = computed(() => {
  if (props.ignoreFilter || !searchTerm.value) {
    return groups.value
  }

  const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey] as string[]

  return filterGroups(groups.value, searchTerm.value, {
    fields,
    isStructural: isStructuralItem
  })
})
const filteredItems = computed(() => filteredGroups.value.flatMap(group => group) as NestedItem<T>[])
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DefineItemTemplate v-slot="{ item, index }">
    <ListboxGroupLabel v-if="item.type === 'label'" data-slot="label" :class="b24ui.label({ class: [props.b24ui?.label, item.b24ui?.label, item.class] })">
      {{ get(item, props.labelKey as string) }}
    </ListboxGroupLabel>

    <div v-else-if="item.type === 'separator'" role="separator" data-slot="separator" :class="b24ui.separator({ class: [props.b24ui?.separator, item.b24ui?.separator, item.class] })" />

    <RekaListboxItem
      v-else
      :value="props.valueKey ? get(item, props.valueKey as string) : item"
      :disabled="item.disabled"
      data-slot="item"
      :class="b24ui.item({ class: [props.b24ui?.item, item.b24ui?.item, item.class] })"
      @select="onSelect($event, item)"
    >
      <slot name="item" :item="(item as NestedItem<T>)" :index="index" :b24ui="b24ui">
        <slot name="item-leading" :item="(item as NestedItem<T>)" :index="index" :b24ui="b24ui">
          <Component
            :is="item.icon"
            v-if="item.icon"
            data-slot="itemLeadingIcon"
            :class="b24ui.itemLeadingIcon({ class: props.b24ui?.itemLeadingIcon })"
          />
          <B24Avatar v-else-if="item.avatar" :size="((item.b24ui?.itemLeadingAvatarSize || props.b24ui?.itemLeadingAvatarSize || b24ui.itemLeadingAvatarSize()) as AvatarProps['size'])" v-bind="item.avatar" data-slot="itemLeadingAvatar" :class="b24ui.itemLeadingAvatar({ class: [props.b24ui?.itemLeadingAvatar, item.b24ui?.itemLeadingAvatar] })" />
          <B24Chip
            v-else-if="item.chip"
            :size="((item.b24ui?.itemLeadingChipSize || props.b24ui?.itemLeadingChipSize || b24ui.itemLeadingChipSize()) as ChipProps['size'])"
            inset
            standalone
            v-bind="item.chip"
            data-slot="itemLeadingChip"
            :class="b24ui.itemLeadingChip({ class: [props.b24ui?.itemLeadingChip, item.b24ui?.itemLeadingChip] })"
          />
        </slot>

        <span v-if="get(item, props.labelKey as string) || get(item, props.descriptionKey as string) || !!slots['item-label'] || !!slots['item-description']" data-slot="itemWrapper" :class="b24ui.itemWrapper({ class: [props.b24ui?.itemWrapper, item.b24ui?.itemWrapper] })">
          <span v-if="get(item, props.labelKey as string) || !!slots['item-label']" data-slot="itemLabel" :class="b24ui.itemLabel({ class: [props.b24ui?.itemLabel, item.b24ui?.itemLabel] })">
            <slot name="item-label" :item="(item as NestedItem<T>)" :index="index">
              {{ get(item, props.labelKey as string) }}
            </slot>
          </span>

          <span v-if="get(item, props.descriptionKey as string) || !!slots['item-description']" data-slot="itemDescription" :class="b24ui.itemDescription({ class: [props.b24ui?.itemDescription, item.b24ui?.itemDescription] })">
            <slot name="item-description" :item="(item as NestedItem<T>)" :index="index">
              {{ get(item, props.descriptionKey as string) }}
            </slot>
          </span>
        </span>

        <span data-slot="itemTrailing" :class="b24ui.itemTrailing({ class: [props.b24ui?.itemTrailing, item.b24ui?.itemTrailing] })">
          <slot name="item-trailing" :item="(item as NestedItem<T>)" :index="index" :b24ui="b24ui" />

          <ListboxItemIndicator as-child>
            <Component :is="props.selectedIcon || icons.check" data-slot="itemTrailingIcon" :class="b24ui.itemTrailingIcon({ class: [props.b24ui?.itemTrailingIcon, item.b24ui?.itemTrailingIcon] })" />
          </ListboxItemIndicator>
        </span>
      </slot>
    </RekaListboxItem>
  </DefineItemTemplate>

  <ListboxRoot
    :id="id"
    data-slot="root"
    dd-gg="1"
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    :disabled="disabled"
    :name="name"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    @update:model-value="onUpdate"
  >
    <ListboxFilter v-if="props.filter" v-model="searchTerm" as-child>
      <B24Input
        :autofocus="props.autofocus"
        :autofocus-delay="props.autofocusDelay"
        :size="size"
        no-border
        v-bind="inputProps"
        data-slot="input"
        :class="b24ui.input({ class: props.b24ui?.input })"
      />
    </ListboxFilter>

    <ListboxContent data-slot="content" :class="b24ui.content({ class: props.b24ui?.content })">
      <div v-if="props.loading" data-slot="loading" :class="b24ui.loading({ class: props.b24ui?.loading })">
        <slot name="loading">
          <Component
            :is="props.loadingIcon || icons.loading"
            data-slot="loadingIcon"
            :class="b24ui.loadingIcon({ class: props.b24ui?.loadingIcon })"
          />
        </slot>
      </div>
      <div v-else-if="!filteredItems.length" data-slot="empty" :class="b24ui.empty({ class: props.b24ui?.empty })">
        <slot name="empty" :search-term="searchTerm">
          {{ searchTerm ? t('listbox.noMatch', { searchTerm }) : t('listbox.noData') }}
        </slot>
      </div>

      <ListboxVirtualizer
        v-else-if="!!props.virtualize"
        v-slot="{ option: item, virtualItem }"
        :options="(filteredItems as any[])"
        :text-content="(item: any) => get(item, props.labelKey as string)"
        v-bind="virtualizerProps"
      >
        <ReuseItemTemplate :item="item" :index="virtualItem.index" />
      </ListboxVirtualizer>

      <template v-else>
        <ListboxGroup v-for="(group, groupIndex) in filteredGroups" :key="`group-${groupIndex}`" data-slot="group" :class="b24ui.group({ class: props.b24ui?.group })">
          <ReuseItemTemplate v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`" :item="item" :index="index" />
        </ListboxGroup>
      </template>
    </ListboxContent>
  </ListboxRoot>
</template>
