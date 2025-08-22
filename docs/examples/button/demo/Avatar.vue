<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  label?: string
  color?: ButtonProps['color']
  size?: ButtonProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  label: 'Button',
  color: 'air-primary' as ButtonProps['color'],
  size: 'md' as ButtonProps['size']
})
</script>

<template>
  <B24Button
    :label="label"
    :color="color"
    :size="size"
    :avatar="{ src: '/b24ui/avatar/employee.png' }"
  />
  <B24Button
    :color="color"
    :size="size"
    :avatar="{ src: '/b24ui/avatar/employee.png' }"
  />
</template>
