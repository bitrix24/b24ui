<script setup lang="ts">
import { ref } from 'vue'

const now = new Date()
const newYear = new Date(now.getFullYear() + 1, 0, 1)

const secondsNY = ref((newYear.getTime() - now.getTime()) / 1000)
</script>

<template>
  <B24Countdown
    v-slot="{ days, hours, minutes, seconds, milliseconds }"
    :seconds="secondsNY"
    :interval="100"
  >
    <span>New Year Countdown：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }}.<small>{{ Math.floor(milliseconds / 100) }}</small> seconds.</span>
  </B24Countdown>
</template>
