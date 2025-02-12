<script setup lang="ts">
export interface ExampleProps {
  isTransition?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isTransition: true
})
</script>

<template>
  <B24Modal
    :transition="isTransition"
    :title="`Modal ${isTransition ? 'with' : 'without'} transition`"
    description="The `transition` prop use"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-48" />
    </template>
  </B24Modal>
</template>
