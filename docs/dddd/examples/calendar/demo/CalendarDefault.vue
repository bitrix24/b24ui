<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'

const value = shallowRef(new CalendarDate(2012, 4, 12))
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded w-[300px] p-2">
    <B24Calendar :default-value="value" />
  </div>
</template>
