<script lang="ts">
import type { ComboboxRootProps, ComboboxRootEmits, ComboboxContentProps, ComboboxContentEmits, ComboboxArrowProps } from 'reka-ui'
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/input-menu'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { IconComponent } from '../types/icons'
import type { AvatarProps } from './Avatar.vue'
import type { BadgeProps } from './Badge.vue'
import type { ButtonProps } from './Button.vue'
import type { ChipProps } from './Chip.vue'
import type { InputProps } from './Input.vue'
import type { LinkPropsKeys } from './Link.vue'
import type { ModelModifiers, ApplyModifiers } from '../types/input'
import type { InputHTMLAttributes } from '../types/html'
import type { AcceptableValue, ArrayOrNested, GetItemKeys, GetItemValue, GetModelValue, NestedItem, EmitsToProps } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type InputMenu = ComponentConfig<typeof theme, AppConfig, 'inputMenu'>

export type InputMenuValue = AcceptableValue

export type InputMenuItem = InputMenuValue | {
  label?: string
  description?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps
  color?: InputMenu['variants']['color']
  chip?: ChipProps
  /**
   * The item type.
   * @defaultValue 'item'
   */
  type?: 'label' | 'separator' | 'item'
  disabled?: boolean
  onSelect?: (e: Event) => void
  class?: any
  b24ui?: Pick<InputMenu['slots'], 'tagsItem' | 'tagsItemText' | 'tagsItemDelete' | 'tagsItemDeleteIcon' | 'label' | 'separator' | 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChip' | 'itemLeadingChipSize' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemTrailing' | 'itemTrailingIcon'>
  [key: string]: any
}

type ExcludeItem = { type: 'label' | 'separator' }
type IsClearUsed<M extends boolean, C extends boolean | object> = M extends false
  ? (C extends true ? null : C extends object ? null : never)
  : never

