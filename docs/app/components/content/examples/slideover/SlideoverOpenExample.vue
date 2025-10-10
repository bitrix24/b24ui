<script setup lang="ts">
const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Slideover v-model:open="open">
    <B24Button label="Open" />

    <template #content>
      <Placeholder class="h-full m-4" />
    </template>
  </B24Slideover>
</template>
