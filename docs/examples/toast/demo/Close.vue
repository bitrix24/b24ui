<script setup lang="ts">
import CopilotAiIcon from '@bitrix24/b24icons-vue/main/CopilotAiIcon'

const toast = useToast()

function showToast() {
  toast.add({
    title: 'The calculation of indicators has been completed',
    description: 'Is there anything else you need help with?',
    icon: CopilotAiIcon,
    close: {
      color: 'ai',
      depth: 'dark',
      class: 'rounded-full'
    }
  })
}
</script>

<template>
  <B24Button label="Show toast" color="primary" @click="showToast" />
</template>
