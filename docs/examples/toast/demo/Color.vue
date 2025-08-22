<script setup lang="ts">
import AlarmIcon from '@bitrix24/b24icons-vue/main/AlarmIcon'
import type { ToastProps } from '@bitrix24/b24ui-nuxt'

const props = defineProps<{
  color: ToastProps['color']
}>()

const toast = useToast()

function showToast() {
  toast.add({
    title: 'The calculation of indicators has been completed',
    description: 'Is there anything else you need help with?',
    icon: AlarmIcon,
    color: props.color
  })
}
</script>

<template>
  <B24Button
    label="Show toast"
    @click="showToast"
  />
</template>
