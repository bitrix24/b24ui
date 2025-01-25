<script setup lang="ts">
export interface ExampleProps {
  size?: any
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'lg'
})
</script>

<template>
  <B24Kbd :size="size" value="K" />
</template>
