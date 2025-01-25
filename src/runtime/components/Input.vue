<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/input'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import { tv } from '../utils/tv'
import type { AvatarProps } from '../types'
import type { PartialString } from '../types/utils'

const appConfig = _appConfig as AppConfig & { b24ui: { input: Partial<typeof theme> } }

const input = tv({ extend: tv(theme), ...(appConfig.b24ui?.input || {}) })

type InputVariants = VariantProps<typeof input>

export interface InputProps extends UseComponentIconsProps {
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
  color?: InputVariants['color']
  size?: InputVariants['size']
  /** Removes padding from input. */
  noPadding?: boolean
  /** removes all borders (rings). */
  noBorder?: boolean
  /** removes all borders (rings) except the bottom one. */
  underline?: boolean
  /** Rounds the corners of the button. */
  rounded?: boolean
  required?: boolean
  autocomplete?: InputHTMLAttributes['autocomplete']
  autofocus?: boolean
  autofocusDelay?: number
  disabled?: boolean
  tag?: string
  tagColor?: InputVariants['tagColor']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  class?: any
  b24ui?: PartialString<typeof input.slots>
}

export interface InputEmits {
  (e: 'update:modelValue', payload: string | number): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', event: Event): void
}

export interface InputSlots {
  leading(props?: {}): any
  default(props?: {}): any
  trailing(props?: {}): any
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Primitive } from 'reka-ui'
import { useButtonGroup } from '../composables/useButtonGroup'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFormField } from '../composables/useFormField'
import { looseToNumber } from '../utils'
import B24Avatar from './Avatar.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off',
  autofocusDelay: 0
})
const emits = defineEmits<InputEmits>()
const slots = defineSlots<InputSlots>()

const [modelValue, modelModifiers] = defineModel<string | number>()

const { emitFormBlur, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, emitFormFocus, ariaAttrs } = useFormField<InputProps>(props, { deferInputValidation: true })
const { orientation, size: buttonGroupSize } = useButtonGroup<InputProps>(props)
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props)

const inputSize = computed(() => buttonGroupSize.value || formGroupSize.value)

const isTag = computed(() => {
  return props.tag
})

const b24ui = computed(() => input({
  type: props.type as InputVariants['type'],
  color: color.value,
  size: inputSize?.value,
  loading: props.loading,
  tagColor: props.tagColor,
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

function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.focus()
  }
}

// Custom function to handle the v-model properties
function updateInput(value: string) {
  if (modelModifiers.trim) {
    value = value.trim()
  }

  if (modelModifiers.number || props.type === 'number') {
    value = looseToNumber(value)
  }

  modelValue.value = value
  emitFormInput()
}

function onInput(event: Event) {
  if (!modelModifiers.lazy) {
    updateInput((event.target as HTMLInputElement).value)
  }
}

function onChange(event: Event) {
  const value = (event.target as HTMLInputElement).value

  if (modelModifiers.lazy) {
    updateInput(value)
  }

  // Update trimmed input so that it has same behavior as native input https://github.com/vuejs/core/blob/5ea8a8a4fab4e19a71e123e4d27d051f5e927172/packages/runtime-dom/src/directives/vModel.ts#L63
  if (modelModifiers.trim) {
    (event.target as HTMLInputElement).value = value.trim()
  }

  emitFormChange()
  emits('change', event)
}

function onBlur(event: FocusEvent) {
  emitFormBlur()
  emits('blur', event)
}

defineExpose({
  inputRef
})

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <div v-if="isTag" :class="b24ui.tag({ class: props.b24ui?.tag })">
      {{ props.tag }}
    </div>

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
