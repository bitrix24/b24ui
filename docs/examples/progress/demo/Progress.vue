<script setup lang="ts">
import { ref } from 'vue'

const value = ref(24)
</script>

<template>
  <B24Progress v-model="value" />
</template>
