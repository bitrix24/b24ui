export default defineNuxtConfig({
  modules: [
    '@bitrix24/b24ui-nuxt',
    '@bitrix24/b24icons-nuxt'
  ],

  ssr: false,

  devtools: {
    enabled: false
  },

  app: {
    baseURL: '/b24ui/demo/',
    buildAssetsDir: '/_nuxt/',
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/b24ui/demo/favicon.ico' }
      ],
      htmlAttrs: {
        class: 'edge-dark'
      }
    }
  },

  css: ['~/assets/css/main.css'],

  // routeRules: {
  //   '/docs/components/**': { redirect: { to: '/components/**', statusCode: 301 }, prerender: false }
  // },

  runtimeConfig: {
    public: {
      baseURL: '/b24ui/demo/'
    }
  },

  compatibilityDate: '2024-07-09',

  nitro: {
    output: {
      publicDir: '.output/public/b24ui/demo'
    }
  },

  b24ui: {}
})