export interface InputMenuProps<T extends ArrayOrNested<InputMenuItem> = ArrayOrNested<InputMenuItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>, C extends boolean | object = false> extends Pick<ComboboxRootProps<T>, 'open' | 'defaultOpen' | 'disabled' | 'name' | 'resetSearchTermOnBlur' | 'resetSearchTermOnSelect' | 'resetModelValueOnClear' | 'highlightOnHover' | 'openOnClick' | 'openOnFocus' | 'by'>, UseComponentIconsProps, /** @vue-ignore */ Omit<InputHTMLAttributes, 'disabled' | 'name' | 'type' | 'placeholder' | 'autofocus' | 'maxlength' | 'minlength' | 'pattern' | 'size' | 'min' | 'max' | 'step'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  id?: string
  type?: InputHTMLAttributes['type']
  /** The placeholder text when the input is empty. */
  placeholder?: string
  /**
   * @defaultValue 'air-primary'
   */
  color?: InputMenu['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: InputMenu['variants']['size']
  /**
   * Removes all borders (rings)
   * @defaultValue false
   */
  noBorder?: boolean
  /**
   * Removes all borders (rings) except the bottom one
   * @defaultValue false
   */
  underline?: boolean
  /**
   * Rounds the corners of the input
   * @defaultValue false
   */
  rounded?: boolean
  required?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  /**
   * The icon displayed to open the menu.
   * @defaultValue icons.chevronDown
   * @IconComponent
   */
  trailingIcon?: IconComponent
  /**
   * The icon displayed when an item is selected.
   * @defaultValue icons.check
   * @IconComponent
   */
  selectedIcon?: IconComponent
  /**
   * The icon displayed to delete a tag.
   * Works only when `multiple` is `true`.
   * @defaultValue icons.close
   * @IconComponent
   */
  deleteIcon?: IconComponent
  /**
   * Display a clear button to reset the model value.
   * Can be an object to pass additional props to the Button.
   * @defaultValue false
   */
  clear?: (C & boolean) | (C & Partial<Omit<ButtonProps, LinkPropsKeys>>)
  /**
   * The icon displayed in the clear button.
   * @defaultValue icons.close
   * @IconComponent
   */
  clearIcon?: IconComponent
  /**
   * The content of the menu.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }
   */
  content?: Omit<ComboboxContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<ComboboxContentEmits>>
  /**
   * Display an arrow alongside the menu.
   * @defaultValue false
   */
  arrow?: boolean | Omit<ComboboxArrowProps, 'as' | 'asChild'>
  /**
   * Render the menu in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement
  /**
   * Enable virtualization for large lists.
   * Note: when enabled, all groups are flattened into a single list due to a limitation of Reka UI (https://github.com/unovue/reka-ui/issues/1885).
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
  /**
   * When `items` is an array of objects, select the field to use as the value instead of the object itself.
   * @defaultValue undefined
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
  /** The value of the InputMenu when initially rendered. Use when you do not need to control the state of the InputMenu. */
  defaultValue?: ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>
  /** The controlled value of the InputMenu. Can be binded-with with `v-model`. */
  modelValue?: ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>
  modelModifiers?: Mod
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean
  tag?: string
  /**
   * @defaultValue 'air-primary'
   */
  tagColor?: BadgeProps['color']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  /** Keep the mobile text size on all breakpoints. (Left for backward compatibility.) */
  fixed?: boolean
  /**
   * The behavior of the InputMenu.
   * - `combobox`: select one (or many) items from a list of suggestions.
   * - `autocomplete`: free-form text input with optional suggestions. The `modelValue`
   *   becomes the input text (`string`) instead of a selected item.
   * @defaultValue 'combobox'
   */
  mode?: 'combobox' | 'autocomplete'
  /**
   * Determines if custom user input that does not exist in options can be added.
   * @defaultValue false
   */
  createItem?: boolean | 'always' | { position?: 'top' | 'bottom', when?: 'empty' | 'always' }
  /**
   * Fields to filter items by.
   * @defaultValue [labelKey]
   */
  filterFields?: string[]
  /**
   * When `true`, disable the default filters, useful for custom filtering (useAsyncData, useFetch, etc.).
   * @defaultValue false
   */
  ignoreFilter?: boolean
  class?: any
  b24ui?: InputMenu['slots']
}

export interface InputMenuEmits<
  A extends ArrayOrNested<InputMenuItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>,
  C extends boolean | object = false
> extends Pick<ComboboxRootEmits, 'update:open'> {
  'change': [event: Event]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
  'create': [item: string]
  'clear': []
  /** Event handler when highlighted element changes. */
  'highlight': [payload: {
    ref: HTMLElement
    value: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>
  } | undefined]
  'remove-tag': [item: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>]
  /** Event handler called when the value changes. */
  'update:modelValue': [value: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>]
}

type SlotProps<T extends InputMenuItem> = (props: { item: T, index: number, b24ui: InputMenu['b24ui'] }) => VNode[]

export interface InputMenuSlots<
  A extends ArrayOrNested<InputMenuItem> = ArrayOrNested<InputMenuItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>,
  C extends boolean | object = false,
  T extends NestedItem<A> = NestedItem<A>
