<script setup lang="ts">
import HelpIcon from '@bitrix24/b24icons-vue/main/HelpIcon'
</script>

<template>
  <div class="flex flex-row flex-nowrap items-center justify-start gap-1.5">
    <B24Checkbox name="checkbox" label="Default value" :default-value="true" />
    <B24Tooltip
      :delay-duration="100"
      :content="{ side: 'right' }"
      text="When the performer completes the task, it will come to you for review. You can accept the work (and then the task will be closed) or return the task for revision."
    >
      <div class="cursor-help ring ring-transparent text-base-500 dark:text-base-800">
        <HelpIcon class="size-5" />
      </div>
    </B24Tooltip>
  </div>
</template>
