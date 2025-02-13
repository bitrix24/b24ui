<script setup lang="ts">
export interface ExampleProps {
  placeholder?: string
}

withDefaults(defineProps<ExampleProps>(), {
  placeholder: 'Enter a number...'
})
</script>

<template>
  <B24InputNumber
    :placeholder="placeholder"
  />
</template>
