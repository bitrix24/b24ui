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
    return 'air-primary-alert'
  }

  return 'air-primary-success'
}
</script>

<template>
  <B24Calendar v-model="modelValue" size="lg">
    <template #day="{ day }">
      <B24Chip
        :show="!!getColorByDate(day.toDate('UTC'))"
        :color="getColorByDate(day.toDate('UTC'))"
        size="sm"
      >
        {{ day.day }}
      </B24Chip>
    </template>
  </B24Calendar>
</template>
