<script lang="ts">
import type { DefineComponent } from 'vue'
import type { VariantProps } from 'tailwind-variants'
import type { SelectRootProps, SelectRootEmits, SelectContentProps, SelectArrowProps, AcceptableValue } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/select'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import { tv } from '../utils/tv'
import type { AvatarProps, ChipProps, InputProps } from '../types'
import type { PartialString, MaybeArrayOfArray, MaybeArrayOfArrayItem, SelectModelValue, SelectModelValueEmits, SelectItemKey } from '../types/utils'

const appConfig = _appConfig as AppConfig & { b24ui: { select: Partial<typeof theme> } }

const select = tv({ extend: tv(theme), ...(appConfig.b24ui?.select || {}) })

export interface SelectItem {
  label?: string
  icon?: DefineComponent
  avatar?: AvatarProps
  chip?: ChipProps
  /**
   * The item type.
   * @defaultValue 'item'
   */
  type?: 'label' | 'separator' | 'item'
  value?: string
  disabled?: boolean
}

type SelectVariants = VariantProps<typeof select>

export interface SelectProps<T extends MaybeArrayOfArrayItem<I>, I extends MaybeArrayOfArray<SelectItem | AcceptableValue | boolean> = MaybeArrayOfArray<SelectItem | AcceptableValue | boolean>, V extends SelectItemKey<T> | undefined = undefined, M extends boolean = false> extends Omit<SelectRootProps<T>, 'dir' | 'multiple' | 'modelValue' | 'defaultValue' | 'by'>, UseComponentIconsProps {
  id?: string
  /** The placeholder text when the select is empty. */
  placeholder?: string
  color?: SelectVariants['color']
  size?: SelectVariants['size']
  /** Removes padding from input. */
  noPadding?: boolean
  /** removes all borders (rings). */
  noBorder?: boolean
  /** removes all borders (rings) except the bottom one. */
  underline?: boolean
  /** Rounds the corners of the button. */
  rounded?: boolean
  tag?: string
  tagColor?: SelectVariants['tagColor']
  /**
   * The icon displayed to open the menu.
   * @defaultValue icons.chevronDown = `ChevronDownIcon`
   */
  trailingIcon?: DefineComponent
  /**
   * The icon displayed when an item is selected.
   * @defaultValue icons.check = `CheckIcon`
   */
  selectedIcon?: DefineComponent
  /**
   * The content of the menu.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }
   */
  content?: Omit<SelectContentProps, 'as' | 'asChild' | 'forceMount'>
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
  valueKey?: V
  /**
   * When `items` is an array of objects, select the field to use as the label.
   * @defaultValue 'label'
   */
  labelKey?: V
  items?: I
  /** The value of the Select when initially rendered. Use when you do not need to control the state of the Select. */
  defaultValue?: SelectModelValue<T, V, M, T extends { value: infer U } ? U : never>
  /** The controlled value of the Select. Can be bind as `v-model`. */
  modelValue?: SelectModelValue<T, V, M, T extends { value: infer U } ? U : never>
  /** Whether multiple options can be selected or not. */
  multiple?: M & boolean
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  class?: any
  b24ui?: PartialString<typeof select.slots>
}

export type SelectEmits<T, V, M extends boolean> = Omit<SelectRootEmits<T>, 'update:modelValue'> & {
  change: [payload: Event]
  blur: [payload: FocusEvent]
  focus: [payload: FocusEvent]
} & SelectModelValueEmits<T, V, M, T extends { value: infer U } ? U : never>

type SlotProps<T> = (props: { item: T, index: number }) => any

export interface SelectSlots<T, M extends boolean> {
  'leading'(props: { modelValue?: M extends true ? AcceptableValue[] : AcceptableValue, open: boolean, b24ui: any }): any
  'default'(props: { modelValue?: M extends true ? AcceptableValue[] : AcceptableValue, open: boolean }): any
  'trailing'(props: { modelValue?: M extends true ? AcceptableValue[] : AcceptableValue, open: boolean, b24ui: any }): any
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label': SlotProps<T>
  'item-trailing': SlotProps<T>
}
</script>

<script setup lang="ts" generic="T extends MaybeArrayOfArrayItem<I>, I extends MaybeArrayOfArray<SelectItem | AcceptableValue | boolean> = MaybeArrayOfArray<SelectItem | AcceptableValue | boolean>, V extends SelectItemKey<T> | undefined = undefined, M extends boolean = false">
import { computed, toRef } from 'vue'
import { SelectRoot, SelectArrow, SelectTrigger, SelectPortal, SelectContent, SelectViewport, SelectScrollUpButton, SelectScrollDownButton, SelectLabel, SelectGroup, SelectItem, SelectItemIndicator, SelectItemText, SelectSeparator, useForwardPropsEmits } from 'reka-ui'
import { defu } from 'defu'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useButtonGroup } from '../composables/useButtonGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormField } from '../composables/useFormField'
import { get, compare } from '../utils'
import icons from '../../theme/icons'
import B24Avatar from './Avatar.vue'
import B24Chip from './Chip.vue'

const props = withDefaults(defineProps<SelectProps<T, I, V, M>>(), {
  valueKey: 'value' as never,
  labelKey: 'label' as never,
  portal: true
})
const emits = defineEmits<SelectEmits<T, V, M>>()
const slots = defineSlots<SelectSlots<T, M>>()

