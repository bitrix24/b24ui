<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  isDisabled?: boolean
  color?: ButtonProps['color']
  size?: ButtonProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  isDisabled: true,
  color: 'air-primary' as ButtonProps['color'],
  size: 'md' as ButtonProps['size']
})
</script>

<template>
  <B24Button
    label="Button"
    :disabled="isDisabled"
    :color="color"
    :size="size"
  />
</template>
