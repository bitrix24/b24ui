<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  size?: ButtonProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as const
})
</script>

<template>
  <B24Button
    :size="size"
  >
    Button
  </B24Button>
</template>
