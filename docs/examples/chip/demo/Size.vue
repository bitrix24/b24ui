<script setup lang="ts">
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'
import type { ChipProps } from '@bitrix24/b24ui-nuxt/types/index.ts'

export interface ExampleProps {
  size?: ChipProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  size: 'md' as const
})
</script>

<template>
  <B24Chip
    :size="size"
  >
    <B24Button :icon="MailIcon" depth="light" />
  </B24Chip>
</template>
