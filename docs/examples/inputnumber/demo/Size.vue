<script setup lang="ts">
import type { InputNumberProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  size?: InputNumberProps['size']
  orientation?: InputNumberProps['orientation']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as const,
  orientation: 'horizontal' as const
})
</script>

<template>
  <B24InputNumber
    :size="size"
    :orientation="orientation"
    placeholder="Enter a number"
  />
</template>
