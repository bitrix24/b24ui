<script setup lang="ts">
import DealPlusIcon from '@bitrix24/b24icons-vue/crm/DealPlusIcon'
</script>

<template>
  <B24Tooltip
    text="Opens the deal creation form in the slider"
    arrow
  >
    <B24Button label="New deal" color="success" :icon="DealPlusIcon" />
  </B24Tooltip>
</template>
