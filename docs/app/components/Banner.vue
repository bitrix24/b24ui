<script setup lang="ts">
import NewMessageIcon from '@bitrix24/b24icons-vue/outline/NewMessageIcon'
</script>

<template>
  <B24Banner
    id="new-component-date-banner"
    title="New components have been implemented! Explore them."
    to="/docs/components/input-date/"
    :icon="NewMessageIcon"
    close
    color="air-primary-copilot"
    class="light"
  />
</template>
