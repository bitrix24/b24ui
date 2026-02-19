<script lang="ts">
import type { NumberFieldRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/input-number'
import type { ButtonProps, BadgeProps, IconComponent, LinkPropsKeys } from '../types'
import type { InputHTMLAttributes } from '../types/html'
import type { ModelModifiers } from '../types/input'
import type { ComponentConfig } from '../types/tv'

type InputNumber = ComponentConfig<typeof theme, AppConfig, 'inputNumber'>

type InputNumberValue = number | null

type ApplyModifiers<T extends InputNumberValue, Mod extends Pick<ModelModifiers, 'optional'>>
  = | T
    | (Mod extends { optional: true } ? undefined : never)

export interface InputNumberProps<T extends InputNumberValue = InputNumberValue, Mod extends Pick<ModelModifiers, 'optional'> = Pick<ModelModifiers, 'optional'>> extends Pick<NumberFieldRootProps, | 'min' | 'max' | 'step' | 'stepSnapping' | 'disabled' | 'required' | 'id' | 'name' | 'formatOptions' | 'disableWheelChange' | 'invertWheelChange' | 'readonly' | 'focusOnChange'>, /** @vue-ignore */ Omit<InputHTMLAttributes, 'disabled' | 'min' | 'max' | 'readonly' | 'required' | 'step' | 'name' | 'placeholder' | 'type' | 'autofocus' | 'maxlength' | 'minlength' | 'pattern' | 'size'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /** The placeholder text when the input is empty. */
  placeholder?: string
  color?: InputNumber['variants']['color']
  size?: InputNumber['variants']['size']
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
  tag?: string
  /**
   * @defaultValue 'air-primary'
   */
  tagColor?: BadgeProps['color']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  /**
   * The orientation of the input number.
   * @defaultValue 'horizontal'
   */
  orientation?: InputNumber['variants']['orientation']
  /**
   * Configure the increment button. The `size` is inherited.
   * @defaultValue { color: 'air-tertiary-no-accent' }
   */
  increment?: boolean | Omit<ButtonProps, LinkPropsKeys>
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
  decrement?: boolean | Omit<ButtonProps, LinkPropsKeys>
  /**
   * The icon displayed to decrement the value.
   * @defaultValue icons.minus
   * @IconComponent
   */
  decrementIcon?: IconComponent
  /** Disable the decrement button. */
  decrementDisabled?: boolean
  autofocus?: boolean
  autofocusDelay?: number
  defaultValue?: NonNullable<T>
  modelValue?: ApplyModifiers<T, Mod>
  modelModifiers?: Mod
  class?: any
  b24ui?: InputNumber['slots']
}

export interface InputNumberEmits<T extends InputNumberValue = InputNumberValue, Mod extends Pick<ModelModifiers, 'optional'> = Pick<ModelModifiers, 'optional'>> {
  'update:modelValue': [value: ApplyModifiers<T, Mod>]
  'blur': [event: FocusEvent]
  'change': [event: Event]
}

export interface InputNumberSlots {
  increment(props?: {}): any
  decrement(props?: {}): any
}
</script>

<script setup lang="ts" generic="T extends InputNumberValue = InputNumberValue, Mod extends Pick<ModelModifiers, 'optional'> = Pick<ModelModifiers, 'optional'>">
import { onMounted, computed, useTemplateRef, toRef } from 'vue'
import { NumberFieldRoot, NumberFieldInput, NumberFieldDecrement, NumberFieldIncrement, useForwardPropsEmits } from 'reka-ui'
import { reactivePick, useVModel } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useFormField } from '../composables/useFormField'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Badge from './Badge.vue'
import B24Button from './Button.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputNumberProps<T, Mod>>(), {
  orientation: 'horizontal',
  increment: true,
  decrement: true,
  disabledIncrement: false,
  disabledDecrement: false,
  color: 'air-primary'
})
const emits = defineEmits<InputNumberEmits<T, Mod>>()
defineSlots<InputNumberSlots>()

