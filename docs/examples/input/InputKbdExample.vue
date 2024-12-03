<script setup lang="ts">
const input = useTemplateRef('input')

defineShortcuts({
  '/': () => {
    input.value?.inputRef?.focus()
  }
})
</script>

<template>
  <B24Input
    ref="input"
    icon="i-lucide-search"
    placeholder="Search..."
  >
    <template #trailing>
      <B24Kbd value="/" />
    </template>
  </B24Input>
</template>
