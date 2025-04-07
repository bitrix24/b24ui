<script setup lang="ts">
import type { InputProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  color?: InputProps['color']
  isHighlight?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default',
  isHighlight: true
})
</script>

<template>
  <B24Input
    :color="color"
    :highlight="isHighlight"
    placeholder="Search..."
  />
</template>
