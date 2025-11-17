<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { TagsInputRootProps, TagsInputRootEmits, AcceptableInputValue } from 'reka-ui'
import theme from '#build/b24ui/input-tags'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, BadgeProps, IconComponent } from '../types'
import type { InputHTMLAttributes } from '../types/html'
import type { ComponentConfig } from '../types/tv'

type InputTags = ComponentConfig<typeof theme, AppConfig, 'inputTags'>

export type InputTagItem = AcceptableInputValue

export interface InputTagsProps<T extends InputTagItem = InputTagItem> extends Pick<TagsInputRootProps<T>, 'modelValue' | 'defaultValue' | 'addOnPaste' | 'addOnTab' | 'addOnBlur' | 'duplicate' | 'disabled' | 'delimiter' | 'max' | 'id' | 'convertValue' | 'displayValue' | 'name' | 'required'>, UseComponentIconsProps, /** @vue-ignore */ Omit<InputHTMLAttributes, 'disabled' | 'max' | 'required' | 'name' | 'placeholder' | 'type' | 'autofocus' | 'maxlength' | 'minlength' | 'pattern' | 'size' | 'min' | 'step'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /** The placeholder text when the input is empty. */
  placeholder?: string
  /** The maximum number of character allowed. */
  maxLength?: number
  /**
   * @defaultValue 'air-primary'
   */
  color?: InputTags['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: InputTags['variants']['size']
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
  autofocus?: boolean
  autofocusDelay?: number
  /**
   * The icon displayed to delete a tag.
   * @defaultValue icons.close
   * @IconComponent
   */
  deleteIcon?: IconComponent
  tag?: string
  /**
   * @defaultValue 'air-primary'
   */
  tagColor?: BadgeProps['color']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  class?: any
  b24ui?: InputTags['slots']
}

export interface InputTagsEmits<T extends InputTagItem> extends TagsInputRootEmits<T> {
  change: [event: Event]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}

type SlotProps<T extends InputTagItem> = (props: { item: T, index: number, b24ui: InputTags['b24ui'] }) => any

export interface InputTagsSlots<T extends InputTagItem = InputTagItem> {
  'leading'(props: { b24ui: InputTags['b24ui'] }): any
  'default'(props: { b24ui: InputTags['b24ui'] }): any
  'trailing'(props: { b24ui: InputTags['b24ui'] }): any
  'item-text': SlotProps<T>
  'item-delete': SlotProps<T>
}
</script>

<script setup lang="ts" generic="T extends InputTagItem">
import { computed, useTemplateRef, onMounted, toRaw, toRef } from 'vue'
import { TagsInputRoot, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormField } from '../composables/useFormField'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Badge from './Badge.vue'
import B24Avatar from './Avatar.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputTagsProps<T>>(), {
  type: 'text',
  autofocusDelay: 0
})
const emits = defineEmits<InputTagsEmits<T>>()
const slots = defineSlots<InputTagsSlots<T>>()

const appConfig = useAppConfig() as InputTags['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'addOnPaste', 'addOnTab', 'addOnBlur', 'duplicate', 'delimiter', 'max', 'convertValue', 'displayValue', 'required'), emits)

const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField<InputTagsProps>(props)
const { orientation, size: fieldGroupSize } = useFieldGroup<InputTagsProps>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props)

const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value)

const isTag = computed(() => {
  return props.tag
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.inputTags || {}) })({
  color: color.value,
  size: inputSize?.value,
  loading: props.loading,
  highlight: highlight.value,
  rounded: Boolean(props.rounded),
  noBorder: Boolean(props.noBorder),
  underline: Boolean(props.underline),
  leading: Boolean(isLeading.value || !!props.avatar || !!slots.leading),
  trailing: Boolean(isTrailing.value || !!slots.trailing),
  fieldGroup: orientation.value
}))

const inputRef = useTemplateRef('inputRef')

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

function onUpdate(value: T[]) {
  if (toRaw(props.modelValue) === value) {
    return
  }
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)
  emitFormChange()
  emitFormInput()
}

function onBlur(event: FocusEvent) {
  emits('blur', event)
  emitFormBlur()
}

function onFocus(event: FocusEvent) {
  emits('focus', event)
  emitFormFocus()
}

defineExpose({
  inputRef: toRef(() => inputRef.value?.$el as HTMLInputElement)
})
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <TagsInputRoot
    :id="id"
    v-slot="{ modelValue: tags }"
    :model-value="modelValue"
    :default-value="defaultValue"
    data-slot="root"
    :class="b24ui.root({ class: [b24ui.base({ class: props.b24ui?.base }), props.b24ui?.root, props.class] })"
    v-bind="rootProps"
    :name="name"
    :disabled="disabled"
    @update:model-value="onUpdate"
  >
    <B24Badge
      v-if="isTag"
      data-slot="tag"
      :class="b24ui.tag({ class: props.b24ui?.tag })"
      :color="props.tagColor"
      :label="props.tag"
      size="xs"
    />

    <TagsInputItem
      v-for="(item, index) in tags"
      :key="index"
      :value="item"
      data-slot="item"
      :class="b24ui.item({ class: [props.b24ui?.item] })"
    >
      <TagsInputItemText data-slot="itemText" :class="b24ui.itemText({ class: [props.b24ui?.itemText] })">
        <slot v-if="!!slots['item-text']" name="item-text" :item="(item as T)" :index="index" :b24ui="b24ui" />
      </TagsInputItemText>

      <TagsInputItemDelete
        data-slot="itemDelete"
        :class="b24ui.itemDelete({ class: [props.b24ui?.itemDelete] })"
        :disabled="disabled"
      >
        <slot name="item-delete" :item="(item as T)" :index="index" :b24ui="b24ui">
          <Component
            :is="deleteIcon || icons.close"
            data-slot="itemDeleteIcon"
            :class="b24ui.itemDeleteIcon({ class: [props.b24ui?.itemDeleteIcon] })"
          />
        </slot>
      </TagsInputItemDelete>
    </TagsInputItem>

    <TagsInputInput
      ref="inputRef"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      :placeholder="placeholder"
      :max-length="maxLength"
      data-slot="input"
      :class="b24ui.input({ class: props.b24ui?.input })"
      @blur="onBlur"
      @focus="onFocus"
    />

    <slot :b24ui="b24ui" />

    <span v-if="isLeading || !!avatar || !!slots.leading" data-slot="leading" :class="b24ui.leading({ class: props.b24ui?.leading })">
      <slot name="leading" :b24ui="b24ui">
        <Component
          :is="leadingIconName"
          v-if="isLeading && leadingIconName"
          data-slot="leadingIcon"
          :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
        />
        <B24Avatar
          v-else-if="!!avatar"
          :size="((props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
          v-bind="avatar"
          data-slot="leadingAvatar"
          :class="b24ui.leadingAvatar({ class: props.b24ui?.leadingAvatar })"
        />
      </slot>
    </span>

    <span v-if="isTrailing || !!slots.trailing" data-slot="trailing" :class="b24ui.trailing({ class: props.b24ui?.trailing })">
      <slot name="trailing" :b24ui="b24ui">
        <Component
          :is="trailingIconName"
          v-if="trailingIconName"
          data-slot="trailingIcon"
          :class="b24ui.trailingIcon({ class: props.b24ui?.trailingIcon })"
        />
      </slot>
    </span>
  </TagsInputRoot>
</template>
