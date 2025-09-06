<script setup lang="ts">
export interface ExampleProps {
  classValue?: any
}

withDefaults(defineProps<ExampleProps>(), {
  classValue: 'text-ai-500 dark:text-orange-500 font-bold rounded-full'
})
</script>

<template>
  <B24Kbd :class="classValue" value="K" />
</template>
