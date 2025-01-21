<script setup>
import { ref, onMounted } from 'vue'
import { createApp } from 'whyframe:app'
import { createRouter, createWebHistory } from 'vue-router'
import bitrix24UIPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'
import { useDark } from '@vueuse/core'
import { useData } from 'vitepress'
import { APPEARANCE_KEY } from 'vitepress/dist/client/shared'

const appRef = ref()

onMounted(async () => {
  try {
    setTimeout(() => {
      document.querySelector('body').classList.add('frame')
    }, 10)

    const { isDark } = useData()

    createApp(
      appRef.value,
      {
        enhanceApp: (app) => {
          const router = createRouter({
            routes: [],
            history: createWebHistory()
          })

          app.use(router)
          app.use(bitrix24UIPlugin)

          useDark({
            storageKey: APPEARANCE_KEY,
            initialValue: () => (isDark ? 'dark' : 'auto')
          })
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div ref="appRef" class="px-0.5 w-full h-screen bg-transparent flex flex-col flex-nowrap items-center justify-center">
    <div class="text-gray-500">
      Loading ...
    </div>
  </div>
</template>

<style>
body.frame {
  min-width: 200px !important;
  background-color: transparent;
}
</style>
