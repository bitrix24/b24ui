import { createResolver } from '@nuxt/kit'
import pkg from '../package.json'
import { withoutTrailingSlash } from 'ufo'

const { resolve } = createResolver(import.meta.url)

/**
 * @memo need add pages for raw/***.md
 */
const pages = [
  // region getting-started ////
  '/docs/getting-started/',
  '/docs/getting-started/installation/nuxt/',
  '/docs/getting-started/installation/vue/',
  '/docs/getting-started/migration/v2/',
  '/docs/getting-started/contribution/',
  '/docs/getting-started/theme/design-system/',
  '/docs/getting-started/theme/css-variables/',
  '/docs/getting-started/theme/components/',
  '/docs/getting-started/integrations/icons/nuxt/',
  '/docs/getting-started/integrations/icons/vue/',
  '/docs/getting-started/integrations/color-mode/nuxt/',
  '/docs/getting-started/integrations/color-mode/vue/',
  '/docs/getting-started/integrations/i18n/nuxt/',
  '/docs/getting-started/integrations/i18n/vue/',
  '/docs/getting-started/integrations/content/',
  '/docs/getting-started/ai/mcp/',
  '/docs/getting-started/ai/llms-txt/',
  // endregion ////
  '/docs/components/',
  // region Layout ////
  '/docs/components/app/',
  '/docs/components/sidebar-layout/',
  '/docs/components/container/',
  '/docs/components/error/',
  // endregion ////
  // region Element ////
  '/docs/components/advice/',
  '/docs/components/alert/',
  '/docs/components/avatar/',
  '/docs/components/avatar-group/',
  '/docs/components/badge/',
  '/docs/components/banner/',
  '/docs/components/button/',
  '/docs/components/calendar/',
  '/docs/components/card/',
  '/docs/components/chip/',
  '/docs/components/collapsible/',
  '/docs/components/countdown/',
  '/docs/components/field-group/',
  '/docs/components/kbd/',
  '/docs/components/progress/',
  '/docs/components/separator/',
  '/docs/components/skeleton/',
  // endregion ////
  // region Form ////
  '/docs/components/form/',
  '/docs/components/checkbox/',
  '/docs/components/checkbox-group/',
  '/docs/components/color-picker/',
  '/docs/components/file-upload/',
  '/docs/components/form-field/',
  '/docs/components/input/',
  '/docs/components/input-date/',
  '/docs/components/input-time/',
  '/docs/components/input-menu/',
  '/docs/components/input-number/',
  '/docs/components/input-tags/',
  '/docs/components/pin-input/',
  '/docs/components/radio-group/',
  '/docs/components/range/',
  '/docs/components/select/',
  '/docs/components/select-menu/',
  '/docs/components/switch/',
  '/docs/components/textarea/',
  // endregion ////
  // region Data ////,
  '/docs/components/accordion/',
  '/docs/components/description-list/',
  '/docs/components/table/',
  '/docs/components/table-wrapper/',
  '/docs/components/timeline/',
  '/docs/components/user/',
  // endregion ////
  // region Navigation ////
  '/docs/components/breadcrumb/',
  '/docs/components/command-palette/',
  '/docs/components/link/',
  '/docs/components/navigation-menu/',
  '/docs/components/pagination/',
  '/docs/components/stepper/',
  '/docs/components/tabs/',
  // endregion ////
  // region Overlay ////
  '/docs/components/context-menu/',
  // '/docs/components/drawer/',
  '/docs/components/dropdown-menu/',
  '/docs/components/modal/',
  '/docs/components/popover/',
  '/docs/components/slideover/',
  '/docs/components/toast/',
  '/docs/components/tooltip/',
  // // '/docs/components/confetti/',
  // endregion ////
  // region Page ////
  '/docs/components/page-card/',
  '/docs/components/page-columns/',
  '/docs/components/page-grid/',
  '/docs/components/page-links/',
  '/docs/components/page-list/',
  // endregion ////
  // region Dashboard ////
  '/docs/components/dashboard-group/',
  // // '/docs/components/dashboard-navbar/',
  // // '/docs/components/dashboard-panel/',
  // // '/docs/components/dashboard-resize-handle/',
  '/docs/components/dashboard-search/',
  '/docs/components/dashboard-search-button/',
  // // '/docs/components/dashboard-sidebar/',
  // // '/docs/components/dashboard-sidebar-collapse/',
  // // '/docs/components/dashboard-sidebar-toggle/',
  // // '/docs/components/dashboard-toolbar/',
  // endregion ////
  // region Chat ////
  '/docs/components/chat-message/',
  '/docs/components/chat-messages/',
  '/docs/components/chat-palette/',
  '/docs/components/chat-prompt/',
  '/docs/components/chat-prompt-submit/',
  // endregion ////
  // region Content ////
  // '/docs/components/content-navigation/',
  '/docs/components/content-search/',
  '/docs/components/content-search-button/',
  '/docs/components/content-surround/',
  '/docs/components/content-toc/',
  // endregion ////
  // region Color Mode ////,
  '/docs/components/color-mode-avatar/',
  '/docs/components/color-mode-button/',
  '/docs/components/color-mode-image/',
  '/docs/components/color-mode-select/',
  '/docs/components/color-mode-switch/',
  // endregion ////
  // region i18n ////
  '/docs/components/locale-select/',
  // endregion ////
  // region Prose ////
  '/docs/typography/',
  '/docs/typography/headers-and-text/',
  '/docs/typography/lists-and-tables/',
  '/docs/typography/images-and-embeds/',
  '/docs/typography/accordion/',
  '/docs/typography/badge/',
  '/docs/typography/callout/',
  '/docs/typography/card/',
  '/docs/typography/card-group/',
  '/docs/typography/code-collapse/',
  '/docs/typography/code-group/',
  '/docs/typography/code-preview/',
  // '/docs/typography/code-tree/',
  '/docs/typography/collapsible/',
  '/docs/typography/field/',
  '/docs/typography/field-group/',
  // '/docs/typography/icon/',
  '/docs/typography/kbd/',
  '/docs/typography/steps/',
  '/docs/typography/tabs/',
  // endregion ////
  // region Composables ////
  '/docs/composables/define-shortcuts/',
  '/docs/composables/use-confetti/',
  '/docs/composables/use-overlay/',
  '/docs/composables/use-toast/'
  // endregion ////
]

