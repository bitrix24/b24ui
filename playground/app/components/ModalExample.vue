<script setup lang="ts">
const modal = useModal()

defineProps<{
  count: number
}>()
</script>

<template>
  <B24Modal :title="`This modal was opened programmatically ${count} times`">
    <template #footer>
      <B24Button color="neutral" label="Close" @click="modal.close()" />
    </template>
  </B24Modal>
</template>
