<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDateTime, today, getLocalTimeZone } from '@internationalized/date'
import type { DateTimePickerPreset } from '@bitrix24/b24ui-nuxt'

const tz = getLocalTimeZone()
const value = shallowRef<CalendarDateTime | undefined>()

const presets: DateTimePickerPreset[] = [
  {
    label: 'Now',
    hint: 'Right at this moment',
    value: () => {
      const now = new Date()
      const t = today(tz)
      return new CalendarDateTime(t.year, t.month, t.day, now.getHours(), now.getMinutes())
    }
  },
  {
    label: 'Tomorrow morning',
    hint: '09:00',
    value: () => {
      const t = today(tz).add({ days: 1 })
      return new CalendarDateTime(t.year, t.month, t.day, 9, 0)
    }
  },
  {
    label: 'Next Monday',
    hint: 'Start of the work week',
    value: () => {
      const base = today(tz)
      const offset = (8 - base.toDate(tz).getDay()) % 7 || 7
      const next = base.add({ days: offset })
      return new CalendarDateTime(next.year, next.month, next.day, 10, 0)
    }
  }
]
</script>

<template>
  <B24DateTimePicker
    v-model="value"
    :presets="presets"
    placeholder="Pick a moment"
    class="w-72"
  />
</template>
