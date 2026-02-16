<script lang="ts">
import type { SliderRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/range'
import type { TooltipProps } from '../types'
import type { ComponentConfig } from '../types/tv'

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
   * @defaultValue 'air-primary'
   */
  color?: Range['variants']['color']
  /**
   * The orientation of the range.
   * @defaultValue 'horizontal'
   */
  orientation?: Range['variants']['orientation']
  /**
   * Display a tooltip around the range thumbs with the current value.
   * `{ disableClosingTrigger: true }`{lang="ts-type"}
   * @defaultValue false
   */
  tooltip?: boolean | TooltipProps
  /** The value of the range when initially rendered. Use when you do not need to control the state of the range. */
  defaultValue?: number | number[]
  class?: any
  b24ui?: Range['slots']
}

export interface RangeEmits {
  change: [event: Event]
}
</script>

<script setup lang="ts" generic="T extends number | number[]">
import { computed } from 'vue'
import { SliderRoot, SliderRange, SliderTrack, SliderThumb, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { useFormField } from '../composables/useFormField'
import { tv } from '../utils/tv'
import B24Tooltip from './Tooltip.vue'

const props = withDefaults(defineProps<RangeProps>(), {
  min: 0,
  max: 100,
  step: 1,
  orientation: 'horizontal'
})
const emits = defineEmits<RangeEmits>()

const modelValue = defineModel<T>()

const appConfig = useAppConfig() as Range['AppConfig']
const uiProp = useComponentUI('range', props)

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

const thumbs = computed(() => rangeValue.value?.length ?? 1)

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
    data-slot="root"
    :class="b24ui.root({ class: [uiProp?.root, props.class] })"
    :default-value="defaultRangeValue"
    @update:model-value="emitFormInput()"
    @value-commit="onChange"
  >
    <SliderTrack data-slot="track" :class="b24ui.track({ class: uiProp?.track })">
      <SliderRange data-slot="range" :class="b24ui.range({ class: uiProp?.range })" />
    </SliderTrack>

    <template v-for="thumb in thumbs" :key="thumb">
      <B24Tooltip
        v-if="!!tooltip"
        :text="thumbs > 1 ? String(rangeValue?.[thumb - 1]) : String(rangeValue)"
        disable-closing-trigger
        v-bind="(typeof tooltip === 'object' ? tooltip : {})"
      >
        <SliderThumb data-slot="thumb" :class="b24ui.thumb({ class: uiProp?.thumb })" :aria-label="thumbs === 1 ? 'Thumb' : `Thumb ${thumb} of ${thumbs}`" />
      </B24Tooltip>
      <SliderThumb v-else data-slot="thumb" :class="b24ui.thumb({ class: uiProp?.thumb })" :aria-label="thumbs === 1 ? 'Thumb' : `Thumb ${thumb} of ${thumbs}`" />
    </template>
  </SliderRoot>
</template>
