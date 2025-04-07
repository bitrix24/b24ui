<script setup lang="ts">
import type { BadgeProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  label?: string
  color?: BadgeProps['color']
  isFill?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default' as const,
  label: 'Badge',
  isFill: true
})
</script>

<template>
  <B24Badge
    :label="label"
    :color="color"
    :use-fill="isFill"
  />
</template>
