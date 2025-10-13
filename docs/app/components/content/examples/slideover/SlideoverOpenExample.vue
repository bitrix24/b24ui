<script setup lang="ts">
const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Slideover v-model:open="open" :b24ui="{ content: 'light bg-(--ui-color-base-7) sm:top-[300px] sm:max-h-[calc(100%-300px)]' }">
    <B24Button label="Open" />

    <template #content>
      <Placeholder class="edge-light h-full m-4" />
    </template>
  </B24Slideover>
</template>
