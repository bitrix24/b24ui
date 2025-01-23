<script setup lang="ts">
import { ref } from 'vue'

const value = ref([
  25,
  75
])
</script>

<template>
  <B24Range
    v-model="value"
  />
</template>
