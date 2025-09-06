<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

export interface ExampleProps {
  label?: string
  color?: ButtonProps['color']
  size?: ButtonProps['size']
  isLoading?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  label: 'Button',
  color: 'air-primary' as ButtonProps['color'],
  size: 'md' as ButtonProps['size'],
  isLoading: true
})
</script>

<template>
  <B24Button
    :loading="isLoading"
    :label="label"
    :color="color"
    :size="size"
  />
  <B24Button
    use-clock
    :loading="isLoading"
    :label="label"
    :color="color"
    :size="size"
    :icon="RocketIcon"
  />
  <B24Button
    use-wait
    :loading="isLoading"
    :label="label"
    :color="color"
    :size="size"
    :avatar="{ src: '/b24ui/avatar/employee.png' }"
  />
</template>
