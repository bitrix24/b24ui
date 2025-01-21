<script setup lang="ts">
import { ref } from 'vue'
import DealPlusIcon from '@bitrix24/b24icons-vue/crm/DealPlusIcon'

const open = ref(false)

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  <B24Tooltip v-model:open="open" text="Opens the deal creation form in the slider">
    <B24Button label="New deal" color="success" :icon="DealPlusIcon" />
  </B24Tooltip>
</template>
