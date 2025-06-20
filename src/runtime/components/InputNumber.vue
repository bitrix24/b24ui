<script lang="ts">
import type { NumberFieldRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/input-number'
import type { ButtonProps, IconComponent } from '../types'
import type { ComponentConfig } from '../types/utils'

type InputNumber = ComponentConfig<typeof theme, AppConfig, 'inputNumber'>

export interface InputNumberProps extends Pick<NumberFieldRootProps, 'modelValue' | 'defaultValue' | 'min' | 'max' | 'stepSnapping' | 'step' | 'disabled' | 'required' | 'id' | 'name' | 'formatOptions' | 'disableWheelChange'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * The placeholder text when the input is empty
   */
  placeholder?: string
  /**
   * @defaultValue 'primary'
   */
  color?: InputNumber['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: InputNumber['variants']['size']
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
  tagColor?: InputNumber['variants']['tagColor']
  /**
   * Highlight the ring color like a focus state
   * @defaultValue false
   */
  highlight?: boolean
  /**
   * The orientation of the input menu.
   * @defaultValue 'horizontal'
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * Configure the increment button. The `size` is inherited.
   * @defaultValue { color: 'link', depth: 'light' }
   */
  increment?: ButtonProps
  /**
   * The icon displayed to increment the value.
   * @defaultValue icons.plus
   * @IconComponent
   */
  incrementIcon?: IconComponent
  /** Disable the increment button. */
  incrementDisabled?: boolean
  /**
   * Configure the decrement button. The `size` is inherited.
   * @defaultValue { color: 'link', depth: 'light' }
   */
  decrement?: ButtonProps
  /**
   * The icon displayed to decrement the value.
   * @defaultValue icons.minus
   * @IconComponent
   */
  decrementIcon?: IconComponent
  /** Disable the decrement button. */
  decrementDisabled?: boolean
  /**
   * @defaultValue false
   */
  autofocus?: boolean
  /**
   * @defaultValue 0
   */
  autofocusDelay?: number
  /**
   * The locale to use for formatting and parsing numbers.
   * @defaultValue B24App.locale.code
   */
  locale?: string
  class?: any
  b24ui?: InputNumber['slots']
}

export interface InputNumberEmits {
  (e: 'update:modelValue', payload: number): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', payload: Event): void
}

export interface InputNumberSlots {
  increment(props?: {}): any
  decrement(props?: {}): any
}
</script>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { NumberFieldRoot, NumberFieldInput, NumberFieldDecrement, NumberFieldIncrement, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/useFormField'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputNumberProps>(), {
  orientation: 'horizontal',
  disabledIncrement: false,
  disabledDecrement: false,
  color: 'primary',
  size: 'md'
})
const emits = defineEmits<InputNumberEmits>()
defineSlots<InputNumberSlots>()

const appConfig = useAppConfig() as InputNumber['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'min', 'max', 'step', 'stepSnapping', 'formatOptions', 'disableWheelChange'), emits)

const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color, size, name, highlight, disabled, ariaAttrs } = useFormField<InputNumberProps>(props)

const { t, code: codeLocale } = useLocale()
const locale = computed(() => props.locale || codeLocale.value)

const isTag = computed(() => {
  return props.tag
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.inputNumber || {}) })({
  color: color.value,
  size: size.value,
  tagColor: props.tagColor,
  highlight: highlight.value,
  rounded: Boolean(props.rounded),
  noPadding: Boolean(props.noPadding),
  noBorder: Boolean(props.noBorder),
  underline: Boolean(props.underline),
  orientation: props.orientation
}))

const incrementIcon = computed(() => props.incrementIcon || (props.orientation === 'horizontal' ? icons.plus : icons.chevronUp))
const decrementIcon = computed(() => props.decrementIcon || (props.orientation === 'horizontal' ? icons.minus : icons.chevronDown))

const inputRef = ref<InstanceType<typeof NumberFieldInput> | null>(null)

function onUpdate(value: number) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)

  emitFormChange()
  emitFormInput()
}

function onBlur(event: FocusEvent) {
  emitFormBlur()
  emits('blur', event)
}

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

defineExpose({
  inputRef
})
</script>

<template>
  <NumberFieldRoot
    v-bind="rootProps"
    :id="id"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    :name="name"
    :disabled="disabled"
    :locale="locale"
    @update:model-value="onUpdate"
  >
    <div v-if="isTag" :class="b24ui.tag({ class: props.b24ui?.tag })">
      {{ props.tag }}
    </div>

    <NumberFieldInput
      v-bind="{ ...$attrs, ...ariaAttrs }"
      ref="inputRef"
      :placeholder="placeholder"
      :required="required"
      :class="b24ui.base({ class: props.b24ui?.base })"
      @blur="onBlur"
      @focus="emitFormFocus"
    />

    <div :class="b24ui.increment({ class: props.b24ui?.increment })">
      <NumberFieldIncrement as-child :disabled="disabled || incrementDisabled">
        <slot name="increment">
          <B24Button
            :icon="incrementIcon"
            :size="size"
            color="link"
            depth="light"
            :aria-label="t('inputNumber.increment')"
            v-bind="typeof increment === 'object' ? increment : undefined"
          />
        </slot>
      </NumberFieldIncrement>
    </div>

    <div :class="b24ui.decrement({ class: props.b24ui?.decrement })">
      <NumberFieldDecrement as-child :disabled="disabled || decrementDisabled">
        <slot name="decrement">
          <B24Button
            :icon="decrementIcon"
            :size="size"
            color="link"
            depth="light"
            :aria-label="t('inputNumber.decrement')"
            v-bind="typeof decrement === 'object' ? decrement : undefined"
          />
        </slot>
      </NumberFieldDecrement>
    </div>
  </NumberFieldRoot>
</template>
