import { fileURLToPath } from 'node:url'
import { kebabCase } from 'scule'
import { genExport } from 'knitwork'
// import colors from 'tailwindcss/colors'
import { addTemplate, addTypeTemplate, hasNuxtModule } from '@nuxt/kit'
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from '@nuxt/schema'
import type { Resolver } from '@nuxt/kit'
import type { ModuleOptions } from './module'
import * as theme from './theme'
import * as themeProse from './theme/prose'
import * as themeContent from './theme/content'

function replaceBrackets(value: string): string {
  return value.replace(/\[\[/g, '<').replace(/\]\]/g, '>')
}

export function buildTemplates(options: ModuleOptions) {
  return Object.entries(theme).reduce((acc, [key, component]) => {
    acc[key] = typeof component === 'function' ? component(options as Required<ModuleOptions>) : component
    return acc
  }, {} as Record<string, any>)
}

export function getTemplates(options: ModuleOptions, uiConfig: Record<string, any>, nuxt?: Nuxt) {
  const templates: NuxtTemplate[] = []

  let hasProse = false
  let hasContent = false

  const isDev = process.argv.includes('--uiDev')

  function writeThemeTemplate(theme: Record<string, any>, path?: string) {
    for (const component in theme) {
      templates.push({
        filename: `b24ui/${path ? path + '/' : ''}${kebabCase(component)}.ts`,
        write: true,
        getContents: async () => {
          const template = (theme as any)[component]
          const result = typeof template === 'function' ? template(options) : template

          // // Override default variants from nuxt.config.ts
          // if (result?.defaultVariants?.color && options.theme?.defaultVariants?.color) {
          //   result.defaultVariants.color = options.theme.defaultVariants.color
          // }
          // if (result?.defaultVariants?.size && options.theme?.defaultVariants?.size) {
          //   result.defaultVariants.size = options.theme.defaultVariants.size
          // }

          const variants = Object.entries(result.variants || {})
            .filter(([_, values]) => {
              const keys = Object.keys(values as Record<string, unknown>)
              return keys.some(key => key !== 'true' && key !== 'false')
            })
            .map(([key]) => key)

          let json = JSON.stringify(result, null, 2)

          for (const variant of variants) {
            json = json.replace(new RegExp(`("${variant}": "[^"]+")`, 'g'), `$1 as typeof ${variant}[number]`)
            json = json.replace(new RegExp(`("${variant}": \\[\\s*)((?:"[^"]+",?\\s*)+)(\\])`, 'g'), (_, before, match, after) => {
              const replaced = match.replace(/("[^"]+")/g, `$1 as typeof ${variant}[number]`)
              return `${before}${replaced}${after}`
            })
          }

          function generateVariantDeclarations(variants: string[]) {
            return variants.filter(variant => json.includes(`as typeof ${variant}`)).map((variant) => {
              const keys = Object.keys(result.variants[variant])
              return `const ${variant} = ${JSON.stringify(keys, null, 2)} as const`
            })
          }

          // For local development, import directly from theme
          if (isDev) {
            const templatePath = fileURLToPath(new URL(`./theme/${path ? `${path}/` : ''}${kebabCase(component)}`, import.meta.url))
            return [
              `import template from ${JSON.stringify(templatePath)}`,
              ...generateVariantDeclarations(variants),
              `const options = ${JSON.stringify(options, null, 2)}`,
              `const result = typeof template === 'function' ? (template as Function)(options) : template`,
              // `if (result?.defaultVariants?.color && options.theme?.defaultVariants?.color) result.defaultVariants.color = options.theme.defaultVariants.color`,
              // `if (result?.defaultVariants?.size && options.theme?.defaultVariants?.size) result.defaultVariants.size = options.theme.defaultVariants.size`,
              `const theme = ${json}`,
              `export default result as typeof theme`
            ].join('\n\n')
          }

          // For production build
          return [
            ...generateVariantDeclarations(variants),
            `export default ${json}`
          ].join('\n\n')
        }
      })
    }
  }

  if (!!nuxt && ((hasNuxtModule('@nuxtjs/mdc') || options.mdc) || (hasNuxtModule('@nuxt/content') || options.content))) {
    hasProse = true

    const path = 'prose'

    writeThemeTemplate(themeProse, path)

    templates.push({
      filename: `b24ui/${path}/index.ts`,
      write: true,
      getContents: () => Object.keys(themeProse).map(component => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n')
    })
  }

  if (!!nuxt && (hasNuxtModule('@nuxt/content') || options.content)) {
    hasContent = true

    writeThemeTemplate(themeContent, 'content')
  }

  writeThemeTemplate(theme)

  /**
   * use to generate tw colors
   * in `index.css` add `@import '#build/b24ui.css';`
   * @memo we use `@plugin '@bitrix24/b24style'`. This for compatibility only
   */
  /*
  templates.push({
    filename: 'b24ui.css',
    write: true,
    getContents: () => `@source "./b24ui";

@theme default inline {
  --color-old-neutral-50: ${colors.neutral[50]};
  --color-old-neutral-950: ${colors.neutral[950]};
  ${[...([]).filter(color => !colors[color as keyof typeof colors]), 'default'].map(color => [50, 950].map(shade => `--color-${color}-${shade}: var(--ui-color-${color}-${shade});`).join('\n\t')).join('\n\t')}
}
`
  })
  */
  templates.push({
    filename: 'b24ui.css',
    write: true,
    getContents: () => `@source "./b24ui";

@theme default inline {}
`
  })

  templates.push({
    filename: 'b24ui/index.ts',
    write: true,
    getContents: () => {
      let contents = Object.keys(theme).map(component => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n')
      if (hasContent) {
        contents += '\n'
        contents += Object.keys(themeContent).map(component => `export { default as ${component} } from './content/${kebabCase(component)}'`).join('\n')
      }
      if (hasProse) contents += `\nexport * as prose from './prose'\n`
      return contents
    }
  })

  templates.push({
    filename: 'types/b24ui.d.ts',
    getContents: () => replaceBrackets(`import * as b24ui from '#build/b24ui'
import type { TVConfig } from '@bitrix24/b24ui-nuxt'
import type { defaultConfig } from 'tailwind-variants'

type AppConfigUI = {
  tv?: typeof defaultConfig
} & TVConfig<typeof b24ui>

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /**
     * Bitrix24 UI theme configuration
     */
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
      const image = app?.components?.find(c => c.pascalName === 'NuxtImg' && !/nuxt(?:-nightly)?\/dist\/app/.test(c.filePath))

      return image ? genExport(image.filePath, [{ name: image.export, as: 'default' }]) : 'export default "img"'
    }
  })

  return templates
}

export function addTemplates(options: ModuleOptions, nuxt: Nuxt, resolve: Resolver['resolve']) {
  const templates = getTemplates(options, nuxt.options.appConfig.b24ui, nuxt)
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
