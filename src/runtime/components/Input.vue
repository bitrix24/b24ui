<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/input'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, BadgeProps } from '../types'
import type { AcceptableValue } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type Input = ComponentConfig<typeof theme, AppConfig, 'input'>

export interface InputProps<T extends AcceptableValue = AcceptableValue> extends UseComponentIconsProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  id?: string
  name?: string
  /**
   * @defaultValue 'text'
   */
  type?: InputHTMLAttributes['type']
  /**
   * The placeholder text when the input is empty.
   */
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
   * Rounds the corners of the button
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
  /**
   * Highlight the ring color like a focus state
   * @defaultValue false
   */
  highlight?: boolean
  modelValue?: T
  defaultValue?: T
  modelModifiers?: {
    string?: boolean
    number?: boolean
    trim?: boolean
    lazy?: boolean
    nullify?: boolean
  }
  class?: any
  b24ui?: Input['slots']
}

export interface InputEmits<T extends AcceptableValue = AcceptableValue> {
  'update:modelValue': [value: T]
  'blur': [event: FocusEvent]
  'change': [event: Event]
}

export interface InputSlots {
  leading(props?: {}): any
  default(props?: {}): any
  trailing(props?: {}): any
}
</script>

<script setup lang="ts" generic="T extends AcceptableValue">
import { ref, computed, onMounted } from 'vue'
import { Primitive } from 'reka-ui'
import { useVModel } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useButtonGroup } from '../composables/useButtonGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormField } from '../composables/useFormField'
import { looseToNumber } from '../utils'
import { tv } from '../utils/tv'
import B24Badge from './Badge.vue'
import B24Avatar from './Avatar.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputProps<T>>(), {
  type: 'text',
  autocomplete: 'off',
  autofocusDelay: 0
})
const emits = defineEmits<InputEmits<T>>()
const slots = defineSlots<InputSlots>()

const modelValue = useVModel<InputProps<T>, 'modelValue', 'update:modelValue'>(props, 'modelValue', emits, { defaultValue: props.defaultValue })

const appConfig = useAppConfig() as Input['AppConfig']

const { emitFormBlur, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, emitFormFocus, ariaAttrs } = useFormField<InputProps<T>>(props, { deferInputValidation: true })
const { orientation, size: buttonGroupSize } = useButtonGroup<InputProps<T>>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props)

const inputSize = computed(() => buttonGroupSize.value || formGroupSize.value)

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
  buttonGroup: orientation.value
}))

const inputRef = ref<HTMLInputElement | null>(null)

// Custom function to handle the v-model properties
function updateInput(value: string | null) {
  if (props.modelModifiers?.trim) {
    value = value?.trim() ?? null
  }

  if (props.modelModifiers?.number || props.type === 'number') {
    value = looseToNumber(value)
  }

  if (props.modelModifiers?.nullify) {
    value ||= null
  }

  modelValue.value = value as T
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
  <Primitive :as="as" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <B24Badge
      v-if="isTag"
      :class="b24ui.tag({ class: props.b24ui?.tag })"
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
      :class="b24ui.base({ class: props.b24ui?.base })"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      @focus="emitFormFocus"
    >

    <slot />

    <span v-if="isLeading || !!avatar || !!slots.leading" :class="b24ui.leading({ class: props.b24ui?.leading })">
      <slot name="leading">
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

    <span v-if="isTrailing || !!slots.trailing" :class="b24ui.trailing({ class: props.b24ui?.trailing })">
      <slot name="trailing">
        <Component
          :is="trailingIconName"
          v-if="trailingIconName"
          :class="b24ui.trailingIcon({ class: props.b24ui?.trailingIcon })"
        />
      </slot>
    </span>
  </Primitive>
</template>
