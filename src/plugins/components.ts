import { defu } from 'defu'
import { join, normalize } from 'pathe'
import { globSync } from 'tinyglobby'
import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin'
import AutoImportComponents from 'unplugin-vue-components'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'
import type { Bitrix24UIOptions } from '../unplugin'
import { runtimeDir } from '../unplugin'
import { resolveRouterMode } from '../utils/router'

interface ComponentSource {
  has: (name: string) => boolean
  resolve: (name: string) => { name: string, from: string } | undefined
  resolveFile: (filename: string) => string | undefined
}

function createComponentSource(cwd: string, prefix: string, ignore: string[] = []): ComponentSource {
  const files = globSync('**/*.vue', { cwd, ignore: ignore.filter(Boolean) as string[] })
  const names = new Set(files.map(c => `${prefix}${c.split('/').pop()?.replace(/\.vue$/, '')}`))
  const paths = new Map(files.map((c) => {
    const componentName = `${prefix}${c.split('/').pop()?.replace(/\.vue$/, '')}`
    return [componentName, c] as const
  }))

  return {
    has: name => names.has(name),
    resolve: (componentName) => {
      const relativePath = paths.get(componentName)
      if (!relativePath) return
      return { name: 'default', from: join(cwd, relativePath) }
    },
    resolveFile: (filename) => {
      const componentName = `${prefix}${filename}`
      const relativePath = paths.get(componentName)
      if (!relativePath) return
      return join(cwd, relativePath)
    }
  }
}

/**
 * This plugin adds all the Bitrix24 UI components as auto-imports.
 */
export default function ComponentImportPlugin(
  options: Bitrix24UIOptions,
  meta: UnpluginContextMeta
) {
  const colorModeIgnore = !options.colorMode ? ['color-mode/**/*.vue'] : []
  const routerMode = resolveRouterMode(options)

  // Component sources in priority order (first match wins)
  const routerOverrides: Record<string, ComponentSource> = {
    'vue-router': createComponentSource(join(runtimeDir, 'vue/overrides/vue-router'), 'B24'),
    'inertia': createComponentSource(join(runtimeDir, 'vue/overrides/inertia'), 'B24'),
    'none': createComponentSource(join(runtimeDir, 'vue/overrides/none'), 'B24')
  }

  const unpluginComponents = createComponentSource(
    join(runtimeDir, 'vue/components'),
    'B24',
    colorModeIgnore
  )

  const defaultComponents = createComponentSource(
    join(runtimeDir, 'components'),
    'B24',
    [...colorModeIgnore, 'content/*.vue', 'prose/**/*.vue']
  )

  // @memo import Prose* all time
  const defaultProseComponents = createComponentSource(
    join(runtimeDir, 'components/prose'),
    'Prose',
    []
  )

  const sources = [
    routerOverrides[routerMode],
    unpluginComponents,
    defaultComponents,
    defaultProseComponents
  ].filter((s): s is ComponentSource => !!s)
  const packagesToScan = [
    '@bitrix24/b24ui-nuxt',
    '@compodium/examples',
    ...(Array.isArray(options.scanPackages) ? options.scanPackages : [])
  ]
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const packagesRegex = packagesToScan.map(escapeRegex).join('|')
  const excludeRegex = new RegExp(`[\\\\/]node_modules[\\\\/](?!\\.pnpm|${packagesRegex})`)

  const pluginOptions = defu(options.components, <ComponentsOptions>{
    dts: options.dts ?? true,
    exclude: [
      excludeRegex,
      /[\\/]\.git[\\/]/,
      /[\\/]\.nuxt[\\/]/
    ],
    resolvers: [
      (componentName) => {
        for (const source of sources) {
          const resolved = source.resolve(componentName)
          if (resolved) return resolved
        }
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
        if (filename) {
          for (const source of sources) {
            const resolved = source.resolveFile(filename)
            if (resolved) return resolved
          }
        }
      }
    },
    AutoImportComponents.raw(pluginOptions, meta) as UnpluginOptions
  ] satisfies UnpluginOptions[]
}

const RELATIVE_IMPORT_RE = /^\.{1,2}\//
