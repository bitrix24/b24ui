<script setup lang="ts">
import Placeholder from './Placeholder.vue'

defineProps<{
  count: number
  description?: string
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <B24Slideover
    :title="`This slideover was opened programmatically ${count} times`"
    :description="description"
  >
    <template #body>
      <Placeholder class="h-full" />
    </template>
    <template #footer>
      <B24Button color="success" rounded label="Close" size="sm" @click="emit('close')" />
    </template>
  </B24Slideover>
</template>
