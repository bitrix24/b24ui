<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { ComboboxRootProps, ComboboxRootEmits, ComboboxContentProps, ComboboxContentEmits, ComboboxArrowProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/input-menu'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, ChipProps, InputProps, BadgeProps, IconComponent } from '../types'
import type { AcceptableValue, ArrayOrNested, GetItemKeys, GetModelValue, GetModelValueEmits, NestedItem, EmitsToProps, ComponentConfig } from '../types/utils'

type InputMenu = ComponentConfig<typeof theme, AppConfig, 'inputMenu'>

interface _InputMenuItem {
  label?: string
  /**
   * Display an icon on the left side.
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
  onSelect?(e?: Event): void
  class?: any
  b24ui?: Pick<InputMenu['slots'], 'tagsItem' | 'tagsItemText' | 'tagsItemDelete' | 'tagsItemDeleteIcon' | 'label' | 'separator' | 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChip' | 'itemLeadingChipSize' | 'itemLabel' | 'itemTrailing' | 'itemTrailingIcon'>
  [key: string]: any
}
export type InputMenuItem = _InputMenuItem | AcceptableValue | boolean

export interface InputMenuProps<T extends ArrayOrNested<InputMenuItem> = ArrayOrNested<InputMenuItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false> extends Pick<ComboboxRootProps<T>, 'open' | 'defaultOpen' | 'disabled' | 'name' | 'resetSearchTermOnBlur' | 'resetSearchTermOnSelect' | 'highlightOnHover'>, UseComponentIconsProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  id?: string
  /**
   * @defaultValue 'text'
   */
  type?: InputHTMLAttributes['type']
  /**
   * The placeholder text when the input is empty
   */
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
   * Removes padding from input
   * @defaultValue false
   */
  noPadding?: boolean
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
   * Rounds the corners of the button
   * @defaultValue false
   */
  rounded?: boolean
  /**
   * @defaultValue false
   */
  required?: boolean
  /**
   * @defaultValue false
   */
  autofocus?: boolean
  /**
   * @defaultValue 0
   */
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
   * When `items` is an array of objects, select the field to use as the value instead of the object itself.
   * @defaultValue undefined
   */
  valueKey?: VK
  /**
   * When `items` is an array of objects, select the field to use as the label.
   * @defaultValue 'label'
   */
  labelKey?: keyof NestedItem<T>
  items?: T
  /**
   * The value of the InputMenu when initially rendered. Use when you do not need to control the state of the InputMenu
   */
  defaultValue?: GetModelValue<T, VK, M>
  /**
   * The controlled value of the InputMenu. Can be binded-with with `v-model`
   */
  modelValue?: GetModelValue<T, VK, M>
  /**
   * Whether multiple options can be selected or not
   * @defaultValue false
   */
  multiple?: M & boolean
  tag?: string
  /**
   * @defaultValue 'air-primary'
   */
  tagColor?: BadgeProps['color']
  /**
   * Highlight the ring color like a focus state
   * @defaultValue false
   */
  highlight?: boolean
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

export type InputMenuEmits<A extends ArrayOrNested<InputMenuItem>, VK extends GetItemKeys<A> | undefined, M extends boolean> = Pick<ComboboxRootEmits, 'update:open'> & {
  'change': [payload: Event]
  'blur': [payload: FocusEvent]
  'focus': [payload: FocusEvent]
  'create': [item: string]
  /** Event handler when highlighted element changes. */
  'highlight': [payload: {
    ref: HTMLElement
    value: GetModelValue<A, VK, M>
  } | undefined]
  'remove-tag': [item: GetModelValue<A, VK, M>]
} & GetModelValueEmits<A, VK, M>

type SlotProps<T extends InputMenuItem> = (props: { item: T, index: number }) => any

export interface InputMenuSlots<
  A extends ArrayOrNested<InputMenuItem> = ArrayOrNested<InputMenuItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  T extends NestedItem<A> = NestedItem<A>
> {
  'leading'(props: {
    modelValue?: GetModelValue<A, VK, M>
    open: boolean
    b24ui: { [K in keyof Required<InputMenu['slots']>]: (props?: Record<string, any>) => string }
  }): any
  'trailing'(props: {
    modelValue?: GetModelValue<A, VK, M>
    open: boolean
    b24ui: { [K in keyof Required<InputMenu['slots']>]: (props?: Record<string, any>) => string }
  }): any
  'empty'(props: { searchTerm?: string }): any
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label': SlotProps<T>
  'item-trailing': SlotProps<T>
  'tags-item-text': SlotProps<T>
  'tags-item-delete': SlotProps<T>
  'content-top': (props?: {}) => any
  'content-bottom': (props?: {}) => any
  'create-item-label'(props: { item: string }): any
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<InputMenuItem>, VK extends GetItemKeys<T> | undefined = undefined, M extends boolean = false">
import { computed, ref, toRef, onMounted, toRaw } from 'vue'
import { ComboboxRoot, ComboboxArrow, ComboboxAnchor, ComboboxInput, ComboboxTrigger, ComboboxPortal, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxLabel, ComboboxSeparator, ComboboxItem, ComboboxItemIndicator, TagsInputRoot, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput, useForwardPropsEmits, useFilter } from 'reka-ui'
import { defu } from 'defu'
import { isEqual } from 'ohash/utils'
import { reactivePick, createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useButtonGroup } from '../composables/useButtonGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormField } from '../composables/useFormField'
import { useLocale } from '../composables/useLocale'
import { usePortal } from '../composables/usePortal'
import { compare, get, isArrayOfArray } from '../utils'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Badge from './Badge.vue'
import B24Avatar from './Avatar.vue'
import B24Chip from './Chip.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputMenuProps<T, VK, M>>(), {
  type: 'text',
  autofocusDelay: 0,
  portal: true,
  labelKey: 'label' as never,
  resetSearchTermOnBlur: true,
  resetSearchTermOnSelect: true
})
const emits = defineEmits<InputMenuEmits<T, VK, M>>()
const slots = defineSlots<InputMenuSlots<T, VK, M>>()

const searchTerm = defineModel<string>('searchTerm', { default: '' })

const { t } = useLocale()
const appConfig = useAppConfig() as InputMenu['AppConfig']
const { contains } = useFilter({ sensitivity: 'base' })

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'open', 'defaultOpen', 'required', 'multiple', 'resetSearchTermOnBlur', 'resetSearchTermOnSelect', 'highlightOnHover', 'ignoreFilter'), emits)
const portalProps = usePortal(toRef(() => props.portal))
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }) as ComboboxContentProps)
const arrowProps = toRef(() => defu(typeof props.arrow === 'boolean' ? {} : props.arrow, { width: 20, height: 10 }) as ComboboxArrowProps)

