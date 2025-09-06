<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

export interface ExampleProps {
  isBlock?: boolean
  color?: ButtonProps['color']
  size?: ButtonProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  isBlock: true,
  color: 'air-primary' as ButtonProps['color'],
  size: 'md' as ButtonProps['size']
})
</script>

<template>
  <B24Button
    label="Button"
    :block="isBlock"
    :color="color"
    :size="size"
  />
  <B24Button
    :block="isBlock"
    :color="color"
    :size="size"
    :icon="RocketIcon"
  />
</template>
