import { createResolver } from '@nuxt/kit'
import pkg from '../package.json'
import { withoutTrailingSlash } from 'ufo'

const { resolve } = createResolver(import.meta.url)

/**
 * @memo need add pages if ssr: false
 */
const pages = [
  '/docs/guide/getting-started/',
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
  '/docs/components/checkbox/',
  '/docs/components/checkbox-group/',
  '/docs/components/color-picker/',
  '/docs/components/file-upload/',
  '/docs/components/form/'
  // endregion ////
]

const apiComponentMeta = [
  // region Layout ////
  '/api/component-meta/B24App.json',
  '/api/component-meta/B24SidebarLayout.json',
  '/api/component-meta/B24Container.json',
  '/api/component-meta/B24Error.json',
  // endregion ////
  // region Element ////
  '/api/component-meta/B24Advice.json',
  '/api/component-meta/B24Alert.json',
  '/api/component-meta/B24Avatar.json',
  '/api/component-meta/B24AvatarGroup.json',
  '/api/component-meta/B24Badge.json',
  '/api/component-meta/B24Banner.json',
  '/api/component-meta/B24Button.json',
  '/api/component-meta/B24Calendar.json',
  '/api/component-meta/B24Card.json',
  '/api/component-meta/B24Chip.json',
  '/api/component-meta/B24Collapsible.json',
  '/api/component-meta/B24Countdown.json',
  '/api/component-meta/B24FieldGroup.json',
  '/api/component-meta/B24Collapsible.json',
  '/api/component-meta/B24Collapsible.json',
  '/api/component-meta/B24Kbd.json',
  '/api/component-meta/B24Progress.json',
  '/api/component-meta/B24Separator.json',
  '/api/component-meta/B24Skeleton.json',
  // endregion ////
  // region Form ////
  '/api/component-meta/B24Checkbox.json',
  '/api/component-meta/B24CheckboxGroup.json',
  '/api/component-meta/B24ColorPicker.json',
  '/api/component-meta/B24FileUpload.json',
  '/api/component-meta/B24Form.json'
  // endregion ////
]

const apiComponentExample = [
  // region Index ////
  '/api/component-example/indexPromoV1.json',
  // endregion ////
  // region Layout ////
  '/api/component-example/sidebarLayoutExample.json',
  '/api/component-example/sidebarLayoutInnerExample.json',
  '/api/component-example/sidebarLayoutSlideoverExample.json',
  '/api/component-example/containerExample.json',
  // endregion ////
  // region Element ////
  '/api/component-example/adviceExample.json',
  '/api/component-example/avatarTooltipExample.json',
  '/api/component-example/avatarMaskExample.json',
  '/api/component-example/avatarGroupTooltipExample.json',
  '/api/component-example/avatarGroupChipExample.json',
  '/api/component-example/avatarGroupLinkExample.json',
  '/api/component-example/avatarGroupMaskExample.json',
  '/api/component-example/bannerExample.json',
  '/api/component-example/bannerWithTitleExample.json',
  '/api/component-example/buttonLoadingAutoExample.json',
  '/api/component-example/buttonLoadingAutoFormExample.json',
  '/api/component-example/calendarEventsExample.json',
  '/api/component-example/calendarDisabledDatesExample.json',
  '/api/component-example/calendarUnavailableDatesExample.json',
  '/api/component-example/calendarMinMaxDatesExample.json',
  '/api/component-example/calendarOtherSystemExample.json',
  '/api/component-example/calendarExternalControlsExample.json',
  '/api/component-example/calendarDatePickerExample.json',
  '/api/component-example/calendarDateRangePickerExample.json',
  '/api/component-example/cardExample.json',
  '/api/component-example/chipShowExample.json',
  '/api/component-example/collapsibleOpenExample.json',
  '/api/component-example/collapsibleIconExample.json',
  '/api/component-example/countdownInformationDisplayedExample.json',
  '/api/component-example/countdownIntervalExample.json',
  '/api/component-example/countdownEmitsExample.json',
  '/api/component-example/fieldGroupTooltipExample.json',
  '/api/component-example/fieldGroupDropdownExample.json',
  '/api/component-example/fieldGroupBadgeExample.json',
  '/api/component-example/skeletonExample.json',
  '/api/component-example/skeletonAccentExample.json',
  '/api/component-example/skeletonTaskExample.json',
  // endregion ////
  // region Form ////
  '/api/component-example/colorPickerChooserExample.json',
  '/api/component-example/fileUploadFormValidationExample.json',
  '/api/component-example/fileUploadDefaultSlotExample.json',
  '/api/component-example/fileUploadFilesBottomSlotExample.json',
  '/api/component-example/fileUploadFilesTopSlotExample.json',
  '/api/component-example/formExampleValibot.json',
  '/api/component-example/formExampleZod.json',
  '/api/component-example/formExampleYup.json',
  '/api/component-example/formExampleJoi.json',
  '/api/component-example/formExampleSuperstruct.json',
  '/api/component-example/formExampleBasic.json',
  '/api/component-example/formExampleElements.json',
  '/api/component-example/formExampleOnError.json',
  '/api/component-example/formExampleNested.json',
  '/api/component-example/formExampleNestedList.json'
  // endregion ////
]

const pagesFrameExamples = [
  '/examples/sidebar-layout-example/',
  '/examples/sidebar-layout-inner-example/',
  '/examples/banner-example/',
  '/examples/banner-with-title-example/'
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

  ssr: false,

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
        ...apiComponentMeta,
        ...apiComponentExample,
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
      include: ['@internationalized/date', '@vueuse/shared', '@vueuse/integrations/useFuse', '@tanstack/vue-table', 'reka-ui', 'reka-ui/namespaced', 'embla-carousel-vue', 'embla-carousel-autoplay', 'embla-carousel-auto-scroll', 'embla-carousel-auto-height', 'embla-carousel-class-names', 'embla-carousel-fade', 'embla-carousel-wheel-gestures', 'colortranslator', 'tailwindcss/colors', 'tailwind-variants', 'ufo', 'zod', 'vaul-vue', 'scule', 'motion-v', 'json5', 'ohash', 'shiki-transformer-color-highlight']
    }
  },

  // debug: true,

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
