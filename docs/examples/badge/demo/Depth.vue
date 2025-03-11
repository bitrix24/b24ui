<script setup lang="ts">
import type { BadgeProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  label?: string
  depth?: BadgeProps['depth']
  color?: BadgeProps['color']
  isFill?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  depth: 'dark' as const,
  color: 'default' as const,
  label: 'Badge',
  isFill: true
})
</script>

<template>
  <B24Badge
    :label="label"
    :color="color"
    :depth="depth"
    :use-fill="isFill"
  />
</template>
