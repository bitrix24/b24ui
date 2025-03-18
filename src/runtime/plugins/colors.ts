import { computed } from 'vue'
import {
  defineNuxtPlugin,
  useNuxtApp,
  useHead
} from '#imports'
// FIXME: https://github.com/nuxt/module-builder/issues/141#issuecomment-2078248248
import type {} from '#app'
import type { UseHeadInput } from '@unhead/vue/types'

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp()
  /**
   * @see src/templates.ts -> getTemplates
   */
  /*
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

  function generateShades(key: string, value: string) {
    return `${shades.map(shade => `--ui-color-${key}-${shade}: var(--color-${value === 'neutral' ? 'old-neutral' : value}-${shade});`).join('\n  ')}`
  }
  function generateColor(key: string, shade: number) {
    return `--ui-${key}: var(--ui-color-${key}-${shade});`
  }
  */

  const root = computed(() => {
    // const { base, ...colors } = appConfig.b24ui.colors

    return `@layer base {
  :root {
    ${[].join('\n  ')}
  }
  :root, .light {
    ${[].join('\n  ')}
  }
  .dark {
    ${[].join('\n  ')}
  }
}`
  })

  // Head
  const headData: UseHeadInput = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: 'bitrix24-ui-colors'
    }]
  }

  // SPA mode
  if (import.meta.client && nuxtApp.isHydrating && !nuxtApp.payload.serverRendered) {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style')
      style.innerHTML = root.value
      style.setAttribute('data-bitrix24-ui-colors', '')
      document.head.appendChild(style)

      headData.script = [{
        innerHTML: 'document.head.removeChild(document.querySelector(\'[data-bitrix24-ui-colors]\'))'
      }]
    }
  }

  useHead(headData)
})
