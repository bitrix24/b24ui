<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { ProgressRootProps, ProgressRootEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/progress'
import type { ComponentConfig } from '../types/utils'

type Progress = ComponentConfig<typeof theme, AppConfig, 'progress'>

export interface ProgressProps extends Pick<ProgressRootProps, 'getValueLabel' | 'getValueText' | 'modelValue'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * The maximum progress value
   */
  max?: number | Array<any>
  /**
   * Display the current progress value
   */
  status?: boolean
  /**
   * Whether the progress is visually inverted
   * @defaultValue false
   */
  inverted?: boolean
  /**
   * @defaultValue 'md'
   */
  size?: Progress['variants']['size']
  /**
   * @defaultValue 'primary'
   */
  color?: Progress['variants']['color']
  /**
   * The orientation of the progress bar.
   * @defaultValue 'horizontal'
   */
  orientation?: Progress['variants']['orientation']
  /**
   * @defaultValue 'loading'
   */
  animation?: Progress['variants']['animation']
  class?: any
  b24ui?: Progress['slots']
}

export interface ProgressEmits extends ProgressRootEmits {}

export type ProgressSlots = {
  status(props: { percent?: number }): any
} & {
  [key: string]: (props: { step: number }) => any
}

</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive, ProgressRoot, ProgressIndicator, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<ProgressProps>(), {
  inverted: false,
  modelValue: null,
  orientation: 'horizontal'
})
const emits = defineEmits<ProgressEmits>()
const slots = defineSlots<ProgressSlots>()

const { dir } = useLocale()
const appConfig = useAppConfig() as Progress['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'getValueLabel', 'getValueText', 'modelValue'), emits)

const isIndeterminate = computed(() => rootProps.value.modelValue === null)
const hasSteps = computed(() => Array.isArray(props.max))

const realMax = computed(() => {
  if (isIndeterminate.value || !props.max) {
    return undefined
  }

  if (Array.isArray(props.max)) {
    return props.max.length - 1
  }

  return Number(props.max)
})

const percent = computed(() => {
  if (isIndeterminate.value) {
    return undefined
  }

  switch (true) {
    case rootProps.value.modelValue! < 0: return 0
    case rootProps.value.modelValue! > (realMax.value ?? 100): return 100
    default: return Math.round((rootProps.value.modelValue! / (realMax.value ?? 100)) * 100)
  }
})

const indicatorStyle = computed(() => {
  if (percent.value === undefined) {
    return
  }

  if (props.orientation === 'vertical') {
    return {
      transform: `translateY(${props.inverted ? '' : '-'}${100 - percent.value}%)`
    }
  } else {
    if (dir.value === 'rtl') {
      return {
        transform: `translateX(${props.inverted ? '-' : ''}${100 - percent.value}%)`
      }
    } else {
      return {
        transform: `translateX(${props.inverted ? '' : '-'}${100 - percent.value}%)`
      }
    }
  }
})

const statusStyle = computed(() => {
  return {
    [props.orientation === 'vertical' ? 'height' : 'width']: percent.value ? `${percent.value}%` : 'fit-content'
  }
})

function isActive(index: number) {
  return index === Number(props.modelValue)
}

function isFirst(index: number) {
  return index === 0
}

function isLast(index: number) {
  return index === realMax.value
}

function stepVariant(index: number | string) {
  index = Number(index)

  if (isActive(index) && !isFirst(index)) {
    return 'active'
  }

  if (isFirst(index) && isActive(index)) {
    return 'first'
  }

  if (isLast(index) && isActive(index)) {
    return 'last'
  }

  return 'other'
}

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.progress || {}) })({
  animation: props.animation,
  size: props.size,
  color: props.color,
  orientation: props.orientation,
  inverted: props.inverted
}))
</script>

<template>
  <Primitive :as="as" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div v-if="!isIndeterminate && (status || !!slots.status)" :class="b24ui.status({ class: props.b24ui?.status })" :style="statusStyle">
      <slot name="status" :percent="percent">
        {{ percent }}%
      </slot>
    </div>

    <ProgressRoot v-bind="rootProps" :max="realMax" :class="b24ui.base({ class: props.b24ui?.base })" style="transform: translateZ(0)">
      <ProgressIndicator :class="b24ui.indicator({ class: props.b24ui?.indicator })" :style="indicatorStyle" />
    </ProgressRoot>

    <div v-if="hasSteps" :class="b24ui.steps({ class: props.b24ui?.steps })">
      <div v-for="(step, index) in max" :key="index" :class="b24ui.step({ class: props.b24ui?.step, step: stepVariant(index) })">
        <slot :name="`step-${index}`" :step="step">
          {{ step }}
        </slot>
      </div>
    </div>
  </Primitive>
</template>
