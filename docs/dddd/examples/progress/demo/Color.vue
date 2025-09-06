<script setup lang="ts">
import type { ProgressProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  color?: ProgressProps['color']
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default' as const
})
</script>

<template>
  <B24Progress
    :color="color"
  />
</template>
