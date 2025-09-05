<script setup lang="ts">
import type { FieldGroupProps } from '@bitrix24/b24ui-nuxt'
import PromptIcon from '@bitrix24/b24icons-vue/main/PromptIcon'

export interface ExampleProps {
  size?: FieldGroupProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as FieldGroupProps['size']
})
</script>

<template>
  <B24FieldGroup
    :size="size"
  >
    <B24Button color="air-primary-copilot" label="Button" />
    <B24Button color="air-primary-copilot" :icon="PromptIcon" />
  </B24FieldGroup>
  <B24FieldGroup
    :size="size"
    no-split
  >
    <B24Button color="air-primary-copilot" label="Button" />
    <B24Button color="air-primary-success" label="Button" />
    <B24Button color="air-primary-alert" label="Button" />
  </B24FieldGroup>
</template>
