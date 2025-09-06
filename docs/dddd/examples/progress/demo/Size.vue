<script setup lang="ts">
import type { ProgressProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  size?: ProgressProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as const
})
</script>

<template>
  <B24Progress
    :size="size"
  />
</template>
