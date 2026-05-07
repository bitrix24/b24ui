<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { PinInputRootEmits, PinInputRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/pin-input'
import type { ComponentConfig } from '../types/tv'

type PinInput = ComponentConfig<typeof theme, AppConfig, 'pinInput'>

type PinInputType = 'text' | 'number'
type PinInputValue<Type extends PinInputType> = [Type] extends ['number'] ? number[] : string[]

export interface PinInputProps<T extends PinInputType = 'text'> extends Pick<PinInputRootProps<T>, 'defaultValue' | 'disabled' | 'id' | 'mask' | 'modelValue' | 'name' | 'otp' | 'placeholder' | 'required' | 'type'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * @defaultValue 'air-primary'
   */
  color?: PinInput['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: PinInput['variants']['size']
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
   * Removes all borders (rings)
   * @defaultValue false
   */
  noBorder?: boolean
  /**
   * The number of input fields.
   * @defaultValue 5
   */
  length?: number | string
  autofocus?: boolean
  autofocusDelay?: number
  highlight?: boolean
  /** Keep the mobile text size on all breakpoints. (Left for backward compatibility.) */
  fixed?: boolean
  class?: any
  b24ui?: PinInput['slots']
}

export type PinInputEmits<T extends PinInputType = 'text'> = PinInputRootEmits<T> & {
  change: [event: Event]
  blur: [event: Event]
}

</script>

<script setup lang="ts" generic="T extends PinInputType">
import { ref, computed, onMounted } from 'vue'
import { PinInputInput, PinInputRoot } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useForwardProps } from '../composables/useForwardProps'
import { useFormField } from '../composables/useFormField'
import { looseToNumber } from '../utils'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<PinInputProps<T>>(), {
  type: 'text' as never,
  length: 5,
  autofocusDelay: 0
})
const emits = defineEmits<PinInputEmits<T>>()

const props = useComponentProps<PinInputProps<T>>('pinInput', _props)

const appConfig = useAppConfig() as PinInput['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'disabled', 'id', 'mask', 'name', 'otp', 'required', 'type'), emits)

const { emitFormInput, emitFormFocus, emitFormChange, emitFormBlur, size, color, id, name, highlight, disabled, ariaAttrs } = useFormField<PinInputProps>(_props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pinInput || {}) })({
  color: color.value ?? props.color,
  size: size.value ?? props.size,
  highlight: highlight.value ?? props.highlight,
  fixed: props.fixed,
  rounded: Boolean(props.rounded),
  noBorder: Boolean(props.noBorder),
  underline: Boolean(props.underline)
}))

const inputsRef = ref<ComponentPublicInstance[]>([])

function setInputRef(index: number, el: Element | ComponentPublicInstance | null) {
  // @ts-expect-error - ComponentPublicInstance type mismatch in Nuxt module augmentation
  inputsRef.value[index] = el
}

const completed = ref(false)
function onComplete(value: string[] | number[]) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)
  emitFormChange()
}

function onBlur(event: FocusEvent) {
  if (!event.relatedTarget || completed.value) {
    emits('blur', event)
    emitFormBlur()
  }
}

function autoFocus() {
  if (props.autofocus) {
    inputsRef.value[0]?.$el?.focus()
  }
}

onMounted(() => {
  setTimeout(() => {
    autoFocus()
  }, props.autofocusDelay)
})

defineExpose({
  inputsRef
})
</script>

<template>
  <PinInputRoot
    v-bind="({ ...rootProps, ...ariaAttrs } as any)"
    :id="id"
    :name="name"
    :placeholder="props.placeholder"
    :model-value="(props.modelValue as PinInputValue<T>)"
    :default-value="(props.defaultValue as PinInputValue<T>)"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    @update:model-value="emitFormInput()"
    @complete="onComplete"
  >
    <PinInputInput
      v-for="(ids, index) in looseToNumber(props.length)"
      :key="ids"
      :ref="el => setInputRef(index as number, el)"
      :index="(index as number)"
      data-slot="base"
      :class="b24ui.base({ class: props.b24ui?.base })"
      :disabled="disabled"
      @blur="onBlur"
      @focus="emitFormFocus"
    />
  </PinInputRoot>
</template>
