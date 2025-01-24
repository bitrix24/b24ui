<script setup lang="ts">
export interface ExampleProps {
  color?: any
  type?: any
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'primary',
  type: 'dotted'
})
</script>

<template>
  <B24Separator
    :color="color"
    :type="type"
  />
</template>
