<script setup lang="ts">
import type { InputProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  size?: InputProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as const
})
</script>

<template>
  <B24Input
    :size="size"
    placeholder="Search..."
  />
</template>