> {
  'leading'?(props: { modelValue: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>, open: boolean, b24ui: InputMenu['b24ui'] }): VNode[]
  'trailing'?(props: { modelValue: ApplyModifiers<GetModelValue<A, VK, M, ExcludeItem>, Mod> | IsClearUsed<M, C>, open: boolean, b24ui: InputMenu['b24ui'] }): VNode[]
  'empty'?(props: { searchTerm: string }): VNode[]
  'item'?: SlotProps<T>
  'item-leading'?: SlotProps<T>
  'item-label'?(props: { item: T, index: number }): VNode[]
  'item-description'?(props: { item: T, index: number }): VNode[]
  'item-trailing'?: SlotProps<T>
  'tags-item-text'?(props: { item: T, index: number }): VNode[]
  'tags-item-delete'?: SlotProps<T>
  'content-top'?: (props?: {}) => VNode[]
  'content-bottom'?: (props?: {}) => VNode[]
  'create-item-label'?(props: { item: string }): VNode[]
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<InputMenuItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false, Mod extends Omit<ModelModifiers, 'lazy'> = Omit<ModelModifiers, 'lazy'>, C extends boolean | object = false">
import { computed, ref, useTemplateRef, toRef, onMounted, toRaw, nextTick, watch } from 'vue'
import { TagsInputRoot, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput } from 'reka-ui'
import { Combobox, Autocomplete } from 'reka-ui/namespaced'
import { defu } from 'defu'
import { isEqual } from 'ohash/utils'
import { reactivePick, reactiveOmit, createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useForwardProps } from '../composables/useForwardProps'
import { useFieldGroup, FieldGroupReset } from '../composables/useFieldGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormField } from '../composables/useFormField'
import { useFilter } from '../composables/useFilter'
import { useLocale } from '../composables/useLocale'
import { usePortal } from '../composables/usePortal'
import { compare, get, getDisplayValue, isArrayOfArray, looseToNumber } from '../utils'
import { getEstimateSize } from '../utils/virtualizer'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Badge from './Badge.vue'
import B24Avatar from './Avatar.vue'
import B24Button from './Button.vue'
import B24Chip from './Chip.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<InputMenuProps<T, VK, M, Mod, C>>(), {
  type: 'text',
  autofocusDelay: 0,
  portal: true,
  labelKey: 'label',
  descriptionKey: 'description',
  resetSearchTermOnBlur: true,
  resetSearchTermOnSelect: true,
  resetModelValueOnClear: true,
  virtualize: false
})
const emits = defineEmits<InputMenuEmits<T, VK, M, Mod, C>>()
const slots = defineSlots<InputMenuSlots<T, VK, M, Mod, C>>()

const props = useComponentProps<InputMenuProps<T, VK, M, Mod, C>>('inputMenu', _props)

const searchTerm = defineModel<string>('searchTerm', { default: '' })

const { t } = useLocale()
const appConfig = useAppConfig() as InputMenu['AppConfig']
const { filterGroups } = useFilter()

const isAutocomplete = computed(() => props.mode === 'autocomplete')
const rootPropsPick = reactivePick(props, 'as', 'modelValue', 'defaultValue', 'open', 'defaultOpen', 'required', 'multiple', 'resetSearchTermOnBlur', 'resetSearchTermOnSelect', 'resetModelValueOnClear', 'highlightOnHover', 'openOnClick', 'openOnFocus', 'by')
const rootPropsOmitted = reactiveOmit(rootPropsPick, 'multiple', 'resetSearchTermOnSelect', 'resetModelValueOnClear', 'by')
const rootProps = useForwardProps(computed(() => isAutocomplete.value ? rootPropsOmitted : rootPropsPick), emits)
const Component = computed(() => isAutocomplete.value ? Autocomplete : Combobox)
const portalProps = usePortal(toRef(() => props.portal))
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }) as ComboboxContentProps)
const arrowProps = toRef(() => defu(typeof props.arrow === 'boolean' ? {} : props.arrow, { width: 20, height: 10 }) as ComboboxArrowProps)
const clearProps = computed(() => typeof props.clear === 'object' ? props.clear : {} as Partial<Omit<ButtonProps, LinkPropsKeys>>)
const virtualizerProps = toRef(() => {
  if (!props.virtualize) return false

  return defu(typeof props.virtualize === 'boolean' ? {} : props.virtualize, {
    estimateSize: getEstimateSize(filteredItems.value, inputSize.value || 'md', props.descriptionKey as string, !!slots['item-description'])
  })
})

const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, size: formFieldSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField<InputProps>(_props)
const { orientation, size: fieldGroupSize } = useFieldGroup<InputProps>(_props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: icons.chevronDown })))

