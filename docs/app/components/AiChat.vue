<script setup lang="ts">
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'

/**
 * @see https://github.com/nuxt-modules/mcp-toolkit/blob/main/apps/docs/app/components/AiChat.vue
 */

const { toggle } = useAIChat()
</script>

<template>
  <B24Tooltip text="Ask AI a question">
    <B24Button
      aria-label="Ask AI a question"
      color="air-selection"
      :icon="AiStarsIcon"
      size="sm"
      @click="toggle"
    />
  </B24Tooltip>
</template>
