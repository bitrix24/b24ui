<script setup lang="ts">
import type { ButtonGroupProps } from '@bitrix24/b24ui-nuxt/types/index.ts'
import PromptIcon from '@bitrix24/b24icons-vue/main/PromptIcon'

export interface ExampleProps {
  size?: ButtonGroupProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as const
})
</script>

<template>
  <B24ButtonGroup
    :size="size"
  >
    <B24Button color="ai" label="Button" />
    <B24Button color="ai" :icon="PromptIcon" />
  </B24ButtonGroup>
  <B24ButtonGroup
    :size="size"
    no-split
  >
    <B24Button color="ai" label="Button" />
    <B24Button color="success" label="Button" />
    <B24Button color="warning" label="Button" />
  </B24ButtonGroup>
</template>
