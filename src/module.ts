import type { HookResult } from '@nuxt/schema'
import type { ColorModeType, ColorModeTypeLight } from './runtime/types'
import { defu } from 'defu'
import { createResolver, defineNuxtModule, addComponentsDir, addImportsDir, addPlugin, installModule, hasNuxtModule } from '@nuxt/kit'
import { addTemplates } from './templates'
import { defaultOptions, getDefaultConfig } from './utils/defaults'
import { name, version } from '../package.json'

export type * from './runtime/types'

// type Color = 'air-primary' | 'air-secondary' | 'air-tertiary' | 'air-primary-success' | 'air-primary-warning' | 'air-primary-alert' | 'air-primary-copilot' | 'air-secondary-accent' | 'air-secondary-accent-1' | (string & {})
// type Size = 'xss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {})

export interface ModuleOptions {
  /**
   * Enable or disable `@vueuse/core` color-mode integration
   * @memo We not use `@nuxtjs/color-mode`
   * @defaultValue `true`
   * @link https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/#colormode
   */
  colorMode?: boolean
  colorModeInitialValue?: ColorModeType
  colorModeTypeLight?: ColorModeTypeLight
  version?: string
  /**
   * Customize how the theme is generated
   * @see https://bitrix24.github.io/b24ui/docs/getting-started/theme/design-system/
   */
  theme?: {
    /**
     * Prefix for Tailwind CSS utility classes
     * @see https://bitrix24.github.io/b24ui/docs/getting-started/installation/nuxt/#themeprefix
     * @example 'tw'
     */
    prefix?: string
  }

  /**
   * Force the import of prose components even if `@nuxtjs/mdc` or `@nuxt/content` are not installed
   * @defaultValue true
   */
  mdc?: boolean
  /**
   * Force the import of content & prose components even if `@nuxt/content` is not installed
   * @defaultValue false
   */
  content?: boolean

  /**
   * Experimental features
   */
  experimental?: {
    /**
     * Enable automatic component detection for tree-shaking
     * Only generates theme files for components actually used in your app
     * - `true`: Enable automatic detection
     * - `string[]`: Enable detection and include additional components (useful for dynamic components)
     * @defaultValue false
     * @example true
     * @example ['Modal', 'Dropdown']
     */
    componentDetection?: boolean | string[]
  }
}

declare module '#app' {
  interface RuntimeNuxtHooks {
    'dashboard:search:toggle': () => HookResult
    'dashboard:sidebar:toggle': () => HookResult
    'dashboard:sidebar:collapse': (value: boolean) => HookResult
    'dashboard:content:load': (value: boolean, contextId?: string) => HookResult
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

    options.theme = options.theme || {}
    // options.theme.colors = resolveColors(options.theme.colors)

    nuxt.options.b24ui = options

    nuxt.options.alias['#b24ui'] = resolve('./runtime')

    nuxt.options.appConfig.version = version
    nuxt.options.appConfig.b24ui = defu(nuxt.options.appConfig.b24ui || {}, getDefaultConfig(options.theme))

    // Isolate root node from portaled components
    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {}
    nuxt.options.app.rootAttrs.class = [nuxt.options.app.rootAttrs.class, `${options.theme?.prefix ? options.theme.prefix + ':' : ''}isolate`].filter(Boolean).join(' ')

    nuxt.hook('vite:extend', async ({ config }) => {
      const plugin = await import('@tailwindcss/vite').then(r => r.default)
      config.plugins ||= []
      // @ts-expect-error - Vite Plugin type mismatch between @tailwindcss/vite and @nuxt/vite-builder
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

    await registerModule('@bitrix24/b24icons-nuxt', 'empty', {})

    addPlugin({ src: resolve('./runtime/plugins/colors') })
    addPlugin({ src: resolve('./runtime/plugins/ui-version') })
    addPlugin({ src: resolve('./runtime/plugins/platform') })

    if ((hasNuxtModule('@nuxtjs/mdc') || options.mdc) || (hasNuxtModule('@nuxt/content') || options.content)) {
      nuxt.options.mdc = defu(nuxt.options.mdc, {
        highlight: {
          theme: {
            light: 'material-theme-lighter',
            default: 'material-theme',
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
            'card-group': 'ProseCardGroup',
            'caution': 'ProseCaution',
            'code-collapse': 'ProseCodeCollapse',
            'code-group': 'ProseCodeGroup',
            'code-icon': 'ProseCodeIcon',
            'code-preview': 'ProseCodePreview',
            // @todo add
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

    // region ColorMode ////
    if (options.colorMode) {
      addComponentsDir({
        path: resolve('./runtime/components/color-mode'),
        pathPrefix: false,
        prefix: 'B24'
      })
    }
    // Stub `useColorMode` composable used in `DashboardSearch` and `ContentSearch` components
    addImportsDir(resolve('./runtime/composables/color-mode'))
    // endregion ////

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
