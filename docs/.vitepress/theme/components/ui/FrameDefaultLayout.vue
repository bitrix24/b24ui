<script setup>
import { ref, onMounted } from 'vue'
import { createApp } from 'whyframe:app'
import { createRouter, createWebHistory } from 'vue-router'
import uiPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'

const appRef = ref()

onMounted(async () => {
  try {
    createApp(
      appRef.value,
      {
        enhanceApp: (app) => {
          const router = createRouter({
            routes: [],
            history: createWebHistory()
          })
          app.use(router)
          app.use(uiPlugin)
        }
      }
    )
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div ref="appRef" class="w-full h-screen bg-transparent flex flex-col flex-nowrap items-center justify-center">
    <div class="text-gray-500">
      Loading ...
    </div>
  </div>
</template>

<style>
body {
  background-color: transparent;
}
</style>
