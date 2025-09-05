<script setup lang="ts">
import type { FieldGroupProps } from '@bitrix24/b24ui-nuxt'
import PromptIcon from '@bitrix24/b24icons-vue/main/PromptIcon'

export interface ExampleProps {
  orientation?: FieldGroupProps['orientation']
  size?: FieldGroupProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  orientation: 'vertical' as FieldGroupProps['orientation'],
  size: 'md' as FieldGroupProps['size']
})
</script>

<template>
  <B24FieldGroup
    :orientation="orientation"
    :size="size"
  >
    <B24Button color="ai" label="Button" />
    <B24Button color="ai" :icon="PromptIcon" />
  </B24FieldGroup>
  <B24FieldGroup
    :orientation="orientation"
    no-split
    :size="size"
  >
    <B24Button color="ai" label="Button" />
    <B24Button color="success" label="Button" />
    <B24Button color="warning" label="Button" />
  </B24FieldGroup>
</template>
