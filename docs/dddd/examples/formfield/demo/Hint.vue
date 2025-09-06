<script setup lang="ts">
export interface ExampleProps {
  hint?: string
}

withDefaults(defineProps<ExampleProps>(), {
  hint: 'Optional'
})
</script>

<template>
  <B24FormField
    :hint="hint"
    label="Email"
    description="We'll never share your email with anyone else."
  >
    <B24Input placeholder="Enter your email" />
  </B24FormField>
</template>
