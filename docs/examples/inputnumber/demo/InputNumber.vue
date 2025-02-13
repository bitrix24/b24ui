<script setup lang="ts">
import { ref } from 'vue'

const value = ref(24)
</script>

<template>
  <B24InputNumber v-model="value" />
</template>
