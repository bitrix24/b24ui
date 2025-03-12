<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Popover
    v-model:open="open"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template>
  </B24Popover>
</template>
