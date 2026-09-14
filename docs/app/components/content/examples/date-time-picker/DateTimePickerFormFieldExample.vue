<script setup lang="ts">
import { shallowRef } from 'vue'
import type { DateValue } from '@internationalized/date'

const value = shallowRef<DateValue | undefined>()
</script>

<template>
  <B24FormField label="Due date" hint="Shown to everyone on the deal" class="w-full">
    <B24DateTimePicker v-model="value" placeholder="Not set" />
  </B24FormField>
</template>
