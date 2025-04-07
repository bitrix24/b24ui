<script setup lang="ts">
import type { AlertProps } from '@bitrix24/b24ui-nuxt/types/index.ts'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'

export interface ExampleProps {
  color?: AlertProps['color']
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default' as const
})
</script>

<template>
  <B24Alert
    :color="color"
    :icon="SignIcon"
    title="Heads up!"
    description="Let's signal the manager that the deal is not moving."
  />
</template>
