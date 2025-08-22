<script setup lang="ts">
import PromptIcon from '@bitrix24/b24icons-vue/main/PromptIcon'
</script>

<template>
  <B24ButtonGroup>
    <B24Button color="air-primary-copilot" label="Button" />
    <B24Button color="air-primary-copilot" :icon="PromptIcon" />
  </B24ButtonGroup>
  <B24ButtonGroup no-split>
    <B24Button color="air-primary-copilot" label="Button" />
    <B24Button color="air-primary-success" label="Button" />
    <B24Button color="air-primary-alert" label="Button" />
  </B24ButtonGroup>
</template>
