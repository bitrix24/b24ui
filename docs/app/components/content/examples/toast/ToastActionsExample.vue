<script setup lang="ts">
import Refresh9Icon from '@bitrix24/b24icons-vue/crm/Refresh9Icon'

const toast = useToast()

const props = defineProps<{
  description: string
}>()

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: props.description,
    actions: [{
      icon: Refresh9Icon,
      label: 'Retry',
      color: 'air-secondary-accent-2',
      onClick: (e) => {
        e?.stopPropagation()
      }
    }]
  })
}
</script>

<template>
  <B24Button label="Show toast" @click="showToast" />
</template>
