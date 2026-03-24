<script setup lang="ts">
defineProps<{
  count: number
}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <B24Slideover
    :close="{ onClick: () => emit('close', false) }"
    :description="`This slideover was opened programmatically ${count} times`"
  >
    <template #body>
      <Placeholder class="h-full" />
    </template>

    <template #footer>
      <B24Button size="lg" color="air-primary" label="Save" @click="emit('close', true)" />
      <B24Button size="sm" color="air-tertiary" label="Cancel" :normal-case="false" @click="emit('close', false)" />
    </template>
  </B24Slideover>
</template>
