<script setup lang="ts">
import type { BannerProps } from '@bitrix24/b24ui-nuxt'
import CircleCrossIcon from '@bitrix24/b24icons-vue/outline/CircleCrossIcon'

const { id = 'example' } = defineProps<{
  id?: string
  title?: string
  color?: BannerProps['color']
  closeIcon?: string
}>()

function onClose() {
  localStorage.removeItem(`banner-${id}`)

  setTimeout(() => {
    document.querySelector('html')?.classList.remove('hide-banner')
  }, 1000)
}

onBeforeMount(() => {
  localStorage.removeItem(`banner-${id}`)
})
</script>

<template>
  <B24Banner
    :id="id"
    :title="title || 'The subscription trial has ended. Subscribe to continue using all apps.'"
    :color="color"
    :close-icon="CircleCrossIcon"
    close
    @close="onClose"
  />
</template>
