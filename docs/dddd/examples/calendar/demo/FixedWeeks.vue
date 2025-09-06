<script setup lang="ts">
export interface ExampleProps {
  fixedWeeks?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  fixedWeeks: true
})
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded w-[300px] p-2">
    <B24Calendar :fixed-weeks="fixedWeeks" />
  </div>
</template>
