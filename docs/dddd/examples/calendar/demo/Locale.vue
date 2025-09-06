<script setup lang="ts">
export interface ExampleProps {
  locale?: string
}

withDefaults(defineProps<ExampleProps>(), {
  locale: 'en' as const
})
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded w-[300px] p-2">
    <B24Calendar
      :locale="locale"
    />
  </div>
</template>
