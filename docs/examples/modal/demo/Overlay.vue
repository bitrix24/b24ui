<script setup lang="ts">
export interface ExampleProps {
  isOverlay?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isOverlay: true
})
</script>

<template>
  <B24Modal
    :overlay="isOverlay"
    :title="`Modal ${isOverlay ? 'with' : 'without'} overlay`"
    description="The `overlay` prop use"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-48" />
    </template>
  </B24Modal>
</template>
