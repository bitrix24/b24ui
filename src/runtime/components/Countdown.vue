<script lang="ts">
// import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/countdown'
import { tv } from '../utils/tv'

const appConfig = _appConfig as AppConfig & { b24ui: { countdown: Partial<typeof theme> } }

const countdown = tv({ extend: tv(theme), ...(appConfig.b24ui?.countdown || {}) })

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

export interface CountdownProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: any
  /** Starts the countdown automatically when initialized. */
  autoStart?: boolean
  /** Emits the countdown events. */
  emitEvents?: boolean
  /** The interval time (in milliseconds) of the countdown progress. */
  interval?: number
  /** Generate the current time of a specific time zone. */
  now?: () => number
  /** Number of seconds to countdown. */
  seconds?: number
  /** Should seconds be divided into minutes? */
  showMinutes?: boolean
  class?: any
  b24ui?: Partial<typeof countdown.slots>
}

export interface CountdownEmits {
  (e: 'abort' | 'end' | 'start'): void
  (e: 'progress', payload: CountdownData): void
}

export interface CountdownSlots {
  default(props: CountdownData & { formatTime: string }): any
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { Primitive } from 'reka-ui'

const MILLISECONDS_SECOND = 1000
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR

defineOptions({ inheritAttrs: false })

// region data ////
const props = withDefaults(defineProps<CountdownProps>(), {
  as: 'span',
  autoStart: true,
  emitEvents: true,
  interval: 1000,
  now: () => Date.now(),
  seconds: 0,
  showMinutes: true
})

const emits = defineEmits<CountdownEmits>()
defineSlots<CountdownSlots>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = countdown()

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
    totalMilliseconds.value = props.seconds * 1000
    endTime.value = props.now() + props.seconds * 1000

    if (props.autoStart) {
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
  if (props.showMinutes) {
    const minutesValue = minutes.value
    const remainingSeconds = secondsValue.value

    return `${minutesValue < 10 ? '0' : ''}${minutesValue}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
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

  if (!props.autoStart) {
    totalMilliseconds.value = props.seconds * 1000
    endTime.value = props.now() + props.seconds * 1000
  }

  if (props.emitEvents) {
    emits('start')
  }

  if (document.visibilityState === 'visible') {
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
    end()
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
 * Ends the countdown.
 */
function end(): void {
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
  totalMilliseconds.value = props.seconds * 1000
  endTime.value = props.now() + props.seconds * 1000
  counting.value = false
  start()
}

/**
 * Visibility change event handler.
 */
function handleVisibilityChange(): void {
  switch (document.visibilityState) {
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

defineExpose({
  start,
  abort,
  end,
  restart
})
</script>

<template>
  <Primitive
    :as="as"
    v-bind="$attrs"
    :class="b24ui.root({ class: [props.class, props.b24ui?.root] })"
  >
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
    >
      {{ formatTime }}
    </slot>
  </Primitive>
</template>