const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField<InputProps>(props)
const { orientation, size: buttonGroupSize } = useButtonGroup<InputProps>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: icons.chevronDown })))

const inputSize = computed(() => buttonGroupSize.value || formGroupSize.value)

const isTag = computed(() => {
  return props.tag
})

const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate()

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.inputMenu || {}) })({
  color: color.value,
  size: inputSize?.value,
  loading: props.loading,
  highlight: highlight.value,
  rounded: Boolean(props.rounded),
  noPadding: Boolean(props.noPadding),
  noBorder: Boolean(props.noBorder),
  underline: Boolean(props.underline),
  leading: Boolean(isLeading.value || !!props.avatar || !!slots.leading),
  trailing: Boolean(isTrailing.value || !!slots.trailing),
  multiple: props.multiple,
  buttonGroup: orientation.value
}))

function displayValue(value: T): string {
  const item = items.value.find(item => compare(typeof item === 'object' && props.valueKey ? get(item as Record<string, any>, props.valueKey as string) : item, value))
  return item && (typeof item === 'object' ? get(item, props.labelKey as string) : item)
}

const groups = computed<InputMenuItem[][]>(() =>
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : []
)
// eslint-disable-next-line vue/no-dupe-keys
const items = computed(() => groups.value.flatMap(group => group))

