<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const modelValue = shallowRef(new CalendarDate(2012, 4, 12))
</script>

<template>
  <B24Popover>
    <B24Button :icon="Calendar1Icon">
      {{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : 'Select a date' }}
    </B24Button>

    <template #content>
      <B24Calendar v-model="modelValue" class="p-2" />
    </template>
  </B24Popover>
</template>
