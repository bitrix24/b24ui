<script lang="ts">
import type { CalendarRootProps, CalendarRootEmits, RangeCalendarRootProps, RangeCalendarRootEmits, DateRange, CalendarCellTriggerProps } from 'reka-ui'
import type { DateValue } from '@internationalized/date'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/calendar'
import type { IconComponent, ButtonProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type Calendar = ComponentConfig<typeof theme, AppConfig, 'calendar'>

type CalendarDefaultValue<R extends boolean = false, M extends boolean = false> = R extends true
  ? DateRange
  : M extends true
    ? DateValue[]
    : DateValue
type CalendarModelValue<R extends boolean = false, M extends boolean = false> = R extends true
  ? (DateRange | null)
  : M extends true
    ? (DateValue[] | undefined)
    : (DateValue | undefined)

// @memo not skip 'locale'
type _CalendarRootProps = Omit<CalendarRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'calendarLabel' | 'multiple'>
// @memo not skip 'locale'
type _RangeCalendarRootProps = Omit<RangeCalendarRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'calendarLabel' | 'multiple'>

export interface CalendarProps<R extends boolean = false, M extends boolean = false> extends _RangeCalendarRootProps, _CalendarRootProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * The icon to use for the next year control.
   * @defaultValue icons.chevronDoubleRight
   * @IconComponent
   */
  nextYearIcon?: IconComponent
  /**
   * Configure the next year button.
   * `{ color: 'air-tertiary' }`{lang="ts"}
   */
  nextYear?: ButtonProps
  /**
   * The icon to use for the next month control.
   * @defaultValue icons.chevronRight
   * @IconComponent
   */
  nextMonthIcon?: IconComponent
  /**
   * Configure the next month button.
   * `{ color: 'air-tertiary' }`{lang="ts"}
   */
  nextMonth?: ButtonProps
  /**
   * The icon to use for the previous year control.
   * @defaultValue icons.chevronDoubleLeft
   * @IconComponent
   */
  prevYearIcon?: IconComponent
  /**
   * Configure the prev year button.
   * `{ color: 'air-tertiary' }`{lang="ts"}
   */
  prevYear?: ButtonProps
  /**
   * The icon to use for the previous month control.
   * @defaultValue icons.chevronLeft
   * @IconComponent
   */
  prevMonthIcon?: IconComponent
  /**
   * Configure the prev month button.
   * `{ color: 'air-tertiary' }`{lang="ts"}
   */
  prevMonth?: ButtonProps
  /**
   * @defaultValue 'air-primary'
   */
  color?: Calendar['variants']['color']
  /**
   * @defaultValue 'md'
   */
  size?: Calendar['variants']['size']
  /** Whether a range of dates can be selected */
  range?: R & boolean
  /** Whether multiple dates can be selected */
  multiple?: M & boolean
  /**
   * Show month controls
   * @defaultValue 'true'
   */
  monthControls?: boolean
  /**
   * Show year controls
   * @defaultValue 'false'
   */
  yearControls?: boolean
  defaultValue?: CalendarDefaultValue<R, M>
  modelValue?: CalendarModelValue<R, M>
  class?: any
  b24ui?: Calendar['slots']
}

export interface CalendarEmits<R extends boolean, M extends boolean> extends Omit<CalendarRootEmits & RangeCalendarRootEmits, 'update:modelValue'> {
  'update:modelValue': [date: CalendarModelValue<R, M>]
}

export interface CalendarSlots {
  'heading': (props: { value: string }) => any
  'day': (props: Pick<CalendarCellTriggerProps, 'day'>) => any
  'week-day': (props: { day: string }) => any
}
</script>

<script setup lang="ts" generic="R extends boolean, M extends boolean">
import { computed } from 'vue'
import { useForwardPropsEmits } from 'reka-ui'
import { Calendar as SingleCalendar, RangeCalendar } from 'reka-ui/namespaced'
import { reactiveOmit } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<CalendarProps<R, M>>(), {
  fixedWeeks: true,
  monthControls: true,
  yearControls: false
})
const emits = defineEmits<CalendarEmits<R, M>>()
defineSlots<CalendarSlots>()

const { dir, t } = useLocale()
const appConfig = useAppConfig() as Calendar['AppConfig']

const rootProps = useForwardPropsEmits(reactiveOmit(props, 'range', 'modelValue', 'defaultValue', 'color', 'size', 'monthControls', 'yearControls', 'class', 'b24ui'), emits)

