<script setup lang="ts">
const slideover = useSlideover()

defineProps<{
  count: number
}>()
</script>

<template>
  <B24Slideover :description="`This slideover was opened programmatically ${count} times`">
    <template #body>
      <Placeholder class="h-full" />
    </template>

    <template #footer>
      <B24Button color="neutral" label="Close" @click="slideover.close()" />
    </template>
  </B24Slideover>
</template>
