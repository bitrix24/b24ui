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
    <B24Button label="Open" />

    <template #content>
      <Placeholder class="size-full bg-(--ui-color-base-7)" />
    </template>
  </B24Slideover>
</template>
