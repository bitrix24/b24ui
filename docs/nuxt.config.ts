import { createResolver } from '@nuxt/kit'
import pkg from '../package.json'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '../src/module',
    // '@bitrix24/b24ui-nuxt',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/plausible',
    '@vueuse/nuxt',
    'nuxt-component-meta',
    // @todo on this -> ssr ?
    'nuxt-og-image',
    // @todo off this -> use in nuxt-og-image
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
      url: 'https://bitrix24.github.io/b24ui'
    }
  },

  ssr: false,

  devtools: {
    enabled: false
  },

  app: {
    // @todo fix this
    // baseURL: '/b24ui/',
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
    // // v4 redirects - moved to `docs/`
    // '/getting-started/**': { redirect: { to: '/docs/getting-started/**', statusCode: 301 }, prerender: false },
    // '/components/**': { redirect: { to: '/docs/components/**', statusCode: 301 }, prerender: false },
    // '/composables/**': { redirect: { to: '/docs/composables/**', statusCode: 301 }, prerender: false },
    // // v4 redirects - default root pages
    // '/docs': { redirect: '/docs/getting-started', prerender: false },
    // '/docs/composables': { redirect: '/docs/composables/define-shortcuts', prerender: false },
    // '/docs/getting-started/migration': { redirect: '/docs/getting-started/migration/v4', prerender: false },
    // // v4 redirects - default shadow pages
    // '/docs/getting-started/installation': { redirect: '/docs/getting-started/installation/nuxt', prerender: false },
    // '/docs/getting-started/icons': { redirect: '/docs/getting-started/icons/nuxt', prerender: false },
    // '/docs/getting-started/color-mode': { redirect: '/docs/getting-started/color-mode/nuxt', prerender: false },
    // '/docs/getting-started/i18n': { redirect: '/docs/getting-started/i18n/nuxt', prerender: false },
    // // v4 redirects - renamed components
    // '/docs/components/button-group': { redirect: { to: '/docs/components/field-group', statusCode: 301 }, prerender: false },
    // '/docs/components/page-accordion': { redirect: { to: '/docs/components/accordion', statusCode: 301 }, prerender: false },
    // '/docs/components/page-marquee': { redirect: { to: '/docs/components/marquee', statusCode: 301 }, prerender: false },
    // // v4 redirects - removed pro pages
    // '/pro': { redirect: { to: '/pro/activate', statusCode: 301 }, prerender: false },
    // '/pro/pricing': { redirect: { to: '/pro/activate', statusCode: 301 }, prerender: false },
    // '/pro/purchase': { redirect: { to: '/pro/activate', statusCode: 301 }, prerender: false },
    // '/pro/templates': { redirect: { to: '/templates', statusCode: 301 }, prerender: false },
    // '/docs/getting-started/license': { redirect: { to: '/docs/getting-started', statusCode: 301 }, prerender: false },
    // '/docs/getting-started/installation/pro': { redirect: '/docs/getting-started/installation/nuxt', prerender: false },
    // '/docs/getting-started/installation/pro/nuxt': { redirect: { to: '/docs/getting-started/installation/nuxt', statusCode: 301 }, prerender: false },
    // '/docs/getting-started/installation/pro/vue': { redirect: { to: '/docs/getting-started/installation/vue', statusCode: 301 }, prerender: false },
    // // v2 redirects
    // '/getting-started/theming': { redirect: { to: '/getting-started/theme', statusCode: 301 }, prerender: false },
    // '/pro/getting-started/**': { redirect: { to: '/getting-started/installation/pro/nuxt', statusCode: 301 }, prerender: false },
    // '/playground': { redirect: { to: '/getting-started/installation/nuxt', statusCode: 301 }, prerender: false },
    // '/pro/guide/**': { redirect: { to: '/getting-started/installation/pro/nuxt', statusCode: 301 }, prerender: false },
    // '/pro/prose/**': { redirect: { to: '/getting-started/typography#vue-components', statusCode: 301 }, prerender: false },
    // '/components/range': { redirect: { to: '/components/slider', statusCode: 301 }, prerender: false },
    // '/components/date-picker': { redirect: { to: '/components/calendar#as-a-datepicker', statusCode: 301 }, prerender: false },
    // '/components/dropdown': { redirect: { to: '/components/dropdown-menu', statusCode: 301 }, prerender: false },
    // '/components/notification': { redirect: { to: '/components/toast', statusCode: 301 }, prerender: false },
    // '/components/vertical-navigation': { redirect: { to: '/components/navigation-menu', statusCode: 301 }, prerender: false },
    // '/components/horizontal-navigation': { redirect: { to: '/components/navigation-menu', statusCode: 301 }, prerender: false },
    // '/components/divider': { redirect: { to: '/components/separator', statusCode: 301 }, prerender: false },
    // '/components/toggle': { redirect: { to: '/components/switch', statusCode: 301 }, prerender: false },
    // '/components/form-group': { redirect: { to: '/components/form-field', statusCode: 301 }, prerender: false },
    // '/pro/components': { redirect: { to: '/components', statusCode: 301 }, prerender: false },
    // '/pro/components/docs/docs-search': { redirect: { to: '/components/content-search', statusCode: 301 }, prerender: false },
    // '/pro/components/docs-search': { redirect: { to: '/components/content-search', statusCode: 301 }, prerender: false },
    // '/pro/components/landing-hero': { redirect: { to: '/components/page-hero', statusCode: 301 }, prerender: false },
    // '/pro/components/landing-cta': { redirect: { to: '/components/page-cta', statusCode: 301 }, prerender: false },
    // '/pro/components/landing-card': { redirect: { to: '/components/page-card', statusCode: 301 }, prerender: false },
    // '/pro/components/landing-section': { redirect: { to: '/components/page-section', statusCode: 301 }, prerender: false },
    // '/pro/components/landing-faq': { redirect: { to: '/components/accordion', statusCode: 301 }, prerender: false },
    // '/pro/components/landing-grid': { redirect: { to: '/components/page-grid', statusCode: 301 }, prerender: false },
    // '/pro/components/landing-logos': { redirect: { to: '/components/page-logos', statusCode: 301 }, prerender: false },
    // '/pro/components/landing-testimonial': { redirect: { to: '/components/page-card#as-a-testimonial', statusCode: 301 }, prerender: false },
    // '/pro/components/blog-list': { redirect: { to: '/components/blog-posts', statusCode: 301 }, prerender: false },
    // '/pro/components/color-mode-toggle': { redirect: { to: '/components/color-mode-switch', statusCode: 301 }, prerender: false },
    // '/pro/components/dashboard-card': { redirect: { to: '/components/page-card', statusCode: 301 }, prerender: false },
    // '/pro/components/dashboard-layout': { redirect: { to: '/components/dashboard-group', statusCode: 301 }, prerender: false },
    // '/pro/components/dashboard-modal': { redirect: { to: '/components/modal', statusCode: 301 }, prerender: false },
    // '/pro/components/dashboard-navbar-toggle': { redirect: { to: '/components/dashboard-sidebar-toggle', statusCode: 301 }, prerender: false },
    // '/pro/components/dashboard-page': { redirect: { to: '/components/dashboard-panel', statusCode: 301 }, prerender: false },
    // '/pro/components/dashboard-panel-content': { redirect: { to: '/components/dashboard-panel', statusCode: 301 }, prerender: false },
    // '/pro/components/dashboard-panel-handle': { redirect: { to: '/components/dashboard-resize-handle', statusCode: 301 }, prerender: false },
    // '/pro/components/dashboard-section': { redirect: { to: '/components/page-card', statusCode: 301 }, prerender: false },
    // '/pro/components/dashboard-sidebar-links': { redirect: { to: '/components/navigation-menu', statusCode: 301 }, prerender: false },
    // '/pro/components/dashboard-slideover': { redirect: { to: '/components/slideover', statusCode: 301 }, prerender: false },
    // '/pro/components/navigation-accordion': { redirect: { to: '/components/content-navigation', statusCode: 301 }, prerender: false },
    // '/pro/components/navigation-links': { redirect: { to: '/components/content-navigation', statusCode: 301 }, prerender: false },
    // '/pro/components/navigation-tree': { redirect: { to: '/components/content-navigation', statusCode: 301 }, prerender: false },
    // '/pro/components/page-error': { redirect: { to: '/components/error', statusCode: 301 }, prerender: false },
    // '/pro/components/footer-links': { redirect: { to: '/components/navigation-menu', statusCode: 301 }, prerender: false },
    // '/pro/components/header-links': { redirect: { to: '/components/navigation-menu', statusCode: 301 }, prerender: false },
    // '/pro/components/pricing-card': { redirect: { to: '/components/pricing-plan', statusCode: 301 }, prerender: false },
    // '/pro/components/pricing-grid': { redirect: { to: '/components/pricing-plans', statusCode: 301 }, prerender: false },
    // '/pro/components/pricing-switch': { redirect: { to: '/components/switch', statusCode: 301 }, prerender: false },
    // '/pro/components/**': { redirect: { to: '/components/**', statusCode: 301 }, prerender: false },
    // '/getting-started/shortcuts': { redirect: { to: '/composables/define-shortcuts', statusCode: 301 }, prerender: false },
    // '/releases': { redirect: 'https://github.com/nuxt/ui/releases', prerender: false }
  },

  compatibilityDate: '2024-07-09',

  nitro: {
    prerender: {
      routes: [
        '/docs/getting-started',
        '/api/countries.json',
        '/api/locales.json',
        // '/api/releases.json',
        // '/api/pulls.json'
        '/404.html'
      ],
      crawlLinks: true,
      autoSubfolderIndex: false
    }
  },

  vite: {
    optimizeDeps: {
      // prevents reloading page when navigating between components
      include: ['@internationalized/date', '@vueuse/shared', '@vueuse/integrations/useFuse', '@tanstack/vue-table', 'reka-ui', 'reka-ui/namespaced', 'embla-carousel-vue', 'embla-carousel-autoplay', 'embla-carousel-auto-scroll', 'embla-carousel-auto-height', 'embla-carousel-class-names', 'embla-carousel-fade', 'embla-carousel-wheel-gestures', 'colortranslator', 'tailwindcss/colors', 'tailwind-variants', 'ufo', 'zod', 'vaul-vue', 'scule', 'motion-v', 'json5', 'ohash', 'shiki-transformer-color-highlight']
    },
    // @todo remove this
    viteNode: {
      requestTimeout: 30000
    }
  },

  componentMeta: {
    exclude: [
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

  image: {
    format: ['webp', 'jpeg', 'jpg', 'png', 'svg'],
    provider: 'ipx'
  },

  llms: {
    domain: 'https://bitrix24.github.io/b24ui/',
    title: 'Bitrix24 UI',
    description: 'A comprehensive, Nuxt-integrated UI library providing a rich set of fully-styled, accessible and highly customizable components for building modern web applications.',
    full: {
      title: 'Bitrix24 UI Full Documentation',
      description: 'This is the full documentation for Bitrix24 UI. It includes all the Markdown files written with the MDC syntax.'
    },
    sections: [{
      title: 'Getting Started',
      contentCollection: 'docs',
      contentFilters: [
        { field: 'path', operator: 'LIKE', value: '/docs/getting-started%' }
      ]
    }, {
      title: 'Components',
      contentCollection: 'docs',
      contentFilters: [
        { field: 'path', operator: 'LIKE', value: '/docs/components/%' }
      ]
    }, {
      title: 'Composables',
      contentCollection: 'docs',
      contentFilters: [
        { field: 'path', operator: 'LIKE', value: '/docs/composables/%' }
      ]
    }],
    notes: [
      'The content is automatically generated from the same source as the official documentation.'
    ]
  },

  // @todo fix this
  ogImage: { enabled: false }
})
