<script setup lang="ts">
import type { BadgeProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  label?: string
  depth?: BadgeProps['depth']
  color?: BadgeProps['color']
  size?: BadgeProps['size']
  isFill?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  depth: 'dark' as const,
  color: 'default' as const,
  size: 'md' as const,
  label: 'Badge',
  isFill: true
})
</script>

<template>
  <B24Badge
    :size="size"
    :label="label"
    :color="color"
    :depth="depth"
    :use-fill="isFill"
  />
</template>
