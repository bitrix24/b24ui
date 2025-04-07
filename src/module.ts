import { defu } from 'defu'
import { createResolver, defineNuxtModule, addComponentsDir, addImportsDir, addVitePlugin, addPlugin, installModule, hasNuxtModule } from '@nuxt/kit'
import { addTemplates } from './templates'
import { defaultOptions, getDefaultUiConfig } from './defaults'
import { name, version } from '../package.json'

export type * from './runtime/types'

export interface ModuleOptions {
  /**
   * Enable or disable `@nuxtjs/color-mode` module
   * @defaultValue `true`
   * @link https://bitrix24.github.io/b24ui/guide/color-mode-nuxt.html
   */
  colorMode?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    docs: 'https://bitrix24.github.io/b24ui/guide/installation-nuxt-app.html',
    configKey: 'b24ui',
    compatibility: {
      nuxt: '>=3.16.0'
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

    if (nuxt.options.builder === '@nuxt/vite-builder') {
      const plugin = await import('@tailwindcss/vite').then(r => r.default)
      addVitePlugin(plugin())
    } else {
      nuxt.options.postcss.plugins['@tailwindcss/postcss'] = {}
    }

    async function registerModule(name: string, key: string, options: Record<string, any>) {
      if (!hasNuxtModule(name)) {
        await installModule(name, options)
      } else {
        (nuxt.options as any)[key] = defu((nuxt.options as any)[key], options)
      }
    }

    if (options.colorMode) {
      await registerModule('@nuxtjs/color-mode', 'colorMode', { classSuffix: '', disableTransition: true })
    }

    addPlugin({ src: resolve('./runtime/plugins/colors') })

    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: 'B24',
      pathPrefix: false
    })

    addComponentsDir({
      path: resolve('./runtime/prose'),
      prefix: 'Prose',
      pathPrefix: false
    })

    addImportsDir(resolve('./runtime/composables'))

    addTemplates(options, nuxt, resolve)
  }
})
