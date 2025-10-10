<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <B24Slideover v-model:open="open" title="Slideover with footer" description="This is useful when you want a form in a Slideover." :b24ui="{ footer: 'justify-end' }">
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="h-full" />
    </template>

    <template #footer="{ close }">
      <B24Button label="Cancel" @click="close" />
      <B24Button label="Submit" color="air-primary-success" />
    </template>
  </B24Slideover>
</template>
