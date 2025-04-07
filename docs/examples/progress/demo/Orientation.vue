<script setup lang="ts">
import type { ProgressProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  orientation?: ProgressProps['orientation']
}

withDefaults(defineProps<ExampleProps>(), {
  orientation: 'horizontal' as const
})
</script>

<template>
  <B24Progress
    :orientation="orientation"
  />
</template>
