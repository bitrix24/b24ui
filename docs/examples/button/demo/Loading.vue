<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

export interface ExampleProps {
  label?: string
  depth?: ButtonProps['depth']
  color?: ButtonProps['color']
  size?: ButtonProps['size']
  isLoading?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  label: 'Button',
  depth: 'dark' as const,
  color: 'default' as const,
  size: 'md' as const,
  isLoading: true
})
</script>

<template>
  <B24Button
    :loading="isLoading"
    :label="label"
    :color="color"
    :depth="depth"
    :size="size"
  />
  <B24Button
    use-clock
    :loading="isLoading"
    :label="label"
    :color="color"
    :depth="depth"
    :size="size"
    :icon="RocketIcon"
  />
  <B24Button
    use-wait
    :loading="isLoading"
    :label="label"
    :color="color"
    :depth="depth"
    :size="size"
    :avatar="{ src: '/b24ui/avatar/employee.png' }"
  />
</template>
