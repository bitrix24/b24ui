export default defineNuxtConfig({
  modules: [
    '@bitrix24/b24ui-nuxt'
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
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      baseURL: '/b24ui/demo/'
    }
  },

  compatibilityDate: '2024-04-12',

  nitro: {
    output: {
      publicDir: '.output/public/b24ui/demo'
    }
  },

  vite: {
    optimizeDeps: {
      // prevents reloading page when navigating between components
      include: ['@internationalized/date', '@vueuse/shared', '@vueuse/integrations/useFuse', '@tanstack/vue-table', 'reka-ui', 'reka-ui/namespaced', 'embla-carousel-vue', 'embla-carousel-autoplay', 'embla-carousel-auto-scroll', 'embla-carousel-auto-height', 'embla-carousel-class-names', 'embla-carousel-fade', 'embla-carousel-wheel-gestures', 'colortranslator', 'tailwindcss/colors', 'tailwind-variants', 'ufo', 'zod', 'vaul-vue']
    }
  },

  b24ui: {}
})
