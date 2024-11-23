import { defu } from 'defu'
import { createResolver, defineNuxtModule, addComponentsDir, addImportsDir, addVitePlugin, addPlugin, installModule, extendPages, hasNuxtModule } from '@nuxt/kit'
import { addTemplates, buildTemplates } from './templates'
import { addCustomTab, startSubprocess } from '@nuxt/devtools-kit'
import sirv from 'sirv'
import { getPort } from 'get-port-please'
import { devtoolsMetaPlugin } from './devtools/meta'
import { defaultOptions, getDefaultUiConfig } from './defaults'

export type * from './runtime/types'

export interface ModuleOptions {
  /**
   * Enable or disable `@nuxtjs/color-mode` module
   * @defaultValue `true`
   * @link https://ui3.nuxt.dev/getting-started/installation#colormode
   */
  colorMode?: boolean
  /**
   * Configuration for the Bitrix24 UI devtools.
   */
  devtools?: {
    /**
     * Enable or disable Bitrix24 UI devtools.
     * @defaultValue `true`
     */
    enabled?: boolean
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'b24ui',
    configKey: 'b24ui',
    compatibility: {
      nuxt: '>=3.13.1'
    },
    docs: 'https://bitrix24.github.io/b24ui/guide/installation-nuxt-app.html'
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

    if (nuxt.options.builder === '@nuxt/vite-builder') {
      const plugin = await import('@tailwindcss/vite').then(r => r.default)
      addVitePlugin(plugin())
    } else {
      nuxt.options.postcss.plugins['@tailwindcss/postcss'] = {}
    }

    async function registerModule(name: string, options: Record<string, any>) {
      if (!hasNuxtModule(name)) {
        await installModule(name, options)
      } else {
        (nuxt.options as any)[name] = defu((nuxt.options as any)[name], options)
      }
    }

    // await registerModule('@nuxt/icon', { cssLayer: 'components' })
    if (options.colorMode) {
      await registerModule('@nuxtjs/color-mode', { classSuffix: '', disableTransition: true })
    }

    addPlugin({ src: resolve('./runtime/plugins/colors') })
    addPlugin({ src: resolve('./runtime/plugins/modal') })
    addPlugin({ src: resolve('./runtime/plugins/slideover') })

    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: 'B24',
      pathPrefix: false
    })

    addImportsDir(resolve('./runtime/composables'))

    addTemplates(options, nuxt, resolve)

    if (nuxt.options.dev && nuxt.options.devtools.enabled && options.devtools?.enabled) {
      const templates = buildTemplates(options)
      nuxt.options.vite = defu(nuxt.options?.vite, { plugins: [devtoolsMetaPlugin({ resolve, templates, options })] })

      // Runs UI devtools in a subprocess for local development
      if (process.env.BITRIX24_UI_DEVTOOLS_LOCAL) {
        const PORT = await getPort({ port: 42124 })
        nuxt.hook('app:resolve', () => {
          startSubprocess(
            {
              command: 'pnpm',
              args: ['nuxi', 'dev'],
              cwd: './devtools',
              stdio: 'pipe',
              env: {
                PORT: PORT.toString()
              }
            },
            {
              id: 'b24ui:devtools:local',
              name: 'Bitrix24 UI DevTools Local',
              icon: 'logos-bitrix24-icon'
            },
            nuxt
          )
        })

        nuxt.hook('vite:extendConfig', (config) => {
          config.server ||= {}
          config.server.proxy ||= {}
          config.server.proxy['/__bitrix24_ui__/devtools'] = {
            target: `http://localhost:${PORT}`,
            changeOrigin: true,
            followRedirects: true,
            ws: true,
            rewriteWsOrigin: true
          }
        })
      } else {
        nuxt.hook('vite:serverCreated', async (server) => {
          server.middlewares.use('/__bitrix24_ui__/devtools', sirv(resolve('../dist/client/devtools'), {
            single: true,
            dev: true
          }))
        })
      }

      nuxt.options.routeRules = defu(nuxt.options.routeRules, { '/__bitrix24_ui__/**': { ssr: false } })
      extendPages((pages) => {
        if (pages.length) {
          pages.unshift({
            name: 'b24ui-devtools',
            path: '/__bitrix24_ui__/components/:slug',
            file: resolve('./devtools/runtime/DevtoolsRenderer.vue'),
            meta: {
              // https://github.com/nuxt/nuxt/pull/29366
              // isolate: true
              layout: false
            }
          })
        }
      })

      addCustomTab({
        name: 'bitrix24-ui',
        title: 'Bitrix24 UI',
        icon: '/__bitrix24_ui__/devtools/favicon.svg',
        view: {
          type: 'iframe',
          src: '/__bitrix24_ui__/devtools'
        }
      })
    }
  }
})
