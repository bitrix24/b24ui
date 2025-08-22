<script setup lang="ts">
import Refresh9Icon from '@bitrix24/b24icons-vue/crm/Refresh9Icon'

const toast = useToast()

function showToast() {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    icon: Refresh9Icon,
    progress: false
  })
}
</script>

<template>
  <B24Button label="Show toast" color="air-primary" @click="showToast" />
</template>
