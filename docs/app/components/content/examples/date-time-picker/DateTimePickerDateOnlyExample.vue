<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'

const value = shallowRef<CalendarDate | undefined>(new CalendarDate(2026, 4, 28))
</script>

<template>
  <B24DateTimePicker v-model="value" date-only class="w-72" />
</template>
