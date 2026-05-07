<script lang="ts">
import type { NumberFieldRootProps } from 'reka-ui'
import type { VNode } from 'vue'
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
  /** Keep the mobile text size on all breakpoints. (Left for backward compatibility.) */
  fixed?: boolean
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
  increment?(props?: {}): VNode[]
  decrement?(props?: {}): VNode[]
}
</script>

<script setup lang="ts" generic="T extends InputNumberValue = InputNumberValue, Mod extends Pick<ModelModifiers, 'optional'> = Pick<ModelModifiers, 'optional'>">
import { onMounted, computed, useTemplateRef, toRef } from 'vue'
import { NumberFieldRoot, NumberFieldInput, NumberFieldDecrement, NumberFieldIncrement } from 'reka-ui'
import { reactivePick, useVModel } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useForwardProps } from '../composables/useForwardProps'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useFormField } from '../composables/useFormField'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Badge from './Badge.vue'
import B24Button from './Button.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<InputNumberProps<T, Mod>>(), {
  orientation: 'horizontal',
  increment: true,
  decrement: true,
  disabledIncrement: false,
  disabledDecrement: false,
  color: 'air-primary'
})
const emits = defineEmits<InputNumberEmits<T, Mod>>()

defineSlots<InputNumberSlots>()

const props = useComponentProps<InputNumberProps<T, Mod>>('inputNumber', _props)

// eslint-disable-next-line vue/no-dupe-keys
const modelValue = useVModel<InputNumberProps<T, Mod>, 'modelValue', 'update:modelValue'>(props, 'modelValue', emits, { defaultValue: props.defaultValue })

const { t } = useLocale()
const appConfig = useAppConfig() as InputNumber['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'as', 'stepSnapping', 'formatOptions', 'disableWheelChange', 'invertWheelChange', 'required', 'readonly', 'focusOnChange'), emits)

const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color, size: formFieldSize, name, highlight, disabled, ariaAttrs } = useFormField<InputNumberProps<T, Mod>>(_props)
const { orientation, size: fieldGroupSize } = useFieldGroup<InputNumberProps<T, Mod>>(_props)

const inputSize = computed(() => fieldGroupSize.value || formFieldSize.value)

const isTag = computed(() => {
  return props.tag
})

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.inputNumber || {}) })({
  color: color.value ?? props.color,
  size: inputSize.value ?? props.size,
  highlight: highlight.value ?? props.highlight,
  fixed: props.fixed,
  rounded: Boolean(props.rounded),
  noBorder: Boolean(props.noBorder),
  underline: Boolean(props.underline),
  orientation: props.orientation,
  fieldGroup: orientation.value,
  increment: props.orientation === 'vertical' ? (!!props.increment || !!props.decrement) : !!props.increment,
  decrement: props.orientation === 'vertical' ? false : !!props.decrement
}))

// eslint-disable-next-line vue/no-dupe-keys
const incrementIcon = computed(() => props.incrementIcon || (props.orientation === 'horizontal' ? icons.plus : icons.chevronUp))
// eslint-disable-next-line vue/no-dupe-keys
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
    :default-value="props.defaultValue"
    :model-value="modelValue"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    :name="name"
    :disabled="disabled"
    @update:model-value="(val) => onUpdate(val as ApplyModifiers<T, Mod>)"
  >
    <B24Badge
      v-if="isTag"
      data-slot="tag"
      :class="b24ui.tag({ class: props.b24ui?.tag })"
      :color="props.tagColor"
      :label="props.tag"
      size="xs"
    />

    <NumberFieldInput
      v-bind="{ ...$attrs, ...ariaAttrs }"
      ref="inputRef"
      :placeholder="props.placeholder"
      :required="props.required"
      data-slot="base"
      :class="b24ui.base({ class: props.b24ui?.base })"
      @blur="onBlur"
      @focus="emitFormFocus"
    />

    <div v-if="!!props.increment" data-slot="increment" :class="b24ui.increment({ class: props.b24ui?.increment })">
      <NumberFieldIncrement as-child :disabled="disabled || props.incrementDisabled">
        <slot name="increment">
          <B24Button
            :icon="incrementIcon"
            color="air-tertiary-no-accent"
            :size="inputSize"
            :aria-label="t('inputNumber.increment')"
            v-bind="typeof props.increment === 'object' ? props.increment : undefined"
          />
        </slot>
      </NumberFieldIncrement>
    </div>

    <div v-if="!!props.decrement" data-slot="decrement" :class="b24ui.decrement({ class: props.b24ui?.decrement })">
      <NumberFieldDecrement as-child :disabled="disabled || props.decrementDisabled">
        <slot name="decrement">
          <B24Button
            :icon="decrementIcon"
            color="air-tertiary-no-accent"
            :size="inputSize"
            :aria-label="t('inputNumber.decrement')"
            v-bind="typeof props.decrement === 'object' ? props.decrement : undefined"
          />
        </slot>
      </NumberFieldDecrement>
    </div>
  </NumberFieldRoot>
</template>
