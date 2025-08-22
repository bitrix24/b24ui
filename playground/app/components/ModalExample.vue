<script setup lang="ts">
defineProps<{
  count: number
  description?: string
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <B24Modal :title="`This modal was opened programmatically ${count} times`" :description="description">
    <template #footer>
      <B24Button label="Close" color="air-primary" @click="emit('close')" />
      <B24ModalDialogClose>
        <B24Button label="Cancel" color="air-tertiary" />
      </B24ModalDialogClose>
    </template>
  </B24Modal>
</template>
