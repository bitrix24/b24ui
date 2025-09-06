<script setup lang="ts">
import type { AlertProps } from '@bitrix24/b24ui-nuxt'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

export interface ExampleProps {
  color?: AlertProps['color']
  title?: string
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'air-primary' as AlertProps['color'],
  title: 'Heads up!',
  description: 'Let\'s signal the manager that the deal is not moving.'
})
</script>

<template>
  <B24Alert
    :color="color"
    :icon="SignIcon"
    :title="title"
    :description="description"
  />
</template>
