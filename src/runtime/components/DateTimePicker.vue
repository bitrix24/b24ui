<script lang="ts">
import type { VNode } from 'vue'
import type { DateValue } from '@internationalized/date'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/date-time-picker'
import type { ComponentConfig } from '../types/tv'
import type { CalendarProps } from './Calendar.vue'
import type { InputProps } from './Input.vue'
import type { PopoverProps } from './Popover.vue'
import type { IconComponent } from '../types'

type DateTimePicker = ComponentConfig<typeof theme, AppConfig, 'dateTimePicker'>

export interface DateTimePickerPreset {
  /** Visible label */
  label: string
  /** Optional secondary line under the label */
  hint?: string
  /** Either a static `DateValue` or a factory called when applied */
  value: DateValue | (() => DateValue)
}

export interface DateTimePickerProps {
  /**
   * Controlled value. `CalendarDateTime` / `ZonedDateTime` for date+time mode,
   * `CalendarDate` when `dateOnly` is enabled.
   */
  modelValue?: DateValue
  defaultValue?: DateValue
  /**
   * Hide the time-selection step. Time is forced to `00:00:00`.
   * @defaultValue false
   */
  dateOnly?: boolean
  /**
   * Step in minutes for the time grid.
   * @defaultValue 5
   */
  minuteStep?: number
  /**
   * Locale used for the calendar and the trigger formatter.
   * Falls back to the locale provided by `<B24App>`.
   */
  locale?: string
  /** Placeholder displayed when the value is empty. */
  placeholder?: string
  /** Custom presets. When omitted, the localized default set is used. */
  presets?: DateTimePickerPreset[]
  /**
   * Hide the side preset list.
   * @defaultValue false
   */
  hidePresets?: boolean
  /**
   * Format options used to render the trigger value.
   * Defaults to `{ dateStyle: 'medium' }` or `{ dateStyle: 'medium', timeStyle: 'short' }`.
   */
  format?: Intl.DateTimeFormatOptions
  /** @defaultValue 'air-primary' */
  color?: DateTimePicker['variants']['color']
  /** @defaultValue 'md' */
  size?: DateTimePicker['variants']['size']
  /** Disable the picker. */
  disabled?: boolean
  /**
   * The leading icon shown on the trigger.
   * @IconComponent
   */
  icon?: IconComponent
  /**
   * The icon shown next to the time hint at the bottom of the calendar step.
   * @IconComponent
   */
  timeIcon?: IconComponent
  /** Forward additional props to the underlying `B24Popover`. */
  popover?: Omit<PopoverProps, 'open' | 'defaultOpen' | 'modelValue'>
  /** Forward additional props to the underlying `B24Calendar`. */
  calendar?: Omit<CalendarProps, 'modelValue' | 'defaultValue' | 'range' | 'multiple'>
  /** Forward additional props to the trigger `B24Input`. */
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
  /**
   * Override the trigger.
   * Receives the formatted value and current open state.
   */
  'default'?(props: { open: boolean, value?: DateValue, formatted: string }): VNode[]
  /** Replace the entire preset list. */
  'presets'?(props: {
    presets: DateTimePickerPreset[]
    select: (preset: DateTimePickerPreset) => void
    isActive: (preset: DateTimePickerPreset) => boolean
  }): VNode[]
  /** Replace a single preset item. */
  'preset'?(props: {
    preset: DateTimePickerPreset
    select: () => void
    active: boolean
  }): VNode[]
  /** Replace the time-step header. */
  'time-header'?(props: { value?: DateValue, formatted: string, back: () => void }): VNode[]
}
</script>

<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { CalendarDate, CalendarDateTime, ZonedDateTime, today, getLocalTimeZone, startOfWeek, endOfWeek, endOfMonth } from '@internationalized/date'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'
import ClockIcon from '@bitrix24/b24icons-vue/outline/ClockIcon'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Popover from './Popover.vue'
import B24Input from './Input.vue'
import B24Calendar from './Calendar.vue'
import B24Button from './Button.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<DateTimePickerProps>(), {
  minuteStep: 5,
  dateOnly: false,
  hidePresets: false,
  disabled: false
})
const emits = defineEmits<DateTimePickerEmits>()
defineSlots<DateTimePickerSlots>()

