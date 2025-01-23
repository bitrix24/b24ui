<script setup lang="ts">
import { ref } from 'vue'

const value = ref(75)
</script>

<template>
  <B24Range
    v-model="value"
  />
  <B24Range
    :default-value="10"
  />
</template>
