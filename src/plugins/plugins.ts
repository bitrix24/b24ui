import MagicString from 'magic-string'
import { genSafeVariableName } from 'knitwork'
import { resolvePathSync } from 'mlly'
import { join } from 'pathe'
import { globSync } from 'tinyglobby'
import type { UnpluginOptions } from 'unplugin'
import { runtimeDir } from '../unplugin'
import type { Bitrix24UIOptions } from '../unplugin'

/**
 * This plugin provides the necessary transforms to allow loading the
 * Bitrix24 UI _Bitrix24_ plugins in `src/runtime/plugins/` in a pure Vue environment.
 */
export default function PluginsPlugin(options: Bitrix24UIOptions) {
  const plugins = globSync(['**/*', '!*.d.ts'], { cwd: join(runtimeDir, 'plugins'), absolute: true })

  plugins.unshift(resolvePathSync('../runtime/vue/plugins/router', { extensions: ['.ts', '.mjs', '.js'], url: import.meta.url }))
  plugins.unshift(resolvePathSync('../runtime/vue/plugins/head', { extensions: ['.ts', '.mjs', '.js'], url: import.meta.url }))

  if (options.colorMode) {
    plugins.push(resolvePathSync('../runtime/vue/plugins/color-mode', { extensions: ['.ts', '.mjs', '.js'], url: import.meta.url }))
  }

  return {
    name: 'bitrix24:b24ui:plugins',
    enforce: 'pre',
    resolveId(id) {
      if (id === '@bitrix24/b24ui-nuxt/vue-plugin') {
        return 'virtual:bitrix24-ui-plugins'
      }
    },
    transform(code, id) {
      if (plugins.some(p => id.startsWith(p)) && code.includes('import.meta.client')) {
        const s = new MagicString(code)
        s.replaceAll('import.meta.client', 'true')

        if (s.hasChanged()) {
          return {
            code: s.toString(),
            map: s.generateMap({ hires: true })
          }
        }
      }
    },
    loadInclude: id => id === 'virtual:bitrix24-ui-plugins',
    load() {
      return `
        ${plugins.map(p => `import ${genSafeVariableName(p)} from "${p}"`).join('\n')}

export default {
  install (app, pluginOptions = {}) {
${plugins.map(p => `    app.use(${genSafeVariableName(p)}, pluginOptions)`).join('\n')}
  }
}
        `
    },
    // Argument Vite specific configuration
    vite: {
      config() {
        return {
          // Opt-out Bitrix24 UI from Vite's pre-bundling,
          // as we need Vite's pipeline to resolve imports like `#imports`
          optimizeDeps: {
            exclude: ['@bitrix24/b24ui-nuxt']
          }
        }
      }
    }
  } satisfies UnpluginOptions
}
