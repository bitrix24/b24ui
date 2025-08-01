<script lang="ts">
import type { SliderRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/range'
import type { ComponentConfig } from '../types/utils'

type Range = ComponentConfig<typeof theme, AppConfig, 'range'>

export interface RangeProps extends Pick<SliderRootProps, 'name' | 'disabled' | 'inverted' | 'min' | 'max' | 'step' | 'minStepsBetweenThumbs'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * @defaultValue 'md'
   */
  size?: Range['variants']['size']
  /**
   * @defaultValue 'primary'
   */
  color?: Range['variants']['color']
  /**
   * The orientation of the Range.
   * @defaultValue 'horizontal'
   */
  orientation?: SliderRootProps['orientation']
  /**
   * The value of the Range when initially rendered. Use when you do not need to control the state of the Range
   */
  defaultValue?: number | number[]
  class?: any
  b24ui?: Range['slots']
}

export interface RangeEmits<T extends number | number[] = number | number[]> {
  (e: 'update:modelValue', payload: T): void
  (e: 'change', payload: Event): void
}
</script>

<script setup lang="ts" generic="T extends number | number[]">
import { computed } from 'vue'
import { SliderRoot, SliderRange, SliderTrack, SliderThumb, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/useFormField'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<RangeProps>(), {
  min: 0,
  max: 100,
  step: 1,
  orientation: 'horizontal'
})
const emits = defineEmits<RangeEmits<T>>()

const modelValue = defineModel<T>()

const appConfig = useAppConfig() as Range['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'orientation', 'min', 'max', 'step', 'minStepsBetweenThumbs', 'inverted'), emits)

const { id, emitFormChange, emitFormInput, size, color, name, disabled, ariaAttrs } = useFormField<RangeProps>(props)

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
    return (modelValue.value as number[]) ?? defaultRangeValue.value
  },
  set(value) {
    modelValue.value = (value?.length !== 1 ? value : value[0]) as T
  }
})

const thumbsCount = computed(() => rangeValue.value?.length ?? 1)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.range || {}) })({
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
    v-bind="{ ...rootProps, ...ariaAttrs }"
    :id="id"
    v-model="rangeValue"
    :name="name"
    :disabled="disabled"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
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
