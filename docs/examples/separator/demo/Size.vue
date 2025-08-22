<script setup lang="ts">
export interface ExampleProps {
  type?: any
  size?: any
}

withDefaults(defineProps<ExampleProps>(), {
  type: 'dotted',
  size: 'thick'
})
</script>

<template>
  <B24Separator
    :type="type"
    :size="size"
  />
</template>
