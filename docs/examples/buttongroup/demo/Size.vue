<script setup lang="ts">
import type { ButtonGroupProps } from '@bitrix24/b24ui-nuxt'
import PromptIcon from '@bitrix24/b24icons-vue/main/PromptIcon'

export interface ExampleProps {
  size?: ButtonGroupProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as ButtonGroupProps['size']
})
</script>

<template>
  <B24ButtonGroup
    :size="size"
  >
    <B24Button color="air-primary-copilot" label="Button" />
    <B24Button color="air-primary-copilot" :icon="PromptIcon" />
  </B24ButtonGroup>
  <B24ButtonGroup
    :size="size"
    no-split
  >
    <B24Button color="air-primary-copilot" label="Button" />
    <B24Button color="air-primary-success" label="Button" />
    <B24Button color="air-primary-alert" label="Button" />
  </B24ButtonGroup>
</template>
