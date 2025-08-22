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
      <div class="flex flex-row gap-[10px]">
        <B24Button
          color="air-primary-success"
          label="Success"
          @click="emit('close', true)"
        />
        <B24Button
          color="air-tertiary"
          label="Close"
          @click="emit('close', false)"
        />
      </div>
    </template>
  </B24Modal>
</template>
