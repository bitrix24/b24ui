<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt/'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

export interface ExampleProps {
  label?: string
  color?: ButtonProps['color']
  size?: ButtonProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  label: 'Button',
  color: 'air-primary' as ButtonProps['color'],
  size: 'md' as ButtonProps['color']
})
</script>

<template>
  <B24Button
    :label="label"
    :color="color"
    :size="size"
    :icon="RocketIcon"
  />
  <B24Button
    :color="color"
    :size="size"
    :icon="RocketIcon"
  />
</template>
