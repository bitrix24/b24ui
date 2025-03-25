<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { CalendarRootProps, CalendarRootEmits, RangeCalendarRootEmits, DateRange, CalendarCellTriggerProps } from 'reka-ui'
import type { DateValue } from '@internationalized/date'
import type { AppConfig } from '@nuxt/schema'
import type { IconComponent, ButtonProps } from '../types'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/calendar'
import { tv } from '../utils/tv'
import type { PartialString } from '../types/utils'

const appConfigCalendar = _appConfig as AppConfig & { b24ui: { calendar: Partial<typeof theme> } }

const calendar = tv({ extend: tv(theme), ...(appConfigCalendar.b24ui?.calendar || {}) })

type CalendarVariants = VariantProps<typeof calendar>

type CalendarModelValue<R extends boolean = false, M extends boolean = false> = R extends true
  ? DateRange
  : M extends true
    ? DateValue[]
    : DateValue

export interface CalendarProps<R extends boolean, M extends boolean> extends Omit<CalendarRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir' | 'locale' | 'calendarLabel' | 'multiple'> {
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
   * `{ color: 'link' }`{lang="ts"}
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
   * `{ color: 'link' }`{lang="ts"}
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
   * `{ color: 'link' }`{lang="ts"}
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
   * `{ color: 'link' }`{lang="ts"}
   */
  prevMonth?: ButtonProps
  /**
   * @defaultValue 'primary'
   */
  color?: CalendarVariants['color']
  /**
   * @defaultValue 'md'
   */
  size?: CalendarVariants['size']
  /** Whether a range of dates can be selected */
  range?: R & boolean
  /** Whether multiple dates can be selected */
  multiple?: M & boolean
  /** Show month controls */
  monthControls?: boolean
  /** Show year controls */
  yearControls?: boolean
  defaultValue?: CalendarModelValue<R, M>
  modelValue?: CalendarModelValue<R, M>
  class?: any
  b24ui?: PartialString<typeof calendar.slots>
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

<script setup lang="ts" generic="R extends boolean = false, M extends boolean = false">
import { computed } from 'vue'
import { useForwardPropsEmits } from 'reka-ui'
import { Calendar as SingleCalendar, RangeCalendar } from 'reka-ui/namespaced'
import { reactiveOmit } from '@vueuse/core'
import { useLocale } from '../composables/useLocale'
import icons from '../dictionary/icons'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<CalendarProps<R, M>>(), {
  fixedWeeks: true,
  monthControls: true,
  yearControls: true
})
const emits = defineEmits<CalendarEmits<R, M>>()
defineSlots<CalendarSlots>()

const { code: locale, dir, t } = useLocale()

const rootProps = useForwardPropsEmits(reactiveOmit(props, 'range', 'modelValue', 'defaultValue', 'color', 'size', 'monthControls', 'yearControls', 'class', 'b24ui'), emits)

const nextYearIcon = computed(() => props.nextYearIcon || (dir.value === 'rtl' ? icons.chevronDoubleLeft : icons.chevronDoubleRight))
const nextMonthIcon = computed(() => props.nextMonthIcon || (dir.value === 'rtl' ? icons.chevronLeft : icons.chevronRight))
const prevYearIcon = computed(() => props.prevYearIcon || (dir.value === 'rtl' ? icons.chevronDoubleRight : icons.chevronDoubleLeft))
const prevMonthIcon = computed(() => props.prevMonthIcon || (dir.value === 'rtl' ? icons.chevronRight : icons.chevronLeft))

const b24ui = computed(() => calendar({
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
    case 'lg': return 'sm'
    default: return 'xs'
  }
})
</script>

<template>
  <Calendar.Root
    v-slot="{ weekDays, grid }"
    v-bind="rootProps"
    :model-value="(modelValue as CalendarModelValue<true & false>)"
    :default-value="(defaultValue as CalendarModelValue<true & false>)"
    :locale="locale"
    :dir="dir"
    :class="b24ui.root({ class: [props.class, props.b24ui?.root] })"
  >
    <Calendar.Header :class="b24ui.header({ class: props.b24ui?.header })">
      <Calendar.Prev v-if="props.yearControls" :prev-page="(date: DateValue) => paginateYear(date, -1)" :aria-label="t('calendar.prevYear')" as-child>
        <B24Button :icon="prevYearIcon" :size="btnSize" color="link" v-bind="props.prevYear" />
      </Calendar.Prev>
      <Calendar.Prev v-if="props.monthControls" :aria-label="t('calendar.prevMonth')" as-child>
        <B24Button :icon="prevMonthIcon" :size="btnSize" color="link" v-bind="props.prevMonth" />
      </Calendar.Prev>
      <Calendar.Heading v-slot="{ headingValue }" :class="b24ui.heading({ class: props.b24ui?.heading })">
        <slot name="heading" :value="headingValue">
          {{ headingValue }}
        </slot>
      </Calendar.Heading>
      <Calendar.Next v-if="props.monthControls" :aria-label="t('calendar.nextMonth')" as-child>
        <B24Button :icon="nextMonthIcon" :size="btnSize" color="link" v-bind="props.nextMonth" />
      </Calendar.Next>
      <Calendar.Next v-if="props.yearControls" :next-page="(date: DateValue) => paginateYear(date, 1)" :aria-label="t('calendar.nextYear')" as-child>
        <B24Button :icon="nextYearIcon" :size="btnSize" color="link" v-bind="props.nextYear" />
      </Calendar.Next>
    </Calendar.Header>
    <div :class="b24ui.body({ class: props.b24ui?.body })">
      <Calendar.Grid
        v-for="month in grid"
        :key="month.value.toString()"
        :class="b24ui.grid({ class: props.b24ui?.grid })"
      >
        <Calendar.GridHead>
          <Calendar.GridRow :class="b24ui.gridWeekDaysRow({ class: props.b24ui?.gridWeekDaysRow })">
            <Calendar.HeadCell
              v-for="day in weekDays"
              :key="day"
              :class="b24ui.headCell({ class: props.b24ui?.headCell })"
            >
              <slot name="week-day" :day="day">
                {{ day }}
              </slot>
            </Calendar.HeadCell>
          </Calendar.GridRow>
        </Calendar.GridHead>
        <Calendar.GridBody :class="b24ui.gridBody({ class: props.b24ui?.gridBody })">
          <Calendar.GridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            :class="b24ui.gridRow({ class: props.b24ui?.gridRow })"
          >
            <Calendar.Cell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              :class="b24ui.cell({ class: props.b24ui?.cell })"
            >
              <Calendar.CellTrigger
                :day="weekDate"
                :month="month.value"
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