const props = useComponentProps<DateTimePickerProps>('dateTimePicker', _props)

const appConfig = useAppConfig() as DateTimePicker['AppConfig']
const { t, code } = useLocale()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.dateTimePicker || {}) })({
  color: props.color,
  size: props.size
}))

const internalValue = ref<DateValue | undefined>(props.modelValue ?? props.defaultValue)

watch(() => props.modelValue, (v) => {
  internalValue.value = v
})

function emitUpdate(value: DateValue | undefined) {
  internalValue.value = value
  emits('update:modelValue', value)
  emits('change', value)
}

const open = ref(false)
const step = ref<'date' | 'time'>('date')
const id = useId()

watch(open, (v) => {
  emits('update:open', v)
  if (v) {
    step.value = 'date'
  }
})

const activeLocale = computed(() => props.locale || code.value || 'en')

const formatter = computed(() => new Intl.DateTimeFormat(activeLocale.value, props.format ?? (props.dateOnly
  ? { dateStyle: 'medium' }
  : { dateStyle: 'medium', timeStyle: 'short' })))

const tz = getLocalTimeZone()

function toJsDate(value: any): Date {
  if (value instanceof ZonedDateTime) {
    return value.toDate()
  }
  if (value instanceof CalendarDateTime) {
    return value.toDate(tz)
  }
  return (value as CalendarDate).toDate(tz)
}

const formattedValue = computed(() => {
  if (!internalValue.value) return ''
  return formatter.value.format(toJsDate(internalValue.value))
})

const timeLabel = computed(() => {
  const v = internalValue.value
  if (!v || props.dateOnly) return ''
  const h = (v as CalendarDateTime).hour ?? 0
  const m = (v as CalendarDateTime).minute ?? 0
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
})

const dateValue = computed<DateValue | undefined>(() => {
  const v = internalValue.value
  if (!v) return undefined
  return v as DateValue
})

// region Time grid ////
const hours = computed(() => Array.from({ length: 24 }, (_, i) => i))
const minutes = computed(() => {
  const raw = props.minuteStep ?? 5
  const safe = Number.isFinite(raw) ? Math.max(1, Math.min(30, raw as number)) : 5
  const result: number[] = []
  for (let m = 0; m < 60; m += safe) result.push(m)
  return result
})
const currentHour = computed(() => (internalValue.value as CalendarDateTime | undefined)?.hour ?? 0)
const currentMinute = computed(() => (internalValue.value as CalendarDateTime | undefined)?.minute ?? 0)
// endregion ////

function withTime(date: any, hour: number, minute: number): DateValue {
  if (date instanceof ZonedDateTime) {
    return date.set({ hour, minute, second: 0, millisecond: 0 }) as DateValue
  }
  if (date instanceof CalendarDateTime) {
    return date.set({ hour, minute, second: 0, millisecond: 0 }) as DateValue
  }
  // Promote CalendarDate → CalendarDateTime
  const cd = date as CalendarDate
  return new CalendarDateTime(cd.year, cd.month, cd.day, hour, minute, 0) as unknown as DateValue
}

function toCalendarDate(date: any): DateValue {
  return new CalendarDate(date.year, date.month, date.day) as unknown as DateValue
}

function onCalendarSelect(value: DateValue | undefined) {
  if (!value) return
  if (props.dateOnly) {
    emitUpdate(toCalendarDate(value))
    open.value = false
    return
  }
  const prevHour = currentHour.value
  const prevMinute = currentMinute.value
  emitUpdate(withTime(value, prevHour, prevMinute))
  step.value = 'time'
}

function onHourSelect(h: number) {
  const base = (internalValue.value ?? (new CalendarDateTime(today(tz).year, today(tz).month, today(tz).day, 0, 0, 0) as unknown as DateValue))
  emitUpdate(withTime(base, h, currentMinute.value))
}

