import { createResolver } from '@nuxt/kit'
import { readFileSync } from 'node:fs'
import type { NuxtConfig } from '@nuxt/schema'

interface ExtendedNuxtConfig extends NuxtConfig {
  componentMeta?: any
}

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '@bitrix24/b24ui-nuxt'
  ],

  devtools: {
    enabled: false
  },

  app: {
    head: {
      htmlAttrs: {
        class: 'edge-dark'
      }
    }
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/docs/components/**': { redirect: { to: '/components/**', statusCode: 301 }, prerender: false }
  },

  devServer: {
    loadingTemplate: () => {
      return readFileSync('./playgrounds/nuxt/template/devServer-loading.html', 'utf-8')
    }
  },

  compatibilityDate: '2024-04-12',

  vite: {
    optimizeDeps: {
      // prevents reloading page when navigating between components
      include: ['@ai-sdk/vue', '@internationalized/date', '@tanstack/vue-table', '@tanstack/vue-virtual', '@vue/devtools-core', '@vue/devtools-kit', '@vueuse/core', '@vueuse/integrations/useFuse', '@vueuse/shared', 'colortranslator', 'embla-carousel-auto-height', 'embla-carousel-auto-scroll', 'embla-carousel-autoplay', 'embla-carousel-class-names', 'embla-carousel-fade', 'embla-carousel-vue', 'embla-carousel-wheel-gestures', 'ohash/utils', 'reka-ui', 'reka-ui/namespaced', 'scule', 'tailwind-variants', 'tailwindcss/colors', 'ufo', 'vaul-vue', 'zod']
    }
  },

  componentMeta: {
    transformers: [(component: any, code: any) => {
      // Simplify b24ui in slot prop types: `leading(props: { b24ui: Button['b24ui'] })` -> `leading(props: { b24ui: object })`
      code = code.replace(/b24ui:[^}]+(?=\})/g, 'b24ui: object')

      return { component, code }
    }],
    exclude: [
      '@bitrix24/b24icons-vue',
      '@bitrix24/b24icons-nuxt',
      resolve('./app/components')
    ],
    metaFields: {
      type: false,
      props: true,
      slots: 'no-schema',
      events: 'no-schema',
      exposed: false
    }
  }
} as ExtendedNuxtConfig & ReturnType<typeof defineNuxtConfig>)
