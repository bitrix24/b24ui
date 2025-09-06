<script setup lang="ts">
export interface ExampleProps {
  label?: string
  isRequired?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  label: 'Email',
  isRequired: true
})
</script>

<template>
  <B24FormField
    :label="label"
    :required="isRequired"
  >
    <B24Input placeholder="Enter your email" />
  </B24FormField>
</template>
