<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Modal
    v-model:open="open"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #content>
      <Placeholder class="h-48" />
    </template>
  </B24Modal>
</template>
