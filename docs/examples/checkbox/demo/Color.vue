<script setup lang="ts">
import type { CheckboxProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  color?: CheckboxProps['color']
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default' as const
})
</script>

<template>
  <B24Checkbox
    :color="color"
    label="Enable rich link previews"
    default-value
  />
</template>
