<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/countdown'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type Countdown = ComponentConfig<typeof theme, AppConfig, 'countdown'>

export interface CountdownData {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  totalDays: number
  totalHours: number
  totalMinutes: number
  totalSeconds: number
  totalMilliseconds: number
}

export interface CountdownProps extends Omit<UseComponentIconsProps, 'loading' | 'trailing' | 'trailingIcon'> {
  /**
   * The element or component this component should render as
   * @defaultValue 'span'
   */
  as?: any
  /**
   * @defaultValue 'md'
   */
  size?: Countdown['variants']['size']
  /**
   * Emits the countdown events
   * @defaultValue true
   */
  emitEvents?: boolean
  /**
   * Number of seconds to countdown
   * @defaultValue 0
   */
  seconds?: number | string
  /**
   * Should seconds be divided into minutes?
   * @defaultValue true
   */
  showMinutes?: boolean
  /**
   * Shows a `Circle` around the countdown
   * @defaultValue false
   */
  useCircle?: boolean
  /**
   * The interval time (in milliseconds) of the countdown progress
   * @defaultValue 1000
   */
  interval?: number
  /**
   * Starts the countdown automatically when initialized
   * @defaultValue true
   */
  needStartImmediately?: boolean
  /**
   * Generate the current time of a specific time zone
   * @defaultValue Date.now()
   */
  now?: () => number
  class?: any
  b24ui?: Countdown['slots']
}

export interface CountdownEmits {
  start: []
  end: []
  abort: []
  progress: [value: CountdownData]
}

export interface CountdownSlots {
  leading(props: { b24ui: Countdown['b24ui'] }): any
  default(props: CountdownData & { formatTime: string, b24ui: Countdown['b24ui'] }): any
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentIcons } from '../composables/useComponentIcons'
import { tv } from '../utils/tv'
import B24Avatar from './Avatar.vue'

const MILLISECONDS_SECOND = 1000
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR

defineOptions({ inheritAttrs: false })

// region data ////

const props = withDefaults(defineProps<CountdownProps>(), {
  as: 'span',
  needStartImmediately: true,
  emitEvents: true,
  interval: 1000,
  now: () => Date.now(),
  seconds: 0,
  showMinutes: true,
  useCircle: false
})

const emits = defineEmits<CountdownEmits>()
defineSlots<CountdownSlots>()

const { isLeading, leadingIconName } = useComponentIcons(
  computed(() => ({ ...props, loading: false }))
)
const appConfig = useAppConfig() as Countdown['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.countdown || {}) })({
  size: props.size,
  leading: Boolean(isLeading.value),
  useCircle: Boolean(props.useCircle)
}))

/**
 * It is counting down.
 */
const counting = ref<boolean>(false)
/**
 * The absolute end time.
 */
const endTime = ref<number>(0)
/**
 * The remaining milliseconds.
 */
const totalMilliseconds = ref<number>(0)
/**
 * The request ID of the requestAnimationFrame.
 */
const requestId = ref<number>(0)
// endregion ////

// region events ////
onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange.bind(this))
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange.bind(this))
  pause()
})
// endregion ////

// region watch ////
/**
 * Update the countdown when props changed.
 */
watch(
  () => props,
  () => {
    totalMilliseconds.value = Number(props.seconds) * 1000
    endTime.value = props.now() + Number(props.seconds) * 1000

    if (props.needStartImmediately) {
      start()
    }
  },
  {
    deep: true,
    immediate: true
  }
)
// endregion ////

// region computed ////
/**
 * Remaining days.
 */
const days = computed((): number => {
  return Math.floor(totalMilliseconds.value / MILLISECONDS_DAY)
})

/**
 * Remaining hours.
 */
const hours = computed((): number => {
  return Math.floor((totalMilliseconds.value % MILLISECONDS_DAY) / MILLISECONDS_HOUR)
})

/**
 * Remaining minutes.
 */
