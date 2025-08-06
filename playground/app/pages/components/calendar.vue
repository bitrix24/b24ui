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
    return 'danger'
  }

  return 'success'
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
</script>

<template>
  <div class="w-full">
    <ProseH2 class="mb-0">Usage</ProseH2>
  </div>
  <ExampleGrid v-once class="mt-4">
    <ExampleCard title="v-model">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar v-model="value" />
      </div>
    </ExampleCard>

    <ExampleCard title="default-value">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar :default-value="defaultValue" />
      </div>
    </ExampleCard>

    <ExampleCard title="As a DatePicker">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-row flex-wrap items-start justify-start gap-4">
        <B24Popover>
          <B24Button :icon="Calendar1Icon">
            {{ datePickerValue ? df.format(datePickerValue.toDate(getLocalTimeZone())) : 'Select a date' }}
          </B24Button>

          <template #content>
            <B24Calendar v-model="datePickerValue" class="p-2" />
          </template>
        </B24Popover>

        <B24Popover>
          <B24Button :icon="Calendar1Icon">
            <template v-if="datePickerRangeValue.start">
              <template v-if="datePickerRangeValue.end">
                {{ df.format(datePickerRangeValue.start.toDate(getLocalTimeZone())) }} - {{ df.format(datePickerRangeValue.end.toDate(getLocalTimeZone())) }}
              </template>

              <template v-else>
                {{ df.format(datePickerRangeValue.start.toDate(getLocalTimeZone())) }}
              </template>
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

    <ExampleCard title="multiple">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar v-model="valueMultiple" multiple />
      </div>
    </ExampleCard>

    <ExampleCard title="range">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar v-model="valueRange" range />
      </div>
    </ExampleCard>

    <ExampleCard title="disabled">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar disabled />
      </div>
    </ExampleCard>

    <ExampleCard title="numberOfMonths" class="col-span-2">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar :number-of-months="2" />
      </div>
    </ExampleCard>

    <ExampleCard title="With chip events">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar v-model="withChipEventsValue">
          <template #day="{ day }">
            <B24Chip
              :show="!!getColorByDate(day.toDate('UTC'))"
              :color="getColorByDate(day.toDate('UTC'))"
              size="md"
            >
              {{ day.day }}
            </B24Chip>
          </template>
        </B24Calendar>
      </div>
    </ExampleCard>

    <ExampleCard title="With disabled dates">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar
          v-model="withDisabledDatesValue"
          :is-date-disabled="isDateDisabled"
          range
        />
      </div>
    </ExampleCard>

    <ExampleCard title="With unavailable dates">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4">
        <B24Calendar
          v-model="withUnavailableDatesValue"
          :is-date-unavailable="isDateUnavailable"
          range
        />
      </div>
    </ExampleCard>

    <ExampleCard title="With min/max dates">
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

  <div class="mt-6 w-full">
    <ProseH2 class="mb-0">Color</ProseH2>
  </div>
  <ExampleGrid v-once class="mt-4">
    <template v-for="color in colors" :key="color">
      <ExampleCard :title="color as string">
        <B24Separator class="my-3" type="dotted" />
        <div class="mb-4">
          <B24Calendar :color="color" />
        </div>
      </ExampleCard>
    </template>
  </ExampleGrid>

  <div class="mt-6 w-full">
    <ProseH2 class="mb-0">Size</ProseH2>
  </div>
  <ExampleGrid v-once class="mt-4">
    <template v-for="size in sizes" :key="size">
      <ExampleCard :title="size as string">
        <B24Separator class="my-3" type="dotted" />
        <div class="mb-4">
          <B24Calendar :size="size" />
        </div>
      </ExampleCard>
    </template>
  </ExampleGrid>
</template>
