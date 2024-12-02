<script setup>
import { ref, onMounted } from 'vue'
import { createApp } from 'whyframe:app'

const app = ref()

onMounted(() => {
  createApp(app.value)
})
</script>

<template>
  <div ref="app" class="w-full h-screen bg-transparent flex flex-col flex-nowrap items-center justify-center">
    <div class="text-gray-500">Loading ...</div>
  </div>
</template>
