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
        { rel: 'icon', type: 'image/x-icon', href: '/b24ui/demo/favicon.ico?v=2' }
      ],
      htmlAttrs: {
        class: 'edge-dark'
      }
    },
    rootAttrs: {
      'data-vaul-drawer-wrapper': ''
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

  vite: {
    server: {
      // Fix: "Blocked request. This host is not allowed" when using tunnels like ngrok
      // allowedHosts: [...extraAllowedHosts]
    },
    optimizeDeps: {
      include: [
        '@vueuse/core',
        'tailwindcss/colors',
        'vaul-vue',
        'tailwind-variants',
        '@vueuse/integrations/useFuse',
        'ai',
        '@ai-sdk/vue',
        '@comark/vue',
        '@comark/vue/plugins/highlight',
        '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon',
        '@bitrix24/b24icons-vue/main/B24Icon',
        '@bitrix24/b24icons-vue/actions/ArrowToTheLeftIcon',
        '@bitrix24/b24icons-vue/actions/ArrowToTheRightIcon',
        '@bitrix24/b24icons-vue/outline/CheckLIcon',
        '@bitrix24/b24icons-vue/outline/ChevronTopLIcon',
        '@bitrix24/b24icons-vue/outline/ChevronLeftLIcon',
        '@bitrix24/b24icons-vue/outline/ChevronRightLIcon',
        '@bitrix24/b24icons-vue/actions/DoubleShevronsRightIcon',
        '@bitrix24/b24icons-vue/actions/DoubleShevronsLeftIcon',
        '@bitrix24/b24icons-vue/outline/CrossMIcon',
        '@bitrix24/b24icons-vue/button/DotsIcon',
        '@bitrix24/b24icons-vue/actions/Refresh6Icon',
        '@bitrix24/b24icons-vue/actions/Minus30Icon',
        '@bitrix24/b24icons-vue/actions/Plus30Icon',
        '@bitrix24/b24icons-vue/main/Search2Icon',
        '@bitrix24/b24icons-vue/animated/LoaderWaitIcon',
        '@bitrix24/b24icons-vue/outline/ChevronDownLIcon',
        '@bitrix24/b24icons-vue/outline/ScreenIcon',
        '@bitrix24/b24icons-vue/outline/SunIcon',
        '@bitrix24/b24icons-vue/outline/MoonIcon',
        '@bitrix24/b24icons-vue/outline/TagIcon',
        '@bitrix24/b24icons-vue/outline/InfoCircleIcon',
        '@bitrix24/b24icons-vue/outline/IdeaLampIcon',
        '@bitrix24/b24icons-vue/main/WarningIcon',
        '@bitrix24/b24icons-vue/outline/AlertIcon',
        '@bitrix24/b24icons-vue/outline/CopyIcon',
        '@bitrix24/b24icons-vue/outline/CircleCheckIcon',
        '@bitrix24/b24icons-vue/outline/FileIcon',
        '@bitrix24/b24icons-vue/outline/UploadFileIcon',
        '@bitrix24/b24icons-vue/outline/ArrowDownLIcon',
        '@bitrix24/b24icons-vue/outline/ArrowTopLIcon',
        '@bitrix24/b24icons-vue/outline/StopLIcon',
        '@bitrix24/b24icons-vue/outline/RefreshIcon',
        '@bitrix24/b24icons-vue/main/SendIcon',
        '@bitrix24/b24icons-vue/outline/DragLIcon',
        '@bitrix24/b24icons-vue/outline/GoToLIcon',
        '@bitrix24/b24icons-vue/outline/CloseChatIcon',
        '@bitrix24/b24icons-vue/outline/OpenChatIcon',
        '@bitrix24/b24icons-vue/outline/ChevronDownSIcon',
        '@bitrix24/b24icons-vue/animated/LoaderClockIcon',
        '@bitrix24/b24icons-vue/specialized/SpinnerIcon',
        '@bitrix24/b24icons-vue/actions/Cross20Icon',
        '@bitrix24/b24icons-vue/crm/ItemIcon',
        '@bitrix24/b24icons-vue/outline/TextIcon',
        '@bitrix24/b24icons-vue/outline/HomeIcon',
        '@bitrix24/b24icons-vue/outline/CopilotIcon',
        '@bitrix24/b24icons-vue/outline/RobotIcon',
        '@bitrix24/b24icons-vue/outline/TrashcanIcon'
      ]
    }
  },

  b24ui: {}
})
