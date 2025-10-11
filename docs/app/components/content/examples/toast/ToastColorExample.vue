<script setup lang="ts">
import type { ToastProps } from '@bitrix24/b24ui-nuxt'
import CopilotAiIcon from '@bitrix24/b24icons-vue/main/CopilotAiIcon'

const props = defineProps<{
  color: ToastProps['color']
}>()

const toast = useToast()

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    icon: CopilotAiIcon,
    color: props.color
  })
}
</script>

<template>
  <B24Button label="Show toast" @click="showToast" />
</template>
