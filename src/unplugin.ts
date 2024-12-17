import { fileURLToPath } from 'node:url'

import { join, normalize } from 'pathe'
import { createUnplugin } from 'unplugin'
import AutoImport from 'unplugin-auto-import'
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

import type { DeepPartial } from './runtime/types/utils'

type AppConfigB24UI = {} & DeepPartial<typeof b24ui>

export interface Bitrix24UIOptions extends Omit<ModuleOptions, 'colorMode'> {
  /** Whether to generate declaration files for auto-imported components. */
  dts?: boolean
  b24ui?: AppConfigB24UI
  /**
   * Enable or disable `@vueuse/core` color-mode integration
   * @defaultValue `true`
   */
  colorMode?: boolean
}

export const runtimeDir = normalize(fileURLToPath(new URL('./runtime', import.meta.url)))

export const Bitrix24UIPlugin = createUnplugin<Bitrix24UIOptions | undefined>((_options = {}, meta) => {
  const options = defu(_options, { fonts: false, devtools: { enabled: false } }, defaultOptions)

  const appConfig = defu({ b24ui: options.b24ui }, { b24ui: getDefaultUiConfig() })

  return [
    Bitrix24EnvironmentPlugin(),
    ...ComponentImportPlugin(meta.framework, options),
    AutoImport[meta.framework]({ dts: options.dts ?? true, dirs: [join(runtimeDir, 'composables')] }),
    tailwind(),
    PluginsPlugin(options),
    TemplatePlugin(options, appConfig),
    AppConfigPlugin(options, appConfig)
  ]
})
