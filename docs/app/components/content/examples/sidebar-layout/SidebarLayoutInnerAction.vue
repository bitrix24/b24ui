<script setup lang="ts">
const handleActionByContext = async () => {
  await new Promise(resolve => setTimeout(resolve, 2_000))
}
</script>

<template>
  <B24Button label="Action" color="air-primary" loading-auto @click="handleActionByContext" />
</template>
