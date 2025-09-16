import { createResolver } from '@nuxt/kit'
import pkg from '../package.json'
import { withoutTrailingSlash } from 'ufo'

const { resolve } = createResolver(import.meta.url)

/**
 * @memo need add pages if ssr: false
 */
const pages = [
  '/docs/guide/getting-started/',
  '/docs/components/app/',
  '/docs/components/container/',
  '/docs/components/error/',
  '/docs/components/advice/',
  '/docs/components/alert/',
  '/docs/components/avatar/',
  '/docs/components/avatar-group/',
  '/docs/components/badge/',
  '/docs/components/button/',
  '/docs/components/calendar/',
  '/docs/components/chip/',
  '/docs/components/collapsible/',
  '/docs/components/countdown/',
  '/docs/components/field-group/',
  '/docs/components/kbd/',
  '/docs/components/progress/',
  '/docs/components/separator/',
  '/docs/components/skeleton/'
]

const pagesService = [
  '/api/countries.json',
  '/api/locales.json',
  '/404.html'
]

export default defineNuxtConfig({
  modules: [
    '../src/module',
    // '@bitrix24/b24ui-nuxt',
    '@nuxt/content',
    // '@nuxt/image',
    '@nuxtjs/plausible',
    '@vueuse/nuxt',
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

  $development: {
    site: {
      url: 'http://localhost:3000'
    }
  },
  $production: {
    site: {
      url: 'https://bitrix24.github.io'
    }
  },

  ssr: true,

  devtools: {
    enabled: false
  },

  app: {
    baseURL: '/b24ui/',
    buildAssetsDir: '/_nuxt/',
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/b24ui/favicon.ico' }
      ]
    },
    rootAttrs: {
      'data-vaul-drawer-wrapper': ''
      // 'class': 'bg-default'
    }
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'ts', 'typescript', 'diff', 'vue', 'json', 'yml', 'css', 'mdc']
        }
      }
    }
    // watch: {
    //   enabled: false
    // }
  },

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  runtimeConfig: {
    public: {
      version: pkg.version
    }
  },

  routeRules: {
    // v4 redirects - moved to `docs/`
    // '/getting-started/**': { redirect: { to: '/docs/getting-started/**', statusCode: 301 }, prerender: false },
    // '/components/**': { redirect: { to: '/docs/components/**', statusCode: 301 }, prerender: false },
    // '/composables/**': { redirect: { to: '/docs/composables/**', statusCode: 301 }, prerender: false },
    // v4 redirects - default root pages
    '/docs': { redirect: '/docs/guide/getting-started/', prerender: false },
    '/docs/components': { redirect: '/docs/components/app/', prerender: false },
    '/docs/composables': { redirect: '/docs/composables/define-shortcuts/', prerender: false }
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
        ...pages.map((page: string) => `${page}`),
        ...pages.map((page: string) => `${withoutTrailingSlash(`/raw${page}`)}.md`),
        ...pagesService
      ],
      crawlLinks: true,
      autoSubfolderIndex: false
    }
  },

  vite: {
    optimizeDeps: {
      // prevents reloading page when navigating between components
      include: ['@internationalized/date', '@vueuse/shared', '@vueuse/integrations/useFuse', '@tanstack/vue-table', 'reka-ui', 'reka-ui/namespaced', 'embla-carousel-vue', 'embla-carousel-autoplay', 'embla-carousel-auto-scroll', 'embla-carousel-auto-height', 'embla-carousel-class-names', 'embla-carousel-fade', 'embla-carousel-wheel-gestures', 'colortranslator', 'tailwindcss/colors', 'tailwind-variants', 'ufo', 'zod', 'vaul-vue', 'scule', 'motion-v', 'json5', 'ohash', 'shiki-transformer-color-highlight']
    }
  },

  componentMeta: {
    exclude: [
      '@bitrix24/b24icons-vue',
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
      slots: true,
      events: true,
      exposed: false
    }
  },

  // @memo not use this
  // image: {
  //   format: ['webp', 'jpeg', 'jpg', 'png', 'svg'],
  //   provider: 'ipx'
  // },

  llms: {
    domain: 'https://bitrix24.github.io',
    title: 'Bitrix24 UI',
    description: 'A comprehensive, Nuxt-integrated UI library providing a rich set of fully-styled, accessible and highly customizable components for building modern web applications.',
    full: {
      title: 'Bitrix24 UI Full Documentation',
      description: 'This is the full documentation for Bitrix24 UI. It includes all the Markdown files written with the MDC syntax.'
    },
    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/docs/guide/getting-started%' }
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
