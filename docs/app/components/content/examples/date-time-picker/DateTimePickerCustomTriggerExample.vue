<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDateTime } from '@internationalized/date'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'

const value = shallowRef<CalendarDateTime | undefined>(new CalendarDateTime(2026, 4, 29, 17, 0))
</script>

<template>
  <B24DateTimePicker v-model="value">
    <template #default="{ formatted }">
      <B24Button :icon="Calendar1Icon" color="air-tertiary">
        {{ formatted || 'Schedule a call' }}
      </B24Button>
    </template>
  </B24DateTimePicker>
</template>
