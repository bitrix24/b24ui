import { fileURLToPath } from 'node:url'
import { camelCase, kebabCase } from 'scule'
import { genExport } from 'knitwork'
// import colors from 'tailwindcss/colors'
import { addTemplate, addTypeTemplate, hasNuxtModule, logger, updateTemplates, getLayerDirectories } from '@nuxt/kit'
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from '@nuxt/schema'
import type { Resolver } from '@nuxt/kit'
import type { ModuleOptions } from './module'
// import { applyDefaultVariants, applyPrefixToObject } from './utils/theme'
import { applyPrefixToObject } from './utils/theme'
import { detectUsedComponents } from './utils/components'
import * as theme from './theme'
import * as themeProse from './theme/prose'
import * as themeContent from './theme/content'

export function getTemplates(options: ModuleOptions, uiConfig: Record<string, any>, nuxt?: Nuxt, resolve?: Resolver['resolve']) {
  const templates: NuxtTemplate[] = []

  let hasProse = false
  let hasContent = false
  let previousDetectedComponents: Set<string> | undefined

  const isDev = process.argv.includes('--uiDev')

  function writeThemeTemplate(theme: Record<string, any>, path?: string) {
    for (const component in theme) {
      templates.push({
        filename: `b24ui/${path ? path + '/' : ''}${kebabCase(component)}.ts`,
        write: true,
        getContents: async () => {
          const template = (theme as any)[component]
          let result = typeof template === 'function' ? template(options) : template

          // Override default variants from nuxt.config.ts
          // result = applyDefaultVariants(result, options.theme?.defaultVariants)
          // Apply Tailwind prefix if configured
          result = applyPrefixToObject(result, options.theme?.prefix)

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
            const themeUtilsPath = fileURLToPath(new URL('./utils/theme', import.meta.url))

            return [
              `import template from ${JSON.stringify(templatePath)}`,
              // `import { applyDefaultVariants, applyPrefixToObject } from ${JSON.stringify(themeUtilsPath)}`,
              `import { applyPrefixToObject } from ${JSON.stringify(themeUtilsPath)}`,
              ...generateVariantDeclarations(variants),
              `const options = ${JSON.stringify(options, null, 2)}`,
              `let result = typeof template === 'function' ? (template as Function)(options) : template`,
              // `result = applyDefaultVariants(result, options.theme?.defaultVariants)`,
              `result = applyPrefixToObject(result, options.theme?.prefix)`,
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

  /** @memo Add prose to Vue */
  const forNuxt = !!nuxt && ((hasNuxtModule('@nuxtjs/mdc') || options.mdc) || (hasNuxtModule('@nuxt/content') || options.content))
  const forVue = !nuxt && (options.mdc)

  if (forNuxt || forVue) {
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

  async function generateSources() {
    if (!nuxt) {
      return '@source "./b24ui";'
    }

    const sources: string[] = []
    const layers = getLayerDirectories(nuxt).map(layer => layer.app)

    // Add layer sources
    for (const layer of layers) {
      sources.push(`@source "${layer}**/*";`)
    }

    // Add inline sources from Nuxt config (classes defined in config)
    const inlineConfigs = [
      nuxt.options.app?.rootAttrs?.class,
      nuxt.options.app?.head?.htmlAttrs?.class,
      nuxt.options.app?.head?.bodyAttrs?.class
    ]

    for (const value of inlineConfigs) {
      if (value && typeof value === 'string') {
        sources.push(`@source inline(${JSON.stringify(value)});`)
      }
    }

    // Add theme sources (component detection or all)
    if (resolve && options.experimental?.componentDetection) {
      const detectedComponents = await detectUsedComponents(
        layers,
        'B24',
        resolve('./runtime/components'),
        Array.isArray(options.experimental.componentDetection) ? options.experimental.componentDetection : undefined
      )

      if (detectedComponents && detectedComponents.size > 0) {
        if (previousDetectedComponents) {
          const newComponents = Array.from(detectedComponents).filter(
            component => !previousDetectedComponents!.has(component)
          )
          if (newComponents.length > 0) {
            logger.success(`Bitrix24 UI detected new components: ${newComponents.join(', ')}`)
          }
        } else {
          logger.success(`Bitrix24 UI detected ${detectedComponents.size} components in use (including dependencies)`)
        }

        previousDetectedComponents = detectedComponents

        if (hasProse) {
          sources.push('@source "./b24ui/prose";')
        }

        for (const component of detectedComponents) {
          const kebabComponent = kebabCase(component)
          const camelComponent = camelCase(component)

          if (hasContent && (themeContent as any)[camelComponent]) {
            sources.push(`@source "./b24ui/content/${kebabComponent}.ts";`)
          } else if ((theme as any)[camelComponent]) {
            sources.push(`@source "./b24ui/${kebabComponent}.ts";`)
          }
        }
      } else {
        if (!previousDetectedComponents || previousDetectedComponents.size > 0) {
          logger.info('Bitrix24 UI detected no components in use, including all components')
        }
        previousDetectedComponents = new Set()

        sources.push('@source "./b24ui";')
      }
    } else {
      sources.push('@source "./b24ui";')
    }

    return sources.join('\n')
  }

  /**
   * use to generate tw colors
   * in `index.css` add `@import '#build/b24ui.css';`
   * @memo This for compatibility only
   */
  templates.push({
    filename: 'b24ui.css',
    write: true,
    getContents: async () => {
      const sources = await generateSources()
      const prefix = options.theme?.prefix ? `${options.theme.prefix}:` : ''

      return `${sources}

@layer base {
  body {
    scrollbar-gutter: stable;
    background: var(--air-theme-background);
    @apply ${prefix}antialiased ${prefix}font-(family-name:--ui-font-family-system) ${prefix}text-(--b24ui-typography-legend-color) ${prefix}scheme-light ${prefix}dark:scheme-dark ${prefix}edge-light:scheme-light ${prefix}edge-dark:scheme-light;
  }

  .sidebar-layout.--inner {
    background: var(--air-theme-background);
  }
}

@theme static {}

@theme default inline {}
`
    }
  })

  templates.push({
    filename: 'b24ui/index.ts',
    write: true,
    getContents: () => [
      ...Object.keys(theme).map(component => `export { default as ${component} } from './${kebabCase(component)}'`),
      ...(hasContent ? Object.keys(themeContent).map(component => `export { default as ${component} } from './content/${kebabCase(component)}'`) : []),
      ...(hasProse ? [`export * as prose from './prose'`] : [])
    ].join('\n')
  })

  // FIXME: `typeof colors[number]` should include all colors from the theme
  templates.push({
    filename: 'types/b24ui.d.ts',
    getContents: () => {
      return `import * as b24ui from '#build/b24ui'
import type { TVConfig } from '@bitrix24/b24ui-nuxt'
import type { defaultConfig } from 'tailwind-variants'

type AppConfigUI = {
  prefix?: string
  tv?: typeof defaultConfig
} & TVConfig<typeof b24ui>

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /**
     * Bitrix24 UI theme configuration
     * @see https://bitrix24.github.io/b24ui/docs/getting-started/theme/components/
     */
    b24ui?: AppConfigUI
  }
}

export {}
`
    }
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
  const templates = getTemplates(options, nuxt.options.appConfig.b24ui, nuxt, resolve)
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

  if (options.experimental?.componentDetection && nuxt.options.dev) {
    nuxt.hook('builder:watch', async (_, path) => {
      if (/\.(?:vue|ts|js|tsx|jsx)$/.test(path)) {
        await updateTemplates({ filter: template => template.filename === 'ui.css' })
      }
    })
  }
}
