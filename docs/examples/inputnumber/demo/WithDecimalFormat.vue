<script setup lang="ts">
import { ref } from 'vue'

const value = ref(5)
</script>

<template>
  <B24InputNumber
    v-model.number="value"
    :format-options="{
      signDisplay: 'exceptZero',
      minimumFractionDigits: 2
    }"
  />
</template>
