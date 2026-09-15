<script setup lang="ts">
import { shallowRef } from 'vue'
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone, today } from '@internationalized/date'
import type { DateTimePickerPreset } from '@bitrix24/b24ui-nuxt'

const value = shallowRef<DateValue | undefined>()

// A function is resolved when the list renders, so "in three days" stays
// correct however long the page has been open.
const presets: DateTimePickerPreset[] = [
  { label: 'In three days', value: () => today(getLocalTimeZone()).add({ days: 3 }) },
  { label: 'In two weeks', value: () => today(getLocalTimeZone()).add({ weeks: 2 }) },
  { label: 'Next quarter', value: () => today(getLocalTimeZone()).add({ months: 3 }) }
]
</script>

<template>
  <B24DateTimePicker v-model="value" :presets="presets" placeholder="Pick a deadline" />
</template>