const inputSize = computed(() => fieldGroupSize.value || formFieldSize.value)

const isTag = computed(() => {
  return props.tag
})

const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate()
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: InputMenuItem, index: number }>({
  props: {
    item: {
      type: [Object, String, Number, Boolean],
      required: true
    },
    index: {
      type: Number,
      required: false
    }
  }
})

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.inputMenu || {}) })({
  color: color.value ?? props.color,
  size: inputSize?.value ?? props.size,
  loading: props.loading,
  highlight: highlight.value ?? props.highlight,
  fixed: props.fixed,
  rounded: Boolean(props.rounded),
  noBorder: Boolean(props.noBorder),
  underline: Boolean(props.underline),
  leading: Boolean(isLeading.value || !!props.avatar || !!slots.leading),
  trailing: Boolean(isTrailing.value || !!slots.trailing),
  multiple: props.multiple,
  fieldGroup: orientation.value,
  virtualize: !!props.virtualize
}))

// eslint-disable-next-line vue/no-dupe-keys
const items = computed(() => groups.value.flatMap(group => group) as T[])

function displayValue(value: GetItemValue<T, VK, ExcludeItem>): string {
  return getDisplayValue<T[], GetItemValue<T, VK, ExcludeItem>>(items.value, value, {
    labelKey: props.labelKey,
    valueKey: props.valueKey,
    by: props.by
  }) ?? ''
}

const groups = computed<InputMenuItem[][]>(() =>
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : []
)

const filteredGroups = computed(() => {
  if (props.ignoreFilter || !searchTerm.value) {
    return groups.value
  }

  const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey] as string[]

  return filterGroups(groups.value, searchTerm.value, {
    fields,
    isStructural: (item: InputMenuItem) => isInputItem(item) && !!item.type && ['label', 'separator'].includes(item.type)
  })
})
const filteredItems = computed(() => filteredGroups.value.flatMap(group => group))

// eslint-disable-next-line vue/no-dupe-keys
const createItem = computed(() => {
  if (!props.createItem || !searchTerm.value) {
    return false
  }

  const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } as NestedItem<T> : searchTerm.value

  if ((typeof props.createItem === 'object' && props.createItem.when === 'always') || props.createItem === 'always') {
    return !filteredItems.value.find(item => compare(item, newItem, (props.by ?? props.valueKey) as string | undefined))
  }

  return !filteredItems.value.length
})
const createItemPosition = computed(() => typeof props.createItem === 'object' ? props.createItem.position : 'bottom')

const inputRef = useTemplateRef('inputRef')

function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.$el?.focus()
  }
}

onMounted(() => {
  nextTick(() => {
    if (isAutocomplete.value) {
      searchTerm.value = String(props.modelValue ?? props.defaultValue ?? '')
    } else {
      searchTerm.value = ''
    }
  })

  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})

watch(() => props.modelValue, (newValue) => {
  if (isAutocomplete.value) {
    searchTerm.value = String(newValue ?? '')
  }
})

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

  if (isAutocomplete.value) {
    searchTerm.value = String(value ?? '')
  } else if (props.resetSearchTermOnSelect) {
    searchTerm.value = ''
  }
}

function onInputUpdate(value: string) {
  if (!isAutocomplete.value) {
    searchTerm.value = value
  }
}

function onBlur(event: FocusEvent) {
  emits('blur', event)
  emitFormBlur()
}

function onFocus(event: FocusEvent) {
  emits('focus', event)
  emitFormFocus()
}

