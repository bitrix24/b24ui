<script setup lang="ts">
import type { Calendar } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  color?: Calendar['color']
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default'
})
</script>

<template>
  <div class="relative bg-white dark:bg-base-900 rounded w-[300px] p-2">
    <B24Calendar :color="color" />
  </div>
</template>
