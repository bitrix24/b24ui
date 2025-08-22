<script setup lang="ts">
import type { BadgeProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  label?: string
  color?: BadgeProps['color']
  size?: BadgeProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default' as const,
  size: 'md' as const,
  label: 'Badge'
})
</script>

<template>
  <B24Badge
    :size="size"
    :label="label"
    :color="color"
  />
</template>
