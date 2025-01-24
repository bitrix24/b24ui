<script setup lang="ts">
export interface ExampleProps {
  type?: any
}

withDefaults(defineProps<ExampleProps>(), {
  type: 'dotted'
})
</script>

<template>
  <B24Separator
    color="primary"
    :type="type"
  />
</template>
