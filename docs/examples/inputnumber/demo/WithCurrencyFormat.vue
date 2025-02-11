<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1500.05)
</script>

<template>
  <B24InputNumber
    v-model.number="value"
    :step="0.01"
    :format-options="{
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'code',
      currencySign: 'accounting'
    }"
  />
</template>
