<script setup>
import { ref, onMounted } from 'vue'
import { createApp } from 'whyframe:app'
import { createRouter, createWebHistory } from 'vue-router'
import bitrix24UIPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'

const appRef = ref()

onMounted(async () => {
  try {
    // region clear dev ////
    console.log('>> Before.style >>> ', document.querySelectorAll('style'))

    const list = document.querySelectorAll('style')

    list.forEach((row) => {
      const viteDevId = row?.dataset?.viteDevId || '?'

      if (
        viteDevId.includes('theme-default')
        || viteDevId.includes('docsearch')
        || viteDevId.includes('tailwind.post.css')
      ) {
        row.parentNode.removeChild(row)
      }
    })
    console.log('<< After.style <<< ', document.querySelectorAll('style'))
    // endregion ////

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
:root
{
  --sh-scrollbar-thumb: rgb(60, 60, 67);
  --sh-scrollbar-background: #ebebef;
}
body {
  background-color: transparent;
  min-width: 200px !important;
}

/** region scrollbar */
* {
  scrollbar-color: var(--sh-scrollbar-thumb) var(--sh-scrollbar-background);
  scrollbar-width: thin;
}

/* Styling the scrollbar in Chrome and Safari */
*::-webkit-scrollbar {
  width: 6px;
}

/* Set thumb color for Chrome and Safari */
*::-webkit-scrollbar-thumb {
  background-color: var(--sh-scrollbar-thumb);
  border-radius: 4px;
}

/* Set track color for Chrome and Safari */
*::-webkit-scrollbar-track {
  background-color: var(--sh-scrollbar-background);
}
/** endregion */
</style>
