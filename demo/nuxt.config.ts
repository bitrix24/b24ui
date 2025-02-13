export default defineNuxtConfig({
  modules: [
    '../src/module'
  ],
  ssr: false,
  devtools: { enabled: false },
  app: {
    baseURL: '/b24ui/demo/',
    buildAssetsDir: '/_nuxt/',
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/b24ui/demo/favicon.ico' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      baseURL: '/b24ui/demo/'
    }
  },
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-04-12',
  nitro: {
    output: {
      publicDir: '.output/public/b24ui/demo'
    }
  },
  b24ui: {}
})
