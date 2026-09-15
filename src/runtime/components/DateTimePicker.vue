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
  /**
   * Clock the formatted value uses. The grid is always 00–23, so leaving this
   * to the locale made an `en` trigger read `2:30 PM` beside a cell marked 14.
   * `false` is the 24-hour clock; omit it to follow the locale.
   */
  hour12?: boolean
  /** @defaultValue 'air-primary' */
  color?: DateTimePicker['variants']['color']
  /** @defaultValue 'md' */
  size?: DateTimePicker['variants']['size']
  /**
   * Blocks the trigger, so the picker cannot be opened.
   * @defaultValue false
   */
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
  /**
   * Icon on the control that returns from the time step to the calendar.
   * @defaultValue icons.chevronLeft
   * @IconComponent
   */
  backIcon?: IconComponent
  /** Forwarded to the `B24Popover` used on pointer-sized screens. */
  popover?: Omit<PopoverProps, 'open' | 'defaultOpen' | 'modelValue'>
  /** Forwarded to the `B24Drawer` used on small screens. */
  drawer?: Omit<DrawerProps, 'open' | 'defaultOpen'>
  /**
   * Forwarded to the inner `B24Calendar`.
   *
   * `color` and `size` cascade into it from this component unless they are
   * given here. They are bound after the spread rather than before, because
   * `v-bind` overwrites with keys that are present but `undefined`.
   */
  calendar?: Omit<CalendarProps, 'modelValue' | 'defaultValue' | 'range' | 'multiple'>
  /**
   * Forwarded to the `B24Input` used as the default trigger.
   *
   * The input *is* the trigger, not a control inside one: `B24Input` forwards
   * fall-through attributes onto its `<input>`, so the popover's
   * `aria-haspopup` and `aria-expanded` land on a real control. Wrapping a
   * readonly input in a clickable element instead nests one interactive
   * control inside another, which `axe` rejects as `nested-interactive`.
   */
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
import { CalendarDate, CalendarDateTime, ZonedDateTime, today, getLocalTimeZone, getDayOfWeek, endOfMonth } from '@internationalized/date'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'
import ClockIcon from '@bitrix24/b24icons-vue/outline/ClockIcon'
import icons from '../dictionary/icons'
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

const localOpen = ref(props.defaultOpen ?? false)
const step = ref<'date' | 'time'>('date')

/**
 * Controlled when `open` is given, uncontrolled otherwise. Reading through the
 * prop rather than mirroring it into a ref is what makes `open` actually
 * control: picking a date asks to close by writing here, and a parent holding
 * the prop at `true` keeps the picker open. Mirroring let the component close
 * itself behind the parent's back.
 */
const isOpen = computed({
  get: () => props.open ?? localOpen.value,
  set: (value) => {
    localOpen.value = value
    emits('update:open', value)
  }
})

watch(isOpen, (value) => {
  if (value) {
    step.value = 'date'
  }
})

function commit(value: DateValue | undefined) {
  internalValue.value = value
  emits('update:modelValue', value)
  emits('change', value)
}

/**
 * `locale` is a free string on the public API, and every formatter below feeds
 * it to `Intl.DateTimeFormat`, which throws `RangeError` on a malformed tag.
 * That happens on the always-visible trigger, so an unchecked value took the
 * whole component down before it could ever be opened.
 */
const activeLocale = computed(() => {
  const requested = props.locale || code.value || 'en'
  try {
    return Intl.DateTimeFormat.supportedLocalesOf([requested]).length > 0 ? requested : 'en'
  } catch {
    return 'en'
  }
})

/** `hour12` is applied on top of `format`, so either can be given alone. */
const formatOptions = computed<Intl.DateTimeFormatOptions>(() => ({
  ...(props.format ?? (props.dateOnly ? { dateStyle: 'medium' } : { dateStyle: 'medium', timeStyle: 'short' })),
  ...(props.hour12 === undefined || props.dateOnly ? {} : { hour12: props.hour12 })
}))

const formatter = computed(() => new Intl.DateTimeFormat(activeLocale.value, formatOptions.value))
const weekdayFormatter = computed(() => new Intl.DateTimeFormat(activeLocale.value, { weekday: 'long' }))
const dayMonthFormatter = computed(() => new Intl.DateTimeFormat(activeLocale.value, { day: 'numeric', month: 'long' }))

