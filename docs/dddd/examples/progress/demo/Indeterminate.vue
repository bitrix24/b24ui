<script setup lang="ts">
import { ref } from 'vue'

const value = ref(null)
</script>

<template>
  <B24Progress v-model="value" />
</template>
