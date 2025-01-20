<script setup lang="ts">
const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Tooltip v-model:open="open" text="Open on GitHub">
    <B24Button label="Open" />
  </B24Tooltip>
</template>
