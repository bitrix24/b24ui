<script setup lang="ts">
const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Drawer v-model:open="open">
    <B24Button label="Open" use-dropdown :b24ui="{ trailingIcon: 'rotate-180' }" />

    <template #content>
      <Placeholder class="h-48 m-4" />
    </template>
  </B24Drawer>
</template>
