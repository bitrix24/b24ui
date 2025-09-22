<script setup lang="ts">
import { ref } from 'vue'

const value = ref(2 * 24 * 60 * 60)
</script>

<template>
  <B24Countdown
    v-slot="{ days, hours, minutes, seconds }"
    :seconds="value"
  >
    Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
  </B24Countdown>
</template>
