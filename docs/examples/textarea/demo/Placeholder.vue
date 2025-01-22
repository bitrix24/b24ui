<script setup lang="ts">
export interface ExampleProps {
  placeholder?: string
}

withDefaults(defineProps<ExampleProps>(), {
  placeholder: 'Type something...'
})
</script>

<template>
  <B24Textarea :placeholder="placeholder" />
</template>
