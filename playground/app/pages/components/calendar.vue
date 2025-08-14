<script setup lang="ts">
import theme from '#build/b24ui/calendar'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'

usePageMeta.setPageTitle('Calendar')
const colors = Object.keys(theme.variants.color) as Array<keyof typeof theme.variants.color>
const sizes = Object.keys(theme.variants.size) as Array<keyof typeof theme.variants.size>

const isUseBg = ref(true)

const value = shallowRef(new CalendarDate(2012, 4, 12))
const defaultValue = shallowRef(new CalendarDate(2012, 4, 12))
const valueMultiple = shallowRef([
  new CalendarDate(2012, 4, 12),
  new CalendarDate(2012, 4, 14),
  new CalendarDate(2012, 4, 24)
])
const valueRange = shallowRef({
  start: new CalendarDate(2012, 4, 11),
  end: new CalendarDate(2012, 4, 21)
})

// region With chip events ////
const withChipEventsValue = shallowRef(new CalendarDate(2012, 4, 12))
function getColorByDate(date: Date) {
  const isWeekend = date.getDay() % 6 == 0
  const isDayMeeting = date.getDay() % 3 == 0

  if (isWeekend) {
    return undefined
  }

  if (isDayMeeting) {
    return 'air-primary-alert'
  }

  return 'air-primary-success'
}
// endregion ////

// region With disabled dates ////
const withDisabledDatesValue = shallowRef({
  start: new CalendarDate(2012, 4, 12),
  end: new CalendarDate(2012, 4, 14)
})
const isDateDisabled = (date: DateValue) => {
  return date.day >= 15 && date.day <= 17
}
// endregion ////

// region With unavailable dates ////
const withUnavailableDatesValue = shallowRef({
  start: new CalendarDate(2012, 4, 12),
  end: new CalendarDate(2012, 4, 14)
})
const isDateUnavailable = (date: DateValue) => {
  return date.day >= 15 && date.day <= 17
}
// endregion ////

// region With min/max dates ////
const withMinMaxValue = shallowRef(new CalendarDate(2012, 4, 12))
const minDate = new CalendarDate(2012, 4, 1)
const maxDate = new CalendarDate(2012, 4, 30)
// endregion ////

// region As a DatePicker ////
const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})
const datePickerValue = shallowRef(new CalendarDate(2012, 4, 12))
const datePickerRangeValue = shallowRef({
  start: new CalendarDate(2012, 4, 12),
  end: new CalendarDate(2012, 5, 12)
})
// endregion ////

const oldColors = computed(() => {
  return colors.filter((color) => {
    return !color.includes('air')
  })
})

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="v-model" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar v-model="value" />
      </div>
    </ExampleCard>

    <ExampleCard title="default-value" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar :default-value="defaultValue" />
      </div>
    </ExampleCard>

    <ExampleCard title="As a DatePicker" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-row flex-wrap items-start justify-start gap-4">
        <B24Popover>
          <B24Button :icon="Calendar1Icon">
            <div class="truncate">
              {{ datePickerValue ? df.format(datePickerValue.toDate(getLocalTimeZone())) : 'Select a date' }}
            </div>
          </B24Button>

          <template #content>
            <B24Calendar v-model="datePickerValue" class="p-2" />
          </template>
        </B24Popover>

        <B24Popover>
          <B24Button :icon="Calendar1Icon">
            <template v-if="datePickerRangeValue.start">
              <div class="truncate" v-if="datePickerRangeValue.end">
                {{ df.format(datePickerRangeValue.start.toDate(getLocalTimeZone())) }} - {{ df.format(datePickerRangeValue.end.toDate(getLocalTimeZone())) }}
              </div>

              <div class="truncate" v-else>
                {{ df.format(datePickerRangeValue.start.toDate(getLocalTimeZone())) }}
              </div>
            </template>
            <template v-else>
              Pick a date
            </template>
          </B24Button>

          <template #content>
            <B24Calendar
              v-model="datePickerRangeValue"
              class="p-2"
              :number-of-months="2"
              range
            />
          </template>
        </B24Popover>
      </div>
    </ExampleCard>

    <ExampleCard title="multiple" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar v-model="valueMultiple" multiple />
      </div>
    </ExampleCard>

    <ExampleCard title="range" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar v-model="valueRange" range />
      </div>
    </ExampleCard>

    <ExampleCard title="disabled" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar disabled />
      </div>
    </ExampleCard>

    <ExampleCard title="With chip events" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar v-model="withChipEventsValue">
          <template #day="{ day }">
            <B24Chip
              :show="!!getColorByDate(day.toDate('UTC'))"
              :color="getColorByDate(day.toDate('UTC'))"
              size="sm"
              :b24ui="{ base: '[--ui-counter-size-sm:6px] px-[2px]' }"
            >
              {{ day.day }}
            </B24Chip>
          </template>
        </B24Calendar>
      </div>
    </ExampleCard>

    <ExampleCard title="With disabled dates" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar
          v-model="withDisabledDatesValue"
          :is-date-disabled="isDateDisabled"
          range
        />
      </div>
    </ExampleCard>

    <ExampleCard title="With unavailable dates" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar
          v-model="withUnavailableDatesValue"
          :is-date-unavailable="isDateUnavailable"
          range
        />
      </div>
    </ExampleCard>

    <ExampleCard title="With min/max dates" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar
          v-model="withMinMaxValue"
          :min-value="minDate"
          :max-value="maxDate"
        />
      </div>
    </ExampleCard>
  </ExampleGrid>

  <B24Separator accent="accent" class="my-4" label="Some months" type="dotted" />
  <ExampleGrid>
    <ExampleCard title="numberOfMonths" :use-bg="isUseBg" class="sm:col-span-2">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar :number-of-months="2" />
      </div>
    </ExampleCard>
  </ExampleGrid>

  <B24Separator accent="accent" class="my-4" label="Color" type="dotted" />
  <ExampleGrid v-once>
    <template v-for="color in airColors" :key="color">
      <ExampleCard :title="color as string" :use-bg="isUseBg">
        <B24Separator class="my-3" type="dotted" />
        <div class="mb-4">
          <B24Calendar :color="color" />
        </div>
      </ExampleCard>
    </template>
  </ExampleGrid>
  <B24Collapsible class="my-4">
    <B24Button
      color="air-secondary-no-accent"
      label="Deprecate"
      use-dropdown
    />
    <template #content>
      <ExampleGrid v-once class="mt-4">
        <template v-for="color in oldColors" :key="color">
          <ExampleCard :title="color as string" :use-bg="isUseBg">
            <B24Separator class="my-3" type="dotted" />
            <div class="mb-4">
              <B24Calendar :color="color" />
            </div>
          </ExampleCard>
        </template>
      </ExampleGrid>
    </template>
  </B24Collapsible>

  <B24Separator accent="accent" class="my-4" label="Size" type="dotted" />
  <ExampleGrid v-once class="mb-4">
    <template v-for="size in sizes" :key="size">
      <ExampleCard :title="size as string" :use-bg="isUseBg">
        <B24Separator class="my-3" type="dotted" />
        <div class="mb-4">
          <B24Calendar :size="size" />
        </div>
      </ExampleCard>
    </template>
  </ExampleGrid>
</template>
