<script setup lang="ts">
const value = ref(1500)
</script>

<template>
  <B24InputNumber
    v-model="value"
    :step="0.01"
    :format-options="{
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
      currencySign: 'accounting'
    }"
  />
</template>
