<script setup lang="ts">
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'

const { toggle } = useAssistant()

const tooltipText = computed(() => 'Ask AI a question')
</script>

<template>
  <B24Tooltip :text="tooltipText">
    <B24Button
      :aria-label="tooltipText"
      :icon="AiStarsIcon"
      color="air-selection"
      size="sm"
      @click="toggle"
    />
  </B24Tooltip>
</template>
