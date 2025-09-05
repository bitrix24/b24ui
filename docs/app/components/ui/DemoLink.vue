<script setup lang="ts">
import DemonstrationGraphicsIcon from '@bitrix24/b24icons-vue/main/DemonstrationGraphicsIcon'
import { configParams } from '../../../config/params'

const $props = defineProps<{
  to: string
}>()
</script>

<template>
  <a
    target="_blank"
    class="
      no-underline! text-md! text-base-master! bg-transparent
      flex flex-row flex-nowrap gap-1.5 items-center
      pl-2 pr-3 py-1 rounded-xs
      border border-base-500 dark:border-base-700
      hover:bg-base-700/10
      dark:text-base-500!
    "
    :href="`${configParams.domain}${configParams.baseFolder}demo${$props.to}`"
  >
    <div class="size-[20px]">
      <DemonstrationGraphicsIcon class="size-[20px]" />
    </div>
    <div class="text-nowrap">Demo</div>
  </a>
</template>
