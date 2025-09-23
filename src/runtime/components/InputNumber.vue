<script lang="ts">
import type { NumberFieldRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/input-number'
import type { ButtonProps, BadgeProps, IconComponent } from '../types'
import type { ModelModifiers } from '../types/input'
import type { ComponentConfig } from '../types/tv'

type InputNumber = ComponentConfig<typeof theme, AppConfig, 'inputNumber'>

export interface InputNumberProps extends Pick<NumberFieldRootProps, 'modelValue' | 'defaultValue' | 'min' | 'max' | 'step' | 'stepSnapping' | 'disabled' | 'required' | 'id' | 'name' | 'formatOptions' | 'disableWheelChange' | 'invertWheelChange' | 'readonly'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /** The placeholder text when the input is empty. */
  placeholder?: string
  /**
   * @defaultValue 'air-primary'
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
   * @defaultValue 'air-primary'
   */
  tagColor?: BadgeProps['color']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  /**
   * The orientation of the input menu.
   * @defaultValue 'horizontal'
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * Configure the increment button. The `size` is inherited.
   * @defaultValue { color: 'air-tertiary-no-accent' }
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
   * @defaultValue { color: 'air-tertiary-no-accent' }
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
  modelModifiers?: Pick<ModelModifiers, 'optional'>
  /**
   * The locale to use for formatting and parsing numbers.
   * @defaultValue B24App.locale.code
   */
  locale?: string
  class?: any
  b24ui?: InputNumber['slots']
}

export interface InputNumberEmits {
  'update:modelValue': [value: number]
  'blur': [event: FocusEvent]
  'change': [event: Event]
}

export interface InputNumberSlots {
  increment(props?: {}): any
  decrement(props?: {}): any
}
</script>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { NumberFieldRoot, NumberFieldInput, NumberFieldDecrement, NumberFieldIncrement, useForwardPropsEmits } from 'reka-ui'
import { reactivePick, useVModel } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useFormField } from '../composables/useFormField'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Badge from './Badge.vue'
import B24Button from './Button.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputNumberProps>(), {
  orientation: 'horizontal',
  disabledIncrement: false,
  disabledDecrement: false,
  color: 'air-primary'
})
const emits = defineEmits<InputNumberEmits>()
defineSlots<InputNumberSlots>()

const modelValue = useVModel<InputNumberProps, 'modelValue', 'update:modelValue'>(props, 'modelValue', emits, { defaultValue: props.defaultValue })

const { t, code: codeLocale } = useLocale()
const appConfig = useAppConfig() as InputNumber['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'defaultValue', 'min', 'max', 'step', 'stepSnapping', 'formatOptions', 'disableWheelChange', 'invertWheelChange', 'readonly'), emits)

const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color, size: formGroupSize, name, highlight, disabled, ariaAttrs } = useFormField<InputNumberProps>(props)
const { orientation, size: fieldGroupSize } = useFieldGroup<InputNumberProps>(props)

const locale = computed(() => props.locale || codeLocale.value)
const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value)

const isTag = computed(() => {
  return props.tag
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.inputNumber || {}) })({
  color: color.value,
  size: inputSize?.value,
  highlight: highlight.value,
  rounded: Boolean(props.rounded),
  noPadding: Boolean(props.noPadding),
  noBorder: Boolean(props.noBorder),
  underline: Boolean(props.underline),
  orientation: props.orientation,
  fieldGroup: orientation.value
}))

const incrementIcon = computed(() => props.incrementIcon || (props.orientation === 'horizontal' ? icons.plus : icons.chevronUp))
const decrementIcon = computed(() => props.decrementIcon || (props.orientation === 'horizontal' ? icons.minus : icons.chevronDown))

const inputRef = ref<InstanceType<typeof NumberFieldInput> | null>(null)

function onUpdate(value: number | undefined) {
  if (props.modelModifiers?.optional) {
    value = value ?? undefined
  }

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
    :model-value="modelValue"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    :name="name"
    :disabled="disabled"
    :locale="locale"
    @update:model-value="onUpdate"
  >
    <B24Badge
      v-if="isTag"
      :class="b24ui.tag({ class: props.b24ui?.tag })"
      :color="props.tagColor"
      :label="props.tag"
      size="xs"
    />

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
            color="air-tertiary-no-accent"
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
            color="air-tertiary-no-accent"
            :aria-label="t('inputNumber.decrement')"
            v-bind="typeof decrement === 'object' ? decrement : undefined"
          />
        </slot>
      </NumberFieldDecrement>
    </div>
  </NumberFieldRoot>
</template>
