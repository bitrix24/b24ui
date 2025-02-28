<script setup lang="ts">
defineProps<{
  count: number
}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <B24Modal
    :close="{ onClick: () => emit('close', false) }"
    :title="`This modal was opened programmatically ${count} times`"
  >
    <template #footer>
      <div class="flex gap-2">
        <B24Button
          color="success"
          label="Success"
          rounded
          size="sm"
          @click="emit('close', true)"
        />
        <B24Button
          rounded
          label="Close"
          color="link"
          depth="dark"
          size="sm"
          @click="emit('close', false)"
        />
      </div>
    </template>
  </B24Modal>
</template>
