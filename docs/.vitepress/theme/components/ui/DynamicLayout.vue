<script setup>
import { useRoute } from 'vitepress'
import Theme from 'vitepress/theme'
import FrameDefaultLayout from './FrameDefaultLayout.vue'

const route = useRoute()

const baseFolder = import.meta.env.BASE_URL
</script>

<template>
  <FrameDefaultLayout v-if="route.path.startsWith(`${baseFolder}frames/default`)" />
  <Theme.Layout v-else />
</template>