const appConfig = useAppConfig()
const rootProps = useForwardPropsEmits(reactivePick(props, 'modelValue', 'defaultValue', 'open', 'defaultOpen', 'disabled', 'autocomplete', 'required', 'multiple'), emits)
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8, position: 'popper' }) as SelectContentProps)
const arrowProps = toRef(() => props.arrow as SelectArrowProps)

const { emitFormChange, emitFormInput, emitFormBlur, size: formGroupSize, color, id, name, highlight, disabled } = useFormField<InputProps>(props)
const { orientation, size: buttonGroupSize } = useButtonGroup<InputProps>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(
  props,
  { trailingIcon: icons.chevronDown }
)))

const selectSize = computed(() => buttonGroupSize.value || formGroupSize.value)

const isTag = computed(() => {
  return props.tag
})

const b24ui = computed(() => select({
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

const groups = computed(() => props.items?.length ? (Array.isArray(props.items[0]) ? props.items : [props.items]) as SelectItem[][] : [])
// eslint-disable-next-line vue/no-dupe-keys
const items = computed(() => groups.value.flatMap(group => group) as T[])

function displayValue(value?: AcceptableValue | AcceptableValue[]): string | undefined {
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
  }
}
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <SelectRoot
    :id="id"
    v-slot="{ modelValue, open }"
    v-bind="rootProps"
    :name="name"
    :autocomplete="autocomplete"
    :disabled="disabled"
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
  >
    <SelectTrigger :class="b24ui.base({ class: [props.class, props.b24ui?.base] })">
      <div v-if="isTag" :class="b24ui.tag({ class: props.b24ui?.tag })">
        {{ props.tag }}
      </div>

      <span v-if="isLeading || !!avatar || !!slots.leading" :class="b24ui.leading({ class: props.b24ui?.leading })">
        <slot name="leading" :model-value="(modelValue as M extends true ? AcceptableValue[] : AcceptableValue)" :open="open" :b24ui="b24ui">
          <Component
            :is="leadingIconName"
            v-if="isLeading && leadingIconName"
            :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
          />
          <B24Avatar v-else-if="!!avatar" :size="((props.b24ui?.itemLeadingAvatarSize || b24ui.itemLeadingAvatarSize()) as AvatarProps['size'])" v-bind="avatar" :class="b24ui.itemLeadingAvatar({ class: props.b24ui?.itemLeadingAvatar })" />
        </slot>
      </span>

      <slot :model-value="(modelValue as M extends true ? AcceptableValue[] : AcceptableValue)" :open="open">
        <template v-for="displayedModelValue in [displayValue(modelValue)]" :key="displayedModelValue">
          <span v-if="displayedModelValue" :class="b24ui.value({ class: props.b24ui?.value })">
            {{ displayedModelValue }}
          </span>
          <span v-else :class="b24ui.placeholder({ class: props.b24ui?.placeholder })">
            {{ placeholder ?? '&nbsp;' }}
          </span>
        </template>
      </slot>

      <span v-if="isTrailing || !!slots.trailing" :class="b24ui.trailing({ class: props.b24ui?.trailing })">
        <slot name="trailing" :model-value="(modelValue as M extends true ? AcceptableValue[] : AcceptableValue)" :open="open" :b24ui="b24ui">
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
              <SelectLabel v-if="item?.type === 'label'" :class="b24ui.label({ class: props.b24ui?.label })">
                {{ get(item, props.labelKey as string) }}
              </SelectLabel>

              <SelectSeparator v-else-if="item?.type === 'separator'" :class="b24ui.separator({ class: props.b24ui?.separator })" />

              <SelectItem
                v-else
                :class="b24ui.item({ class: props.b24ui?.item })"
                :disabled="item.disabled"
                :value="typeof item === 'object' ? get(item, props.valueKey as string) : item"
              >
                <slot name="item" :item="(item as T)" :index="index">
                  <slot name="item-leading" :item="(item as T)" :index="index">
                    <Component
                      :is="item.icon"
                      v-if="item.icon"
                      :class="b24ui.itemLeadingIcon({ class: props.b24ui?.itemLeadingIcon })"
                    />
                    <B24Avatar v-else-if="item.avatar" :size="((props.b24ui?.itemLeadingAvatarSize || b24ui.itemLeadingAvatarSize()) as AvatarProps['size'])" v-bind="item.avatar" :class="b24ui.itemLeadingAvatar({ class: props.b24ui?.itemLeadingAvatar })" />
                    <B24Chip
                      v-else-if="item.chip"
                      :size="((props.b24ui?.itemLeadingChipSize || b24ui.itemLeadingChipSize()) as ChipProps['size'])"
                      inset
                      standalone
                      v-bind="item.chip"
                      :class="b24ui.itemLeadingChip({ class: props.b24ui?.itemLeadingChip })"
                    />
                  </slot>

                  <SelectItemText :class="b24ui.itemLabel({ class: props.b24ui?.itemLabel })">
                    <slot name="item-label" :item="(item as T)" :index="index">
                      {{ typeof item === 'object' ? get(item, props.labelKey as string) : item }}
                    </slot>
                  </SelectItemText>

                  <span :class="b24ui.itemTrailing({ class: props.b24ui?.itemTrailing })">
                    <slot name="item-trailing" :item="(item as T)" :index="index" />

                    <SelectItemIndicator as-child>
                      <Component
                        :is="selectedIcon || icons.check"
                        :class="b24ui.itemTrailingIcon({ class: props.b24ui?.itemTrailingIcon })"
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
</template>
