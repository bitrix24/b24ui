<script setup lang="ts">
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'
import type { ChipProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  text?: string
  size?: ChipProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  text: '',
  size: 'md' as const
})
</script>

<template>
  <B24Chip
    :text="text"
    :size="size"
  >
    <B24Button :icon="MailIcon" depth="light" />
  </B24Chip>
</template>
