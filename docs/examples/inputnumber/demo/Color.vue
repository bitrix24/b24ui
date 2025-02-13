<script setup lang="ts">
import type { InputNumberProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  color?: InputNumberProps['color']
  isHighlight?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default',
  isHighlight: true
})
</script>

<template>
  <B24InputNumber
    :color="color"
    :highlight="isHighlight"
    placeholder="Enter a number"
  />
</template>
