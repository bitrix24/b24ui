<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date'

const date = shallowRef(today(getLocalTimeZone()))
</script>

<template>
  <div class="flex flex-col gap-4">
    <B24Calendar v-model="date" />

    <B24Button color="air-primary" class="justify-center" @click="date = today(getLocalTimeZone())">
      Today
    </B24Button>
  </div>
</template>
