<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'

const modelValue = shallowRef({
  start: new CalendarDate(2012, 4, 12),
  end: new CalendarDate(2012, 4, 14)
})

const isDateUnavailable = (date: DateValue) => {
  return date.day >= 15 && date.day <= 17
}
</script>

<template>
  <B24Calendar v-model="modelValue" :is-date-unavailable="isDateUnavailable" range />
</template>
