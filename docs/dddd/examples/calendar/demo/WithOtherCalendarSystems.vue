<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate, HebrewCalendar } from '@internationalized/date'

const hebrewDate = shallowRef(new CalendarDate(new HebrewCalendar(), 5781, 1, 1))
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded w-[300px] p-2">
    <B24Calendar
      v-model="hebrewDate"
    />
  </div>
</template>
