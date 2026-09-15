<script setup lang="ts">
import { shallowRef } from 'vue'
import type { DateValue } from '@internationalized/date'
import { CalendarDateTime } from '@internationalized/date'

const value = shallowRef<DateValue>(new CalendarDateTime(2024, 10, 6, 14, 30))
</script>

<template>
  <B24DateTimePicker v-model="value" placeholder="Pick a date and time" />
</template>
