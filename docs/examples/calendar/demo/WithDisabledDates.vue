<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate, type DateValue } from '@internationalized/date'

const modelValue = shallowRef({
  start: new CalendarDate(2012, 4, 12),
  end: new CalendarDate(2012, 4, 14)
})
const isDateDisabled = (date: DateValue) => {
  return date.day >= 15 && date.day <= 17
}
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded w-[300px] p-2">
    <B24Calendar
      v-model="modelValue"
      :is-date-disabled="isDateDisabled"
      range
    />
  </div>
</template>
