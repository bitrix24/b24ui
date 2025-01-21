<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'
// import Theme from 'vitepress/theme'
import VPLayout from 'vitepress/dist/client/theme-default/Layout.vue'
import FrameDefaultLayout from './FrameDefaultLayout.vue'

const route = useRoute()

const baseFolder = import.meta.env.BASE_URL
const isFrameContent = computed(() => {
  return route.path?.startsWith(`${baseFolder}frames/default`)
})

/*
onMounted(async () => {
  if (!isFrameContent.value) {
    import('vitepress/theme')
    console.warn('process import >>>> vitepress/theme')
  }
})
// <VPLayout v-else />
// <Theme.Layout v-else />
*/
</script>

<template>
  <FrameDefaultLayout v-if="isFrameContent" />
  <VPLayout v-else />
</template>
