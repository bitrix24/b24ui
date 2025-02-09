<script setup lang="ts">
const modal = useModal()

defineProps<{
  count: number
}>()
</script>

<template>
  <B24Modal :title="`This modal was opened programmatically ${count} times`">
    <template #footer>
      <B24Button color="success" rounded label="Close" size="sm" @click="modal.close()" />
      <B24ModalDialogClose>
        <B24Button rounded label="Cancel" color="link" depth="dark" size="sm" />
      </B24ModalDialogClose>
    </template>
  </B24Modal>
</template>
