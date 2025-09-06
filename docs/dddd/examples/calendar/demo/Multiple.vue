<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'

const value = shallowRef([
  new CalendarDate(2012, 4, 12),
  new CalendarDate(2012, 4, 14),
  new CalendarDate(2012, 4, 24)
])
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded w-[300px] p-2">
    <B24Calendar
      v-model="value"
      multiple
    />
  </div>
</template>
