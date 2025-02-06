<script setup lang="ts">
import type { AlertProps } from '@bitrix24/b24ui-nuxt'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

export interface ExampleProps {
  orientation: AlertProps['orientation']
  description?: string
}

withDefaults(defineProps<ExampleProps>(), {
  orientation: 'horizontal' as const,
  description: 'Let\'s signal the manager that the deal is not moving.'
})
</script>

<template>
  <B24Alert
    title="Heads up!"
    color="collab"
    :orientation="orientation"
    :icon="SignIcon"
    :description="description"
    :actions="[
      {
        label: 'Action 1',
        color: 'primary'
      },
      {
        label: 'Action 2',
        color: 'collab'
      }
    ]"
  />
</template>