function onMinuteSelect(m: number, close?: () => void) {
  const base = (internalValue.value ?? (new CalendarDateTime(today(tz).year, today(tz).month, today(tz).day, 0, 0, 0) as unknown as DateValue))
  emitUpdate(withTime(base, currentHour.value, m))
  if (close) close()
  open.value = false
}

function goBackToDate() {
  step.value = 'date'
}

// region Presets ////
const dayName = computed(() => new Intl.DateTimeFormat(activeLocale.value, { weekday: 'long' }))
const dateName = computed(() => new Intl.DateTimeFormat(activeLocale.value, { day: 'numeric', month: 'long' }))

function presetHint(value: any): string {
  const d = toJsDate(value)
  const w = dayName.value.format(d)
  const dm = dateName.value.format(d)
  const head = w.charAt(0).toUpperCase()
  return `${head}${w.slice(1)}, ${dm}`
}

const defaultPresets = computed<DateTimePickerPreset[]>(() => {
  const t0 = today(tz)
  const tomorrow = t0.add({ days: 1 })
  const startWeek = startOfWeek(t0, activeLocale.value)
  const friday = startWeek.add({ days: 4 })
  const endWeek = friday.compare(t0) >= 0 ? friday : endOfWeek(t0, activeLocale.value)
  const inAWeek = t0.add({ weeks: 1 })
  const endMonth = endOfMonth(t0)

  const list: { key: string, value: DateValue }[] = [
    { key: 'today', value: t0 as unknown as DateValue },
    { key: 'tomorrow', value: tomorrow as unknown as DateValue },
    { key: 'endOfWeek', value: endWeek as unknown as DateValue },
    { key: 'inAWeek', value: inAWeek as unknown as DateValue },
    { key: 'endOfMonth', value: endMonth as unknown as DateValue }
  ]

  return list.map(item => ({
    label: t(`dateTimePicker.presets.${item.key}`),
    hint: presetHint(item.value),
    value: item.value
  }))
})

const presetsResolved = computed<DateTimePickerPreset[]>(() => props.presets ?? defaultPresets.value)

function resolvePreset(preset: DateTimePickerPreset): DateValue {
  return (typeof preset.value === 'function' ? preset.value() : preset.value) as DateValue
}

/**
 * Pre-resolved `DateValue` for each preset so factories run **once per render**.
 * Without this, `isPresetActive` (called twice in the template for `:active`
 * and `:data-active`) would invoke `resolvePreset` repeatedly — observable
 * side effects and stale comparisons when the factory returns "now"-like
 * values.
 */
const resolvedPresets = computed(() => presetsResolved.value.map(preset => ({
  preset,
  value: resolvePreset(preset)
})))

function applyPreset(preset: DateTimePickerPreset) {
  const next = resolvePreset(preset)
  if (props.dateOnly) {
    emitUpdate(toCalendarDate(next))
    open.value = false
    return
  }
  const prevHour = currentHour.value
  const prevMinute = currentMinute.value
  emitUpdate(withTime(next, prevHour, prevMinute))
  step.value = 'time'
}

function isPresetActiveByValue(resolved: DateValue): boolean {
  if (!internalValue.value) return false
  return (toCalendarDate(resolved) as any).compare(toCalendarDate(internalValue.value)) === 0
}

/**
 * Public helper exposed via `presets` slot props. Resolves the preset
 * internally; not used by the default template (which uses the pre-resolved
 * cache from {@link resolvedPresets}).
 */
function isPresetActive(preset: DateTimePickerPreset): boolean {
  return isPresetActiveByValue(resolvePreset(preset))
}
// endregion ////

defineExpose({
  open,
  step
})
</script>