const modelValue = useVModel<InputNumberProps<T, Mod>, 'modelValue', 'update:modelValue'>(props, 'modelValue', emits, { defaultValue: props.defaultValue })

const { t } = useLocale()
const appConfig = useAppConfig() as InputNumber['AppConfig']
const uiProp = useComponentUI('inputNumber', props)

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'stepSnapping', 'formatOptions', 'disableWheelChange', 'invertWheelChange', 'required', 'readonly', 'focusOnChange'), emits)

const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color, size: formGroupSize, name, highlight, disabled, ariaAttrs } = useFormField<InputNumberProps<T, Mod>>(props)
const { orientation, size: fieldGroupSize } = useFieldGroup<InputNumberProps<T, Mod>>(props)

const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value)

const isTag = computed(() => {
  return props.tag
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.inputNumber || {}) })({
  color: color.value,
  size: inputSize?.value,
  highlight: highlight.value,
  rounded: Boolean(props.rounded),
  noBorder: Boolean(props.noBorder),
  underline: Boolean(props.underline),
  orientation: props.orientation,
  fieldGroup: orientation.value,
  increment: props.orientation === 'vertical' ? (!!props.increment || !!props.decrement) : !!props.increment,
  decrement: props.orientation === 'vertical' ? false : !!props.decrement
}))

const incrementIcon = computed(() => props.incrementIcon || (props.orientation === 'horizontal' ? icons.plus : icons.chevronUp))
const decrementIcon = computed(() => props.decrementIcon || (props.orientation === 'horizontal' ? icons.minus : icons.chevronDown))

const inputRef = useTemplateRef('inputRef')

function onUpdate(value: ApplyModifiers<T, Mod> | undefined) {
  if (props.modelModifiers?.optional) {
    modelValue.value = value = value ?? undefined
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
  inputRef: toRef(() => inputRef.value?.$el as HTMLInputElement)
})
</script>

<template>
  <NumberFieldRoot
    v-bind="rootProps"
    :id="id"
    :default-value="defaultValue"
    :model-value="modelValue"
    :min="min"
    :max="max"
    :step="step"
    data-slot="root"
    :class="b24ui.root({ class: [uiProp?.root, props.class] })"
    :name="name"
    :disabled="disabled"
    @update:model-value="(val) => onUpdate(val as ApplyModifiers<T, Mod>)"
  >
    <B24Badge
      v-if="isTag"
      data-slot="tag"
      :class="b24ui.tag({ class: uiProp?.tag })"
      :color="props.tagColor"
      :label="props.tag"
      size="xs"
    />

    <NumberFieldInput
      v-bind="{ ...$attrs, ...ariaAttrs }"
      ref="inputRef"
      :placeholder="placeholder"
      :required="required"
      data-slot="base"
      :class="b24ui.base({ class: uiProp?.base })"
      @blur="onBlur"
      @focus="emitFormFocus"
    />

    <div v-if="!!increment" data-slot="increment" :class="b24ui.increment({ class: uiProp?.increment })">
      <NumberFieldIncrement as-child :disabled="disabled || incrementDisabled">
        <slot name="increment">
          <B24Button
            :icon="incrementIcon"
            color="air-tertiary-no-accent"
            :size="inputSize"
            :aria-label="t('inputNumber.increment')"
            v-bind="typeof increment === 'object' ? increment : undefined"
          />
        </slot>
      </NumberFieldIncrement>
    </div>

    <div v-if="!!decrement" data-slot="decrement" :class="b24ui.decrement({ class: uiProp?.decrement })">
      <NumberFieldDecrement as-child :disabled="disabled || decrementDisabled">
        <slot name="decrement">
          <B24Button
            :icon="decrementIcon"
            color="air-tertiary-no-accent"
            :size="inputSize"
            :aria-label="t('inputNumber.decrement')"
            v-bind="typeof decrement === 'object' ? decrement : undefined"
          />
        </slot>
      </NumberFieldDecrement>
    </div>
  </NumberFieldRoot>
</template>
