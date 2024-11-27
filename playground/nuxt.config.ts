import { createResolver } from '@nuxt/kit'
import { readFileSync } from 'node:fs'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({

  modules: ['../src/module'],
  devtools: { enabled: false },
  devServer: {
    loadingTemplate: () => {
      return readFileSync('./playground/template/devServer-loading.html', 'utf-8')
    }
  },
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-04-12',
  b24ui: {},
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
