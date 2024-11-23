import { fileURLToPath } from 'node:url'

import { join } from 'pathe'
import { createUnplugin } from 'unplugin'
import AutoImport from 'unplugin-auto-import'
import { defu } from 'defu'
import tailwind from '@tailwindcss/vite'
// import type colors from 'tailwindcss/colors'

import type * as b24ui from '#build/b24ui'

import { defaultOptions, getDefaultUiConfig } from './defaults'
import type { ModuleOptions } from './module'
// import type icons from './theme/icons'

import TemplatePlugin from './plugins/templates'
import PluginsPlugin from './plugins/plugins'
import AppConfigPlugin from './plugins/app-config'
import ComponentImportPlugin from './plugins/components'
import Bitrix24EnvironmentPlugin from './plugins/bitrix24-environment'

import type { DeepPartial } from './runtime/types/utils'

// type NeutralColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone'
// type Color = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | NeutralColor> | (string & {})

type AppConfigUI = {} & DeepPartial<typeof b24ui>

export interface Bitrix24UIOptions extends Omit<ModuleOptions, 'fonts' | 'colorMode'> {
  /** Whether to generate declaration files for auto-imported components. */
  dts?: boolean
  b24ui?: AppConfigUI
  /**
   * Enable or disable `@vueuse/core` color-mode integration
   * @defaultValue `true`
   */
  colorMode?: boolean
}

export const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

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
