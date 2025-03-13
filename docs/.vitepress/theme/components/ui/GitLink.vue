<script setup lang="ts">
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

const $props = defineProps<{
  to: string
  title?: string
}>()
</script>

<template>
  <a
    target="_blank"
    class="
      no-underline! text-md! text-base-master! bg-transparent
      flex flex-row flex-nowrap gap-2 items-center
      px-3 py-1 rounded-xs
      border border-base-500 dark:border-base-700
      hover:bg-base-700/10
      dark:text-base-500!
    "
    :href="$props.to"
  >
    <div class="size-[18px]">
      <GitHubIcon class="size-[18px]" />
    </div>
    <div class="text-nowrap">{{ $props.title || 'Git' }}</div>
  </a>
</template>