/**
 * @memo need add for iframe examples
 */
const pagesFrameExamples = [
  '/examples/sidebar-layout-example/',
  '/examples/sidebar-layout-inner-example/',
  '/examples/banner-example/',
  '/examples/banner-with-title-example/',
  '/examples/content-search-example/'
]

const pagesService = [
  '/api/countries.json',
  '/api/locales.json',
  '/404.html'
]

const extraAllowedHosts = (process?.env.NUXT_ALLOWED_HOSTS?.split(',').map((s: string) => s.trim()).filter(Boolean)) ?? []

const prodUrl = process?.env.NUXT_PUBLIC_SITE_URL ?? ''
const baseUrl = process?.env.NUXT_PUBLIC_BASE_URL ?? ''
const canonicalUrl = process?.env.NUXT_PUBLIC_CANONICAL_URL ?? ''
const gitUrl = process?.env.NUXT_PUBLIC_GIT_URL ?? ''

export default defineNuxtConfig({
  modules: [
    '../src/module',
    // '@bitrix24/b24ui-nuxt',
    '@nuxt/content',
    // '@nuxt/image',
    '@nuxtjs/plausible',
    'nuxt-component-meta',
    'nuxt-og-image',
    // @memo off this -> use in nuxt-og-image
    'nuxt-site-config',
    'motion-v/nuxt',
    (_, nuxt) => {
      nuxt.hook('components:dirs', (dirs) => {
        dirs.unshift({
          path: resolve('./app/components/content/examples'),
          pathPrefix: false,
          prefix: '',
          global: true
        })
      })
    },
    'nuxt-llms'
  ],

  ssr: true,

  devtools: {
    enabled: false
  },

  app: {
    baseURL: `${baseUrl}/`,
    buildAssetsDir: '/_nuxt/',
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${baseUrl}/favicon.ico` }
      ],
      htmlAttrs: { class: 'edge-dark' }
    },
    rootAttrs: { 'data-vaul-drawer-wrapper': '' }
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'ts', 'typescript', 'diff', 'vue', 'json', 'yml', 'css', 'mdc', 'blade', 'edge']
        }
      }
    }
  },

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  /**
   * @memo this will be overwritten from .env or Docker_*
   * @see https://nuxt.com/docs/guide/going-further/runtime-config#example
   */
  runtimeConfig: {
    public: {
      version: pkg.version,
      siteUrl: prodUrl,
      baseUrl,
      canonicalUrl,
      gitUrl
    }
  },

  routeRules: {
    // v4 redirects - moved to `docs/`
    // '/getting-started/**': { redirect: { to: '/docs/getting-started/**', statusCode: 301 }, prerender: false },
    // '/components/**': { redirect: { to: '/docs/components/**', statusCode: 301 }, prerender: false },
    // '/composables/**': { redirect: { to: '/docs/composables/**', statusCode: 301 }, prerender: false },
    // v4 redirects - default root pages
    '/docs': { redirect: '/docs/getting-started/', prerender: false },
    // // '/docs/components': { redirect: '/docs/components/app/', prerender: false },
    '/docs/composables': { redirect: '/docs/composables/define-shortcuts/', prerender: false },
    // v4 redirects - default shadow pages
    '/docs/getting-started/installation/': { redirect: '/docs/getting-started/installation/nuxt/', prerender: false },
    '/docs/getting-started/integrations/icons/': { redirect: '/docs/getting-started/integrations/icons/nuxt/', prerender: false },
    '/docs/getting-started/integrations/color-mode/': { redirect: '/docs/getting-started/integrations/color-mode/nuxt/', prerender: false },
    '/docs/getting-started/integrations/i18n/': { redirect: '/docs/getting-started/integrations/i18n/nuxt/', prerender: false }
    // '/docs/getting-started/migration': { redirect: '/docs/getting-started/migration/v4', prerender: false },
    // v4 redirects - default shadow pages
    // '/docs/getting-started/installation': { redirect: '/docs/getting-started/installation/nuxt', prerender: false },
    // '/docs/getting-started/icons': { redirect: '/docs/getting-started/icons/nuxt', prerender: false },
    // '/docs/getting-started/color-mode': { redirect: '/docs/getting-started/color-mode/nuxt', prerender: false },
    // '/docs/getting-started/i18n': { redirect: '/docs/getting-started/i18n/nuxt', prerender: false },
    // v4 redirects - renamed components
    // '/docs/components/button-group': { redirect: { to: '/docs/components/field-group', statusCode: 301 }, prerender: false },
    // '/docs/components/page-accordion': { redirect: { to: '/docs/components/accordion', statusCode: 301 }, prerender: false },
    // '/docs/components/page-marquee': { redirect: { to: '/docs/components/marquee', statusCode: 301 }, prerender: false },
    // v4 redirects - removed pro pages
    // '/pro': { redirect: { to: '/pro/activate', statusCode: 301 }, prerender: false },
    // '/pro/pricing': { redirect: { to: '/pro/activate', statusCode: 301 }, prerender: false },
    // '/pro/purchase': { redirect: { to: '/pro/activate', statusCode: 301 }, prerender: false },
    // '/pro/templates': { redirect: { to: '/templates', statusCode: 301 }, prerender: false },
    // '/docs/getting-started/license': { redirect: { to: '/docs/getting-started', statusCode: 301 }, prerender: false },
    // '/docs/getting-started/installation/pro': { redirect: '/docs/getting-started/installation/nuxt', prerender: false },
    // '/docs/getting-started/installation/pro/nuxt': { redirect: { to: '/docs/getting-started/installation/nuxt', statusCode: 301 }, prerender: false },
    // '/docs/getting-started/installation/pro/vue': { redirect: { to: '/docs/getting-started/installation/vue', statusCode: 301 }, prerender: false },
  },

  compatibilityDate: '2024-07-09',

  nitro: {
    prerender: {
      routes: [
        ...pages.map((page: string) => `${withoutTrailingSlash(`/raw${page}`)}.md`),
        ...pagesFrameExamples,
        ...pagesService
      ],
      crawlLinks: true,
      autoSubfolderIndex: false
    }
  },

  vite: {
    optimizeDeps: {
      // prevents reloading page when navigating between components
      include: ['@ai-sdk/vue', '@internationalized/date', '@nuxt/content/utils', '@tanstack/vue-table', '@vue/devtools-core', '@vue/devtools-kit', '@vueuse/integrations/useFuse', '@vueuse/shared', 'ai', 'colortranslator', 'embla-carousel-auto-height', 'embla-carousel-auto-scroll', 'embla-carousel-autoplay', 'embla-carousel-class-names', 'embla-carousel-fade', 'embla-carousel-vue', 'embla-carousel-wheel-gestures', 'json5', 'motion-v', 'ohash', 'ohash/utils', 'prettier', 'reka-ui', 'reka-ui/namespaced', 'scule', 'shiki', 'shiki-stream/vue', 'shiki-transformer-color-highlight', 'shiki/engine-javascript.mjs', 'tailwind-variants', 'tailwindcss/colors', 'ufo', 'vaul-vue', 'zod']
    },
    server: {
      // Fix: "Blocked request. This host is not allowed" when using tunnels like ngrok
      allowedHosts: [...extraAllowedHosts]
    }
  },

  componentMeta: {
    transformers: [(component, code) => {
      // Simplify b24ui in slot prop types: `leading(props: { b24ui: Button['b24ui'] })` -> `leading(props: { b24ui: object })`
      code = code.replace(/b24ui:[^}]+(?=\})/g, 'b24ui: object')

      return { component, code }
    }],
    exclude: [
      '@bitrix24/b24icons-vue',
      '@bitrix24/b24icons-nuxt',
      '@nuxt/content',
      '@nuxt/image',
      '@nuxtjs/color-mode',
      '@nuxtjs/mdc',
      '@nuxtjs/plausible',
      'nuxt/dist',
      'nuxt-og-image',
      resolve('./app/components')
    ],
    metaFields: {
      type: false,
      props: true,
      slots: 'no-schema',
      events: 'no-schema',
      exposed: false
    }
  },

  // @memo not use this
  // image: {
  //   format: ['webp', 'jpeg', 'jpg', 'png', 'svg'],
  //   provider: 'ipx'
  // },

  llms: {
    domain: `${prodUrl}${baseUrl}`,
    title: 'Bitrix24 UI',
    description: 'A comprehensive, Nuxt-integrated UI library providing a rich set of fully-styled, accessible and highly customizable components for REST API web-application development.',
    full: {
      title: 'Bitrix24 UI Full Documentation',
      description: 'This is the full documentation for Bitrix24 UI. It includes all the Markdown files written with the MDC syntax.'
    },
    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/docs/getting-started%' }
        ]
      },
      {
        title: 'Components',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/docs/components/%' }
        ]
      },
      {
        title: 'Composables',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/docs/composables/%' }
        ]
      }
    ],
    notes: [
      'The content is automatically generated from the same source as the official documentation.'
    ]
  },

  // @memo off for generate
  ogImage: { enabled: false }
})
