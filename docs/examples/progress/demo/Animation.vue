<script setup lang="ts">
import type { ProgressProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  animation?: ProgressProps['animation']
}

withDefaults(defineProps<ExampleProps>(), {
  animation: 'swing' as const
})
</script>

<template>
  <B24Progress
    :animation="animation"
  />
</template>
