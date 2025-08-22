<script setup lang="ts">
import type { ButtonGroupProps } from '@bitrix24/b24ui-nuxt'
import PromptIcon from '@bitrix24/b24icons-vue/main/PromptIcon'

export interface ExampleProps {
  orientation?: ButtonGroupProps['orientation']
  size?: ButtonGroupProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  orientation: 'vertical' as ButtonGroupProps['orientation'],
  size: 'md' as ButtonGroupProps['size']
})
</script>

<template>
  <B24ButtonGroup
    :orientation="orientation"
    :size="size"
  >
    <B24Button color="ai" label="Button" />
    <B24Button color="ai" :icon="PromptIcon" />
  </B24ButtonGroup>
  <B24ButtonGroup
    :orientation="orientation"
    no-split
    :size="size"
  >
    <B24Button color="ai" label="Button" />
    <B24Button color="success" label="Button" />
    <B24Button color="warning" label="Button" />
  </B24ButtonGroup>
</template>
