import { fileURLToPath } from 'node:url'
import { kebabCase } from 'scule'
import { addTemplate, addTypeTemplate } from '@nuxt/kit'
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from '@nuxt/schema'
import type { Resolver } from '@nuxt/kit'
import type { ModuleOptions } from './module'
import * as theme from './theme'

function replaceBrackets(value) {
  return value.replace(/\[\[/g, '<').replace(/\]\]/g, '>')
}

export function buildTemplates(options: ModuleOptions) {
  return Object.entries(theme).reduce((acc, [key, component]) => {
    acc[key] = typeof component === 'function' ? component(options as Required<ModuleOptions>) : component
    return acc
  }, {} as Record<string, any>)
}

export function getTemplates(options: ModuleOptions, uiConfig: Record<string, any>) {
  const templates: NuxtTemplate[] = []

  for (const component in theme) {
    templates.push({
      filename: `b24ui/${kebabCase(component)}.ts`,
      write: true,
      getContents: async () => {
        const template = (theme as any)[component]
        const result = typeof template === 'function' ? template(options) : template

        const variants = Object.keys(result.variants || {})

        let json = JSON.stringify(result, null, 2)

        for (const variant of variants) {
          json = json.replace(new RegExp(`("${variant}": "[^"]+")`, 'g'), '$1 as const')
          json = json.replace(new RegExp(`("${variant}": \\[\\s*)((?:"[^"]+",?\\s*)+)(\\])`, 'g'), (_, before, match, after) => {
            const replaced = match.replace(/("[^"]+")/g, '$1 as const')
            return `${before}${replaced}${after}`
          })
        }

        // For local development, directly import from theme
        if (process.env.DEV) {
          return [
            `import template from ${JSON.stringify(fileURLToPath(new URL(`./theme/${kebabCase(component)}`, import.meta.url)))}`,
            `const result = typeof template === 'function' ? template(${JSON.stringify(options)}) : template`,
            `const json = ${json}`,
            `export default result as typeof json`
          ].join('\n')
        }

        return `export default ${json}`
      }
    })
  }

  templates.push({
    filename: 'b24ui/index.ts',
    write: true,
    getContents: () => Object.keys(theme).map(component => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n')
  })

  templates.push({
    filename: 'types/ui.d.ts',
    getContents: () => replaceBrackets(`import * as b24ui from '#build/b24ui'
import type { DeepPartial } from '#b24ui/types/utils'

const icons = ${JSON.stringify(uiConfig.icons)};

type AppConfigUI = {
  icons?: Partial[[typeof icons]]
} & DeepPartial[[typeof b24ui]]

declare module '@nuxt/schema' {
  interface AppConfigInput {
    b24ui?: AppConfigUI
  }
}

export {}
`)
  })

  templates.push({
    filename: 'b24ui-image-component.ts',
    write: true,
    getContents: ({ app }) => {
      const image = app?.components?.find(c => c.pascalName === 'NuxtImg' && !c.filePath.includes('nuxt/dist/app'))

      return image ? `export { default } from "${image.filePath}"` : 'export default "img"'
    }
  })

  return templates
}

export function addTemplates(options: ModuleOptions, nuxt: Nuxt, resolve: Resolver['resolve']) {
  const templates = getTemplates(options, nuxt.options.appConfig.b24ui)
  for (const template of templates) {
    if (template.filename!.endsWith('.d.ts')) {
      addTypeTemplate(template as NuxtTypeTemplate)
    } else {
      addTemplate(template)
    }
  }

  nuxt.hook('prepare:types', ({ references }) => {
    references.push({ path: resolve('./runtime/types/app.config.d.ts') })
  })
}
