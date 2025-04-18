import { computed } from 'vue'
// import colors from 'tailwindcss/colors'
import type { UseHeadInput } from '@unhead/vue/types'
import {
  defineNuxtPlugin,
  useNuxtApp,
  useHead
} from '#imports'

/**
 * @see src/templates.ts -> getTemplates
 */
/*
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

function getColor(color: keyof typeof colors, shade: typeof shades[number]): string {
  if (color in colors && typeof colors[color] === 'object' && shade in colors[color]) {
    return colors[color][shade] as string
  }
  return ''
}

function generateShades(key: string, value: string) {
  return `${shades.map(shade => `--ui-color-${key}-${shade}: var(--color-${value === 'neutral' ? 'old-neutral' : value}-${shade}, ${getColor(value as keyof typeof colors, shade)});`).join('\n  ')}`
}
function generateColor(key: string, shade: number) {
  return `--ui-${key}: var(--ui-color-${key}-${shade});`
}
*/

export default defineNuxtPlugin(() => {
  // const appConfig = useAppConfig()
  const nuxtApp = useNuxtApp()

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
