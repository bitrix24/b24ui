<script setup lang="ts">
import type { ButtonProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  color: ButtonProps['color']
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default'
})
</script>

<template>
  <B24Button
    :color="color"
  >
    Button
  </B24Button>
</template>
