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
      <Placeholder class="size-full" />
    </template>
    <template #footer>
      <B24Button color="air-primary-success" label="Close" @click="emit('close')" />
    </template>
  </B24Slideover>
</template>
