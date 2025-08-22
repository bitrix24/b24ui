<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

export interface ExampleProps {
  isNormalCase?: boolean
  color?: ButtonProps['color']
  size?: ButtonProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  isNormalCase: true,
  color: 'air-primary' as ButtonProps['color'],
  size: 'md' as ButtonProps['size']
})
</script>

<template>
  <B24Button
    label="Button"
    :normal-case="isNormalCase"
    :color="color"
    :size="size"
  />
  <B24Button
    label="Button"
    class="font-thin"
    :normal-case="isNormalCase"
    :color="color"
    :size="size"
    :icon="RocketIcon"
  />
</template>
