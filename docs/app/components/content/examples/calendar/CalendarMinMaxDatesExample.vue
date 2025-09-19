<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'

const modelValue = shallowRef(new CalendarDate(2012, 4, 12))
const minDate = new CalendarDate(2012, 4, 3)
const maxDate = new CalendarDate(2012, 4, 27)
</script>

<template>
  <B24Calendar v-model="modelValue" :min-value="minDate" :max-value="maxDate" />
</template>
