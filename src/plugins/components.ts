import { join, normalize } from 'pathe'
import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin'
import { globSync } from 'tinyglobby'
import AutoImportComponents from 'unplugin-vue-components'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'

import { runtimeDir } from '../unplugin'
import type { Bitrix24UIOptions } from '../unplugin'
import { defu } from 'defu'

/**
 * This plugin adds all the Bitrix24 UI components as auto-imports.
 */
export default function ComponentImportPlugin(
  options: Bitrix24UIOptions,
  meta: UnpluginContextMeta
) {
  const components = globSync('**/*.vue', { cwd: join(runtimeDir, 'components') })
  const componentNames = new Set(components.map(c => `B24${c.replace(/\.vue$/, '')}`))

  const componentsContent = globSync('**/*.vue', { cwd: join(runtimeDir, 'components/content') })
  const componentContentNames = new Set(componentsContent.map(c => `B24${c.replace(/\.vue$/, '')}`))

  const componentsProse = globSync('**/*.vue', { cwd: join(runtimeDir, 'prose') })
  const componentProseNames = new Set(componentsProse.map(c => `Prose${c.replace(/\.vue$/, '')}`))

  const overrides = globSync('**/*.vue', { cwd: join(runtimeDir, 'vue/components') })
  const overrideNames = new Set(overrides.map(c => `B24${c.replace(/\.vue$/, '')}`))

  const pluginOptions = defu(options.components, <ComponentsOptions>{
    dts: options.dts ?? true,
    exclude: [/[\\/]node_modules[\\/](?!\.pnpm|@nuxt\/ui)/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      (componentName) => {
        if (overrideNames.has(componentName))
          return { name: 'default', from: join(runtimeDir, 'vue/components', `${componentName.slice('B24'.length)}.vue`) }
        if (componentProseNames.has(componentName))
          return { name: 'default', from: join(runtimeDir, 'prose', `${componentName.slice('Prose'.length)}.vue`) }
        if (componentContentNames.has(componentName))
          return { name: 'default', from: join(runtimeDir, 'components/content', `${componentName.slice('B24'.length)}.vue`) }
        if (componentNames.has(componentName))
          return { name: 'default', from: join(runtimeDir, 'components', `${componentName.slice('B24'.length)}.vue`) }
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
        // only apply to runtime bitrix24 ui components
        if (!importer || !normalize(importer).includes(runtimeDir)) {
          return
        }

        // only apply to relative imports
        if (!RELATIVE_IMPORT_RE.test(id)) {
          return
        }

        const filename = id.match(/([^/]+)\.vue$/)?.[1]
        if (filename && overrideNames.has(`B24${filename}`)) {
          return join(runtimeDir, 'vue/components', `${filename}.vue`)
        }
      }
    },
    AutoImportComponents.raw(pluginOptions, meta) as UnpluginOptions
  ] satisfies UnpluginOptions[]
}

const RELATIVE_IMPORT_RE = /^\.{1,2}\//
