<script setup lang="ts">
const value = ref(0.05)
</script>

<template>
  <B24InputNumber
    v-model="value"
    :step="0.01"
    :format-options="{
      style: 'percent'
    }"
  />
</template>
