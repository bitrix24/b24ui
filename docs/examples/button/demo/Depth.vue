<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  depth?: ButtonProps['depth']
  color?: ButtonProps['color']
}

withDefaults(defineProps<ExampleProps>(), {
  depth: 'dark' as const,
  color: 'default' as const
})
</script>

<template>
  <B24Button
    :color="color"
    :depth="depth"
  >
    Button
  </B24Button>
</template>
