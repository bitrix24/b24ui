import type { UnpluginOptions } from 'unplugin'
import type { Bitrix24UIOptions } from '../unplugin'

/**
 * This plugin injects Bitrix24 UI configuration into the runtime build so Bitrix24 UI components can
 * access it.
 */
export default function AppConfigPlugin(_options: Bitrix24UIOptions, appConfig: Record<string, any>) {
  return {
    name: 'bitrix24:b24ui:app-config',
    enforce: 'pre',
    resolveId(id) {
      if (id === '#build/app.config') {
        return 'virtual:bitrix24-ui-app-config'
      }
    },
    loadInclude: id => id === 'virtual:bitrix24-ui-app-config',
    load() {
      return `
          export default ${JSON.stringify(appConfig!)}
        `
    },
    vite: {
      config() {
        return {
          test: {
            server: {
              deps: {
                inline: ['@bitrix24/b24ui']
              }
            }
          }
        }
      }
    }
  } satisfies UnpluginOptions
}
