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
      include: ['@ai-sdk/vue', '@internationalized/date', '@tanstack/vue-table', '@tanstack/vue-virtual', '@tiptap/extension-emoji', '@tiptap/vue-3/menus', '@tiptap/core', '@tiptap/extension-drag-handle-vue-3', '@tiptap/extension-horizontal-rule', '@tiptap/extension-image', '@tiptap/extension-mention', '@tiptap/extension-placeholder', '@tiptap/extension-text-align', '@tiptap/markdown', '@tiptap/starter-kit', '@tiptap/vue-3', '@floating-ui/dom', '@tiptap/suggestion', '@tiptap/pm/state', '@vue/devtools-core', '@vue/devtools-kit', '@vueuse/core', '@vueuse/integrations/useFuse', '@vueuse/shared', 'colortranslator', 'embla-carousel-auto-height', 'embla-carousel-auto-scroll', 'embla-carousel-autoplay', 'embla-carousel-class-names', 'embla-carousel-fade', 'embla-carousel-vue', 'embla-carousel-wheel-gestures', 'ohash/utils', 'prosemirror-state', 'reka-ui', 'reka-ui/namespaced', 'scule', 'tailwind-variants', 'tailwindcss/colors', 'ufo', 'vaul-vue', 'zod']
    }
  },

  componentMeta: {
    transformers: [(component: any, code: any) => {
      // Simplify b24ui in slot prop types: `leading(props: { b24ui: Button['b24ui'] })` -> `leading(props: { b24ui: object })`
      code = code.replace(/b24ui:[^}]+(?=\})/g, 'b24ui: object')

      return { component, code }
    }],
    overrides: {
      B24Editor: {
        props: {
          modelValue: { name: 'modelValue', type: 'null | string | JSONContent | JSONContent[]' },
          parseOptions: { name: 'parseOptions', type: 'ParseOptions' }
        }
      },
      B24EditorDragHandle: { props: { editor: { name: 'editor', type: 'Editor' } } },
      B24EditorToolbar: { props: { editor: { name: 'editor', type: 'Editor' } } },
      B24EditorSuggestionMenu: { props: { editor: { name: 'editor', type: 'Editor' } } },
      B24EditorMentionMenu: { props: { editor: { name: 'editor', type: 'Editor' } } },
      B24EditorEmojiMenu: { props: { editor: { name: 'editor', type: 'Editor' } } },
      B24Calendar: {
        props: {
          defaultValue: { name: 'defaultValue', type: 'CalendarDate | CalendarDateTime | ZonedDateTime | DateRange | DateValue[]' },
          modelValue: { name: 'modelValue', type: 'null | CalendarDate | CalendarDateTime | ZonedDateTime | DateRange | DateValue[]' },
          defaultPlaceholder: { name: 'defaultPlaceholder', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
          placeholder: { name: 'placeholder', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
          maxValue: { name: 'maxValue', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
          minValue: { name: 'minValue', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' }
        }
      },
      B24InputDate: {
        props: {
          defaultValue: { name: 'defaultValue', type: 'CalendarDate | CalendarDateTime | ZonedDateTime | DateRange' },
          modelValue: { name: 'modelValue', type: 'null | CalendarDate | CalendarDateTime | ZonedDateTime | DateRange' },
          defaultPlaceholder: { name: 'defaultPlaceholder', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
          placeholder: { name: 'placeholder', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
          maxValue: { name: 'maxValue', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' },
          minValue: { name: 'minValue', type: 'CalendarDate | CalendarDateTime | ZonedDateTime' }
        }
      },
      B24InputTime: {
        props: {
          defaultValue: { name: 'defaultValue', type: 'Time | CalendarDateTime | ZonedDateTime' },
          modelValue: { name: 'modelValue', type: 'null | Time | CalendarDateTime | ZonedDateTime' },
          defaultPlaceholder: { name: 'defaultPlaceholder', type: 'Time | CalendarDateTime | ZonedDateTime' },
          placeholder: { name: 'placeholder', type: 'Time | CalendarDateTime | ZonedDateTime' },
          maxValue: { name: 'maxValue', type: 'Time | CalendarDateTime | ZonedDateTime' },
          minValue: { name: 'minValue', type: 'Time | CalendarDateTime | ZonedDateTime' }
        }
      }
    },
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
