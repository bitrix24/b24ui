<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'

const value = shallowRef({
  start: new CalendarDate(2012, 4, 11),
  end: new CalendarDate(2012, 4, 21)
})
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded w-[300px] p-2">
    <B24Calendar v-model="value" range />
  </div>
</template>
