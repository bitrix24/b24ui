<script lang="ts">
import type { SelectRootProps, SelectRootEmits, SelectContentProps, SelectContentEmits, SelectArrowProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/select'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, ChipProps, InputProps, BadgeProps, IconComponent } from '../types'
import type { ModelModifiers } from '../types/input'
import type { ButtonHTMLAttributes } from '../types/html'
import type { AcceptableValue, ArrayOrNested, GetItemKeys, GetItemValue, GetModelValue, GetModelValueEmits, NestedItem, EmitsToProps } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type Select = ComponentConfig<typeof theme, AppConfig, 'select'>

export type SelectValue = AcceptableValue

export type SelectItem = SelectValue | {
  label?: string
  description?: string
  /**
   * Display an icon on the left side.
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps
  color?: Select['variants']['color']
  chip?: ChipProps
  /**
   * The item type.
   * @defaultValue 'item'
   */
  type?: 'label' | 'separator' | 'item'
  value?: SelectValue
  disabled?: boolean
  onSelect?: (e: Event) => void
  class?: any
  b24ui?: Pick<Select['slots'], 'label' | 'separator' | 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChipSize' | 'itemLeadingChip' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemTrailing' | 'itemTrailingIcon'>
  [key: string]: any
}

type ExcludeItem = { type: 'label' | 'separator' }

export interface SelectProps<T extends ArrayOrNested<SelectItem> = ArrayOrNested<SelectItem>, VK extends GetItemKeys<T> = 'value', M extends boolean = false> extends Omit<SelectRootProps<T>, 'dir' | 'multiple' | 'modelValue' | 'defaultValue' | 'by'>, UseComponentIconsProps, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'name'> {
  id?: string
  /** The placeholder text when the select is empty. */
  placeholder?: string
  /**
   * @defaultValue 'air-primary'
   */
  color?: Select['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: Select['variants']['size']
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
   * Rounds the corners of the select
   * @defaultValue false
   */
  rounded?: boolean
  tag?: string
  /**
   * @defaultValue 'air-primary'
   */
  tagColor?: BadgeProps['color']
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
   * The content of the menu.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }
   */
  content?: Omit<SelectContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<SelectContentEmits>>
  /**
   * Display an arrow alongside the menu.
   * @defaultValue false
   */
  arrow?: boolean | Omit<SelectArrowProps, 'as' | 'asChild'>
  /**
   * Render the menu in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement
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
  /** The value of the Select when initially rendered. Use when you do not need to control the state of the Select. */
  defaultValue?: GetModelValue<T, VK, M, ExcludeItem>
  /** The controlled value of the Select. Can be bind as `v-model`. */
  modelValue?: GetModelValue<T, VK, M, ExcludeItem>
  modelModifiers?: Omit<ModelModifiers<GetModelValue<T, VK, M, ExcludeItem>>, 'lazy'>
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  class?: any
  b24ui?: Select['slots']
}

export type SelectEmits<A extends ArrayOrNested<SelectItem>, VK extends GetItemKeys<A> | undefined, M extends boolean> = Omit<SelectRootEmits, 'update:modelValue'> & {
  change: [event: Event]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
} & GetModelValueEmits<A, VK, M, ExcludeItem>

type SlotProps<T extends SelectItem> = (props: { item: T, index: number, b24ui: Select['b24ui'] }) => any

export interface SelectSlots<
  A extends ArrayOrNested<SelectItem> = ArrayOrNested<SelectItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  T extends NestedItem<A> = NestedItem<A>
> {
  'leading'(props: { modelValue?: GetModelValue<A, VK, M, ExcludeItem>, open: boolean, b24ui: Select['b24ui'] }): any
  'default'(props: { modelValue?: GetModelValue<A, VK, M, ExcludeItem>, open: boolean, b24ui: Select['b24ui'] }): any
  'trailing'(props: { modelValue?: GetModelValue<A, VK, M, ExcludeItem>, open: boolean, b24ui: Select['b24ui'] }): any
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label'(props: { item: T, index: number }): any
  'item-description'(props: { item: T, index: number }): any
  'item-trailing': SlotProps<T>
  'content-top': (props?: {}) => any
  'content-bottom': (props?: {}) => any
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<SelectItem>, VK extends GetItemKeys<T> = 'value', M extends boolean = false">
import { useTemplateRef, computed, onMounted, toRef } from 'vue'
import { Primitive, SelectRoot, SelectArrow, SelectTrigger, SelectPortal, SelectContent, SelectLabel, SelectGroup, SelectItem as RSelectItem, SelectItemIndicator, SelectItemText, SelectSeparator, useForwardPropsEmits } from 'reka-ui'
import { defu } from 'defu'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormField } from '../composables/useFormField'
import { usePortal } from '../composables/usePortal'
import { get, getDisplayValue, isArrayOfArray, looseToNumber } from '../utils'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Badge from './Badge.vue'
import B24Avatar from './Avatar.vue'
import B24Chip from './Chip.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SelectProps<T, VK, M>>(), {
  valueKey: 'value' as never,
  labelKey: 'label',
  descriptionKey: 'description',
  portal: true,
  autofocusDelay: 0
})
const emits = defineEmits<SelectEmits<T, VK, M>>()
const slots = defineSlots<SelectSlots<T, VK, M>>()

