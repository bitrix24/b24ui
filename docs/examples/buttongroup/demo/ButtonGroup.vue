<script setup lang="ts">
import PromptIcon from '@bitrix24/b24icons-vue/main/PromptIcon'
</script>

<template>
  <B24ButtonGroup>
    <B24Button color="ai" label="Button" />
    <B24Button color="ai" :icon="PromptIcon" />
  </B24ButtonGroup>
  <B24ButtonGroup no-split>
    <B24Button color="ai" label="Button" />
    <B24Button color="success" label="Button" />
    <B24Button color="warning" label="Button" />
  </B24ButtonGroup>
</template>
