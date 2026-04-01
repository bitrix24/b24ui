<script setup lang="ts">
const open = ref(true)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Collapsible v-model:open="open" class="flex flex-col gap-2 w-48">
    <B24Button
      label="Open"
      block
      use-dropdown
    />

    <template #content>
      <Placeholder class="h-48" />
    </template>
  </B24Collapsible>
</template>