function toJsDate(value: DateValue): Date {
  return value instanceof ZonedDateTime ? value.toDate() : value.toDate(tz)
}

const formattedValue = computed(() => internalValue.value ? formatter.value.format(toJsDate(internalValue.value)) : '')

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
  // The preset means the end of the working week, which is Friday whatever the
  // locale's week starts on. Deriving it from `startOfWeek(…) + 4` did depend
  // on that: under a Sunday-start locale it landed on Thursday, and under a
  // Saturday-start one on Wednesday — measured, which is how this was found.
  // Anchoring the index to `en-US` fixes Sunday at 0, so Friday is always 5.
  const weekEnd = start.add({ days: (5 - getDayOfWeek(start, 'en-US') + 7) % 7 })

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

/**
 * A preset's `value` may be a consumer-supplied factory, and it is called
 * during render. An exception thrown there escaped the computed below and took
 * the whole picker with it — under SSR it rejected the page render outright,
 * and on the client it replaced the component, working calendar included, with
 * an empty node. One bad preset now drops out of the list instead.
 */
function resolvePreset(preset: DateTimePickerPreset): DateValue | undefined {
  if (typeof preset.value !== 'function') {
    return preset.value
  }
  try {
    return preset.value()
  } catch (error) {
    console.warn('[B24DateTimePicker] a preset factory threw and the preset was skipped:', error)
    return undefined
  }
}

/**
 * Each preset resolved once per render. The template needs the value twice —
 * to mark the active one and to apply it — and a factory preset returning a
 * "now"-like value would otherwise be called twice and could disagree with
 * itself between the two reads.
 */
const resolvedPresets = computed(() => presetList.value
  .map(preset => ({ preset, value: resolvePreset(preset) }))
  .filter((entry): entry is { preset: DateTimePickerPreset, value: DateValue } => entry.value !== undefined))

function isActiveValue(value: DateValue): boolean {
  return !!internalValue.value && toDateOnly(value).compare(toDateOnly(internalValue.value)) === 0
}

function isPresetActive(preset: DateTimePickerPreset): boolean {
  const value = resolvePreset(preset)
  return !!value && isActiveValue(value)
}

function applyPreset(preset: DateTimePickerPreset) {
  const value = resolvePreset(preset)
  if (!value) {
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

/** A drawer on a phone, a popover everywhere else. */
const Wrapper = computed(() => screen.value.isMobile ? B24Drawer : B24Popover)
const wrapperProps = computed(() => screen.value.isMobile
  ? { title: props.placeholder || t('dateTimePicker.openPicker'), b24ui: { content: b24ui.value.content() }, ...(props.drawer ?? {}) }
  // The key is quoted to survive the docs `componentMeta` transformer. It
  // rewrites the slot-prop key wherever the bare token appears, and does not
  // stop at type positions, so unquoted this expression was rewritten into
  // something that does not parse and the component's Props, Slots and Emits
  // tables came out empty. Tracked separately; quoting is the local escape.
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
              :color="props.calendar?.color ?? props.color"
              :size="props.calendar?.size ?? props.size"
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
            <slot name="time-header" :value="internalValue" :formatted="formattedValue" :back="goToDate">
              <div data-slot="timeHeader" :class="b24ui.timeHeader({ class: props.b24ui?.timeHeader })">
                <button
                  type="button"
                  :aria-label="t('dateTimePicker.backToDate')"
                  :class="b24ui.timeHeaderBack({ class: props.b24ui?.timeHeaderBack })"
                  @click="goToDate"
                >
                  <Component :is="props.backIcon || icons.chevronLeft" :class="b24ui.timeHeaderBackIcon({ class: props.b24ui?.timeHeaderBackIcon })" />
                </button>
                <span :class="b24ui.timeHeaderLabel({ class: props.b24ui?.timeHeaderLabel })">{{ formattedValue }}</span>
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
                    :data-selected="hour === currentHour || undefined"
                    :data-now="hour === nowHour || undefined"
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
                    :data-selected="minute === currentMinute || undefined"
                    :data-now="minute === nowMinute || undefined"
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
