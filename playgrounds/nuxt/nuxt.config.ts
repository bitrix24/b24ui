import type { NuxtComponentMeta } from 'nuxt-component-meta'
import { createResolver } from '@nuxt/kit'
import { readFileSync } from 'node:fs'

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

  devServer: {
    loadingTemplate: () => {
      return readFileSync('./playgrounds/nuxt/template/devServer-loading.html', 'utf-8')
    }
  },

  compatibilityDate: '2024-04-12',

  vite: {
    optimizeDeps: {
      // prevents reloading page when navigating between components
      include: ['@internationalized/date', '@vueuse/shared', '@vueuse/integrations/useFuse', '@tanstack/vue-table', 'reka-ui', 'reka-ui/namespaced', 'embla-carousel-vue', 'embla-carousel-autoplay', 'embla-carousel-auto-scroll', 'embla-carousel-auto-height', 'embla-carousel-class-names', 'embla-carousel-fade', 'embla-carousel-wheel-gestures', 'colortranslator', 'tailwindcss/colors', 'tailwind-variants', 'ufo', 'zod', 'vaul-vue']
    }
  },

  hooks: {
    // @ts-expect-error - Hook is not typed correctly
    'component-meta:schema': (schema: NuxtComponentMeta) => {
      for (const componentName in schema) {
        const component = schema[componentName]
        // Delete schema from slots to reduce metadata file size
        if (component?.meta?.slots) {
          for (const slot of component.meta.slots) {
            delete (slot as any).schema
          }
        }
      }
    }
  },

  componentMeta: {
    transformers: [(component: any, code: any) => {
      // Simplify b24ui in slot prop types: `leading(props: { b24ui: Button['b24ui'] })` -> `leading(props: { b24ui: object })`
      code = code.replace(/b24ui:[^}]+(?=\})/g, 'b24ui: object')

      return { component, code }
    }],
    exclude: [
      resolve('./app/components')
    ],
    metaFields: {
      type: false,
      props: true,
      slots: true,
      events: false,
      exposed: false
    }
  }
})
