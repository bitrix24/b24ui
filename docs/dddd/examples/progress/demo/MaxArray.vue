<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)
</script>

<template>
  <B24Progress
    v-model="value"
    :max="['Prospecting...', 'Qualifying...', 'Presenting...', 'Negotiating...', 'Closed!']"
  />
</template>
