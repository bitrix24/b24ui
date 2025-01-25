<script setup lang="ts">
export interface ExampleProps {
  help?: string
}

withDefaults(defineProps<ExampleProps>(), {
  help: 'Please enter a valid email address.'
})
</script>

<template>
  <B24FormField
    :help="help"
    label="Email"
    description="We'll never share your email with anyone else."
    hint="Optional"
  >
    <B24Input placeholder="Enter your email" />
  </B24FormField>
</template>