const appConfig = useAppConfig() as Select['AppConfig']
const uiProp = useComponentUI('select', props)

const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'disabled', 'autocomplete', 'required', 'multiple'), emits)
const portalProps = usePortal(toRef(() => props.portal))
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }) as SelectContentProps)
const arrowProps = toRef(() => defu(typeof props.arrow === 'boolean' ? {} : props.arrow, { width: 20, height: 10 }) as SelectArrowProps)

const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField<InputProps>(props)
const { orientation, size: fieldGroupSize } = useFieldGroup<InputProps>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(
  props,
  { trailingIcon: icons.chevronDown }
)))

const selectSize = computed(() => fieldGroupSize.value || formGroupSize.value)

const isTag = computed(() => {
  return props.tag
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.select || {}) })({
  color: color.value,
  size: selectSize?.value,
  loading: props.loading,
  rounded: Boolean(props.rounded),
  noPadding: Boolean(props.noPadding),
  noBorder: Boolean(props.noBorder),
  underline: Boolean(props.underline),
  highlight: highlight.value,
  leading: Boolean(isLeading.value || !!props.avatar || !!slots.leading),
  trailing: Boolean(isTrailing.value || !!slots.trailing),
  fieldGroup: orientation.value
}))

const groups = computed<SelectItem[][]>(() =>
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : []
)
// eslint-disable-next-line vue/no-dupe-keys
const items = computed(() => groups.value.flatMap(group => group) as T[])

function displayValue(value: GetItemValue<T, VK, ExcludeItem> | GetItemValue<T, VK, ExcludeItem>[]): string | undefined {
  if (props.multiple && Array.isArray(value)) {
    const displayedValues = value
      .map(item => getDisplayValue<T[], GetItemValue<T, VK, ExcludeItem>>(items.value, item, {
        labelKey: props.labelKey,
        valueKey: props.valueKey
      }))
      .filter((v): v is string => v != null && v !== '')

    return displayedValues.length > 0 ? displayedValues.join(', ') : undefined
  }

  return getDisplayValue<T[], GetItemValue<T, VK, ExcludeItem>>(items.value, value as GetItemValue<T, VK, ExcludeItem>, {
    labelKey: props.labelKey,
    valueKey: props.valueKey
  })
}

const triggerRef = useTemplateRef('triggerRef')

function autoFocus() {
  if (props.autofocus) {
    triggerRef.value?.$el?.focus({
      focusVisible: true
    })
  }
}

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})

function onUpdate(value: any) {
  if (props.modelModifiers?.trim) {
    value = value?.trim() ?? null
  }

  if (props.modelModifiers?.number) {
    value = looseToNumber(value)
  }

  if (props.modelModifiers?.nullable) {
    value ??= null
  }

  if (props.modelModifiers?.optional) {
    value ??= undefined
  }

  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)

  emitFormChange()
  emitFormInput()
}
function onUpdateOpen(value: boolean) {
  if (!value) {
    const event = new FocusEvent('blur')
    emits('blur', event)
    emitFormBlur()
  } else {
    const event = new FocusEvent('focus')
    emits('focus', event)
    emitFormFocus()
  }
}

function isSelectItem(item: SelectItem): item is Exclude<SelectItem, SelectValue> {
  return typeof item === 'object' && item !== null
}

