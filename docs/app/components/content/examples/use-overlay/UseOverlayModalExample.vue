<script setup lang="ts">
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <B24Modal
    title="Welcome 👋"
    description="This modal was opened programmatically with useOverlay."
    :close="{ onClick: () => emit('close') }"
    :b24ui="{ footer: 'justify-end' }"
  >
    <template #footer>
      <B24Button label="Close" @click="emit('close')" />
    </template>
  </B24Modal>
</template>
