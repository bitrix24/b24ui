<script setup lang="ts">
export interface ExampleProps {
  classValue?: any
  depth?: any
}

withDefaults(defineProps<ExampleProps>(), {
  classValue: 'text-ai-500 dark:text-orange-500 font-bold rounded-full',
  depth: 'dark'
})
</script>

<template>
  <B24Kbd :class="classValue" :depth="depth" value="K" />
</template>
