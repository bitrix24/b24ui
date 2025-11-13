<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import CalendarIcon from '@bitrix24/b24icons-vue/outline/CalendarIcon'

const inputDateRef = useTemplateRef('inputDateRef')

const modelValue = shallowRef(new CalendarDate(2022, 1, 10))
</script>

<template>
  <B24InputDate ref="inputDateRef" v-model="modelValue">
    <template #trailing>
      <B24Popover :reference="inputDateRef?.inputsRef[3]?.$el">
        <B24Button
          color="air-tertiary-no-accent"
          size="sm"
          :icon="CalendarIcon"
          aria-label="Select a date"
          class="px-0"
        />

        <template #content>
          <B24Calendar v-model="modelValue" class="p-2" />
        </template>
      </B24Popover>
    </template>
  </B24InputDate>
</template>
