<script setup lang="ts">
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'

/**
 * @see https://github.com/nuxt-modules/mcp-toolkit/blob/main/apps/docs/app/components/DocsAsideRightBottom.vue
 */
const route = useRoute()

const pageUrl = route.path
const { open } = useAIChat()
</script>

<template>
  <div>
    <B24Button
      :icon="AiStarsIcon"
      target="_blank"
      label="Explain with AI"
      color="air-selection"
      size="sm"
      @click="open(`Explain the page ${pageUrl}`, true)"
    />
    <AIChatSlideover />
  </div>
</template>
