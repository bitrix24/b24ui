<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'

const modelValue = shallowRef(new CalendarDate(2012, 4, 12))
const minDate = new CalendarDate(2012, 4, 1)
const maxDate = new CalendarDate(2012, 4, 30)
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded w-[300px] p-2">
    <B24Calendar
      v-model="modelValue"
      :min-value="minDate"
      :max-value="maxDate"
    />
  </div>
</template>
