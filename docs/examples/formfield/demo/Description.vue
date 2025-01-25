<script setup lang="ts">
export interface ExampleProps {
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  description: 'We\'ll never share your email with anyone else.'
})
</script>

<template>
  <B24FormField
    :description="description"
    label="Email"
  >
    <B24Input placeholder="Enter your email" />
  </B24FormField>
</template>
