<script setup lang="ts">
import type { Calendar } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  size?: Calendar['size']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as const
})
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded w-[300px] p-2">
    <B24Calendar :size="size" />
  </div>
</template>
