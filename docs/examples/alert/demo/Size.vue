<script setup lang="ts">
import type { AlertProps } from '@bitrix24/b24ui-nuxt'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

export interface ExampleProps {
  size: AlertProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as const
})
</script>

<template>
  <B24Alert
    :size="size"
    :icon="SignIcon"
    color="ai"
    title="Heads up!"
    description="Let's signal the manager that the deal is not moving."
  />
</template>
