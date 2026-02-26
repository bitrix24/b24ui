<script setup lang="ts">
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'

const appConfig = useAppConfig()
const { toggle } = useAssistant()

const tooltipText = computed(() => 'Ask AI a question')
const triggerIcon = computed(() => appConfig.bxAssistant?.icons?.trigger || AiStarsIcon)
</script>

<template>
  <B24Tooltip :text="tooltipText">
    <B24Button
      :aria-label="tooltipText"
      :icon="triggerIcon"
      color="air-selection"
      size="sm"
      @click="toggle"
    />
  </B24Tooltip>
</template>
