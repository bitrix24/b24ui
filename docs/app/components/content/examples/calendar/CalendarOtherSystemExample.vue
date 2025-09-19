<script lang="ts" setup>
import { shallowRef } from 'vue'
import { CalendarDate, HebrewCalendar } from '@internationalized/date'

const hebrewDate = shallowRef(new CalendarDate(new HebrewCalendar(), 5781, 1, 1))
</script>

<template>
  <B24Calendar v-model="hebrewDate" />
</template>
