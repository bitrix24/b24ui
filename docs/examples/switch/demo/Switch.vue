<script setup lang="ts">
import { ref } from 'vue'

const value = ref(true)
</script>

<template>
  <B24Switch v-model="value" />
</template>
