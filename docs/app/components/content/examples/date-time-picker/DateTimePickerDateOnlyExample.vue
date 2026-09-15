<script setup lang="ts">
import { shallowRef } from 'vue'
import type { DateValue } from '@internationalized/date'
import { CalendarDate } from '@internationalized/date'

const value = shallowRef<DateValue>(new CalendarDate(2024, 10, 6))
</script>

<template>
  <B24DateTimePicker v-model="value" date-only placeholder="Pick a date" />
</template>
