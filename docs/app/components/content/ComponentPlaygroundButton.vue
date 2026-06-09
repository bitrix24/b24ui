<script setup lang="ts">
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'

const { track } = useAnalytics()

const props = defineProps<{
  to: string
  component: string
  source: string
}>()
</script>

<template>
  <B24Tooltip text="Open in playground" :content="{ side: 'right' }">
    <B24Button
      :to="props.to"
      target="_blank"
      :icon="PlayLIcon"
      size="sm"
      class="absolute -bottom-[13px] -right-[13px] z-1 rounded-full lg:opacity-0 lg:group-hover/component:opacity-100 ring-muted transition-opacity duration-200"
      aria-label="Open in playground"
      tabindex="-1"
      @click="track('Playground Opened', { component: props.component, source: props.source })"
    />
  </B24Tooltip>
</template>