const filteredGroups = computed(() => {
  if (props.ignoreFilter || !searchTerm.value) {
    return groups.value
  }

  const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey] as string[]

  return groups.value.map(items => items.filter((item) => {
    if (item === undefined || item === null) {
      return false
    }

    if (typeof item !== 'object') {
      return contains(String(item), searchTerm.value)
    }

    if (item.type && ['label', 'separator'].includes(item.type)) {
      return true
    }

    return fields.some((field) => {
      const value = get(item, field)
      return value !== undefined && value !== null && contains(String(value), searchTerm.value)
    })
  })).filter(group => group.filter(item =>
    !isInputItem(item) || (isInputItem(item) && (!item.type || !['label', 'separator'].includes(item.type)))
  ).length > 0)
})
const filteredItems = computed(() => filteredGroups.value.flatMap(group => group))

const createItem = computed(() => {
  if (!props.createItem || !searchTerm.value) {
    return false
  }

  const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } as NestedItem<T> : searchTerm.value

  if ((typeof props.createItem === 'object' && props.createItem.when === 'always') || props.createItem === 'always') {
    return !filteredItems.value.find(item => compare(item, newItem, props.valueKey as string))
  }

  return !filteredItems.value.length
})
const createItemPosition = computed(() => typeof props.createItem === 'object' ? props.createItem.position : 'bottom')

const inputRef = ref<InstanceType<typeof ComboboxInput> | null>(null)

function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.$el?.focus()
  }
}

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})

