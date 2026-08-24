<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/countdown'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps } from './Avatar.vue'
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
  leading?(props: { b24ui: Countdown['b24ui'] }): VNode[]
  default?(props: CountdownData & { formatTime: string, b24ui: Countdown['b24ui'] }): VNode[]
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, onActivated, onDeactivated } from 'vue'
import { useEventListener } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useComponentIcons } from '../composables/useComponentIcons'
import { tv } from '../utils/tv'
import B24Avatar from './Avatar.vue'

const MILLISECONDS_SECOND = 1000
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR

defineOptions({ inheritAttrs: false })

// region data ////

const _props = withDefaults(defineProps<CountdownProps>(), {
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

const props = useComponentProps<CountdownProps>('countdown', _props)

const { isLeading, leadingIconName } = useComponentIcons(
  computed(() => ({ ...props, loading: false }))
)
const appConfig = useAppConfig() as Countdown['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.countdown || {}) })({
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
// Was a manual `addEventListener`/`removeEventListener` pair, each passed
// `handleVisibilityChange.bind(this)`. Every `.bind()` returns a new function,
// so removal was handed a reference the listener list never contained and took
// nothing off it: the handler outlived the component and went on calling
// `update()`/`pause()` against a torn-down instance on every tab switch.
// (`this` was `undefined` here regardless — this is `<script setup>` — and the
// handler does not use it.)
//
// `useEventListener` rather than a corrected manual pair, matching
// ChatMessages/ColorPicker/prose/Img: it keeps the reference itself and ties
// removal to the component's effect scope, so the two halves cannot drift apart
// again. `document` is touched inside `onMounted` so it is never evaluated
// during SSR.
onMounted(() => {
  useEventListener(document, 'visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
  pause()
})

// `<KeepAlive>` deactivation does not run `onBeforeUnmount`, so a cached
// countdown used to keep its `requestAnimationFrame` chain alive — burning a
// frame callback per tick and emitting `progress`/`end` for something nobody
// can see, one chain per cached instance. Suspending and resuming it is the
// same problem as a hidden browser tab, so it reuses the same two halves.
// `endTime` is absolute, so `resumeCounting()` returns to the right remainder
// rather than to where the clock was parked.
onDeactivated(() => {
  suspendCounting()
})

onActivated(() => {
  resumeCounting()
})
// endregion ////

// region watch ////
/**
 * Update the countdown when props changed.
 */
watch(
  () => _props,
  () => {
    totalMilliseconds.value = Number(props.seconds) * 1000
    endTime.value = _props.now() + Number(props.seconds) * 1000

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
    endTime.value = _props.now() + Number(props.seconds) * 1000
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

  // Cancel before scheduling, because `requestId` holds one handle and the last
  // writer wins: two callers on the same tick used to leave the first chain
  // running with no way to reach it again. That happens on the very first mount
  // under `<KeepAlive>` — Vue runs `onActivated` right after `onMounted` for a
  // brand-new cached child, not only on a real reactivation, so the immediate
  // props watcher's `start()` and `onActivated`'s `resumeCounting()` both land
  // here. Measured: one extra uncancellable frame chain, and `progress` firing
  // twice for a single tick. Guarding here rather than at the two call sites
  // covers any future third caller too. `cancelAnimationFrame` on a stale or
  // already-fired handle is a no-op, so the recursive call from `step` is safe.
  cancelAnimationFrame(requestId.value)

  const delay = Math.min(totalMilliseconds.value, props.interval!)

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
    totalMilliseconds.value = Math.max(0, endTime.value - _props.now())
  }
}

/**
 * Restarts the count.
 */
function restart(): void {
  pause()
  totalMilliseconds.value = Number(props.seconds) * 1000
  endTime.value = _props.now() + Number(props.seconds) * 1000
  counting.value = false
  start()
}

/**
 * Stop ticking while the countdown is not on screen.
 *
 * Shared by the `visibilitychange` handler and `<KeepAlive>` deactivation —
 * two ways of asking the same question, and keeping one implementation is what
 * stops the second from being forgotten when the first changes.
 */
function suspendCounting(): void {
  pause()
}

/** Catch up to wall-clock time and resume, if the countdown was running. */
function resumeCounting(): void {
  update()
  continueProcess()
}

/**
 * Visibility change event handler.
 */
function handleVisibilityChange(): void {
  switch (document?.visibilityState) {
    case 'visible':
      resumeCounting()
      break

    case 'hidden':
      suspendCounting()
      break
  }
}
// endregion ////

// region Round ////
const fullDashArray = computed((): string => {
  const fullDashArray = 283

  const calculateTimeFraction = (): number => {
    const total = Number(props.seconds)

    // A negative duration has no meaning; the ring reads as full, which is
    // what it did before this guard existed and is left alone.
    if (total < 0) {
      return 1
    }

    // Zero and NaN both divide into nothing. Zero is not an edge case here —
    // it is the **default** of `seconds`, so `<B24Countdown use-circle />`
    // computed `0 / 0` and rendered `stroke-dasharray="NaN 283"`, which is not
    // a valid SVG value. NaN arrives the other way: `seconds` is typed
    // `number | string`, so any non-numeric string lands here too. Nothing to
    // count down means an empty ring (#454).
    if (!Number.isFinite(total) || total === 0) {
      return 0
    }

    const rawTimeFraction = totalSeconds.value / total
    return rawTimeFraction - (1 / total) * (1 - rawTimeFraction)
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
    :as="props.as"
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
        v-else-if="!!props.avatar"
        :size="((props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
        v-bind="props.avatar"
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