const nextYearIcon = computed(() => props.nextYearIcon || (dir.value === 'rtl' ? icons.chevronDoubleLeft : icons.chevronDoubleRight))
const nextMonthIcon = computed(() => props.nextMonthIcon || (dir.value === 'rtl' ? icons.chevronLeft : icons.chevronRight))
const prevYearIcon = computed(() => props.prevYearIcon || (dir.value === 'rtl' ? icons.chevronDoubleRight : icons.chevronDoubleLeft))
const prevMonthIcon = computed(() => props.prevMonthIcon || (dir.value === 'rtl' ? icons.chevronRight : icons.chevronLeft))

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.calendar || {}) })({
  color: props.color,
  size: props.size
}))

function paginateYear(date: DateValue, sign: -1 | 1) {
  if (sign === -1) {
    return date.subtract({ years: 1 })
  }

  return date.add({ years: 1 })
}

const Calendar = computed(() => props.range ? RangeCalendar : SingleCalendar)

const btnSize = computed(() => {
  switch (props.size) {
    case 'xs': return 'xs'
    default: return 'sm'
  }
})
</script>

<template>
  <Calendar.Root
    v-slot="{ weekDays, grid }"
    v-bind="rootProps"
    :model-value="(modelValue as DateValue | DateValue[])"
    :default-value="(defaultValue as DateValue)"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
  >
    <Calendar.Header data-slot="header" :class="b24ui.header({ class: props.b24ui?.header })">
      <Calendar.Prev v-if="props.yearControls" :prev-page="(date: DateValue) => paginateYear(date, -1)" :aria-label="t('calendar.prevYear')" as-child>
        <B24Button :icon="prevYearIcon" :size="btnSize" color="air-tertiary" v-bind="props.prevYear" />
      </Calendar.Prev>
      <Calendar.Prev v-if="props.monthControls" :aria-label="t('calendar.prevMonth')" as-child>
        <B24Button :icon="prevMonthIcon" :size="btnSize" color="air-tertiary" v-bind="props.prevMonth" />
      </Calendar.Prev>
      <Calendar.Heading v-slot="{ headingValue }" data-slot="heading" :class="b24ui.heading({ class: props.b24ui?.heading })">
        <slot name="heading" :value="headingValue">
          {{ headingValue }}
        </slot>
      </Calendar.Heading>
      <Calendar.Next v-if="props.monthControls" :aria-label="t('calendar.nextMonth')" as-child>
        <B24Button :icon="nextMonthIcon" :size="btnSize" color="air-tertiary" v-bind="props.nextMonth" />
      </Calendar.Next>
      <Calendar.Next v-if="props.yearControls" :next-page="(date: DateValue) => paginateYear(date, 1)" :aria-label="t('calendar.nextYear')" as-child>
        <B24Button :icon="nextYearIcon" :size="btnSize" color="air-tertiary" v-bind="props.nextYear" />
      </Calendar.Next>
    </Calendar.Header>
    <div data-slot="body" :class="b24ui.body({ class: props.b24ui?.body })">
      <Calendar.Grid
        v-for="month in grid"
        :key="month.value.toString()"
        data-slot="grid"
        :class="b24ui.grid({ class: props.b24ui?.grid })"
      >
        <Calendar.GridHead>
          <Calendar.GridRow data-slot="gridWeekDaysRow" :class="b24ui.gridWeekDaysRow({ class: props.b24ui?.gridWeekDaysRow })">
            <Calendar.HeadCell
              v-for="day in weekDays"
              :key="day"
              data-slot="headCell"
              :class="b24ui.headCell({ class: props.b24ui?.headCell })"
            >
              <slot name="week-day" :day="day">
                {{ day }}
              </slot>
            </Calendar.HeadCell>
          </Calendar.GridRow>
        </Calendar.GridHead>
        <Calendar.GridBody data-slot="gridBody" :class="b24ui.gridBody({ class: props.b24ui?.gridBody })">
          <Calendar.GridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            data-slot="gridRow"
            :class="b24ui.gridRow({ class: props.b24ui?.gridRow })"
          >
            <Calendar.Cell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              data-slot="cell"
              :class="b24ui.cell({ class: props.b24ui?.cell })"
            >
              <Calendar.CellTrigger
                :day="weekDate"
                :month="month.value"
                data-slot="cellTrigger"
                :class="b24ui.cellTrigger({ class: props.b24ui?.cellTrigger })"
              >
                <slot name="day" :day="weekDate">
                  {{ weekDate.day }}
                </slot>
              </Calendar.CellTrigger>
            </Calendar.Cell>
          </Calendar.GridRow>
        </Calendar.GridBody>
      </Calendar.Grid>
    </div>
  </Calendar.Root>
</template>
