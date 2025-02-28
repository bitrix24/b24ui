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
      <B24Button color="success" rounded label="Close" size="sm" @click="emit('close')" />
      <B24ModalDialogClose>
        <B24Button rounded label="Cancel" color="link" depth="dark" size="sm" />
      </B24ModalDialogClose>
    </template>
  </B24Modal>
</template>
