<script lang="ts">
import type { VNode } from 'vue'
import type { DateValue } from '@internationalized/date'
import type { DateRange } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/date-time-picker'
import type { ComponentConfig } from '../types/tv'
import type { IconComponent } from '../types/icons'
import type { CalendarProps } from './Calendar.vue'
import type { InputProps } from './Input.vue'
import type { PopoverProps } from './Popover.vue'
import type { DrawerProps } from './Drawer.vue'

type DateTimePicker = ComponentConfig<typeof theme, AppConfig, 'dateTimePicker'>

export interface DateTimePickerPreset {
  /** Text shown on the preset button. */
  label: string
  /** Optional second line under the label — the resolved date, by default. */
  hint?: string
  /**
   * The date the preset applies. A function is called when the preset is
   * rendered and when it is applied, so "today" stays today across a long
   * session.
   */
  value: DateValue | (() => DateValue)
}

export interface DateTimePickerProps {
  /**
   * The selected value. `CalendarDateTime` or `ZonedDateTime` normally,
   * `CalendarDate` when `dateOnly` is set.
   */
  modelValue?: DateValue
  /** The value before the user picks one. */
  defaultValue?: DateValue
  /** Controlled open state. Pairs with `update:open`, so `v-model:open` works. */
  open?: boolean
  /** Whether the picker starts open. Ignored when `open` is given. */
  defaultOpen?: boolean
  /**
   * Drop the time step. The value stays a `CalendarDate`, so it carries no
   * time at all rather than a time of `00:00`.
   * @defaultValue false
   */
  dateOnly?: boolean
  /**
   * Minutes between cells in the time grid. Clamped to 1…30; a value that is
   * not a finite number falls back to the default rather than rendering an
   * empty or unbounded grid.
   * @defaultValue 5
   */
  minuteStep?: number
  /** Locale for the calendar and the formatted value. Falls back to `B24App`'s. */
  locale?: string
  /** Shown on the trigger while the value is empty. */
  placeholder?: string
  /** Replaces the built-in preset list. */
  presets?: DateTimePickerPreset[]
  /**
   * Drop the preset column.
   * @defaultValue false
   */
  hidePresets?: boolean
  /**
   * How the value is formatted on the trigger.
   * @defaultValue `{ dateStyle: 'medium' }`, plus `timeStyle: 'short'` unless `dateOnly` is set
   */
  format?: Intl.DateTimeFormatOptions
  /** @defaultValue 'air-primary' */
  color?: DateTimePicker['variants']['color']
  /** @defaultValue 'md' */
  size?: DateTimePicker['variants']['size']
  disabled?: boolean
  /**
   * Leading icon on the default trigger.
   * @defaultValue Calendar1Icon
   * @IconComponent
   */
  icon?: IconComponent
  /**
   * Icon beside the time hint under the calendar.
   * @defaultValue ClockIcon
   * @IconComponent
   */
  timeIcon?: IconComponent
  /** Forwarded to the `B24Popover` used on pointer-sized screens. */
  popover?: Omit<PopoverProps, 'open' | 'defaultOpen' | 'modelValue'>
  /** Forwarded to the `B24Drawer` used on small screens. */
  drawer?: Omit<DrawerProps, 'open' | 'defaultOpen'>
  /** Forwarded to the inner `B24Calendar`. */
  calendar?: Omit<CalendarProps, 'modelValue' | 'defaultValue' | 'range' | 'multiple'>
  /** Forwarded to the `B24Input` used as the default trigger. */
  input?: Omit<InputProps, 'modelValue' | 'defaultValue'>
  class?: any
  b24ui?: DateTimePicker['slots']
}

export interface DateTimePickerEmits {
  'update:modelValue': [value: DateValue | undefined]
  'change': [value: DateValue | undefined]
  'update:open': [open: boolean]
}

export interface DateTimePickerSlots {
  /** Replaces the trigger. Receives the open state and the formatted value. */
  'default'?(props: { open: boolean, value?: DateValue, formatted: string }): VNode[]
  /** Replaces the whole preset column. */
  'presets'?(props: {
    presets: DateTimePickerPreset[]
    select: (preset: DateTimePickerPreset) => void
    isActive: (preset: DateTimePickerPreset) => boolean
  }): VNode[]
  /** Replaces one preset button. */
  'preset'?(props: { preset: DateTimePickerPreset, select: () => void, active: boolean }): VNode[]
  /** Replaces the header of the time step. */
  'time-header'?(props: { value?: DateValue, formatted: string, back: () => void }): VNode[]
}
</script>

