<script setup lang="ts">
export interface ExampleProps {
  isOverlay?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isOverlay: true
})
</script>

<template>
  <B24Slideover
    :overlay="isOverlay"
    :title="`Slideover ${isOverlay ? 'with' : 'without'} overlay`"
    description="The `overlay` prop use"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-full w-full" />
    </template>
  </B24Slideover>
</template>
