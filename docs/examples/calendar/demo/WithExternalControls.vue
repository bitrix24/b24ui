<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'

const date = shallowRef(new CalendarDate(2012, 4, 12))
</script>

<template>
  <div class="flex flex-col gap-4">
    <B24Calendar v-model="date" :month-controls="false" :year-controls="false" />

    <div class="flex justify-between gap-4">
      <B24Button color="link" depth="dark" size="sm" @click="date = date.subtract({ months: 1 })">
        Prev
      </B24Button>

      <B24Button color="link" depth="dark" size="sm" @click="date = date.add({ months: 1 })">
        Next
      </B24Button>
    </div>
  </div>
</template>
