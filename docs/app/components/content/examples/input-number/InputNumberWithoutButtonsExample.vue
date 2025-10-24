<script setup lang="ts">
const value = ref(5)
</script>

<template>
  <B24InputNumber
    v-model="value"
    :increment="false"
    :decrement="false"
  />
</template>
