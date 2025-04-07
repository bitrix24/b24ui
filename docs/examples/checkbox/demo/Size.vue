<script setup lang="ts">
import type { CheckboxProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  size?: CheckboxProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as const
})
</script>

<template>
  <B24Checkbox
    :size="size"
    label="Enable rich link previews"
    default-value
  />
</template>
1
