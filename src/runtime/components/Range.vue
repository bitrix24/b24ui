<script lang="ts">
import type { SliderRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/range'
import type { TooltipProps } from './Tooltip.vue'
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
import { SliderRoot, SliderRange, SliderTrack, SliderThumb } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useForwardProps } from '../composables/useForwardProps'
import { useFormField } from '../composables/useFormField'
import { pick, omit } from '../utils'
import { tv } from '../utils/tv'
import B24Tooltip from './Tooltip.vue'

const _props = withDefaults(defineProps<RangeProps>(), {
  min: 0,
  max: 100,
  step: 1,
  orientation: 'horizontal'
})
const emits = defineEmits<RangeEmits>()

defineOptions({ inheritAttrs: false })

const modelValue = defineModel<T>()

const props = useComponentProps<RangeProps>('range', _props)

const appConfig = useAppConfig() as Range['AppConfig']

const rootProps = useForwardProps(reactivePick(props, 'as', 'orientation', 'min', 'max', 'step', 'minStepsBetweenThumbs', 'inverted'), emits)

const { id, emitFormChange, emitFormInput, size: formFieldSize, color: formFieldColor, name, disabled: formFieldDisabled, ariaAttrs } = useFormField<RangeProps>(props)

// eslint-disable-next-line vue/no-dupe-keys
const size = computed(() => formFieldSize.value ?? props.size)
// eslint-disable-next-line vue/no-dupe-keys
const color = computed(() => formFieldColor.value ?? props.color)

const disabled = computed(() => formFieldDisabled.value ?? props.disabled)

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

// The thumb is the element with `role="slider"`, so these describe it rather than the root.
// Multiple thumbs keep Reka UI's positional names and the caller's label groups them on the root.
const thumbAttrs = ['aria-label', 'aria-labelledby', 'aria-describedby', 'aria-valuetext', 'aria-invalid', 'aria-errormessage']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.range || {}) })({
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
    :id="id"
    v-model="rangeValue"
    data-slot="root"
    :role="thumbs > 1 && ($attrs['aria-label'] || $attrs['aria-labelledby']) ? 'group' : undefined"
    v-bind="{ ...rootProps, ...(thumbs > 1 ? $attrs : omit($attrs, thumbAttrs)) }"
    :name="name"
    :disabled="disabled"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    :default-value="defaultRangeValue"
    @update:model-value="emitFormInput()"
    @value-commit="onChange"
  >
    <SliderTrack data-slot="track" :class="b24ui.track({ class: props.b24ui?.track })">
      <SliderRange data-slot="range" :class="b24ui.range({ class: props.b24ui?.range })" />
    </SliderTrack>

    <template v-for="thumb in thumbs" :key="thumb">
      <B24Tooltip
        v-if="!!props.tooltip"
        :text="thumbs > 1 ? String(rangeValue?.[thumb - 1]) : String(rangeValue)"
        disable-closing-trigger
        v-bind="(typeof props.tooltip === 'object' ? props.tooltip : {})"
      >
        <SliderThumb data-slot="thumb" :class="b24ui.thumb({ class: props.b24ui?.thumb })" v-bind="{ ...(thumbs === 1 ? pick($attrs, thumbAttrs) : {}), ...ariaAttrs }" :aria-label="thumbs > 1 || $attrs['aria-labelledby'] ? undefined : ($attrs['aria-label'] ?? 'Thumb')" />
      </B24Tooltip>
      <SliderThumb v-else data-slot="thumb" :class="b24ui.thumb({ class: props.b24ui?.thumb })" v-bind="{ ...(thumbs === 1 ? pick($attrs, thumbAttrs) : {}), ...ariaAttrs }" :aria-label="thumbs > 1 || $attrs['aria-labelledby'] ? undefined : ($attrs['aria-label'] ?? 'Thumb')" />
    </template>
  </SliderRoot>
</template>
