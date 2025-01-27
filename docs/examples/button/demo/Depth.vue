<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  depth?: ButtonProps['depth']
  color?: ButtonProps['color']
}

withDefaults(defineProps<ExampleProps>(), {
  depth: 'dark',
  color: 'default'
})
</script>

<template>
  <B24Button
    :color="color"
    :depth="depth"
  >
    Button
  </B24Button>
</template>
