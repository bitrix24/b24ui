<script setup lang="ts">
defineProps<{
  count: number
}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <B24Modal :close="{ onClick: () => emit('close', false) }" :title="`This modal was opened programmatically ${count} times`">
    <template #footer>
      <div class="flex gap-2">
        <B24Button label="Dismiss" @click="emit('close', false)" />
        <B24Button color="air-primary-success" label="Success" @click="emit('close', true)" />
      </div>
    </template>
  </B24Modal>
</template>
