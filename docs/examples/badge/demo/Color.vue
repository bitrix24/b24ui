<script setup lang="ts">
import type { BadgeProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  label?: string
  color?: BadgeProps['color']
  inverted?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default' as const,
  label: 'Badge',
  inverted: true
})
</script>

<template>
  <B24Badge
    :label="label"
    :color="color"
    :inverted="inverted"
  />
</template>
