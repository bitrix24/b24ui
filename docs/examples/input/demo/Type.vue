<script setup lang="ts">
export interface ExampleProps {
  type?: any
}

withDefaults(defineProps<ExampleProps>(), {
  type: 'file'
})
</script>

<template>
  <B24Input
    :type="type"
  />
</template>