const isOpen = ref(false)
function onUpdateOpen(value: boolean) {
  isOpen.value = value

  let timeoutId

  if (!value) {
    const event = new FocusEvent('blur')

    emits('blur', event)
    emitFormBlur()

    // Since we use `displayValue` prop inside ComboboxInput we should reset searchTerm manually
    // https://reka-ui.com/docs/components/combobox#api-reference
    if (!isAutocomplete.value && props.resetSearchTermOnBlur) {
      const STATE_ANIMATION_DELAY_MS = 100

      timeoutId = setTimeout(() => {
        searchTerm.value = ''
      }, STATE_ANIMATION_DELAY_MS)
    }
  } else {
    const event = new FocusEvent('focus')
    emits('focus', event)
    emitFormFocus()
    clearTimeout(timeoutId)
  }
}

function onRemoveTag(event: any, modelValue: GetModelValue<T, VK, true, ExcludeItem>) {
  if (props.multiple) {
    const filteredValue = modelValue.filter(value => !isEqual(value, event))
    emits('update:modelValue', filteredValue as ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>)
    emits('remove-tag', event)
    onUpdate(filteredValue)
  }
}

function onCreate(e: Event) {
  e.preventDefault()
  e.stopPropagation()

  emits('create', searchTerm.value)
}

function onSelect(e: Event, item: InputMenuItem) {
  if (!isInputItem(item)) {
    return
  }

  if (item.disabled) {
    e.preventDefault()
    return
  }

  item.onSelect?.(e)
}

function isInputItem(item: InputMenuItem): item is Exclude<InputMenuItem, InputMenuValue> {
  return typeof item === 'object' && item !== null
}

function isModelValueEmpty(modelValue: ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>): boolean {
  if (props.multiple && Array.isArray(modelValue)) {
    return modelValue.length === 0
  }
  return modelValue === undefined || modelValue === null || modelValue === ''
}

function onClear() {
  emits('clear')
}

const viewportRef = useTemplateRef('viewportRef')

const comboboxRootRef = useTemplateRef('comboboxRootRef')

// reka-ui only re-highlights the first item when the list goes from empty to non-empty.
// With `create-item`, the create item is always registered so the count never drops to 0,
// leaving the highlight stale when async `items` load. Re-highlight when items change while open.
// Wait an extra tick so freshly mounted items are registered in reka-ui's collection before highlighting.
watch(() => props.items, async () => {
  if (!isOpen.value) {
    return
  }

  await nextTick()
  comboboxRootRef.value?.highlightFirstItem?.()
}, { flush: 'post' })

