<script setup lang="ts">
import { Time } from '@internationalized/date'

const time = shallowRef(new Time(12, 30, 0))
</script>

<template>
  <B24FormField label="Time" help="Specify the time" required>
    <B24InputTime v-model="time" />
  </B24FormField>
</template>
