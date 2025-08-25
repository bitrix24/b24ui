<script setup lang="ts">
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'
import type { ChipProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  position?: ChipProps['position']
  size?: ChipProps['size']
}

withDefaults(defineProps<ExampleProps>(), {
  position: 'bottom-left' as const,
  size: 'md' as const
})
</script>

<template>
  <B24Chip
    :position="position"
    :size="size"
  >
    <B24Button :icon="MailIcon" depth="light" />
  </B24Chip>
</template>