function onUpdate(value: any) {
  if (toRaw(props.modelValue) === value) {
    return
  }
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)
  emitFormChange()
  emitFormInput()

  if (props.resetSearchTermOnSelect) {
    searchTerm.value = ''
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

function onUpdateOpen(value: boolean) {
  let timeoutId

  if (!value) {
    const event = new FocusEvent('blur')

    emits('blur', event)
    emitFormBlur()

    // Since we use `displayValue` prop inside ComboboxInput we should reset searchTerm manually
    // https://reka-ui.com/docs/components/combobox#api-reference
    if (props.resetSearchTermOnBlur) {
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

function onRemoveTag(event: any) {
  if (props.multiple) {
    const modelValue = props.modelValue as GetModelValue<T, VK, true>
    const filteredValue = modelValue.filter(value => !isEqual(value, event))
    emits('update:modelValue', filteredValue as GetModelValue<T, VK, M>)
    emits('remove-tag', event)
    onUpdate(filteredValue)
  }
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

function isInputItem(item: InputMenuItem): item is _InputMenuItem {
  return typeof item === 'object' && item !== null
}

defineExpose({
  inputRef
})
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DefineCreateItemTemplate>
    <ComboboxGroup :class="b24ui.group({ addNew: true, class: props.b24ui?.group })">
      <ComboboxItem
        :class="b24ui.item({ addNew: true, class: props.b24ui?.item })"
        :value="searchTerm"
        @select.prevent="emits('create', searchTerm)"
      >
        <span :class="b24ui.itemLabel({ addNew: true, class: props.b24ui?.itemLabel })">
          <slot name="create-item-label" :item="searchTerm">
            <Component
              :is="icons.plus"
              :class="b24ui.itemLeadingIcon({ addNew: true, class: props.b24ui?.itemLeadingIcon })"
            />
            {{ t('inputMenu.create', { label: searchTerm }) }}
          </slot>
        </span>
      </ComboboxItem>
    </ComboboxGroup>
  </DefineCreateItemTemplate>

  <ComboboxRoot
    :id="id"
    v-slot="{ modelValue, open }"
    v-bind="rootProps"
    :name="name"
    :disabled="disabled"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    :as-child="!!multiple"
    ignore-filter
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
    @keydown.enter="$event.preventDefault()"
  >
    <B24Badge
      v-if="!multiple && isTag"
      :class="b24ui.tag({ class: props.b24ui?.tag })"
      :color="props.tagColor"
      :label="props.tag"
      size="xs"
    />
    <ComboboxAnchor :as-child="!multiple" :class="b24ui.base({ class: props.b24ui?.base })">
      <TagsInputRoot
        v-if="multiple"
        v-slot="{ modelValue: tags }"
        :model-value="(modelValue as string[])"
        :disabled="disabled"
        :required="required"
        delimiter=""
        as-child
        @blur="onBlur"
        @focus="onFocus"
        @remove-tag="onRemoveTag"
      >
        <B24Badge
          v-if="!!multiple && isTag"
          :class="b24ui.tag({ class: props.b24ui?.tag })"
          :color="props.tagColor"
          :label="props.tag"
          size="xs"
        />

        <TagsInputItem v-for="(item, index) in tags" :key="index" :value="(item as string)" :class="b24ui.tagsItem({ class: [props.b24ui?.tagsItem, isInputItem(item) && item.b24ui?.tagsItem] })">
          <TagsInputItemText :class="b24ui.tagsItemText({ class: [props.b24ui?.tagsItemText, isInputItem(item) && item.b24ui?.tagsItemText] })">
            <slot name="tags-item-text" :item="(item as NestedItem<T>)" :index="index">
              {{ displayValue(item as T) }}
            </slot>
          </TagsInputItemText>

          <TagsInputItemDelete :class="b24ui.tagsItemDelete({ class: [props.b24ui?.tagsItemDelete, isInputItem(item) && item.b24ui?.tagsItemDelete] })" :disabled="disabled">
            <slot name="tags-item-delete" :item="(item as NestedItem<T>)" :index="index">
              <Component
                :is="deleteIcon || icons.close"
                :class="b24ui.tagsItemDeleteIcon({ class: [props.b24ui?.tagsItemDeleteIcon, isInputItem(item) && item.b24ui?.tagsItemDeleteIcon] })"
              />
            </slot>
          </TagsInputItemDelete>
        </TagsInputItem>

        <ComboboxInput v-model="searchTerm" as-child>
          <TagsInputInput
            ref="inputRef"
            v-bind="{ ...$attrs, ...ariaAttrs }"
            :placeholder="placeholder"
            :class="b24ui.tagsInput({ class: props.b24ui?.tagsInput })"
            @keydown.enter.prevent
          />
        </ComboboxInput>
      </TagsInputRoot>

      <ComboboxInput
        v-else
        ref="inputRef"
        :display-value="displayValue"
        v-bind="{ ...$attrs, ...ariaAttrs }"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        @blur="onBlur"
        @focus="onFocus"
        @update:model-value="searchTerm = $event"
      />

      <span v-if="isLeading || !!avatar || !!slots.leading" :class="b24ui.leading({ class: props.b24ui?.leading })">
        <slot name="leading" :model-value="(modelValue as GetModelValue<T, VK, M>)" :open="open" :b24ui="b24ui">
          <Component
            :is="leadingIconName"
            v-if="isLeading && leadingIconName"
            :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
          />
          <B24Avatar
            v-else-if="!!avatar"
            :size="((props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
            v-bind="avatar"
            :class="b24ui.leadingAvatar({ class: props.b24ui?.leadingAvatar })"
          />
        </slot>
      </span>

      <ComboboxTrigger v-if="isTrailing || !!slots.trailing" :class="b24ui.trailing({ class: props.b24ui?.trailing })">
        <slot name="trailing" :model-value="(modelValue as GetModelValue<T, VK, M>)" :open="open" :b24ui="b24ui">
          <Component
            :is="trailingIconName"
            v-if="trailingIconName"
            :class="b24ui.trailingIcon({ class: props.b24ui?.trailingIcon })"
          />
        </slot>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal v-bind="portalProps">
      <ComboboxContent :class="b24ui.content({ class: props.b24ui?.content })" v-bind="contentProps">
        <slot name="content-top" />

        <ComboboxEmpty :class="b24ui.empty({ class: props.b24ui?.empty })">
          <slot name="empty" :search-term="searchTerm">
            {{ searchTerm ? t('inputMenu.noMatch', { searchTerm }) : t('inputMenu.noData') }}
          </slot>
        </ComboboxEmpty>

        <div
          role="presentation"
          :class="b24ui.viewport({ class: props.b24ui?.viewport })"
        >
          <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'top'" />

          <ComboboxGroup v-for="(group, groupIndex) in filteredGroups" :key="`group-${groupIndex}`" :class="b24ui.group({ class: props.b24ui?.group })">
            <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
              <ComboboxLabel v-if="isInputItem(item) && item.type === 'label'" :class="b24ui.label({ class: [props.b24ui?.label, item.b24ui?.label, item.class] })">
                {{ get(item, props.labelKey as string) }}
              </ComboboxLabel>

              <ComboboxSeparator v-else-if="isInputItem(item) && item.type === 'separator'" :class="b24ui.separator({ class: [props.b24ui?.separator, item.b24ui?.separator, item.class] })" />

              <ComboboxItem
                v-else
                :class="b24ui.item({ class: [props.b24ui?.item, isInputItem(item) && item.b24ui?.item, isInputItem(item) && item.class], colorItem: isInputItem(item) ? item?.color : undefined })"
                :disabled="isInputItem(item) && item.disabled"
                :value="props.valueKey && isInputItem(item) ? get(item, props.valueKey as string) : item"
                @select="onSelect($event, item)"
              >
                <slot name="item" :item="(item as NestedItem<T>)" :index="index">
                  <slot name="item-leading" :item="(item as NestedItem<T>)" :index="index">
                    <Component
                      :is="item.icon"
                      v-if="isInputItem(item) && item.icon"
                      :class="b24ui.itemLeadingIcon({ class: [props.b24ui?.itemLeadingIcon, item.b24ui?.itemLeadingIcon], colorItem: item?.color })"
                    />
                    <B24Avatar v-else-if="isInputItem(item) && item.avatar" :size="((item.b24ui?.itemLeadingAvatarSize || props.b24ui?.itemLeadingAvatarSize || b24ui.itemLeadingAvatarSize()) as AvatarProps['size'])" v-bind="item.avatar" :class="b24ui.itemLeadingAvatar({ class: [props.b24ui?.itemLeadingAvatar, item.b24ui?.itemLeadingAvatar], colorItem: item?.color })" />
                    <B24Chip
                      v-else-if="isInputItem(item) && item.chip"
                      :size="((item.b24ui?.itemLeadingChipSize || props.b24ui?.itemLeadingChipSize || b24ui.itemLeadingChipSize()) as ChipProps['size'])"
                      inset
                      standalone
                      v-bind="item.chip"
                      :class="b24ui.itemLeadingChip({ class: [props.b24ui?.itemLeadingChip, item.b24ui?.itemLeadingChip], colorItem: item?.color })"
                    />
                  </slot>

                  <span :class="b24ui.itemLabel({ class: [props.b24ui?.itemLabel, isInputItem(item) && item.b24ui?.itemLabel] })">
                    <slot name="item-label" :item="(item as NestedItem<T>)" :index="index">
                      {{ isInputItem(item) ? get(item, props.labelKey as string) : item }}
                    </slot>
                  </span>

                  <span :class="b24ui.itemTrailing({ class: [props.b24ui?.itemTrailing, isInputItem(item) && item.b24ui?.itemTrailing], colorItem: isInputItem(item) ? item?.color : undefined })">
                    <slot name="item-trailing" :item="(item as NestedItem<T>)" :index="index" />

                    <ComboboxItemIndicator as-child>
                      <Component
                        :is="selectedIcon || icons.check"
                        :class="b24ui.itemTrailingIcon({ class: [props.b24ui?.itemTrailingIcon, isInputItem(item) && item.b24ui?.itemTrailingIcon], colorItem: isInputItem(item) ? item?.color : undefined })"
                      />
                    </ComboboxItemIndicator>
                  </span>
                </slot>
              </ComboboxItem>
            </template>
          </ComboboxGroup>

          <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'bottom'" />
        </div>

        <slot name="content-bottom" />

        <ComboboxArrow v-if="!!arrow" v-bind="arrowProps" :class="b24ui.arrow({ class: props.b24ui?.arrow })" />
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
