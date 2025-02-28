<script setup lang="ts">
export interface ExampleProps {
  isTransition?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  isTransition: true
})
</script>

<template>
  <B24Slideover
    :transition="isTransition"
    :title="`Slideover ${isTransition ? 'with' : 'without'} transition`"
    description="The `transition` prop use"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-full w-full" />
    </template>
  </B24Slideover>
</template>
