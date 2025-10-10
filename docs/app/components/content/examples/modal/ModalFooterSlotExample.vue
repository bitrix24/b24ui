<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <B24Modal v-model:open="open" title="Modal with footer" description="This is useful when you want a form in a Modal." :ui="{ footer: 'justify-end' }">
    <B24Button label="Open" />

    <template #body>
      <Placeholder class="h-48" />
    </template>

    <template #footer="{ close }">
      <B24Button label="Submit" color="air-primary-success" />
      <B24Button label="Cancel" @click="close" />
    </template>
  </B24Modal>
</template>
