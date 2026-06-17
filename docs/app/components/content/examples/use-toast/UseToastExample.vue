<script setup lang="ts">
import ReplyIcon from '@bitrix24/b24icons-vue/actions/ReplyIcon'

const toast = useToast()

function showToast() {
  toast.add({
    title: 'New message',
    description: 'You have a new message from Benjamin.',
    actions: [{
      icon: ReplyIcon,
      label: 'Reply',
      color: 'air-secondary-accent-2',
      onClick: () => {
        toast.add({ title: 'Reply sent', color: 'air-primary-success' })
      }
    }]
  })
}
</script>

<template>
  <B24Button label="Show toast" @click="showToast" />
</template>