<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue'
import { CalendarDate, CalendarDateTime, ZonedDateTime, today, getLocalTimeZone, startOfWeek, endOfWeek, endOfMonth } from '@internationalized/date'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'
import ClockIcon from '@bitrix24/b24icons-vue/outline/ClockIcon'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useLocale } from '../composables/useLocale'
import { useDevice } from '../composables/useDevice'
import { tv } from '../utils/tv'
import B24Popover from './Popover.vue'
import B24Drawer from './Drawer.vue'
import B24Input from './Input.vue'
import B24Calendar from './Calendar.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<DateTimePickerProps>(), {
  minuteStep: 5,
  dateOnly: false,
  hidePresets: false,
  disabled: false
})
const emits = defineEmits<DateTimePickerEmits>()
defineSlots<DateTimePickerSlots>()

const props = useComponentProps('dateTimePicker', _props)

const appConfig = useAppConfig() as DateTimePicker['AppConfig']
const { t, code } = useLocale()
const { screen } = useDevice()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.dateTimePicker || {}) })({
  color: props.color,
  size: props.size
}))

const tz = getLocalTimeZone()

// `shallowRef`, not `ref`: Vue's deep unwrapping widens the `DateValue` union of
// class instances into a structural object that no longer matches the type.
// Swapping this one word for `ref` was measured at seven `TS2322`/`TS2345`
// errors, each of which would otherwise be silenced with a cast. Date values
// are immutable, so there is nothing to track deeply in the first place.
const internalValue = shallowRef<DateValue | undefined>(props.modelValue ?? props.defaultValue)
watch(() => props.modelValue, (value) => {
  internalValue.value = value
})

const isOpen = ref(props.open ?? props.defaultOpen ?? false)
const step = ref<'date' | 'time'>('date')

watch(() => props.open, (value) => {
  if (value !== undefined) {
    isOpen.value = value
  }
})

watch(isOpen, (value) => {
  emits('update:open', value)
  if (value) {
    step.value = 'date'
  }
})

function commit(value: DateValue | undefined) {
  internalValue.value = value
  emits('update:modelValue', value)
  emits('change', value)
}

const activeLocale = computed(() => props.locale || code.value || 'en')

const formatter = computed(() => new Intl.DateTimeFormat(
  activeLocale.value,
  props.format ?? (props.dateOnly ? { dateStyle: 'medium' } : { dateStyle: 'medium', timeStyle: 'short' })
))
const dateFormatter = computed(() => new Intl.DateTimeFormat(activeLocale.value, { dateStyle: 'medium' }))
const weekdayFormatter = computed(() => new Intl.DateTimeFormat(activeLocale.value, { weekday: 'long' }))
const dayMonthFormatter = computed(() => new Intl.DateTimeFormat(activeLocale.value, { day: 'numeric', month: 'long' }))

function toJsDate(value: DateValue): Date {
  return value instanceof ZonedDateTime ? value.toDate() : value.toDate(tz)
}

const formattedValue = computed(() => internalValue.value ? formatter.value.format(toJsDate(internalValue.value)) : '')
const formattedDate = computed(() => internalValue.value ? dateFormatter.value.format(toJsDate(internalValue.value)) : '')

const currentHour = computed(() => (internalValue.value as CalendarDateTime | undefined)?.hour ?? 0)
const currentMinute = computed(() => (internalValue.value as CalendarDateTime | undefined)?.minute ?? 0)

const timeLabel = computed(() => props.dateOnly || !internalValue.value
  ? ''
  : `${String(currentHour.value).padStart(2, '0')}:${String(currentMinute.value).padStart(2, '0')}`)

/**
 * `minuteStep` reaches the grid from user input, so a non-finite value would
 * make the loop below never terminate and a zero would divide by zero in the
 * "now" marker.
 */
const resolvedMinuteStep = computed(() => Number.isFinite(props.minuteStep) ? Math.max(1, Math.min(30, props.minuteStep)) : 5)

const hours = computed(() => Array.from({ length: 24 }, (_, index) => index))
const minutes = computed(() => {
  const result: number[] = []
  for (let minute = 0; minute < 60; minute += resolvedMinuteStep.value) {
    result.push(minute)
  }
  return result
})

/** The wall-clock hour and grid minute, marked as a hint rather than as a selection. */
const nowHour = computed(() => new Date().getHours())
const nowMinute = computed(() => Math.floor(new Date().getMinutes() / resolvedMinuteStep.value) * resolvedMinuteStep.value)

function withTime(date: DateValue, hour: number, minute: number): DateValue {
  if (date instanceof ZonedDateTime || date instanceof CalendarDateTime) {
    return date.set({ hour, minute, second: 0, millisecond: 0 })
  }
  return new CalendarDateTime(date.year, date.month, date.day, hour, minute, 0)
}

function toDateOnly(date: DateValue): DateValue {
  return new CalendarDate(date.year, date.month, date.day)
}

