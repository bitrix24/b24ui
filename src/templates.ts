import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'
import { join } from 'pathe'
import { globSync } from 'tinyglobby'
import { camelCase, kebabCase, pascalCase } from 'scule'
import { genExport } from 'knitwork'
// import colors from 'tailwindcss/colors'
import { addTemplate, addTypeTemplate, hasNuxtModule, logger, updateTemplates } from '@nuxt/kit'
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from '@nuxt/schema'
import type { Resolver } from '@nuxt/kit'
import type { ModuleOptions } from './module'
import * as theme from './theme'
import * as themeProse from './theme/prose'
import * as themeContent from './theme/content'

/**
 * Build a dependency graph of components by scanning their source files
 */
async function buildComponentDependencyGraph(componentDir: string, componentPattern: RegExp): Promise<Map<string, Set<string>>> {
  const dependencyGraph = new Map<string, Set<string>>()

  const componentFiles = globSync(['**/*.vue'], {
    cwd: componentDir,
    absolute: true
  })

  for (const componentFile of componentFiles) {
    try {
      const content = await readFile(componentFile, 'utf-8')
      const componentName = pascalCase(componentFile.split('/').pop()!.replace('.vue', ''))
      const dependencies = new Set<string>()

      const matches = content.matchAll(componentPattern)
      for (const match of matches) {
        const depName = match[1] || match[2]
        if (depName && depName !== componentName) {
          dependencies.add(depName)
        }
      }

      dependencyGraph.set(componentName, dependencies)
    } catch {
      // Ignore files that can't be read
    }
  }

  return dependencyGraph
}

/**
 * Recursively resolve all dependencies for a component
 */
function resolveComponentDependencies(
  component: string,
  dependencyGraph: Map<string, Set<string>>,
  resolved: Set<string> = new Set()
): Set<string> {
  if (resolved.has(component)) {
    return resolved
  }

  resolved.add(component)
  const dependencies = dependencyGraph.get(component)

  if (dependencies) {
    for (const dep of dependencies) {
      resolveComponentDependencies(dep, dependencyGraph, resolved)
    }
  }

  return resolved
}

/**
 * Detect components used in the project by scanning source files
 */
async function detectUsedComponents(
  rootDir: string,
  prefix: string,
  componentDir: string,
  includeComponents?: string[]
): Promise<Set<string> | undefined> {
  const detectedComponents = new Set<string>()

  // Add manually specified components
  if (includeComponents && includeComponents.length > 0) {
    for (const component of includeComponents) {
      detectedComponents.add(component)
    }
  }

  // Scan all source files for component usage
  const appFiles = globSync(['**/*.{vue,ts,js,tsx,jsx}'], {
    cwd: rootDir,
    ignore: ['node_modules/**', '.nuxt/**', 'dist/**']
  })

  // Pattern to match:
  // - <B24Button in templates
  // - B24Button in script (imports, usage)
  // - <LazyB24Button (lazy components)
  // - LazyB24Button in script
  const componentPattern = new RegExp(`<(?:Lazy)?${prefix}([A-Z][a-zA-Z]+)|\\b(?:Lazy)?${prefix}([A-Z][a-zA-Z]+)\\b`, 'g')

  for (const file of appFiles) {
    try {
      const filePath = join(rootDir, file)
      const content = await readFile(filePath, 'utf-8')
      const matches = content.matchAll(componentPattern)

      for (const match of matches) {
        const componentName = match[1] || match[2]
        if (componentName) {
          detectedComponents.add(componentName)
        }
      }
    } catch {
      // Ignore files that can't be read
    }
  }

  if (detectedComponents.size === 0) {
    return undefined
  }

  // Build dependency graph of components
  const dependencyGraph = await buildComponentDependencyGraph(componentDir, componentPattern)

  // Resolve all dependencies for detected components
  const allComponents = new Set<string>()
  for (const component of detectedComponents) {
    const resolved = resolveComponentDependencies(component, dependencyGraph)
    for (const resolvedComponent of resolved) {
      allComponents.add(resolvedComponent)
    }
  }

  return allComponents
}

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

  async function getSources() {
    let sources = ''

    if (!!nuxt && !!resolve && options.experimental?.componentDetection) {
      const detectedComponents = await detectUsedComponents(
        nuxt.options.rootDir,
        'B24',
        resolve!('./runtime/components'),
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

        const sourcesList: string[] = []

        if (hasProse) {
          sourcesList.push('@source "./b24ui/prose";')
        }

        for (const component of detectedComponents) {
          const kebabComponent = kebabCase(component)
          const camelComponent = camelCase(component)

          if (hasContent && (themeContent as any)[camelComponent]) {
            sourcesList.push(`@source "./b24ui/content/${kebabComponent}.ts";`)
          } else if ((theme as any)[camelComponent]) {
            sourcesList.push(`@source "./b24ui/${kebabComponent}.ts";`)
          }
        }

        sources = sourcesList.join('\n')
      } else {
        if (!previousDetectedComponents || previousDetectedComponents.size > 0) {
          logger.info('Bitrix24 UI detected no components in use, including all components')
        }
        previousDetectedComponents = new Set()
      }
    }

    return sources || '@source "./b24ui";'
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

  /**
   * use to generate tw colors
   * in `index.css` add `@import '#build/b24ui.css';`
   * @memo This for compatibility only
   */
  templates.push({
    filename: 'b24ui.css',
    write: true,
    getContents: async () => {
      const sources = await getSources()

      return `${sources}

@theme static {}

@theme default inline {}
`
    }
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

  // FIXME: `typeof colors[number]` should include all colors from the theme
  templates.push({
    filename: 'types/b24ui.d.ts',
    getContents: () => {
      return `import * as b24ui from '#build/b24ui'
import type { TVConfig } from '@bitrix24/b24ui-nuxt'
import type { defaultConfig } from 'tailwind-variants'

type AppConfigUI = {
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
