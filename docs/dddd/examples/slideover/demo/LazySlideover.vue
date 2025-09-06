<script setup lang="ts">
defineProps<{
  count: number
}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <B24Slideover
    :close="{ onClick: () => emit('close', false) }"
    :title="`This Slideover was opened programmatically ${count} times`"
  >
    <template #body>
      <Placeholder class="size-full" />
    </template>

    <template #footer>
      <div class="flex flex-row gap-[10px]">
        <B24Button
          color="air-primary-success"
          label="Success"
          @click="emit('close', true)"
        />
        <B24Button
          label="Close"
          color="air-tertiary"
          @click="emit('close', false)"
        />
      </div>
    </template>
  </B24Slideover>
</template>
