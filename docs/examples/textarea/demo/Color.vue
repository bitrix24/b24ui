<script setup lang="ts">
import type { TextareaProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  color?: TextareaProps['color']
  isHighlight?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default',
  isHighlight: true
})
</script>

<template>
  <B24Textarea
    :color="color"
    :highlight="isHighlight"
    placeholder="Enter a company description"
  />
</template>