function baseForTime(): DateValue {
  if (internalValue.value) {
    return internalValue.value
  }
  const now = today(tz)
  return new CalendarDateTime(now.year, now.month, now.day, 0, 0, 0)
}

/**
 * `B24Calendar` types its emit for every mode it supports, so a single-date
 * calendar still hands over `DateRange | DateValue | DateValue[] | null`.
 * Narrowing here keeps the picker honest instead of casting the handler.
 */
function onCalendarSelect(value: DateRange | DateValue | DateValue[] | null | undefined) {
  if (!value || Array.isArray(value) || !('year' in value)) {
    return
  }
  if (props.dateOnly) {
    commit(toDateOnly(value))
    isOpen.value = false
    return
  }
  commit(withTime(value, currentHour.value, currentMinute.value))
  step.value = 'time'
}

function onHourSelect(hour: number) {
  commit(withTime(baseForTime(), hour, currentMinute.value))
}

function onMinuteSelect(minute: number) {
  commit(withTime(baseForTime(), currentHour.value, minute))
  isOpen.value = false
}

function goToTime() {
  if (props.dateOnly) {
    return
  }
  if (!internalValue.value) {
    commit(withTime(baseForTime(), currentHour.value, currentMinute.value))
  }
  step.value = 'time'
}

function goToDate() {
  step.value = 'date'
}

