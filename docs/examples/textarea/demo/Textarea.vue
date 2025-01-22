<script setup lang="ts">
import { ref } from 'vue'

const value = ref('The calculation of indicators has been completed')
</script>

<template>
  <B24Textarea v-model="value" />
</template>
