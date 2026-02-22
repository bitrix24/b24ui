<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <B24Drawer
    v-model:open="open"
    title="Drawer with footer"
    description="This is useful when you want a form in a Drawer."
    :b24ui="{ container: 'max-w-xl mx-auto' }"
  >
    <B24Button label="Open" use-dropdown :b24ui="{ trailingIcon: 'rotate-180' }" />

    <template #body>
      <Placeholder class="h-48" />
    </template>

    <template #footer>
      <B24Button label="Submit" color="air-primary-success" />
      <B24Button label="Cancel" @click="open = false" />
    </template>
  </B24Drawer>
</template>
