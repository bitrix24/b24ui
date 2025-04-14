<script lang="ts">
import type { SelectRootProps, SelectRootEmits, SelectContentProps, SelectContentEmits, SelectArrowProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/select'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, ChipProps, InputProps, IconComponent } from '../types'
import type { AcceptableValue, ArrayOrNested, GetItemKeys, GetItemValue, GetModelValue, GetModelValueEmits, NestedItem, EmitsToProps, ComponentConfig } from '../types/utils'

type Select = ComponentConfig<typeof theme, AppConfig, 'select'>

interface SelectItemBase {
  label?: string
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
  value?: string | number
  disabled?: boolean
  onSelect?(e?: Event): void
  [key: string]: any
}
export type SelectItem = SelectItemBase | AcceptableValue | boolean

export interface SelectProps<T extends ArrayOrNested<SelectItem> = ArrayOrNested<SelectItem>, VK extends GetItemKeys<T> = 'value', M extends boolean = false> extends Omit<SelectRootProps<T>, 'dir' | 'multiple' | 'modelValue' | 'defaultValue' | 'by'>, UseComponentIconsProps {
  id?: string
  /** The placeholder text when the select is empty. */
  placeholder?: string
  /**
   * @defaultValue 'primary'
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
   * Rounds the corners of the button
   * @defaultValue false
   */
  rounded?: boolean
  tag?: string
  /**
   * @defaultValue 'primary'
   */
  tagColor?: Select['variants']['tagColor']
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
  portal?: boolean
  /**
   * When `items` is an array of objects, select the field to use as the value.
   * @defaultValue 'value'
   */
  valueKey?: VK
  /**
   * When `items` is an array of objects, select the field to use as the label.
   * @defaultValue 'label'
   */
  labelKey?: keyof NestedItem<T>
  items?: T
  /**
   * The value of the Select when initially rendered. Use when you do not need to control the state of the Select
   */
  defaultValue?: GetModelValue<T, VK, M>
  /**
   * The controlled value of the Select. Can be bind as `v-model`
   */
  modelValue?: GetModelValue<T, VK, M>
  /**
   * Whether multiple options can be selected or not
   * @defaultValue false
   */
  multiple?: M & boolean
  /**
   * Highlight the ring color like a focus state
   * @defaultValue false
   */
  highlight?: boolean
  class?: any
  b24ui?: Select['slots']
}

export type SelectEmits<A extends ArrayOrNested<SelectItem>, VK extends GetItemKeys<A> | undefined, M extends boolean> = Omit<SelectRootEmits, 'update:modelValue'> & {
  change: [payload: Event]
  blur: [payload: FocusEvent]
  focus: [payload: FocusEvent]
} & GetModelValueEmits<A, VK, M>

type SlotProps<T extends SelectItem> = (props: { item: T, index: number }) => any

export interface SelectSlots<
  A extends ArrayOrNested<SelectItem> = ArrayOrNested<SelectItem>,
  VK extends GetItemKeys<A> | undefined = undefined,
  M extends boolean = false,
  T extends NestedItem<A> = NestedItem<A>
> {
  'leading'(props: {
    modelValue?: GetModelValue<A, VK, M>
    open: boolean
    b24ui: { [K in keyof Required<Select['slots']>]: (props?: Record<string, any>) => string }
  }): any
  'default'(props: {
    modelValue?: GetModelValue<A, VK, M>
    open: boolean
  }): any
  'trailing'(props: {
    modelValue?: GetModelValue<A, VK, M>
    open: boolean
    b24ui: { [K in keyof Required<Select['slots']>]: (props?: Record<string, any>) => string }
  }): any
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label': SlotProps<T>
  'item-trailing': SlotProps<T>
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<SelectItem>, VK extends GetItemKeys<T> = 'value', M extends boolean = false">
import { computed, toRef } from 'vue'
import { Primitive, SelectRoot, SelectArrow, SelectTrigger, SelectPortal, SelectContent, SelectViewport, SelectScrollUpButton, SelectScrollDownButton, SelectLabel, SelectGroup, SelectItem, SelectItemIndicator, SelectItemText, SelectSeparator, useForwardPropsEmits } from 'reka-ui'
import { defu } from 'defu'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useButtonGroup } from '../composables/useButtonGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormField } from '../composables/useFormField'
import { compare, get, isArrayOfArray } from '../utils'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Avatar from './Avatar.vue'
import B24Chip from './Chip.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SelectProps<T, VK, M>>(), {
  valueKey: 'value' as never,
  labelKey: 'label' as never,
  portal: true
})
const emits = defineEmits<SelectEmits<T, VK, M>>()
const slots = defineSlots<SelectSlots<T, VK, M>>()

