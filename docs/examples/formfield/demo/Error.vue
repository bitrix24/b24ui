<script setup lang="ts">
export interface ExampleProps {
  error?: string
}

withDefaults(defineProps<ExampleProps>(), {
  error: ''
})
</script>

<template>
  <B24FormField
    :error="error"
    label="Email"
    description="We'll never share your email with anyone else."
    hint="Optional"
    help="Please enter a valid email address."
  >
    <B24Input placeholder="Enter your email" />
  </B24FormField>
</template>
