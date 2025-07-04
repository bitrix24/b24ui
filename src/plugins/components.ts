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
  options: Bitrix24UIOptions & { extraRuntimeDir?: string },
  meta: UnpluginContextMeta
) {
  const components = globSync('**/*.vue', { cwd: join(runtimeDir, 'components') })
  const componentNames = new Set(components.map(c => `B24${c.replace(/\.vue$/, '')}`))

  const componentsContent = globSync('**/*.vue', { cwd: join(runtimeDir, 'components/content') })
  const componentContentNames = new Set(componentsContent.map(c => `B24${c.replace(/\.vue$/, '')}`))

  const inertiaOverrides = globSync('**/*.vue', { cwd: join(runtimeDir, 'inertia/components') })
  const inertiaOverrideNames = new Set(inertiaOverrides.map(c => `B24${c.replace(/\.vue$/, '')}`))

  const componentsProse = globSync('**/*.vue', { cwd: join(runtimeDir, 'prose') })
  const componentProseNames = new Set(componentsProse.map(c => `Prose${c.replace(/\.vue$/, '')}`))

  const overrides = globSync('**/*.vue', { cwd: join(runtimeDir, 'vue/components') })
  const overrideNames = new Set(overrides.map(c => `B24${c.replace(/\.vue$/, '')}`))

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
        if (!importer) {
          return
        }
        if (!normalize(importer).includes(runtimeDir) && (!options.extraRuntimeDir || !normalize(importer).includes(options.extraRuntimeDir))) {
          return
        }

        // only apply to relative imports or bitrix24 ui runtime components
        if (!RELATIVE_IMPORT_RE.test(id) && !id.startsWith('@bitrix24/b24ui-nuxt/components/')) {
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
