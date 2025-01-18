<script setup lang="ts">
async function onClick() {
  return new Promise<void>(res => setTimeout(res, 1000))
}
</script>

<template>
  <span class="text-red-500">Button</span>
  <B24Button type="button" loading-auto color="success" @click="onClick">
    Button
  </B24Button>
</template>
