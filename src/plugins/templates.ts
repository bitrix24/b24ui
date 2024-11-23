import type { Bitrix24UIOptions } from '../unplugin'

import { getTemplates } from '../templates'
import type { UnpluginOptions } from 'unplugin'

/**
 * This plugin is responsible for getting the generated virtual templates and
 * making them available to the Vue build.
 */
export default function TemplatePlugin(options: Bitrix24UIOptions, appConfig: Record<string, any>) {
  const templates = getTemplates(options, appConfig.b24ui)
  const templateKeys = new Set(templates.map(t => `#build/${t.filename}`))

  return {
    name: 'bitrix24:b24ui:templates',
    enforce: 'pre',
    resolveId(id) {
      if (templateKeys.has(id + '.ts')) {
        return id.replace('#build/', 'virtual:bitrix24-ui-templates/') + '.ts'
      }
    },
    loadInclude: id => templateKeys.has(id.replace('virtual:bitrix24-ui-templates/', '#build/')),
    load(id) {
      id = id.replace('virtual:bitrix24-ui-templates/', '#build/')
      return templates.find(t => `#build/${t.filename}` === id)!.getContents!({} as any)
    }
  } satisfies UnpluginOptions
}
