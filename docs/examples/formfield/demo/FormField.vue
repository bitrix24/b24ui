<script setup lang="ts">
export interface ExampleProps {
  label?: string
}

withDefaults(defineProps<ExampleProps>(), {
  label: 'Email'
})
</script>

<template>
  <B24FormField :label="label">
    <B24Input placeholder="Enter your email" />
  </B24FormField>
</template>
