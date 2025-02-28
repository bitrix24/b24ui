<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Slideover
    v-model:open="open"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #content>
      <Placeholder class="h-full w-full" />
    </template>
  </B24Slideover>
</template>
