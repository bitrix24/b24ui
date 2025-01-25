<script setup lang="ts">
export interface ExampleProps {
  value?: any
}

withDefaults(defineProps<ExampleProps>(), {
  value: 'meta'
})
</script>

<template>
  <B24Kbd :value="value" />
</template>
