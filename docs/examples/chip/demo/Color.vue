<script setup lang="ts">
import MailIcon from '@bitrix24/b24icons-vue/main/MailIcon'
import type { ChipProps } from '@bitrix24/b24ui-nuxt'

export interface ExampleProps {
  color?: ChipProps['color']
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default'
})
</script>

<template>
  <B24Chip
    :color="color"
  >
    <B24Button :icon="MailIcon" depth="light" />
  </B24Chip>
</template>
