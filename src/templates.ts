import { fileURLToPath } from 'node:url'
import { kebabCase } from 'scule'
import { addTemplate, addTypeTemplate } from '@nuxt/kit'
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from '@nuxt/schema'
import type { Resolver } from '@nuxt/kit'
import type { ModuleOptions } from './module'
import * as theme from './theme'
import * as themeProse from './theme/prose'
import * as themeContent from './theme/content'
// import colors from 'tailwindcss/colors'
import { genExport } from 'knitwork'

function replaceBrackets(value: string): string {
  return value.replace(/\[\[/g, '<').replace(/\]\]/g, '>')
}

export function buildTemplates(options: ModuleOptions) {
  return Object.entries(theme).reduce((acc, [key, component]) => {
    acc[key] = typeof component === 'function' ? component(options as Required<ModuleOptions>) : component
    return acc
  }, {} as Record<string, any>)
}

export function getTemplates(options: ModuleOptions) {
  const templates: NuxtTemplate[] = []

  function generateVariantDeclarations(variants: string[], result: any, json: string) {
    return variants.filter(variant => json.includes(`as typeof ${variant}`)).map((variant) => {
      const keys = Object.keys(result.variants[variant])
      return `const ${variant} = ${JSON.stringify(keys, null, 2)} as const`
    })
  }

  for (const component in theme) {
    templates.push({
      filename: `b24ui/${kebabCase(component)}.ts`,
      write: true,
      getContents: async () => {
        const template = (theme as any)[component]
        const result = typeof template === 'function' ? template(options) : template

        // Override default variants from nuxt.config.ts
        if (result?.defaultVariants?.color && options.theme?.defaultVariants?.color) {
          result.defaultVariants.color = options.theme.defaultVariants.color
        }
        if (result?.defaultVariants?.size && options.theme?.defaultVariants?.size) {
          result.defaultVariants.size = options.theme.defaultVariants.size
        }

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

        // function generateVariantDeclarations(variants: string[]) { ////

        // For local development, import directly from theme
        if (process.argv.includes('--uiDev')) {
          const templatePath = fileURLToPath(new URL(`./theme/${kebabCase(component)}`, import.meta.url))
          return [
            `import template from ${JSON.stringify(templatePath)}`,
            ...generateVariantDeclarations(variants, result, json),
            `const options = ${JSON.stringify(options, null, 2)}`,
            `const result = typeof template === 'function' ? (template as Function)(options) : template`,
            `if (result?.defaultVariants?.color && options.theme?.defaultVariants?.color) result.defaultVariants.color = options.theme.defaultVariants.color`,
            `if (result?.defaultVariants?.size && options.theme?.defaultVariants?.size) result.defaultVariants.size = options.theme.defaultVariants.size`,
            `const theme = ${json}`,
            `export default result as typeof theme`
          ].join('\n\n')
        }

        // For production build
        return [
          ...generateVariantDeclarations(variants, result, json),
          `export default ${json}`
        ].join('\n\n')
      }
    })
  }

  for (const component in themeProse) {
    templates.push({
      filename: `b24ui/prose/${kebabCase(component)}.ts`,
      write: true,
      getContents: async () => {
        const template = (themeProse as any)[component]
        const result = typeof template === 'function' ? template(options) : template

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

        // function generateVariantDeclarations(variants: string[]) { ////

        // For local development, import directly from theme/prose
        if (process.argv.includes('--uiDev')) {
          const templatePath = fileURLToPath(new URL(`./theme/prose/${kebabCase(component)}`, import.meta.url))
          return [
            `import template from ${JSON.stringify(templatePath)}`,
            ...generateVariantDeclarations(variants, result, json),
            `const result = typeof template === 'function' ? template(${JSON.stringify(options, null, 2)}) : template`,
            `const theme = ${json}`,
            `export default result as typeof theme`
          ].join('\n\n')
        }

        // For production build
        return [
          ...generateVariantDeclarations(variants, result, json),
          `export default ${json}`
        ].join('\n\n')
      }
    })
  }

  for (const component in themeContent) {
    templates.push({
      filename: `b24ui/content/${kebabCase(component)}.ts`,
      write: true,
      getContents: async () => {
        const template = (themeContent as any)[component]
        const result = typeof template === 'function' ? template(options) : template

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

        // function generateVariantDeclarations(variants: string[]) { ////

        // For local development, import directly from theme/content
        if (process.argv.includes('--uiDev')) {
          const templatePath = fileURLToPath(new URL(`./theme/content/${kebabCase(component)}`, import.meta.url))
          return [
            `import template from ${JSON.stringify(templatePath)}`,
            ...generateVariantDeclarations(variants, result, json),
            `const result = typeof template === 'function' ? template(${JSON.stringify(options, null, 2)}) : template`,
            `const theme = ${json}`,
            `export default result as typeof theme`
          ].join('\n\n')
        }

        // For production build
        return [
          ...generateVariantDeclarations(variants, result, json),
          `export default ${json}`
        ].join('\n\n')
      }
    })
  }

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
    getContents: () => Object.keys(theme).map(component => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n')
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
  const templates = getTemplates(options)
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
