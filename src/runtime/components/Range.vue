<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { SliderRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/range'
import { tv } from '../utils/tv'

const appConfig = _appConfig as AppConfig & { b24ui: { range: Partial<typeof theme> } }

const range = tv({ extend: tv(theme), ...(appConfig.b24ui?.range || {}) })

type RangeVariants = VariantProps<typeof range>

export interface RangeProps extends Pick<SliderRootProps, 'name' | 'disabled' | 'inverted' | 'min' | 'max' | 'step' | 'minStepsBetweenThumbs'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  size?: RangeVariants['size']
  color?: RangeVariants['color']
  /**
   * The orientation of the Range.
   * @defaultValue 'horizontal'
   */
  orientation?: SliderRootProps['orientation']
  /** The value of the Range when initially rendered. Use when you do not need to control the state of the Range. */
  defaultValue?: number | number[]
  class?: any
  b24ui?: Partial<typeof range.slots>
}

export interface RangeEmits {
  (e: 'update:modelValue', payload: number | number[]): void
  (e: 'change', payload: Event): void
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { SliderRoot, SliderRange, SliderTrack, SliderThumb, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useFormField } from '../composables/useFormField'

const props = withDefaults(defineProps<RangeProps>(), {
  min: 0,
  max: 100,
  step: 1,
  orientation: 'horizontal'
})
const emits = defineEmits<RangeEmits>()

const modelValue = defineModel<number | number[]>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'orientation', 'min', 'max', 'step', 'minStepsBetweenThumbs', 'inverted'), emits)

const { id, emitFormChange, emitFormInput, size, color, name, disabled } = useFormField<RangeProps>(props)

const defaultRangeValue = computed(() => {
  if (typeof props.defaultValue === 'number') {
    return [props.defaultValue]
  }
  return props.defaultValue
})

const rangeValue = computed({
  get() {
    if (typeof modelValue.value === 'number') {
      return [modelValue.value]
    }
    return modelValue.value ?? defaultRangeValue.value
  },
  set(value) {
    modelValue.value = value?.length !== 1 ? value : value[0]
  }
})

const thumbsCount = computed(() => rangeValue.value?.length ?? 1)

const b24ui = computed(() => range({
  disabled: disabled.value,
  size: size.value,
  color: color.value,
  orientation: props.orientation
}))

function onChange(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emits('change', event)
  emitFormChange()
}
</script>

<template>
  <SliderRoot
    v-bind="rootProps"
    :id="id"
    v-model="rangeValue"
    :name="name"
    :disabled="disabled"
    :class="b24ui.root({ class: [props.class, props.b24ui?.root] })"
    :default-value="defaultRangeValue"
    @update:model-value="emitFormInput()"
    @value-commit="onChange"
  >
    <SliderTrack :class="b24ui.track({ class: props.b24ui?.track })">
      <SliderRange :class="b24ui.range({ class: props.b24ui?.range })" />
    </SliderTrack>

    <SliderThumb v-for="count in thumbsCount" :key="count" :class="b24ui.thumb({ class: props.b24ui?.thumb })" />
  </SliderRoot>
</template>
