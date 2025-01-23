<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isDisabled = ref(false)

onMounted(() => {
  isDisabled.value = true
})
</script>

<template>
  <B24Range
    :disabled="isDisabled"
    :default-value="24"
  />
</template>
