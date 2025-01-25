<script setup lang="ts">
export interface ExampleProps {
  size?: any
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'lg'
})
</script>

<template>
  <B24FormField
    :size="size"
    label="Email"
    description="We'll never share your email with anyone else."
    hint="Optional"
    help="Please enter a valid email address."
  >
    <B24Input placeholder="Enter your email" />
  </B24FormField>
</template>