<template>
  <B24Popover
    v-model:open="open"
    :b24ui="{ content: b24ui.content() }"
    v-bind="props.popover"
  >
    <slot :open="open" :value="(internalValue as DateValue | undefined)" :formatted="formattedValue">
      <B24Input
        :model-value="formattedValue"
        readonly
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :color="(props.color as InputProps['color'])"
        :size="(props.size as InputProps['size'])"
        :icon="props.icon || Calendar1Icon"
        :class="props.class"
        v-bind="{ ...$attrs, ...props.input }"
      />
    </slot>

    <template #content="{ close }">
      <div :class="b24ui.body()">
        <div :class="b24ui.main()">
          <template v-if="step === 'date'">
            <B24Calendar
              :model-value="(dateValue as any)"
              :locale="activeLocale"
              :color="(props.color as CalendarProps['color'])"
              :size="(props.size as CalendarProps['size'])"
              v-bind="props.calendar"
              @update:model-value="(v: any) => onCalendarSelect(v)"
            />
            <div v-if="!props.dateOnly && internalValue" :class="b24ui.footer()">
              <Component :is="props.timeIcon || ClockIcon" :class="b24ui.footerIcon()" />
              <span :class="b24ui.footerValue()">{{ timeLabel }}</span>
            </div>
          </template>
          <template v-else>
            <slot
              name="time-header"
              :value="(internalValue as DateValue | undefined)"
              :formatted="formattedValue"
              :back="goBackToDate"
            >
              <div :class="b24ui.timeHeader()">
                <B24Button
                  :icon="icons.chevronLeft"
                  color="air-tertiary"
                  size="sm"
                  :aria-label="t('dateTimePicker.backToDate')"
                  @click="goBackToDate"
                />
                <span :class="b24ui.timeHeaderLabel()">{{ formattedValue }}</span>
              </div>
            </slot>

            <div :class="b24ui.timeBody()">
              <div :class="b24ui.timeColumn()">
                <div :id="`${id}-hours-label`" :class="b24ui.timeColumnTitle()">
                  {{ t('dateTimePicker.hours') }}
                </div>
                <div
                  role="group"
                  :aria-labelledby="`${id}-hours-label`"
                  :class="b24ui.timeGrid()"
                >
                  <button
                    v-for="h in hours"
                    :key="`h-${h}`"
                    type="button"
                    :aria-pressed="h === currentHour"
                    :data-selected="h === currentHour"
                    :class="b24ui.timeCell()"
                    @click="onHourSelect(h)"
                  >
                    {{ String(h).padStart(2, '0') }}
                  </button>
                </div>
              </div>
              <div :class="b24ui.timeColumn()">
                <div :id="`${id}-minutes-label`" :class="b24ui.timeColumnTitle()">
                  {{ t('dateTimePicker.minutes') }}
                </div>
                <div
                  role="group"
                  :aria-labelledby="`${id}-minutes-label`"
                  :class="b24ui.timeMinutesGrid()"
                >
                  <button
                    v-for="m in minutes"
                    :key="`m-${m}`"
                    type="button"
                    :aria-pressed="m === currentMinute"
                    :data-selected="m === currentMinute"
                    :class="b24ui.timeCell()"
                    @click="onMinuteSelect(m, close)"
                  >
                    {{ String(m).padStart(2, '0') }}
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>

        <slot
          v-if="!props.hidePresets && resolvedPresets.length"
          name="presets"
          :presets="presetsResolved"
          :select="applyPreset"
          :is-active="isPresetActive"
        >
          <div :class="b24ui.presets()">
            <template v-for="(item, index) in resolvedPresets" :key="`preset-${index}`">
              <slot
                name="preset"
                :preset="item.preset"
                :select="() => applyPreset(item.preset)"
                :active="isPresetActiveByValue(item.value)"
              >
                <button
                  type="button"
                  :data-active="isPresetActiveByValue(item.value)"
                  :class="b24ui.preset()"
                  @click="applyPreset(item.preset)"
                >
                  <span :class="b24ui.presetLabel()">{{ item.preset.label }}</span>
                  <span v-if="item.preset.hint" :class="b24ui.presetHint()">{{ item.preset.hint }}</span>
                </button>
              </slot>
            </template>
          </div>
        </slot>
      </div>
    </template>
  </B24Popover>
</template>
