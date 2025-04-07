<script setup lang="ts">
import type { RangeProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  color?: RangeProps['color']
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default'
})
</script>

<template>
  <B24Range
    :color="color"
    :default-value="50"
  />
</template>
