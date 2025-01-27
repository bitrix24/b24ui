<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  label?: string
  depth?: ButtonProps['depth']
  color?: ButtonProps['color']
  size?: ButtonProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  label: 'Button',
  depth: 'dark' as const,
  color: 'default' as const,
  size: 'md' as const
})
</script>

<template>
  <B24Button
    :label="label"
    :color="color"
    :depth="depth"
    :size="size"
    :avatar="{ src: '/b24ui/avatar/employee.png' }"
  />
</template>
