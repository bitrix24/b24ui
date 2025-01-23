<script setup lang="ts">
import type { SwitchProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  color: SwitchProps['color']
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default'
})
</script>

<template>
  <B24Switch
    :color="color"
    label="Enable rich link previews"
    default-value
    size="lg"
  />
</template>
