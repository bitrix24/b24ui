import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({

  modules: ['../src/module'],
  devtools: { enabled: true },
  
  b24ui: {},

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-04-12',

  // @ts-expect-error - `nuxt-component-meta` is used as CLI
  componentMeta: {
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
