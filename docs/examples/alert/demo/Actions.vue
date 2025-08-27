<script setup lang="ts">
import { alertSimpleItems } from './../dictionary'
import type { AlertProps } from '@bitrix24/b24ui-nuxt'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

export interface ExampleProps {
  size?: AlertProps['size']
  color?: AlertProps['color']
  title?: string
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as AlertProps['size'],
  color: 'air-primary' as AlertProps['color'],
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving.'
})
</script>

<template>
  <B24Alert
    :actions="alertSimpleItems"
    :icon="SignIcon"
    :color="color"
    :title="title"
    :description="description"
    :size="size"
  />
</template>
