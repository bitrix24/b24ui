<script setup lang="ts">
import { ref } from 'vue'
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

const isOpen = ref(true)
</script>

<template>
  <B24Alert
    v-show="isOpen"
    v-model:open="isOpen"
    close
    :icon="SignIcon"
    :color="color"
    :title="title"
    :description="description"
    :size="size"
  />
  <B24FormField
    v-show="!isOpen"
    label="isOpen"
  >
    <B24Switch v-model="isOpen" />
  </B24FormField>
</template>
