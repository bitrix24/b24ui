<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

export interface ExampleProps {
  color?: ButtonProps['color']
  size?: ButtonProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'air-primary' as ButtonProps['color'],
  size: 'md' as ButtonProps['size']
})

async function onClick() {
  return new Promise<void>(res => setTimeout(res, 1000))
}
</script>

<template>
  <B24Button
    label="Button"
    loading-auto
    :color="color"
    :size="size"
    @click="onClick"
  />
  <B24Button
    label="Button"
    :icon="RocketIcon"
    use-clock
    loading-auto
    :color="color"
    :size="size"
    @click="onClick"
  />
  <B24Button
    label="Button"
    :avatar="{ src: '/b24ui/avatar/employee.png' }"
    use-wait
    loading-auto
    :color="color"
    :size="size"
    @click="onClick"
  />
</template>