const minutes = computed((): number => {
  return Math.floor((totalMilliseconds.value % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE)
})

/**
 * Remaining seconds.
 */
const secondsValue = computed((): number => {
  return Math.floor((totalMilliseconds.value % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND)
})

/**
 * Remaining milliseconds.
 */
const milliseconds = computed((): number => {
  return Math.floor(totalMilliseconds.value % MILLISECONDS_SECOND)
})

/**
 * Total remaining days.
 */
const totalDays = computed((): number => {
  return days.value
})

/**
 * Total remaining hours.
 */
const totalHours = computed((): number => {
  return Math.floor(totalMilliseconds.value / MILLISECONDS_HOUR)
})

/**
 * Total remaining minutes.
 */
const totalMinutes = computed((): number => {
  return Math.floor(totalMilliseconds.value / MILLISECONDS_MINUTE)
})

/**
 * Total remaining seconds.
 */
const totalSeconds = computed((): number => {
  return Math.floor(totalMilliseconds.value / MILLISECONDS_SECOND)
})

const formatTime = computed((): string => {
  if (props.showMinutes && !props.useCircle) {
    return `${totalMinutes.value < 10 ? '0' : ''}${totalMinutes.value}:${secondsValue.value < 10 ? '0' : ''}${secondsValue.value}`
  } else if (props.useCircle) {
    return `:${totalSeconds.value}`
  }

  return String(totalSeconds.value)
})
// endregion ////

// region actions ////
/**
 * Starts to countdown.
 */
function start(): void {
  if (counting.value) {
    return
  }

  counting.value = true

  if (!props.needStartImmediately) {
    totalMilliseconds.value = Number(props.seconds) * 1000
    endTime.value = props.now() + Number(props.seconds) * 1000
  }

  if (props.emitEvents) {
    emits('start')
  }

  if (document?.visibilityState === 'visible') {
    continueProcess()
  }
}

/**
 * Continues the countdown.
 */
function continueProcess(): void {
  if (!counting.value) {
    return
  }

  const delay = Math.min(totalMilliseconds.value, props.interval)

  if (delay > 0) {
    let init: number
    let prev: number
    const step = (now: number) => {
      if (!init) {
        init = now
      }

      if (!prev) {
        prev = now
      }

      const range = now - init

      if (
        range >= delay
        // Avoid losing time about one second per minute (now - prev ≈ 16ms)
        || range + ((now - prev) / 2) >= delay
      ) {
        progress()
      } else {
        requestId.value = requestAnimationFrame(step)
      }

      prev = now
    }

    requestId.value = requestAnimationFrame(step)
  } else {
    stop()
  }
}

/**
 * Pauses the countdown.
 */
function pause(): void {
  cancelAnimationFrame(requestId.value)
}

/**
 * Progresses to countdown.
 */
function progress(): void {
  if (!counting.value) {
    return
  }

  update()

  if (props.emitEvents && totalMilliseconds.value > 0) {
    /**
     * Countdown progress event.
     */
    emits('progress', {
      days: days.value,
      hours: hours.value,
      minutes: minutes.value,
      seconds: secondsValue.value,
      milliseconds: milliseconds.value,
      totalDays: totalDays.value,
      totalHours: totalHours.value,
      totalMinutes: totalMinutes.value,
      totalSeconds: totalSeconds.value,
      totalMilliseconds: totalMilliseconds.value
    })
  }

  continueProcess()
}

/**
 * Aborts the countdown.
 */
function abort(): void {
  if (!counting.value) {
    return
  }

  pause()
  counting.value = false

  if (props.emitEvents) {
    /**
     * Countdown abort event.
     */
    emits('abort')
  }
}

/**
 * Stop the countdown.
 */
function stop(): void {
  if (!counting.value) {
    return
  }

  pause()
  totalMilliseconds.value = 0
  counting.value = false

  if (props.emitEvents) {
    /**
     * Countdown end event.
     */
    emits('end')
  }
}

/**
 * Updates the count.
 */
function update(): void {
  if (counting.value) {
    totalMilliseconds.value = Math.max(0, endTime.value - props.now())
  }
}

/**
 * Restarts the count.
 */
function restart(): void {
  pause()
  totalMilliseconds.value = Number(props.seconds) * 1000
  endTime.value = props.now() + Number(props.seconds) * 1000
  counting.value = false
  start()
}

/**
 * Visibility change event handler.
 */
function handleVisibilityChange(): void {
  switch (document?.visibilityState) {
    case 'visible':
      update()
      continueProcess()
      break

    case 'hidden':
      pause()
      break
  }
}
// endregion ////

// region Round ////
const fullDashArray = computed((): string => {
  const fullDashArray = 283

  const calculateTimeFraction = (): number => {
    if (Number(props.seconds) < 0) {
      return 1
    }

    const rawTimeFraction = totalSeconds.value / Number(props.seconds)
    return rawTimeFraction - (1 / Number(props.seconds)) * (1 - rawTimeFraction)
  }

  return [
    (calculateTimeFraction() * fullDashArray).toFixed(0),
    fullDashArray
  ].join(' ')
})
// endregion ////

defineExpose({
  start,
  abort,
  stop,
  restart
})
</script>

<template>
  <Primitive
    :as="as"
    v-bind="$attrs"
    data-slot="base"
    :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
  >
    <svg
      v-if="props.useCircle"
      data-slot="circleBase"
      :class="b24ui.circleBase({ class: [props.b24ui?.circleBase] })"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        data-slot="circleGroup"
        :class="b24ui.circleGroup({ class: [props.b24ui?.circleGroup] })"
      >
        <circle
          data-slot="circleElement"
          :class="b24ui.circleElement({ class: [props.b24ui?.circleElement] })"
          cx="50"
          cy="50"
          r="45"
        />
        <path
          data-slot="circlePath"
          :class="b24ui.circlePath({ class: [props.b24ui?.circlePath] })"
          :stroke-dasharray="fullDashArray"
          d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
        />
      </g>
    </svg>
    <slot name="leading" :b24ui="b24ui">
      <Component
        :is="leadingIconName"
        v-if="isLeading && (typeof leadingIconName !== 'undefined')"
        data-slot="leadingIcon"
        :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
      />
      <B24Avatar
        v-else-if="!!avatar"
        :size="((props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
        v-bind="avatar"
        data-slot="leadingAvatar"
        :class="b24ui.leadingAvatar({ class: props.b24ui?.leadingAvatar })"
      />
    </slot>
    <slot
      :days="days"
      :hours="hours"
      :minutes="minutes"
      :seconds="secondsValue"
      :milliseconds="milliseconds"
      :total-days="totalDays"
      :total-hours="totalHours"
      :total-minutes="totalMinutes"
      :total-seconds="totalSeconds"
      :total-milliseconds="totalMilliseconds"
      :format-time="formatTime"
      :b24ui="b24ui"
    >
      <span data-slot="label" :class="b24ui.label({ class: props.b24ui?.label })">
        {{ formatTime }}
      </span>
    </slot>
  </Primitive>
</template>
