import { defu } from 'defu'
import { createResolver, defineNuxtModule, addComponentsDir, addImportsDir, addPlugin, installModule, hasNuxtModule } from '@nuxt/kit'
import type { HookResult } from '@nuxt/schema'
import { addTemplates } from './templates'
import { defaultOptions, getDefaultUiConfig } from './defaults'
import { name, version } from '../package.json'

export type * from './runtime/types'

// type Color = 'air-primary' | 'air-secondary' | 'air-tertiary' | 'air-primary-success' | 'air-primary-warning' | 'air-primary-alert' | 'air-primary-copilot' | 'air-secondary-accent' | 'air-secondary-accent-1' | (string & {})
// type Size = 'xss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {})

export interface ModuleOptions {
  /**
   * Enable or disable `@nuxtjs/color-mode` module
   * @defaultValue `true`
   * @link https://bitrix24.github.io/b24ui/guide/color-mode-nuxt.html
   */
  colorMode?: boolean
  version?: string
  /**
   * Force the import of prose components even if `@nuxtjs/mdc` or `@nuxt/content` are not installed
   * @defaultValue false
   */
  mdc?: boolean
  /**
   * Force the import of content & prose components even if `@nuxt/content` is not installed
   * @defaultValue true
   */
  content?: boolean
}

declare module '#app' {
  interface RuntimeNuxtHooks {
    'dashboard:search:toggle': () => HookResult
    'dashboard:sidebar:toggle': () => HookResult
    'dashboard:sidebar:collapse': (value: boolean) => HookResult
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    docs: 'https://bitrix24.github.io/b24ui/guide/installation-nuxt-app.html',
    configKey: 'b24ui',
    compatibility: {
      nuxt: '>=4.0.0'
    }
  },
  defaults: defaultOptions,
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // options.theme = options.theme || {}
    // options.theme.colors = resolveColors(options.theme.colors)

    nuxt.options.b24ui = options

    nuxt.options.alias['#b24ui'] = resolve('./runtime')

    nuxt.options.appConfig.b24ui = defu(nuxt.options.appConfig.b24ui || {}, getDefaultUiConfig())

    // Isolate root node from portaled components
    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {}
    nuxt.options.app.rootAttrs.class = [nuxt.options.app.rootAttrs.class, 'isolate'].filter(Boolean).join(' ')

    nuxt.hook('vite:extend', async ({ config }) => {
      const plugin = await import('@tailwindcss/vite').then(r => r.default)
      config.plugins ||= []
      config.plugins.push(plugin())
    })
    if (nuxt.options.builder !== '@nuxt/vite-builder') {
      nuxt.options.postcss.plugins['@tailwindcss/postcss'] = {}
    }

    async function registerModule(name: string, key: string, options: Record<string, any>) {
      if (!hasNuxtModule(name)) {
        await installModule(name, defu((nuxt.options as any)[key], options))
      } else {
        (nuxt.options as any)[key] = defu((nuxt.options as any)[key], options)
      }
    }

    if (options.colorMode) {
      await registerModule('@nuxtjs/color-mode', 'colorMode', {
        classSuffix: '',
        disableTransition: true
      })
    }

    addPlugin({ src: resolve('./runtime/plugins/colors') })
    addPlugin({ src: resolve('./runtime/plugins/ui-version') })

    if ((hasNuxtModule('@nuxtjs/mdc') || options.mdc) || (hasNuxtModule('@nuxt/content') || options.content)) {
      nuxt.options.mdc = defu(nuxt.options.mdc, {
        highlight: {
          theme: {
            light: 'material-theme-palenight', // 'material-theme-lighter',
            default: 'material-theme-palenight', // 'material-theme',
            dark: 'material-theme-palenight'
          }
        },
        components: {
          map: {
            'accordion': 'ProseAccordion',
            'accordion-item': 'ProseAccordionItem',
            'badge': 'ProseBadge',
            'callout': 'ProseCallout',
            'card': 'ProseCard',
            // 'card-group': 'ProseCardGroup',
            // @todo add
            'caution': 'ProseCaution',
            'code-collapse': 'ProseCodeCollapse',
            // 'code-group': 'ProseCodeGroup',
            'code-icon': 'ProseCodeIcon',
            // 'code-preview': 'ProseCodePreview',
            // 'code-tree': 'ProseCodeTree',
            'collapsible': 'ProseCollapsible',
            'field': 'ProseField',
            'field-group': 'ProseFieldGroup',
            // 'icon': 'ProseIcon',
            'kbd': 'ProseKbd',
            'note': 'ProseNote',
            'steps': 'ProseSteps',
            'tabs': 'ProseTabs',
            'tabs-item': 'ProseTabsItem',
            'tip': 'ProseTip',
            'warning': 'ProseWarning'
          }
        }
      })

      addComponentsDir({
        path: resolve('./runtime/components/prose'),
        pathPrefix: false,
        prefix: 'Prose',
        global: true
      })
    }

    if ((hasNuxtModule('@nuxt/content') || options.content)) {
      addComponentsDir({
        path: resolve('./runtime/components/content'),
        pathPrefix: false,
        prefix: 'B24'
      })
    }

    if (hasNuxtModule('@nuxtjs/color-mode')) {
      addComponentsDir({
        path: resolve('./runtime/components/color-mode'),
        pathPrefix: false,
        prefix: 'B24'
      })
    } else {
      // Stub `useColorMode` composable used in `DashboardSearch` and `ContentSearch` components
      addImportsDir(resolve('./runtime/composables/color-mode'))
    }

    addComponentsDir({
      path: resolve('./runtime/components'),
      pathPrefix: false,
      prefix: 'B24',
      ignore: ['color-mode/**', 'content/**', 'prose/**']
    })

    addImportsDir(resolve('./runtime/composables'))

    addTemplates(options, nuxt, resolve)
  }
})
