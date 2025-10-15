import { createResolver } from '@nuxt/kit'
import pkg from '../package.json'
import { withoutTrailingSlash } from 'ufo'

const { resolve } = createResolver(import.meta.url)

/**
 * @memo need add pages for raw/***.md
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
  '/docs/components/form/',
  '/docs/components/checkbox/',
  '/docs/components/checkbox-group/',
  '/docs/components/color-picker/',
  '/docs/components/file-upload/',
  '/docs/components/form-field/',
  '/docs/components/input/',
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
  '/docs/components/page-links/',
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
  '/docs/composables/use-confetti/'
  // endregion ////
]

// const apiComponentMeta = [
//   // region Layout ////
//   '/api/component-meta/B24App.json',
//   '/api/component-meta/B24SidebarLayout.json',
//   '/api/component-meta/B24Container.json',
//   '/api/component-meta/B24Error.json',
//   // endregion ////
//   // region Element ////
//   '/api/component-meta/B24Advice.json',
//   '/api/component-meta/B24Alert.json',
//   '/api/component-meta/B24Avatar.json',
//   '/api/component-meta/B24AvatarGroup.json',
//   '/api/component-meta/B24Badge.json',
//   '/api/component-meta/B24Banner.json',
//   '/api/component-meta/B24Button.json',
//   '/api/component-meta/B24Calendar.json',
//   '/api/component-meta/B24Card.json',
//   '/api/component-meta/B24Chip.json',
//   '/api/component-meta/B24Collapsible.json',
//   '/api/component-meta/B24Countdown.json',
//   '/api/component-meta/B24FieldGroup.json',
//   '/api/component-meta/B24Collapsible.json',
//   '/api/component-meta/B24Collapsible.json',
//   '/api/component-meta/B24Kbd.json',
//   '/api/component-meta/B24Progress.json',
//   '/api/component-meta/B24Separator.json',
//   '/api/component-meta/B24Skeleton.json',
//   // endregion ////
//   // region Form ////
//   '/api/component-meta/B24Form.json',
//   '/api/component-meta/B24Checkbox.json',
//   '/api/component-meta/B24CheckboxGroup.json',
//   '/api/component-meta/B24ColorPicker.json',
//   '/api/component-meta/B24FileUpload.json',
//   '/api/component-meta/B24FormField.json',
//   '/api/component-meta/B24Input.json',
//   '/api/component-meta/B24InputMenu.json',
//   '/api/component-meta/B24InputNumber.json',
//   '/api/component-meta/B24InputTags.json',
//   '/api/component-meta/B24PinInput.json',
//   '/api/component-meta/B24RadioGroup.json',
//   '/api/component-meta/B24Range.json',
//   '/api/component-meta/B24Select.json',
//   '/api/component-meta/B24SelectMenu.json',
//   '/api/component-meta/B24Switch.json',
//   '/api/component-meta/B24Textarea.json'
//   // endregion ////
// ]
//
// const apiComponentExample = [
//   // region Index ////
//   '/api/component-example/indexPromoV1.json',
//   // endregion ////
//   // region Layout ////
//   '/api/component-example/sidebarLayoutExample.json',
//   '/api/component-example/sidebarLayoutInnerExample.json',
//   '/api/component-example/sidebarLayoutSlideoverExample.json',
//   '/api/component-example/containerExample.json',
//   // endregion ////
//   // region Element ////
//   '/api/component-example/adviceExample.json',
//   '/api/component-example/avatarTooltipExample.json',
//   '/api/component-example/avatarMaskExample.json',
//   '/api/component-example/avatarGroupTooltipExample.json',
//   '/api/component-example/avatarGroupChipExample.json',
//   '/api/component-example/avatarGroupLinkExample.json',
//   '/api/component-example/avatarGroupMaskExample.json',
//   '/api/component-example/bannerExample.json',
//   '/api/component-example/bannerWithTitleExample.json',
//   '/api/component-example/buttonLoadingAutoExample.json',
//   '/api/component-example/buttonLoadingAutoFormExample.json',
//   '/api/component-example/calendarEventsExample.json',
//   '/api/component-example/calendarDisabledDatesExample.json',
//   '/api/component-example/calendarUnavailableDatesExample.json',
//   '/api/component-example/calendarMinMaxDatesExample.json',
//   '/api/component-example/calendarOtherSystemExample.json',
//   '/api/component-example/calendarExternalControlsExample.json',
//   '/api/component-example/calendarDatePickerExample.json',
//   '/api/component-example/calendarDateRangePickerExample.json',
//   '/api/component-example/cardExample.json',
//   '/api/component-example/chipShowExample.json',
//   '/api/component-example/collapsibleOpenExample.json',
//   '/api/component-example/collapsibleIconExample.json',
//   '/api/component-example/countdownInformationDisplayedExample.json',
//   '/api/component-example/countdownIntervalExample.json',
//   '/api/component-example/countdownEmitsExample.json',
//   '/api/component-example/fieldGroupTooltipExample.json',
//   '/api/component-example/fieldGroupDropdownExample.json',
//   '/api/component-example/fieldGroupBadgeExample.json',
//   '/api/component-example/skeletonExample.json',
//   '/api/component-example/skeletonAccentExample.json',
//   '/api/component-example/skeletonTaskExample.json',
//   // endregion ////
//   // region Form ////
//   '/api/component-example/colorPickerChooserExample.json',
//   '/api/component-example/fileUploadFormValidationExample.json',
//   '/api/component-example/fileUploadDefaultSlotExample.json',
//   '/api/component-example/fileUploadFilesBottomSlotExample.json',
//   '/api/component-example/fileUploadFilesTopSlotExample.json',
//   '/api/component-example/formExampleValibot.json',
//   '/api/component-example/formExampleZod.json',
//   '/api/component-example/formExampleYup.json',
//   '/api/component-example/formExampleJoi.json',
//   '/api/component-example/formExampleSuperstruct.json',
//   '/api/component-example/formExampleBasic.json',
//   '/api/component-example/formExampleElements.json',
//   '/api/component-example/formExampleOnError.json',
//   '/api/component-example/formExampleNested.json',
//   '/api/component-example/formExampleNestedList.json',
//   '/api/component-example/inputClearButtonExample.json',
//   '/api/component-example/inputCopyButtonExample.json',
//   '/api/component-example/inputPasswordToggleExample.json',
//   '/api/component-example/inputPasswordStrengthIndicatorExample.json',
//   '/api/component-example/inputCharacterLimitExample.json',
//   '/api/component-example/inputKbdExample.json',
//   '/api/component-example/inputMaskExample.json',
//   '/api/component-example/inputFloatingLabelExample.json',
//   '/api/component-example/inputFormFieldExample.json',
//   '/api/component-example/inputFieldGroupExample.json',
//   '/api/component-example/inputMenuItemsColorExample.json',
//   '/api/component-example/inputMenuItemsIconExample.json',
//   '/api/component-example/inputMenuItemsAvatarExample.json',
//   '/api/component-example/inputMenuItemsChipExample.json',
//   '/api/component-example/inputMenuOpenExample.json',
//   '/api/component-example/inputMenuOpenFocusExample.json',
//   '/api/component-example/inputMenuSearchTermExample.json',
//   '/api/component-example/inputMenuIconExample.json',
//   '/api/component-example/inputMenuCreateItemExample.json',
//   '/api/component-example/inputMenuFetchExample.json',
//   '/api/component-example/inputMenuIgnoreFilterExample.json',
//   '/api/component-example/inputMenuFilterFieldsExample.json',
//   '/api/component-example/inputMenuContentWidthExample.json',
//   '/api/component-example/inputMenuCountriesExample.json',
//   '/api/component-example/inputNumberDecimalExample.json',
//   '/api/component-example/inputNumberPercentageExample.json',
//   '/api/component-example/inputNumberCurrencyExample.json',
//   '/api/component-example/inputNumberFormFieldExample.json',
//   '/api/component-example/inputNumberSlotsExample.json',
//   '/api/component-example/inputTagsFormFieldExample.json',
//   '/api/component-example/selectItemsIconExample.json',
//   '/api/component-example/selectItemsAvatarExample.json',
//   '/api/component-example/selectItemsChipExample.json',
//   '/api/component-example/selectOpenExample.json',
//   '/api/component-example/selectIconExample.json',
//   '/api/component-example/selectFetchExample.json',
//   '/api/component-example/selectContentWidthExample.json',
//   '/api/component-example/selectItemsColorExample.json',
//   '/api/component-example/selectMenuItemsColorExample.json',
//   '/api/component-example/selectMenuItemsIconExample.json',
//   '/api/component-example/selectMenuItemsAvatarExample.json',
//   '/api/component-example/selectMenuItemsChipExample.json',
//   '/api/component-example/selectMenuOpenExample.json',
//   '/api/component-example/selectMenuSearchTermExample.json',
//   '/api/component-example/selectMenuIconExample.json',
//   '/api/component-example/selectMenuCreateItemExample.json',
//   '/api/component-example/selectMenuFetchExample.json',
//   '/api/component-example/selectMenuIgnoreFilterExample.json',
//   '/api/component-example/selectMenuFilterFieldsExample.json',
//   '/api/component-example/selectMenuContentWidthExample.json',
//   '/api/component-example/selectMenuCountriesExample.json'
//   // endregion ////
// ]

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
        // ...pages.map((page: string) => `${page}`),
        // @todo remove this comment
        // @memo fix EMFILE: too many open files
        ...pages.map((page: string) => `${withoutTrailingSlash(`/raw${page}`)}.md`),
        // ...apiComponentMeta,
        // ...apiComponentExample,
        ...pagesFrameExamples,
        ...pagesService
      ],
      crawlLinks: true,
      autoSubfolderIndex: false
    }
  },

  vite: {
    // @todo remove this
    // server: {
    //   // @memo fix EMFILE: too many open files
    //   watch: {
    //     usePolling: true,
    //     interval: 1000
    //   }
    // }
    optimizeDeps: {
      // @todo remove this
      // @memo fix EMFILE: too many open files
      // force: true,
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
