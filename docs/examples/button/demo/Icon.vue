<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt/types/index.ts'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

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
    :icon="RocketIcon"
  />
</template>