const appConfig = useAppConfig() as Select['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'disabled', 'autocomplete', 'required', 'multiple'), emits)
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }) as SelectContentProps)
const arrowProps = toRef(() => props.arrow as SelectArrowProps)

const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField<InputProps>(props)
const { orientation, size: buttonGroupSize } = useButtonGroup<InputProps>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(
  props,
  { trailingIcon: icons.chevronDown }
)))

const selectSize = computed(() => buttonGroupSize.value || formGroupSize.value)

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
  tagColor: props.tagColor,
  leading: Boolean(isLeading.value || !!props.avatar || !!slots.leading),
  trailing: Boolean(isTrailing.value || !!slots.trailing),
  buttonGroup: orientation.value
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

function displayValue(value?: GetItemValue<T, VK> | GetItemValue<T, VK>[]): string {
  if (props.multiple && Array.isArray(value)) {
    return value.map(v => displayValue(v)).filter(Boolean).join(', ')
  }

  const item = items.value.find(item => compare(typeof item === 'object' ? get(item as Record<string, any>, props.valueKey as string) : item, value))
  return item && (typeof item === 'object' ? get(item, props.labelKey as string) : item)
}

function onUpdate(value: any) {
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

function isSelectItem(item: SelectItem): item is SelectItemBase {
  return typeof item === 'object' && item !== null
}
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <Primitive as="div" :class="b24ui.root({ class: [props.b24ui?.root] })">
    <SelectRoot
      v-slot="{ modelValue, open }"
      :name="name"
      v-bind="rootProps"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :default-value="(defaultValue as (AcceptableValue | AcceptableValue[]))"
      :model-value="(modelValue as (AcceptableValue | AcceptableValue[]))"
      @update:model-value="onUpdate"
      @update:open="onUpdateOpen"
    >
      <SelectTrigger :id="id" :class="b24ui.base({ class: [props.class, props.b24ui?.base] })" v-bind="{ ...$attrs, ...ariaAttrs }">
        <div v-if="isTag" :class="b24ui.tag({ class: props.b24ui?.tag })">
          {{ props.tag }}
        </div>

        <span v-if="isLeading || !!avatar || !!slots.leading" :class="b24ui.leading({ class: props.b24ui?.leading })">
          <slot name="leading" :model-value="(modelValue as GetModelValue<T, VK, M>)" :open="open" :b24ui="b24ui">
            <Component
              :is="leadingIconName"
              v-if="isLeading && leadingIconName"
              :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
            />
            <B24Avatar v-else-if="!!avatar" :size="((props.b24ui?.itemLeadingAvatarSize || b24ui.itemLeadingAvatarSize()) as AvatarProps['size'])" v-bind="avatar" :class="b24ui.itemLeadingAvatar({ class: props.b24ui?.itemLeadingAvatar })" />
          </slot>
        </span>

        <slot :model-value="(modelValue as GetModelValue<T, VK, M>)" :open="open">
          <template v-for="displayedModelValue in [displayValue(modelValue as GetModelValue<T, VK, M>)]" :key="displayedModelValue">
            <span v-if="displayedModelValue" :class="b24ui.value({ class: props.b24ui?.value })">
              {{ displayedModelValue }}
            </span>
            <span v-else :class="b24ui.placeholder({ class: props.b24ui?.placeholder })">
              {{ placeholder ?? '&nbsp;' }}
            </span>
          </template>
        </slot>

        <span v-if="isTrailing || !!slots.trailing" :class="b24ui.trailing({ class: props.b24ui?.trailing })">
          <slot name="trailing" :model-value="(modelValue as GetModelValue<T, VK, M>)" :open="open" :b24ui="b24ui">
            <Component
              :is="trailingIconName"
              v-if="trailingIconName"
              :class="b24ui.trailingIcon({ class: props.b24ui?.trailingIcon })"
            />
          </slot>
        </span>
      </SelectTrigger>

      <SelectPortal :disabled="!portal">
        <SelectContent :class="b24ui.content({ class: props.b24ui?.content })" v-bind="contentProps">
          <SelectScrollUpButton :class="b24ui.scrollUpDownButton({ class: props.b24ui?.scrollUpDownButton })">
            <Component
              :is="icons.chevronUp"
              :class="b24ui.scrollUpDownButtonIcon({ class: props.b24ui?.scrollUpDownButtonIcon })"
            />
          </SelectScrollUpButton>
          <SelectViewport :class="b24ui.viewport({ class: props.b24ui?.viewport })">
            <SelectGroup v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" :class="b24ui.group({ class: props.b24ui?.group })">
              <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
                <SelectLabel v-if="isSelectItem(item) && item.type === 'label'" :class="b24ui.label({ class: props.b24ui?.label })">
                  {{ get(item, props.labelKey as string) }}
                </SelectLabel>

                <SelectSeparator v-else-if="isSelectItem(item) && item.type === 'separator'" :class="b24ui.separator({ class: props.b24ui?.separator })" />

                <SelectItem
                  v-else
                  :class="b24ui.item({ class: props.b24ui?.item, colorItem: isSelectItem(item) ? item?.color : undefined })"
                  :disabled="isSelectItem(item) && item.disabled"
                  :value="isSelectItem(item) ? get(item, props.valueKey as string) : item"
                  @select="isSelectItem(item) && item.onSelect?.($event)"
                >
                  <slot name="item" :item="(item as NestedItem<T>)" :index="index">
                    <slot name="item-leading" :item="(item as NestedItem<T>)" :index="index">
                      <Component
                        :is="item.icon"
                        v-if="isSelectItem(item) && item.icon"
                        :class="b24ui.itemLeadingIcon({ class: props.b24ui?.itemLeadingIcon, colorItem: item?.color })"
                      />
                      <B24Avatar v-else-if="isSelectItem(item) && item.avatar" :size="((props.b24ui?.itemLeadingAvatarSize || b24ui.itemLeadingAvatarSize()) as AvatarProps['size'])" v-bind="item.avatar" :class="b24ui.itemLeadingAvatar({ class: props.b24ui?.itemLeadingAvatar, colorItem: item?.color })" />
                      <B24Chip
                        v-else-if="isSelectItem(item) && item.chip"
                        :size="((props.b24ui?.itemLeadingChipSize || b24ui.itemLeadingChipSize()) as ChipProps['size'])"
                        inset
                        standalone
                        v-bind="item.chip"
                        :class="b24ui.itemLeadingChip({ class: props.b24ui?.itemLeadingChip, colorItem: item?.color })"
                      />
                    </slot>

                    <SelectItemText :class="b24ui.itemLabel({ class: props.b24ui?.itemLabel })">
                      <slot name="item-label" :item="(item as NestedItem<T>)" :index="index">
                        {{ isSelectItem(item) ? get(item, props.labelKey as string) : item }}
                      </slot>
                    </SelectItemText>

                    <span :class="b24ui.itemTrailing({ class: props.b24ui?.itemTrailing, colorItem: isSelectItem(item) ? item?.color : undefined })">
                      <slot name="item-trailing" :item="(item as NestedItem<T>)" :index="index" />

                      <SelectItemIndicator as-child>
                        <Component
                          :is="selectedIcon || icons.check"
                          :class="b24ui.itemTrailingIcon({ class: props.b24ui?.itemTrailingIcon, colorItem: isSelectItem(item) ? item?.color : undefined })"
                        />
                      </SelectItemIndicator>
                    </span>
                  </slot>
                </SelectItem>
              </template>
            </SelectGroup>
          </SelectViewport>
          <SelectScrollDownButton :class="b24ui.scrollUpDownButton({ class: props.b24ui?.scrollUpDownButton })">
            <Component
              :is="icons.chevronDown"
              :class="b24ui.scrollUpDownButtonIcon({ class: props.b24ui?.scrollUpDownButtonIcon })"
            />
          </SelectScrollDownButton>
          <SelectArrow v-if="!!arrow" v-bind="arrowProps" :class="b24ui.arrow({ class: props.b24ui?.arrow })" />
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </Primitive>
</template>
