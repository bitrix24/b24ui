<script setup lang="ts">
import { motion } from 'motion-v'
import LoaderClockIcon from '@bitrix24/b24icons-vue/animated/LoaderClockIcon'
import PromptLibraryIcon from '@bitrix24/b24icons-vue/outline/PromptLibraryIcon'

/**
 * @see https://github.com/nuxt-modules/mcp-toolkit/blob/main/apps/docs/app/components/chat/ToolCall.vue
 */
defineProps<{
  text: string
  isLoading?: boolean
}>()
</script>

<template>
  <B24Card
    variant="outline-copilot"
    :b24ui="{
      body: 'p-[8px] sm:px-[8px] sm:py-[6px] text-xs text-ai-350'
    }"
  >
    <motion.div
      :initial="{ opacity: 0, y: 4 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.2 }"
      class="flex items-center gap-[6px]"
    >
      <LoaderClockIcon v-if="isLoading" class="size-4 shrink-0 text-ai-200" />
      <PromptLibraryIcon v-else class="size-4 shrink-0 text-ai-350" />
      <span class="truncate">{{ text }}</span>
    </motion.div>
  </B24Card>
</template>
