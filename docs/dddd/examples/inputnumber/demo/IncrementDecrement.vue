<script setup lang="ts">
import { ref } from 'vue'

const value = ref(5)
</script>

<template>
  <B24InputNumber
    v-model="value"
    color="ai"
    highlight
    :increment="{
      color: 'ai',
      depth: 'light'
    }"
    :decrement="{
      color: 'ai',
      depth: 'light'
    }"
  />
</template>
