<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const modelValue = shallowRef({
  start: new CalendarDate(2012, 4, 12),
  end: new CalendarDate(2012, 5, 12)
})
</script>

<template>
  <B24Popover>
    <B24Button :icon="Calendar1Icon">
      <template v-if="modelValue.start">
        <template v-if="modelValue.end">
          {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }} - {{ df.format(modelValue.end.toDate(getLocalTimeZone())) }}
        </template>

        <template v-else>
          {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }}
        </template>
      </template>
      <template v-else>
        Pick a date
      </template>
    </B24Button>

    <template #content>
      <B24Calendar v-model="modelValue" class="p-2" :number-of-months="2" range />
    </template>
  </B24Popover>
</template>
