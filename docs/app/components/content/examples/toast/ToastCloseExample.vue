<script setup lang="ts">
import CopilotAiIcon from '@bitrix24/b24icons-vue/main/CopilotAiIcon'

const toast = useToast()

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    icon: CopilotAiIcon,
    close: {
      color: 'air-primary-copilot',
      class: 'rounded-full'
    }
  })
}
</script>

<template>
  <B24Button label="Show toast" @click="showToast" />
</template>
