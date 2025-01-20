<script setup lang="ts">
import ExpandIcon from '@bitrix24/b24icons-vue/main/ExpandIcon'
</script>

<template>
  <B24Tooltip
    text="Open on GitHub"
    :content="{
      align: 'start',
      side: 'left',
      sideOffset: 8
    }"
  >
    <B24Button label="Open" color="link" depth="dark" :icon="ExpandIcon" />
  </B24Tooltip>
</template>
