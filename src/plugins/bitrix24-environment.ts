import MagicString from 'magic-string'
import { normalize } from 'pathe'
import { resolvePathSync } from 'mlly'
import type { UnpluginOptions } from 'unplugin'
import type { Bitrix24UIOptions } from '../unplugin'
import { runtimeDir } from '../unplugin'
import { resolveRouterMode } from '../utils/router'

/**
 * This plugin normalises Nuxt environment (#imports) and `import.meta.client` within the Bitrix24 UI components.
 */
export default function Bitrix24EnvironmentPlugin(options: Bitrix24UIOptions) {
  const routerMode = resolveRouterMode(options)
  const stubsPath = `../runtime/vue/stubs/${routerMode}`

  const stubPath = resolvePathSync(stubsPath, { extensions: ['.ts', '.mjs', '.js'], url: import.meta.url })

  return {
    name: 'bitrix24:b24ui',
    enforce: 'pre',
    resolveId(id) {
      // this is implemented here rather than in a vite `config` hook for cross-builder support
      if (id === '#imports') {
        return stubPath
      }
    },
    transformInclude(id) {
      return normalize(id).includes(runtimeDir)
    },
    transform(code) {
      if (code.includes('import.meta.client')) {
        const s = new MagicString(code)
        s.replaceAll('import.meta.client', 'true')

        if (s.hasChanged()) {
          return {
            code: s.toString(),
            map: s.generateMap({ hires: true })
          }
        }
      }
    }
  } satisfies UnpluginOptions
}
