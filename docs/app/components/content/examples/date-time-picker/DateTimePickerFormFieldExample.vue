<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDateTime, type DateValue } from '@internationalized/date'

const meetingAt = shallowRef<DateValue | undefined>(new CalendarDateTime(2026, 4, 29, 17, 0))
</script>

<template>
  <B24FormField
    name="meetingAt"
    label="Meeting at"
    hint="Pick a date and time"
    required
    class="w-72"
  >
    <B24DateTimePicker v-model="meetingAt" class="w-full" />
  </B24FormField>
</template>
