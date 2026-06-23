<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDateTime, today, getLocalTimeZone, type DateValue } from '@internationalized/date'

const tz = getLocalTimeZone()
const t0 = today(tz)

const value = shallowRef<DateValue | undefined>(new CalendarDateTime(t0.year, t0.month, t0.day, 12, 0))
</script>

<template>
  <B24DateTimePicker
    v-model="value"
    :calendar="{ minValue: t0, maxValue: t0.add({ days: 14 }) }"
    placeholder="Within the next two weeks"
    class="w-72"
  />
</template>
