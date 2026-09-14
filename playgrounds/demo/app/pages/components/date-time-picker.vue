<script lang="ts" setup>
import { shallowRef } from 'vue'
import type { DateValue } from '@internationalized/date'
import { CalendarDateTime } from '@internationalized/date'
import theme from '#build/b24ui/date-time-picker'

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)

const attrs = reactive({
  color: [theme.defaultVariants.color],
  size: [theme.defaultVariants.size]
})

const dateOnly = ref(false)
const hidePresets = ref(false)
const value = shallowRef<DateValue | undefined>(new CalendarDateTime(2024, 10, 6, 14, 30))
</script>

<template>
  <PlaygroundPage>
    <template #controls>
      <B24Select
        v-model="attrs.color"
        class="w-52"
        :items="colors"
        placeholder="Color"
        multiple
        size="xs"
      />
      <B24Select
        v-model="attrs.size"
        class="w-32"
        :items="sizes"
        placeholder="Size"
        multiple
        size="xs"
      />
      <B24Switch v-model="dateOnly" label="Date only" size="xs" />
      <B24Switch v-model="hidePresets" label="Hide presets" size="xs" />
    </template>

    <Matrix v-slot="props" :attrs="attrs">
      <B24DateTimePicker
        v-model="value"
        v-bind="props"
        :date-only="dateOnly"
        :hide-presets="hidePresets"
        placeholder="Pick a date and time"
        class="w-64"
      />
    </Matrix>
  </PlaygroundPage>
</template>
