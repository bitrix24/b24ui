<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'

const modelValue = shallowRef(new CalendarDate(2012, 4, 12))
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
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded w-[300px] p-2">
    <B24Calendar v-model="modelValue">
      <template #day="{ day }">
        <B24Chip
          :show="!!getColorByDate(day.toDate('UTC'))"
          :color="getColorByDate(day.toDate('UTC'))"
          size="3xs"
        >
          {{ day.day }}
        </B24Chip>
      </template>
    </B24Calendar>
  </div>
</template>