const viewportRef = useTemplateRef('viewportRef')

defineExpose({
  triggerRef: toRef(() => triggerRef.value?.$el as HTMLButtonElement),
  viewportRef: toRef(() => viewportRef.value)
})
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <Primitive as="div" data-slot="root" :class="b24ui.root({ class: [uiProp?.root] })">
    <SelectRoot
      v-slot="{ modelValue, open }"
      :name="name"
      v-bind="rootProps"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :default-value="(defaultValue as Exclude<SelectItem, boolean> | Exclude<SelectItem, boolean>[])"
      :model-value="(modelValue as Exclude<SelectItem, boolean> | Exclude<SelectItem, boolean>[])"
      @update:model-value="onUpdate"
      @update:open="onUpdateOpen"
    >
      <SelectTrigger
        :id="id"
        ref="triggerRef"
        data-slot="base"
        :class="b24ui.base({ class: [uiProp?.base, props.class] })"
        v-bind="{ ...$attrs, ...ariaAttrs }"
      >
        <B24Badge
          v-if="isTag"
          data-slot="tag"
          :class="b24ui.tag({ class: uiProp?.tag })"
          :color="props.tagColor"
          :label="props.tag"
          size="xs"
        />
        <span v-if="isLeading || !!avatar || !!slots.leading" data-slot="leading" :class="b24ui.leading({ class: uiProp?.leading })">
          <slot name="leading" :model-value="(modelValue as GetModelValue<T, VK, M, ExcludeItem>)" :open="open" :b24ui="b24ui">
            <Component
              :is="leadingIconName"
              v-if="isLeading && leadingIconName"
              data-slot="leadingIcon"
              :class="b24ui.leadingIcon({ class: uiProp?.leadingIcon })"
            />
            <B24Avatar
              v-else-if="!!avatar"
              :size="((uiProp?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
              v-bind="avatar"
              data-slot="leadingAvatar"
              :class="b24ui.leadingAvatar({ class: uiProp?.leadingAvatar })"
            />
          </slot>
        </span>

        <slot :model-value="(modelValue as GetModelValue<T, VK, M, ExcludeItem>)" :open="open" :b24ui="b24ui">
          <template v-for="displayedModelValue in [displayValue(modelValue as GetModelValue<T, VK, M, ExcludeItem>)]" :key="displayedModelValue">
            <span
              v-if="displayedModelValue !== undefined && displayedModelValue !== null"
              data-slot="value"
              :class="b24ui.value({ class: uiProp?.value })"
            >
              {{ displayedModelValue }}
            </span>
            <span
              v-else
              data-slot="placeholder"
              :class="b24ui.placeholder({ class: uiProp?.placeholder })"
            >
              {{ placeholder ?? '&nbsp;' }}
            </span>
          </template>
        </slot>

        <span v-if="isTrailing || !!slots.trailing" data-slot="trailing" :class="b24ui.trailing({ class: uiProp?.trailing })">
          <slot name="trailing" :model-value="(modelValue as GetModelValue<T, VK, M, ExcludeItem>)" :open="open" :b24ui="b24ui">
            <Component
              :is="trailingIconName"
              v-if="trailingIconName"
              data-slot="trailingIcon"
              :class="b24ui.trailingIcon({ class: uiProp?.trailingIcon })"
            />
          </slot>
        </span>
      </SelectTrigger>

      <SelectPortal v-bind="portalProps">
        <SelectContent data-slot="content" :class="b24ui.content({ class: uiProp?.content })" v-bind="contentProps">
          <slot name="content-top" />

          <div
            ref="viewportRef"
            role="presentation"
            data-slot="viewport"
            :class="b24ui.viewport({ class: uiProp?.viewport })"
          >
            <SelectGroup v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" data-slot="group" :class="b24ui.group({ class: uiProp?.group })">
              <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
                <SelectLabel v-if="isSelectItem(item) && item.type === 'label'" data-slot="label" :class="b24ui.label({ class: [uiProp?.label, item.b24ui?.label, item.class] })">
                  {{ get(item, props.labelKey as string) }}
                </SelectLabel>

                <SelectSeparator v-else-if="isSelectItem(item) && item.type === 'separator'" data-slot="separator" :class="b24ui.separator({ class: [uiProp?.separator, item.b24ui?.separator, item.class] })" />

                <RSelectItem
                  v-else
                  data-slot="item"
                  :class="b24ui.item({ class: [uiProp?.item, isSelectItem(item) && item.b24ui?.item, isSelectItem(item) && item.class], colorItem: (isSelectItem(item) && item?.color) || undefined })"
                  :disabled="isSelectItem(item) && item.disabled"
                  :value="isSelectItem(item) ? get(item, props.valueKey as string) : item"
                  @select="isSelectItem(item) && item.onSelect?.($event)"
                >
                  <slot name="item" :item="(item as NestedItem<T>)" :index="index" :b24ui="b24ui">
                    <slot name="item-leading" :item="(item as NestedItem<T>)" :index="index" :b24ui="b24ui">
                      <B24Avatar
                        v-if="isSelectItem(item) && item.avatar"
                        :size="((item.b24ui?.itemLeadingAvatarSize || uiProp?.itemLeadingAvatarSize || b24ui.itemLeadingAvatarSize()) as AvatarProps['size'])"
                        v-bind="item.avatar"
                        data-slot="itemLeadingAvatar"
                        :class="b24ui.itemLeadingAvatar({ class: [uiProp?.itemLeadingAvatar, item.b24ui?.itemLeadingAvatar], colorItem: item?.color })"
                      />
                    </slot>

                    <span data-slot="itemWrapper" :class="b24ui.itemWrapper({ class: [uiProp?.itemWrapper, isSelectItem(item) && item.b24ui?.itemWrapper] })">
                      <SelectItemText data-slot="itemLabel" :class="b24ui.itemLabel({ class: [uiProp?.itemLabel, isSelectItem(item) && item.b24ui?.itemLabel] })">
                        <slot name="item-label" :item="(item as NestedItem<T>)" :index="index">
                          {{ isSelectItem(item) ? get(item, props.labelKey as string) : item }}
                        </slot>
                      </SelectItemText>

                      <span
                        v-if="isSelectItem(item) && (get(item, props.descriptionKey as string) || !!slots['item-description'])"
                        data-slot="itemDescription"
                        :class="b24ui.itemDescription({ class: [uiProp?.itemDescription, isSelectItem(item) && item.b24ui?.itemDescription] })"
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

                    <span data-slot="itemTrailing" :class="b24ui.itemTrailing({ class: [uiProp?.itemTrailing, isSelectItem(item) && item.b24ui?.itemTrailing], colorItem: (isSelectItem(item) && item?.color) || undefined })">
                      <SelectItemIndicator as-child>
                        <Component
                          :is="selectedIcon || icons.check"
                          data-slot="itemTrailingIcon"
                          :class="b24ui.itemTrailingIcon({ class: [uiProp?.itemTrailingIcon, isSelectItem(item) && item.b24ui?.itemTrailingIcon], colorItem: (isSelectItem(item) && item?.color) || undefined })"
                        />
                      </SelectItemIndicator>

                      <slot name="item-trailing" :item="(item as NestedItem<T>)" :index="index" :b24ui="b24ui">
                        <Component
                          :is="item.icon"
                          v-if="isSelectItem(item) && item.icon"
                          data-slot="itemLeadingIcon"
                          :class="b24ui.itemLeadingIcon({ class: [uiProp?.itemLeadingIcon, item.b24ui?.itemLeadingIcon], colorItem: item?.color })"
                        />
                        <B24Chip
                          v-else-if="isSelectItem(item) && item.chip"
                          :size="((item.b24ui?.itemLeadingChipSize || uiProp?.itemLeadingChipSize || b24ui.itemLeadingChipSize()) as ChipProps['size'])"
                          inset
                          standalone
                          v-bind="item.chip"
                          data-slot="itemLeadingChip"
                          :class="b24ui.itemLeadingChip({ class: [uiProp?.itemLeadingChip, item.b24ui?.itemLeadingChip], colorItem: item?.color })"
                        />
                      </slot>
                    </span>
                  </slot>
                </RSelectItem>
              </template>
            </SelectGroup>
          </div>

          <slot name="content-bottom" />

          <SelectArrow v-if="!!arrow" v-bind="arrowProps" data-slot="arrow" :class="b24ui.arrow({ class: uiProp?.arrow })" />
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </Primitive>
</template>
