<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/input'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, BadgeProps } from '../types'
import type { InputHTMLAttributes } from '../types/html'
import type { ModelModifiers, ApplyModifiers } from '../types/input'
import type { AcceptableValue } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type Input = ComponentConfig<typeof theme, AppConfig, 'input'>

export type InputValue = AcceptableValue

export interface InputProps<T extends InputValue = InputValue, Mod extends ModelModifiers = ModelModifiers> extends UseComponentIconsProps, /** @vue-ignore */ Omit<InputHTMLAttributes, 'name' | 'type' | 'placeholder' | 'required' | 'autocomplete' | 'autofocus' | 'disabled'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  id?: string
  name?: string
  type?: InputHTMLAttributes['type']
  /** The placeholder text when the input is empty. */
  placeholder?: string
  /**
   * @defaultValue 'air-primary'
   */
  color?: Input['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: Input['variants']['size']
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
   * Rounds the corners of the input
   * @defaultValue false
   */
  rounded?: boolean
  /**
   * @defaultValue false
   */
  required?: boolean
  /**
   * @defaultValue 'off'
   */
  autocomplete?: InputHTMLAttributes['autocomplete']
  /**
   * @defaultValue false
   */
  autofocus?: boolean
  /**
   * @defaultValue 0
   */
  autofocusDelay?: number
  /**
   * @defaultValue false
   */
  disabled?: boolean
  tag?: string
  /**
   * @defaultValue 'air-primary'
   */
  tagColor?: BadgeProps['color']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  modelValue?: ApplyModifiers<T, Mod>
  defaultValue?: ApplyModifiers<T, Mod>
  modelModifiers?: Mod
  class?: any
  b24ui?: Input['slots']
}

export interface InputEmits<T extends InputValue = InputValue, Mod extends ModelModifiers = ModelModifiers> {
  'update:modelValue': [value: ApplyModifiers<T, Mod>]
  'blur': [event: FocusEvent]
  'change': [event: Event]
}

export interface InputSlots {
  leading(props: { b24ui: Input['b24ui'] }): any
  default(props: { b24ui: Input['b24ui'] }): any
  trailing(props: { b24ui: Input['b24ui'] }): any
}
</script>

<script setup lang="ts" generic="T extends InputValue, Mod extends ModelModifiers">
import { useTemplateRef, computed, onMounted } from 'vue'
import { Primitive } from 'reka-ui'
import { useVModel } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormField } from '../composables/useFormField'
import { looseToNumber } from '../utils'
import { tv } from '../utils/tv'
import B24Badge from './Badge.vue'
import B24Avatar from './Avatar.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputProps<T, Mod>>(), {
  type: 'text',
  autocomplete: 'off',
  autofocusDelay: 0
})
const emits = defineEmits<InputEmits<T, Mod>>()
const slots = defineSlots<InputSlots>()

const modelValue = useVModel<InputProps<T, Mod>, 'modelValue', 'update:modelValue'>(props, 'modelValue', emits, { defaultValue: props.defaultValue })

const appConfig = useAppConfig() as Input['AppConfig']
const uiProp = useComponentUI('input', props)

const { emitFormBlur, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, emitFormFocus, ariaAttrs } = useFormField<InputProps<T>>(props, { deferInputValidation: true })
const { orientation, size: fieldGroupSize } = useFieldGroup<InputProps<T>>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props)

const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value)

const isTag = computed(() => {
  return props.tag
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.input || {}) })({
  type: props.type as Input['variants']['type'],
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
  fieldGroup: orientation.value
}))

const inputRef = useTemplateRef('inputRef')

// Custom function to handle the v-model properties
function updateInput(value: string | null | undefined) {
  if (props.modelModifiers?.trim && (typeof value === 'string' || value === null || value === undefined)) {
    value = value?.trim() ?? null
  }

  if (props.modelModifiers?.number || props.type === 'number') {
    value = looseToNumber(value)
  }

  if (props.modelModifiers?.nullable) {
    value ||= null
  }

  if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
    value ||= undefined
  }

  modelValue.value = value as ApplyModifiers<T, Mod>
  emitFormInput()
}

function onInput(event: Event) {
  if (!props.modelModifiers?.lazy) {
    updateInput((event.target as HTMLInputElement).value)
  }
}

function onChange(event: Event) {
  const value = (event.target as HTMLInputElement).value

  if (props.modelModifiers?.lazy) {
    updateInput(value)
  }

  // Update trimmed input so that it has same behavior as native input https://github.com/vuejs/core/blob/5ea8a8a4fab4e19a71e123e4d27d051f5e927172/packages/runtime-dom/src/directives/vModel.ts#L63
  if (props.modelModifiers?.trim) {
    (event.target as HTMLInputElement).value = value.trim()
  }

  emitFormChange()
  emits('change', event)
}

function onBlur(event: FocusEvent) {
  emitFormBlur()
  emits('blur', event)
}

function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.focus()
  }
}

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})

defineExpose({
  inputRef
})
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <B24Badge
      v-if="isTag"
      data-slot="tag"
      :class="b24ui.tag({ class: uiProp?.tag })"
      :color="props.tagColor"
      :label="props.tag"
      size="xs"
    />

    <input
      :id="id"
      ref="inputRef"
      :type="type"
      :value="modelValue"
      :name="name"
      :placeholder="placeholder"
      data-slot="base"
      :class="b24ui.base({ class: uiProp?.base })"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      @focus="emitFormFocus"
    >

    <slot :b24ui="b24ui" />

    <span v-if="isLeading || !!avatar || !!slots.leading" data-slot="leading" :class="b24ui.leading({ class: uiProp?.leading })">
      <slot name="leading" :b24ui="b24ui">
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

    <span v-if="isTrailing || !!slots.trailing" data-slot="trailing" :class="b24ui.trailing({ class: uiProp?.trailing })">
      <slot name="trailing" :b24ui="b24ui">
        <Component
          :is="trailingIconName"
          v-if="trailingIconName"
          data-slot="trailingIcon"
          :class="b24ui.trailingIcon({ class: uiProp?.trailingIcon })"
        />
      </slot>
    </span>
  </Primitive>
</template>
