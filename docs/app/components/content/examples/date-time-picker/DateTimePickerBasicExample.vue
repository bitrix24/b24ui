<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDateTime } from '@internationalized/date'

const value = shallowRef<CalendarDateTime | undefined>(new CalendarDateTime(2026, 4, 29, 17, 0))
</script>

<template>
  <B24DateTimePicker v-model="value" class="w-72" />
</template>
