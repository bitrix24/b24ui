<script setup lang="ts">
export interface ExampleProps {
  depth?: any
}

withDefaults(defineProps<ExampleProps>(), {
  depth: 'dark'
})
</script>

<template>
  <B24Kbd :depth="depth" value="K" />
</template>
