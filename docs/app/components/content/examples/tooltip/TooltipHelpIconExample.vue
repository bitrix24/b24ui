<script setup lang="ts">
import HelpIcon from '@bitrix24/b24icons-vue/main/HelpIcon'
</script>

<template>
  <B24Tooltip
    :delay-duration="100"
    :content="{ side: 'right' }"
    text="When the performer completes the task, it will come to you for review. You can accept the work (and then the task will be closed) or return the task for revision."
  >
    <HelpIcon class="size-5 cursor-help" />
  </B24Tooltip>
</template>
