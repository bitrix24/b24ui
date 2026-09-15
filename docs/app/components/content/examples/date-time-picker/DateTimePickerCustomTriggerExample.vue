<script setup lang="ts">
import { shallowRef } from 'vue'
import type { DateValue } from '@internationalized/date'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'

const value = shallowRef<DateValue | undefined>()
</script>

<template>
  <B24DateTimePicker v-model="value">
    <template #default="{ formatted }">
      <B24Button :icon="Calendar1Icon" color="air-secondary-accent">
        {{ formatted || 'Choose when' }}
      </B24Button>
    </template>
  </B24DateTimePicker>
</template>
