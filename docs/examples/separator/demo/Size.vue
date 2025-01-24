<script setup lang="ts">
export interface ExampleProps {
  color?: any
  type?: any
  size?: any
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'primary',
  type: 'dotted',
  size: 'lg'
})
</script>

<template>
  <B24Separator
    :color="color"
    :type="type"
    :size="size"
  />
</template>
