import { defu } from 'defu'
import { join, normalize } from 'pathe'
import { globSync } from 'tinyglobby'
import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin'
import AutoImportComponents from 'unplugin-vue-components'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'
import type { Bitrix24UIOptions } from '../unplugin'
import { runtimeDir } from '../unplugin'

/**
 * This plugin adds all the Bitrix24 UI components as auto-imports.
 */
export default function ComponentImportPlugin(
  options: Bitrix24UIOptions & { extraRuntimeDir?: string },
  meta: UnpluginContextMeta
) {
  const components = globSync('**/*.vue', {
    cwd: join(runtimeDir, 'components'),
    ignore: [
      !options.colorMode && 'color-mode/**/*.vue',
      'content/*.vue',
      'prose/**/*.vue'
    ].filter(Boolean) as string[]
  })
  const componentNames = new Set(components.map(c => `B24${c.split('/').pop()?.replace(/\.vue$/, '')}`))
  const componentPaths = new Map(components.map((c) => {
    const name = c.replace(/\.vue$/, '')
    const componentName = `B24${name.split('/').pop()}`
    return [componentName, c]
  }))

  // @memo import Prose* all time
  const componentsProse = globSync('**/*.vue', {
    cwd: join(runtimeDir, 'components/prose')
  })
  const componentProseNames = new Set(componentsProse.map(c => `Prose${c.replace(/\.vue$/, '')}`))

  const overrides = globSync('**/*.vue', {
    cwd: join(runtimeDir, 'vue/components'),
    ignore: [
      !options.colorMode && 'color-mode/**/*.vue'
    ].filter(Boolean) as string[]
  })
  const overrideNames = new Set(overrides.map(c => `B24${c.split('/').pop()?.replace(/\.vue$/, '')}`))

  const inertiaOverrides = globSync('**/*.vue', {
    cwd: join(runtimeDir, 'inertia/components')
  })
  const inertiaOverrideNames = new Set(inertiaOverrides.map(c => `B24${c.replace(/\.vue$/, '')}`))

  const pluginOptions = defu(options.components, <ComponentsOptions>{
    dts: options.dts ?? true,
    exclude: [
      /[\\/]node_modules[\\/](?!\.pnpm|@bitrix24\/b24ui-nuxt|@compodium\/examples)/,
      /[\\/]\.git[\\/]/,
      /[\\/]\.nuxt[\\/]/
    ],
    resolvers: [
      (componentName) => {
        if (options.inertia && inertiaOverrideNames.has(componentName)) {
          return { name: 'default', from: join(runtimeDir, 'inertia/components', `${componentName.slice('B24'.length)}.vue`) }
        }
        if (overrideNames.has(componentName))
          return { name: 'default', from: join(runtimeDir, 'vue/components', `${componentName.slice('B24'.length)}.vue`) }
        if (componentNames.has(componentName)) {
          const relativePath = componentPaths.get(componentName)
          return { name: 'default', from: join(runtimeDir, 'components', `${componentName.slice('B24'.length)}.vue`, relativePath as string) }
        }
        // @memo import Prose* all time
        if (componentProseNames.has(componentName))
          return { name: 'default', from: join(runtimeDir, 'components/prose', `${componentName.slice('Prose'.length)}.vue`) }
      }
    ]
  })

  return [
    /**
     * This plugin aims to ensure we override certain components with Vue-compatible versions:
     * <B24Link> currently.
     */
    {
      name: 'bitrix24:b24ui:components',
      enforce: 'pre',
      resolveId(id, importer) {
        // only apply to runtime nuxt b24ui components
        if (!importer || !normalize(importer).includes(runtimeDir)) {
          return
        }

        // only apply to relative imports
        if (!RELATIVE_IMPORT_RE.test(id)) {
          return
        }

        const filename = id.match(/([^/]+)\.vue$/)?.[1]
        if (filename && options.inertia && inertiaOverrideNames.has(`B24${filename}`)) {
          return join(runtimeDir, 'inertia/components', `${filename}.vue`)
        }
        if (filename && overrideNames.has(`B24${filename}`)) {
          return join(runtimeDir, 'vue/components', `${filename}.vue`)
        }
      }
    },
    AutoImportComponents.raw(pluginOptions, meta) as UnpluginOptions
  ] satisfies UnpluginOptions[]
}

const RELATIVE_IMPORT_RE = /^\.{1,2}\//
