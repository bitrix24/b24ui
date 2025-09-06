<script setup lang="ts">
export interface ExampleProps {
  monthControls?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  monthControls: true
})
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded w-[300px] p-2">
    <B24Calendar :month-controls="monthControls" />
  </div>
</template>
