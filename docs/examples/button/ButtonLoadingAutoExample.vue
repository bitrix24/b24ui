<script setup lang="ts">
async function onClick() {
  return new Promise<void>(res => setTimeout(res, 1000))
}
</script>

<template>
  <B24Button loading-auto @click="onClick">
    Button
  </B24Button>
</template>