defineExpose({
  inputRef: toRef(() => inputRef.value?.$el as HTMLInputElement),
  viewportRef: toRef(() => viewportRef.value)
})
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DefineCreateItemTemplate>
    <Component.Item
      data-slot="item"
      :class="b24ui.item({ addNew: true, class: props.b24ui?.item })"
      :value="searchTerm"
      @select="onCreate"
    >
      <span data-slot="itemLabel" :class="b24ui.itemLabel({ addNew: true, class: props.b24ui?.itemLabel })">
        <slot name="create-item-label" :item="searchTerm">
          <Component
            :is="icons.plus"
            data-slot="itemLeadingIcon"
            :class="b24ui.itemLeadingIcon({ addNew: true, class: props.b24ui?.itemLeadingIcon })"
          />
          {{ t('inputMenu.create', { label: searchTerm }) }}
        </slot>
      </span>
    </Component.Item>
  </DefineCreateItemTemplate>

  <DefineItemTemplate v-slot="{ item, index }">
    <Component.Label v-if="isInputItem(item) && item.type === 'label'" data-slot="label" :class="b24ui.label({ class: [props.b24ui?.label, item.b24ui?.label, item.class] })">
      {{ get(item, props.labelKey as string) }}
    </Component.Label>

    <Component.Separator v-else-if="isInputItem(item) && item.type === 'separator'" data-slot="separator" :class="b24ui.separator({ class: [props.b24ui?.separator, item.b24ui?.separator, item.class] })" />

    <Component.Item
      v-else
      data-slot="item"
      :class="b24ui.item({ class: [props.b24ui?.item, isInputItem(item) && item.b24ui?.item, isInputItem(item) && item.class], colorItem: isInputItem(item) ? item?.color : undefined })"
      :disabled="isInputItem(item) && item.disabled"
      :value="props.valueKey && isInputItem(item) ? get(item, props.valueKey as string) : item"
      @select="onSelect($event, item)"
    >
      <slot name="item" :item="(item as NestedItem<T>)" :index="index" :b24ui="b24ui">
        <slot name="item-leading" :item="(item as NestedItem<T>)" :index="index" :b24ui="b24ui">
          <B24Avatar v-if="isInputItem(item) && item.avatar" :size="((item.b24ui?.itemLeadingAvatarSize || props.b24ui?.itemLeadingAvatarSize || b24ui.itemLeadingAvatarSize()) as AvatarProps['size'])" v-bind="item.avatar" data-slot="itemLeadingAvatar" :class="b24ui.itemLeadingAvatar({ class: [props.b24ui?.itemLeadingAvatar, item.b24ui?.itemLeadingAvatar], colorItem: item?.color })" />
        </slot>

        <span data-slot="itemWrapper" :class="b24ui.itemWrapper({ class: [props.b24ui?.itemWrapper, isInputItem(item) && item.b24ui?.itemWrapper] })">
          <span data-slot="itemLabel" :class="b24ui.itemLabel({ class: [props.b24ui?.itemLabel, isInputItem(item) && item.b24ui?.itemLabel] })">
            <slot name="item-label" :item="(item as NestedItem<T>)" :index="index">
              {{ isInputItem(item) ? get(item, props.labelKey as string) : item }}
            </slot>
          </span>

          <span
            v-if="isInputItem(item) && (get(item, props.descriptionKey as string) || !!slots['item-description'])"
            data-slot="itemDescription"
            :class="b24ui.itemDescription({ class: [props.b24ui?.itemDescription, isInputItem(item) && item.b24ui?.itemDescription] })"
          >
            <slot
              name="item-description"
              :item="(item as NestedItem<T>)"
              :index="index"
            >
              {{ get(item, props.descriptionKey as string) }}
            </slot>
          </span>
        </span>

        <span data-slot="itemTrailing" :class="b24ui.itemTrailing({ class: [props.b24ui?.itemTrailing, isInputItem(item) && item.b24ui?.itemTrailing], colorItem: isInputItem(item) ? item?.color : undefined })">
          <Component.ItemIndicator v-if="!isAutocomplete" as-child>
            <Component
              :is="props.selectedIcon || icons.check"
              data-slot="itemTrailingIcon"
              :class="b24ui.itemTrailingIcon({ class: [props.b24ui?.itemTrailingIcon, isInputItem(item) && item.b24ui?.itemTrailingIcon], colorItem: isInputItem(item) ? item?.color : undefined })"
            />
          </Component.ItemIndicator>

          <slot name="item-trailing" :item="(item as NestedItem<T>)" :index="index" :b24ui="b24ui">
            <Component
              :is="item.icon"
              v-if="isInputItem(item) && item.icon"
              data-slot="itemLeadingIcon"
              :class="b24ui.itemLeadingIcon({ class: [props.b24ui?.itemLeadingIcon, item.b24ui?.itemLeadingIcon], colorItem: item?.color })"
            />
            <B24Chip
              v-else-if="isInputItem(item) && item.chip"
              :size="((item.b24ui?.itemLeadingChipSize || props.b24ui?.itemLeadingChipSize || b24ui.itemLeadingChipSize()) as ChipProps['size'])"
              inset
              standalone
              v-bind="item.chip"
              data-slot="itemLeadingChip"
              :class="b24ui.itemLeadingChip({ class: [props.b24ui?.itemLeadingChip, item.b24ui?.itemLeadingChip], colorItem: item?.color })"
            />
          </slot>
        </span>
      </slot>
    </Component.Item>
  </DefineItemTemplate>

  <Component.Root
    ref="comboboxRootRef"
    v-slot="{ modelValue, open }"
    v-bind="rootProps"
    :name="name"
    :disabled="disabled"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    :as-child="!!props.multiple && !isAutocomplete"
    ignore-filter
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
  >
    <B24Badge
      v-if="!props.multiple && isTag"
      data-slot="tag"
      :class="b24ui.tag({ class: props.b24ui?.tag })"
      :color="props.tagColor"
      :label="props.tag"
      size="xs"
    />
    <Component.Anchor :as-child="!props.multiple" data-slot="base" :class="b24ui.base({ class: props.b24ui?.base })">
      <TagsInputRoot
        v-if="props.multiple && !isAutocomplete"
        v-slot="{ modelValue: tags }"
        :model-value="(modelValue as string[])"
        :disabled="disabled"
        :required="props.required"
        delimiter=""
        as-child
        @blur="onBlur"
        @focus="onFocus"
        @remove-tag="onRemoveTag($event, modelValue as GetModelValue<T, VK, true, ExcludeItem>)"
      >
        <B24Badge
          v-if="!!props.multiple && isTag"
          data-slot="tag"
          :class="b24ui.tag({ class: props.b24ui?.tag })"
          :color="props.tagColor"
          :label="props.tag"
          size="xs"
        />
        <TagsInputItem v-for="(item, index) in tags" :key="index" :value="item" data-slot="tagsItem" :class="b24ui.tagsItem({ class: [props.b24ui?.tagsItem, isInputItem(item) && item.b24ui?.tagsItem] })">
          <TagsInputItemText data-slot="tagsItemText" :class="b24ui.tagsItemText({ class: [props.b24ui?.tagsItemText, isInputItem(item) && item.b24ui?.tagsItemText] })">
            <slot name="tags-item-text" :item="(item as NestedItem<T>)" :index="index">
              {{ displayValue(item as GetItemValue<T, VK, ExcludeItem>) }}
            </slot>
          </TagsInputItemText>

          <TagsInputItemDelete data-slot="tagsItemDelete" :class="b24ui.tagsItemDelete({ class: [props.b24ui?.tagsItemDelete, isInputItem(item) && item.b24ui?.tagsItemDelete] })" :disabled="disabled">
            <slot name="tags-item-delete" :item="(item as NestedItem<T>)" :index="index" :b24ui="b24ui">
              <Component
                :is="props.deleteIcon || icons.close"
                data-slot="tagsItemDeleteIcon"
                :class="b24ui.tagsItemDeleteIcon({ class: [props.b24ui?.tagsItemDeleteIcon, isInputItem(item) && item.b24ui?.tagsItemDeleteIcon] })"
              />
            </slot>
          </TagsInputItemDelete>
        </TagsInputItem>

        <Component.Input v-model="searchTerm" as-child>
          <TagsInputInput
            :id="id"
            ref="inputRef"
            v-bind="{ ...$attrs, ...ariaAttrs }"
            :placeholder="props.placeholder"
            data-slot="tagsInput"
            :class="b24ui.tagsInput({ class: props.b24ui?.tagsInput })"
            @change.stop
          />
        </Component.Input>
      </TagsInputRoot>

      <Component.Input
        v-else
        :id="id"
        ref="inputRef"
        v-bind="{ ...(!isAutocomplete ? { displayValue } : {}), ...$attrs, ...ariaAttrs }"
        :type="props.type"
        :placeholder="props.placeholder"
        :required="props.required"
        @blur="onBlur"
        @focus="onFocus"
        @change.stop
        @update:model-value="onInputUpdate"
      />

      <span v-if="isLeading || !!props.avatar || !!slots.leading" data-slot="leading" :class="b24ui.leading({ class: props.b24ui?.leading })">
        <slot name="leading" :model-value="(modelValue as ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>)" :open="open" :b24ui="b24ui">
          <Component
            :is="leadingIconName"
            v-if="isLeading && leadingIconName"
            data-slot="leadingIcon"
            :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
          />
          <B24Avatar
            v-else-if="!!props.avatar"
            :size="((props.b24ui?.itemLeadingAvatarSize || b24ui.itemLeadingAvatarSize()) as AvatarProps['size'])"
            v-bind="props.avatar"
            data-slot="itemLeadingAvatar"
            :class="b24ui.itemLeadingAvatar({ class: props.b24ui?.itemLeadingAvatar })"
          />
        </slot>
      </span>

      <Component.Trigger v-if="isTrailing || !!slots.trailing || !!props.clear" data-slot="trailing" :class="b24ui.trailing({ class: props.b24ui?.trailing })">
        <slot name="trailing" :model-value="(modelValue as ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>)" :open="open" :b24ui="b24ui">
          <Component.Cancel v-if="!!props.clear && !isModelValueEmpty(modelValue as ApplyModifiers<GetModelValue<T, VK, M, ExcludeItem>, Mod>)" as-child>
            <B24Button
              as="span"
              :icon="props.clearIcon || icons.close"
              :size="inputSize"
              color="air-tertiary-no-accent"
              tabindex="-1"
              v-bind="clearProps"
              data-slot="trailingClear"
              :class="b24ui.trailingClear({ class: props.b24ui?.trailingClear })"
              @click.stop="onClear"
            />
          </Component.Cancel>

          <Component
            :is="trailingIconName"
            v-else-if="trailingIconName"
            data-slot="trailingIcon"
            :class="b24ui.trailingIcon({ class: props.b24ui?.trailingIcon })"
          />
        </slot>
      </Component.Trigger>
    </Component.Anchor>

    <Component.Portal v-bind="portalProps">
      <FieldGroupReset>
        <Component.Content data-slot="content" :class="b24ui.content({ class: props.b24ui?.content })" v-bind="contentProps" @focus-outside.prevent>
          <slot name="content-top" />

          <Component.Empty data-slot="empty" :class="b24ui.empty({ class: props.b24ui?.empty })">
            <slot name="empty" :search-term="searchTerm">
              {{ searchTerm ? t('inputMenu.noMatch', { searchTerm }) : t('inputMenu.noData') }}
            </slot>
          </Component.Empty>

          <div
            ref="viewportRef"
            role="presentation"
            data-slot="viewport"
            :class="b24ui.viewport({ class: props.b24ui?.viewport })"
          >
            <template v-if="!!props.virtualize">
              <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'top'" />

              <Component.Virtualizer
                v-slot="{ option: item, virtualItem }"
                :options="(filteredItems as any[])"
                :text-content="item => isInputItem(item) ? get(item, props.labelKey as string) : String(item)"
                v-bind="virtualizerProps"
              >
                <ReuseItemTemplate :item="item" :index="virtualItem.index" />
              </Component.Virtualizer>

              <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'bottom'" />
            </template>

            <template v-else>
              <Component.Group v-if="createItem && createItemPosition === 'top'" data-slot="group" :class="b24ui.group({ class: props.b24ui?.group })">
                <ReuseCreateItemTemplate />
              </Component.Group>

              <Component.Group v-for="(group, groupIndex) in filteredGroups" :key="`group-${groupIndex}`" data-slot="group" :class="b24ui.group({ class: props.b24ui?.group })">
                <ReuseItemTemplate v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`" :item="item" :index="index" />
              </Component.Group>

              <Component.Group v-if="createItem && createItemPosition === 'bottom'" data-slot="group" :class="b24ui.group({ class: props.b24ui?.group })">
                <ReuseCreateItemTemplate />
              </Component.Group>
            </template>
          </div>

          <slot name="content-bottom" />

          <Component.Arrow v-if="!!props.arrow" v-bind="arrowProps" data-slot="arrow" :class="b24ui.arrow({ class: props.b24ui?.arrow })" />
        </Component.Content>
      </FieldGroupReset>
    </Component.Portal>
  </Component.Root>
</template>
