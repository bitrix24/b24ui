<script setup lang="ts">
export interface ExampleProps {
  yearControls?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  yearControls: true
})
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded w-[300px] p-2">
    <B24Calendar :year-controls="yearControls" />
  </div>
</template>
