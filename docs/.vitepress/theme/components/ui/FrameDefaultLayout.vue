<script setup>
import { ref, onMounted } from 'vue'
import { createApp } from 'whyframe:app'
import { createRouter, createWebHistory } from 'vue-router'
import bitrix24UIPlugin from '@bitrix24/b24ui-nuxt/vue-plugin'
// import { useData } from 'vitepress'

const appRef = ref()

console.log()

onMounted(async () => {
  // const { isDark } = useData()
  try {
    if (import.meta.env.DEV) {
      // region clear dev ////
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
      // endregion ////
    } else {
      // region clear prod ////
      Array.from(document.styleSheets).forEach((styleSheet) => {
        if (!styleSheet.href || !styleSheet.href.includes('style.')) {
          console.log(styleSheet)
          return
        }

        const rules = styleSheet.cssRules || styleSheet.rules
        let isFindStart = false

        for (let j = rules.length - 1; j >= 0; j--) {
          const rule = rules[j]
          if (rule.cssText.includes('--sh-is-start-frame')) {
            // @memo after this moment all rules deleted ////
            // @memo `--sh-is-start-frame` -> look at bottom this page ////
            isFindStart = true
            continue
          }

          if (isFindStart) {
            styleSheet.deleteRule(j)
          }
        }
      })
      // endregion ////
    }

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

    /**
     * @memo this is not a very good idea
     */
    /*
    setTimeout(() => {
      if (isDark.value) {
        document.querySelector('html').classList.add('dark')
      }
    }, 1000)
    */
  } catch (error) {
    console.error(error)
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
  --sh-is-start-frame: 1;
  --sh-scrollbar-thumb: rgb(60, 60, 67);
  --sh-scrollbar-background: #ebebef;
}

body {
  background-color: transparent;
  min-width: 200px !important;
}

.dark body {
  background-color: #0f172a;
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
