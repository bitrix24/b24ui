import { fileURLToPath } from 'node:url'

import { normalize } from 'pathe'
import type { UnpluginOptions } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'
import { defu } from 'defu'
import tailwind from '@tailwindcss/vite'

import type * as b24ui from '#build/b24ui'

import { defaultOptions, getDefaultUiConfig } from './defaults'
import type { ModuleOptions } from './module'

import TemplatePlugin from './plugins/templates'
import PluginsPlugin from './plugins/plugins'
import AppConfigPlugin from './plugins/app-config'
import ComponentImportPlugin from './plugins/components'
import Bitrix24EnvironmentPlugin from './plugins/bitrix24-environment'
import AutoImportPlugin from './plugins/auto-import'

import type { TVConfig } from './runtime/types/tv'

type AppConfigB24UI = {} & TVConfig<typeof b24ui>

export interface Bitrix24UIOptions extends Omit<ModuleOptions, 'colorMode'> {
  /** Whether to generate declaration files for auto-imported components. */
  dts?: boolean
  b24ui?: AppConfigB24UI
  /**
   * Enable or disable `@vueuse/core` color-mode integration
   * @defaultValue `true`
   */
  colorMode?: boolean
  /**
   * Override options for `unplugin-auto-import`
   */
  autoImport?: Partial<AutoImportOptions>
  /**
   * Override options for `unplugin-vue-components`
   */
  components?: Partial<ComponentsOptions>
  /**
   * Enables compatibility layer for InertiaJS
   */
  inertia?: boolean
}

export const runtimeDir = normalize(fileURLToPath(new URL('./runtime', import.meta.url)))

export const Bitrix24UIPlugin = createUnplugin<Bitrix24UIOptions | undefined>((_options = {}, meta) => {
  const options = defu(_options, { }, defaultOptions)

  const appConfig = defu({ b24ui: options.b24ui, colorMode: options.colorMode }, { b24ui: getDefaultUiConfig() })

  return [
    Bitrix24EnvironmentPlugin(options),
    ComponentImportPlugin(options, meta),
    AutoImportPlugin(options, meta),
    tailwind(),
    PluginsPlugin(options),
    TemplatePlugin(options),
    AppConfigPlugin(options, appConfig),
    <UnpluginOptions>{
      name: 'bitrix24:b24ui:plugins-duplication-detection',
      vite: {
        configResolved(config) {
          const plugins = config.plugins || []

          if (plugins.filter(i => i.name === 'unplugin-auto-import').length > 1) {
            throw new Error('[Bitrix24 UI] Multiple instances of `unplugin-auto-import` detected. Bitrix24 UI includes `unplugin-auto-import` already, and you can configure it using `autoImport` option in Bitrix24 UI module options.')
          }
          if (plugins.filter(i => i.name === 'unplugin-vue-components').length > 1) {
            throw new Error('[Bitrix24 UI] Multiple instances of `unplugin-vue-components` detected. Bitrix24 UI includes `unplugin-vue-components` already, and you can configure it using `components` option in Bitrix24 UI module options.')
          }
        }
      }
    }
  ].flat(1) as UnpluginOptions[]
})
