import { defu } from 'defu'
import { join } from 'pathe'
import type { UnpluginContextMeta, UnpluginOptions } from 'unplugin'
import AutoImport from 'unplugin-auto-import'
import type { Options as AutoImportOptions } from 'unplugin-auto-import/types'
import type { Bitrix24UIOptions } from '../unplugin'
import { runtimeDir } from '../unplugin'

/**
 * This plugin adds all the Bitrix24 UI composables as auto-imports.
 */
export default function AutoImportPlugin(options: Bitrix24UIOptions, meta: UnpluginContextMeta): UnpluginOptions {
  const pluginOptions = defu(options.autoImport, <AutoImportOptions>{
    dts: options.dts ?? true,
    dirs: [join(runtimeDir, 'composables'), join(runtimeDir, 'vue/composables')]
  })

  return AutoImport.raw(pluginOptions, meta) as UnpluginOptions
}
