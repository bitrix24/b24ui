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
    :b24ui="{ content: 'sm:max-w-1/2 lg:max-w-1/3' }"
  >
    <template #body>
      <Placeholder class="size-full" />
    </template>
    <template #footer>
      <B24Button size="sm" color="air-tertiary" label="Close" :normal-case="false" @click="emit('close')" />
    </template>
  </B24Slideover>
</template>