function presetHint(value: DateValue): string {
  const date = toJsDate(value)
  const weekday = weekdayFormatter.value.format(date)
  return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)}, ${dayMonthFormatter.value.format(date)}`
}

const defaultPresets = computed<DateTimePickerPreset[]>(() => {
  const start = today(tz)
  // The working week ends on Friday; past Friday the preset means the calendar
  // week's end instead, so it never resolves to a day already gone.
  const friday = startOfWeek(start, activeLocale.value).add({ days: 4 })
  const weekEnd = friday.compare(start) >= 0 ? friday : endOfWeek(start, activeLocale.value)

  return ([
    ['today', start],
    ['tomorrow', start.add({ days: 1 })],
    ['endOfWeek', weekEnd],
    ['inAWeek', start.add({ weeks: 1 })],
    ['endOfMonth', endOfMonth(start)]
  ] as const).map(([key, value]) => ({
    label: t(`dateTimePicker.presets.${key}`),
    hint: presetHint(value),
    value
  }))
})

const presetList = computed(() => props.presets ?? defaultPresets.value)

function resolvePreset(preset: DateTimePickerPreset): DateValue {
  return typeof preset.value === 'function' ? preset.value() : preset.value
}

/**
 * Each preset resolved once per render. The template needs the value twice —
 * to mark the active one and to apply it — and a factory preset returning a
 * "now"-like value would otherwise be called twice and could disagree with
 * itself between the two reads.
 */
const resolvedPresets = computed(() => presetList.value.map(preset => ({ preset, value: resolvePreset(preset) })))

function isActiveValue(value: DateValue): boolean {
  return !!internalValue.value && toDateOnly(value).compare(toDateOnly(internalValue.value)) === 0
}

function isPresetActive(preset: DateTimePickerPreset): boolean {
  return isActiveValue(resolvePreset(preset))
}

function applyPreset(preset: DateTimePickerPreset) {
  const value = resolvePreset(preset)
  if (props.dateOnly) {
    commit(toDateOnly(value))
    isOpen.value = false
    return
  }
  commit(withTime(value, currentHour.value, currentMinute.value))
  step.value = 'time'
}

/** A drawer on a phone, a popover everywhere else. */
const Wrapper = computed(() => screen.value.isMobile ? B24Drawer : B24Popover)
const wrapperProps = computed(() => screen.value.isMobile
  ? { title: props.placeholder || t('dateTimePicker.openPicker'), ...(props.drawer ?? {}) }
  : { b24ui: { content: b24ui.value.content() }, ...(props.popover ?? {}) })

defineExpose({ open: isOpen, step })
</script>

<template>
  <component
    :is="Wrapper"
    v-model:open="isOpen"
    v-bind="wrapperProps"
  >
    <slot :open="isOpen" :value="internalValue" :formatted="formattedValue">
      <!--
        The input is the trigger itself, not a control inside one. `B24Input`
        forwards fall-through attributes onto its `<input>`, so the popover's
        `aria-haspopup` / `aria-expanded` land on a real control. Wrapping a
        readonly input in a clickable element instead puts one interactive
        control inside another, which `nested-interactive` rejects.
      -->
      <B24Input
        :model-value="formattedValue"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :icon="props.icon || Calendar1Icon"
        :size="props.size"
        :aria-label="props.placeholder || t('dateTimePicker.openPicker')"
        readonly
        v-bind="props.input"
        :class="b24ui.trigger({ class: [props.b24ui?.trigger, props.class] })"
      />
    </slot>

    <template #content>
      <div data-slot="body" :class="b24ui.body({ class: props.b24ui?.body })">
        <div data-slot="main" :class="b24ui.main({ class: props.b24ui?.main })">
          <template v-if="step === 'date'">
            <B24Calendar
              :model-value="internalValue"
              :locale="activeLocale"
              v-bind="props.calendar"
              @update:model-value="onCalendarSelect"
            />

            <button
              v-if="!props.dateOnly"
              type="button"
              data-slot="footer"
              :class="b24ui.footer({ class: props.b24ui?.footer })"
              @click="goToTime"
            >
              <Component :is="props.timeIcon || ClockIcon" :class="b24ui.footerIcon({ class: props.b24ui?.footerIcon })" />
              <span :class="b24ui.footerValue({ class: props.b24ui?.footerValue })">
                {{ timeLabel || '00:00' }}
              </span>
            </button>
          </template>

          <template v-else>
            <slot name="time-header" :value="internalValue" :formatted="formattedDate" :back="goToDate">
              <div data-slot="timeHeader" :class="b24ui.timeHeader({ class: props.b24ui?.timeHeader })">
                <button
                  type="button"
                  :aria-label="t('dateTimePicker.backToDate')"
                  @click="goToDate"
                >
                  <Component :is="props.timeIcon || ClockIcon" :class="b24ui.footerIcon({ class: props.b24ui?.footerIcon })" />
                </button>
                <span :class="b24ui.timeHeaderLabel({ class: props.b24ui?.timeHeaderLabel })">{{ formattedDate }}</span>
              </div>
            </slot>

            <div data-slot="timeBody" :class="b24ui.timeBody({ class: props.b24ui?.timeBody })">
              <div :class="b24ui.timeColumn({ class: props.b24ui?.timeColumn })">
                <span :id="`${$.uid}-hours`" :class="b24ui.timeColumnTitle({ class: props.b24ui?.timeColumnTitle })">
                  {{ t('dateTimePicker.hours') }}
                </span>
                <div
                  role="group"
                  :aria-labelledby="`${$.uid}-hours`"
                  :class="b24ui.timeHoursGrid({ class: props.b24ui?.timeHoursGrid })"
                >
                  <button
                    v-for="hour in hours"
                    :key="hour"
                    type="button"
                    :aria-pressed="hour === currentHour"
                    :data-selected="hour === currentHour"
                    :data-now="hour === nowHour"
                    :class="b24ui.timeCell({ class: props.b24ui?.timeCell })"
                    @click="onHourSelect(hour)"
                  >
                    {{ String(hour).padStart(2, '0') }}
                  </button>
                </div>
              </div>

              <div :class="b24ui.timeColumn({ class: props.b24ui?.timeColumn })">
                <span :id="`${$.uid}-minutes`" :class="b24ui.timeColumnTitle({ class: props.b24ui?.timeColumnTitle })">
                  {{ t('dateTimePicker.minutes') }}
                </span>
                <div
                  role="group"
                  :aria-labelledby="`${$.uid}-minutes`"
                  :class="b24ui.timeMinutesGrid({ class: props.b24ui?.timeMinutesGrid })"
                >
                  <button
                    v-for="minute in minutes"
                    :key="minute"
                    type="button"
                    :aria-pressed="minute === currentMinute"
                    :data-selected="minute === currentMinute"
                    :data-now="minute === nowMinute"
                    :class="b24ui.timeCell({ class: props.b24ui?.timeCell })"
                    @click="onMinuteSelect(minute)"
                  >
                    {{ String(minute).padStart(2, '0') }}
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div
          v-if="!props.hidePresets"
          data-slot="presets"
          :class="b24ui.presets({ class: props.b24ui?.presets })"
        >
          <slot name="presets" :presets="presetList" :select="applyPreset" :is-active="isPresetActive">
            <template v-for="({ preset, value }, index) in resolvedPresets" :key="index">
              <slot name="preset" :preset="preset" :select="() => applyPreset(preset)" :active="isActiveValue(value)">
                <button
                  type="button"
                  :data-active="isActiveValue(value)"
                  :class="b24ui.preset({ class: props.b24ui?.preset })"
                  @click="applyPreset(preset)"
                >
                  <span :class="b24ui.presetLabel({ class: props.b24ui?.presetLabel })">{{ preset.label }}</span>
                  <span v-if="preset.hint" :class="b24ui.presetHint({ class: props.b24ui?.presetHint })">{{ preset.hint }}</span>
                </button>
              </slot>
            </template>
          </slot>
        </div>
      </div>
    </template>
  </component>
</template>
