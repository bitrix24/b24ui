<script setup lang="ts">
import { CalendarDate, CalendarDateTime } from '@internationalized/date'
import theme from '#build/b24ui/date-time-picker'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)

const airColors = computed(() => {
  return colors.filter((color) => {
    return color.includes('air')
  })
})

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const singleAttrs = reactive({
  disabled: false,
  dateOnly: false,
  hidePresets: false
})

const value = shallowRef<CalendarDateTime | undefined>(new CalendarDateTime(2026, 4, 29, 17, 0))
const dateOnlyValue = shallowRef<CalendarDate | undefined>(new CalendarDate(2026, 4, 28))
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select
        v-model="attrs.color"
        size="xs"
        class="w-44"
        :items="airColors"
        placeholder="Color"
        multiple
      />
      <B24Select
        v-model="attrs.size"
        size="xs"
        class="w-32"
        :items="sizes"
        placeholder="Size"
        multiple
      />
      <B24Switch v-model="singleAttrs.disabled" size="xs" label="Disabled" />
      <B24Switch v-model="singleAttrs.dateOnly" size="xs" label="Date only" />
      <B24Switch v-model="singleAttrs.hidePresets" size="xs" label="Hide presets" />
    </template>

    <Matrix v-slot="props" :attrs="attrs" :b24ui="{ root: 'max-w-80' }">
      <B24DateTimePicker
        v-model="value"
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24DateTimePicker
        v-model="dateOnlyValue"
        v-bind="{ ...singleAttrs, ...props, dateOnly: true }"
      />
      <B24DateTimePicker
        :default-value="new CalendarDateTime(2026, 4, 29, 17, 0)"
        locale="ru"
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24DateTimePicker
        v-model="value"
        :minute-step="15"
        v-bind="{ ...singleAttrs, ...props }"
      />
      <B24DateTimePicker
        v-model="value"
        v-bind="{ ...singleAttrs, ...props, hidePresets: true }"
      />
      <B24DateTimePicker
        placeholder="Pick a date and time"
        v-bind="{ ...singleAttrs, ...props }"
      />
    </Matrix>
  </PlaygroundPage>
</template>
