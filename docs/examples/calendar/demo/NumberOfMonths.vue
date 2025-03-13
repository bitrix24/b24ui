<script setup lang="ts">
export interface ExampleProps {
  numberOfMonths?: number
}

withDefaults(defineProps<ExampleProps>(), {
  numberOfMonths: 2
})
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded min-w-[300px] p-2">
    <B24Calendar :number-of-months="numberOfMonths" />
  </div>
</template>
