import type { H3Event } from 'h3'
import json5 from 'json5'
import { camelCase, kebabCase, upperFirst } from 'scule'
import { visit } from '@nuxt/content/runtime'
import { queryCollection } from '@nuxt/content/server'
import * as theme from '../../.nuxt/b24ui'
import meta from '#nuxt-component-meta'
// @ts-expect-error - no types available
import components from '#component-example/nitro'
import { CalendarDate, Time } from '@internationalized/date'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'

/**
 * @see docs/server/utils/transformMDC.ts
 * @see docs/server/plugins/llms.ts
 * @see docs/server/routes/raw/[...slug].md.get.ts
 */

type ComponentAttributes = {
  ':prose'?: string
  ':props'?: string
  ':cast'?: string
  ':model'?: string
  ':external'?: string
  ':externalTypes'?: string
  ':ignore'?: string
  ':hide'?: string
  ':slots'?: string
  ':slug'?: string
}

type ThemeConfig = {
  prose: boolean
  componentName: string
}

type CodeConfig = {
  props: Record<string, unknown>
  model: string[]
  external: string[]
  externalTypes: string[]
  ignore: string[]
  hide: string[]
  componentName: string
  slots?: Record<string, string>
  propsCast?: Record<string, unknown>
  prose?: boolean
}

type Document = {
  title: string
  body: any
}

type BlockConfig = {
  defaultTitle: string
}

const parseBoolean = (value?: string): boolean => value === 'true'

const B24_DOCS = {
  ui: 'https://bitrix24.github.io/b24ui/',
  jsSdk: 'https://bitrix24.github.io/b24jssdk/'
}

const BLOCK_CONFIGS: Record<string, BlockConfig> = {
  callout: { defaultTitle: '!NOTE' },
  note: { defaultTitle: '!NOTE' },
  tip: { defaultTitle: '!TIP' },
  warning: { defaultTitle: '!WARNING' },
  caution: { defaultTitle: '!CAUTION' }
}

function getComponentMeta(componentName: string) {
  const pascalCaseName = componentName.charAt(0).toUpperCase() + componentName.slice(1)

  const strategies = [
    `B24${pascalCaseName}`,
    `Prose${pascalCaseName}`,
    pascalCaseName
  ]

  let componentMeta: any
  let finalMetaComponentName: string = pascalCaseName

  for (const nameToTry of strategies) {
    finalMetaComponentName = nameToTry
    const metaAttempt = (meta as Record<string, any>)[nameToTry]?.meta
    if (metaAttempt) {
      componentMeta = metaAttempt
      break
    }
  }

  if (!componentMeta) {
    console.warn(`[getComponentMeta] Metadata not found for ${pascalCaseName} using strategies: B24, Prose, or no prefix. Last tried: ${finalMetaComponentName}`)
  }

  return {
    pascalCaseName,
    metaComponentName: finalMetaComponentName,
    componentMeta
  }
}

function replaceNodeWithPre(node: any[], language: string, code: string, filename?: string) {
  node[0] = 'pre'
  node[1] = { language, code }
  if (filename) node[1].filename = filename
}

function visitAndReplace(doc: Document, type: string, handler: (node: any[]) => void) {
  visit(doc.body, (node) => {
    if (Array.isArray(node) && node[0] === type) {
      handler(node)
    }

    return true
  }, node => node)
}

function generateTSInterface(
  name: string,
  items: any[],
  itemHandler: (item: any) => string,
  description: string
) {
  let code = `/**\n * ${description}\n */\ninterface ${name} {\n`
  for (const item of items) {
    code += itemHandler(item)
  }
  code += `}`
  return code
}

function propItemHandler(propValue: any): string {
  if (!propValue?.name) return ''
  const propName = propValue.name

  let propType = propValue.type
    ? Array.isArray(propValue.type)
      ? propValue.type.map((t: any) => t.name || t).join(' | ')
      : propValue.type.name || propValue.type
    : 'any'

  /**
   * @memo remove depricate props
   * @see docs/app/components/content/ComponentProps.vue
   */
  if (['depth', 'activeDepth'].includes(propName)) {
    return ''
  }
  /**
   * @memo customize color property
   * @todo test all colors
   * @see docs/app/components/content/HighlightInlineType.vue
   */
  if (['color', 'tagColor'].includes(propName)) {
    // @todo remove whet unset default / danger / ...
    propType = propType.replace('| undefined', '').replace('"default" | ', '').replace('"danger" | ', '').replace('"success" | ', '').replace('"warning" | ', '').replace('"primary" | ', '').replace('"secondary" | ', '').replace('"collab" | ', '').replace('"ai" | ', '').replace('| "ai"', '').replace('"link" | ', '').trim()
    const priorityMap = new Map([
      ['air-primary', 1],
      ['air-primary-success', 2],
      ['air-primary-alert', 3],
      ['air-primary-warning', 4],
      ['air-primary-copilot', 5],
      ['air-secondary', 6],
      ['air-secondary-alert', 7],
      ['air-secondary-accent', 8],
      ['air-secondary-accent-1', 9],
      ['air-secondary-accent-2', 10],
      ['air-secondary-no-accent', 11],
      ['air-tertiary', 12],
      ['air-tertiary-accent', 13],
      ['air-tertiary-no-accent', 14],
      ['air-selection', 15],
      ['air-boost', 16]
    ])
    const items = propType.split(' | ').map((item: string) => item.replace(/"/g, ''))
    const sortedItems = items.sort((a: string, b: string) => {
      const priorityA = priorityMap.get(a) || Number.MAX_SAFE_INTEGER
      const priorityB = priorityMap.get(b) || Number.MAX_SAFE_INTEGER
      return priorityA - priorityB
    })
    propType = sortedItems.map((item: string) => `"${item}"`).join(' | ')
  }

  const isRequired = propValue.required || false
  const hasDescription = propValue.description && propValue.description.trim().length > 0
  const hasDefault = propValue.default !== undefined
  let result = ''
  if (hasDescription || hasDefault) {
    result += `  /**\n`
    if (hasDescription) {
      const descLines = propValue.description.split(/\r?\n/)
      descLines.forEach((line: string) => {
        result += `   * ${line}\n`
      })
    }
    if (hasDefault) {
      let defaultValue = propValue.default
      if (typeof defaultValue === 'string') {
        defaultValue = `"${defaultValue.replace(/"/g, '\\"')}"`
      } else {
        defaultValue = JSON.stringify(defaultValue)
      }
      result += `   * @default ${defaultValue}\n`
    }
    result += `   */\n`
  }
  result += `  ${propName}${isRequired ? '' : '?'}: ${propType};\n`
  return result
}

function slotItemHandler(slotValue: any): string {
  if (!slotValue?.name) return ''
  const slotName = slotValue.name
  const hasDescription = slotValue.description && slotValue.description.trim().length > 0
  let result = ''
  if (hasDescription) {
    result += `  /**\n`
    const descLines = slotValue.description.split(/\r?\n/)
    descLines.forEach((line: string) => {
      result += `   * ${line}\n`
    })
    result += `   */\n`
  }
  if (slotValue.bindings && Object.keys(slotValue.bindings).length > 0) {
    let bindingsType = '{\n'
    Object.entries(slotValue.bindings).forEach(([bindingName, bindingValue]: [string, any]) => {
      const bindingType = bindingValue.type || 'any'
      bindingsType += `    ${bindingName}: ${bindingType};\n`
    })
    bindingsType += '  }'
    result += `  ${slotName}(bindings: ${bindingsType}): any;\n`
  } else {
    result += `  ${slotName}(): any;\n`
  }
  return result
}

function emitItemHandler(event: any): string {
  if (!event?.name) return ''
  let payloadType = 'void'
  if (event.type) {
    payloadType = Array.isArray(event.type)
      ? event.type.map((t: any) => t.name || t).join(' | ')
      : event.type.name || event.type
  }
  let result = ''
  if (event.description && event.description.trim().length > 0) {
    result += `  /**\n`
    event.description.split(/\r?\n/).forEach((line: string) => {
      result += `   * ${line}\n`
    })
    result += `   */\n`
  }
  result += `  ${event.name}: (payload: ${payloadType}) => void;\n`
  return result
}

const generateThemeConfig = ({ prose, componentName }: ThemeConfig) => {
  const computedTheme = prose ? theme.prose : theme
  const componentTheme = computedTheme[componentName as keyof typeof computedTheme]

  return {
    b24ui: prose
      ? { prose: { [componentName]: componentTheme } }
      : { [componentName]: componentTheme }
  }
}

/**
 * @see docs/app/components/content/ComponentCode.vue
 */
interface CastImport {
  name: string
  from: string
}

interface Cast {
  get: (args: any) => any
  template: (args: any) => string
  imports: CastImport[]
}

type CastDateValue = [number, number, number]
type CastTimeValue = [number, number, number]

const iconsTypeList = ['icon', 'trailingIcon', 'deleteIcon', 'selectedIcon', 'incrementIcon', 'decrementIcon', 'checkedIcon', 'uncheckedIcon', 'separatorIcon', 'closeIcon', 'backIcon', 'prevIcon', 'nextIcon']
const convertIcon = (key: string): null | string => {
  if (!iconsTypeList.includes(key)) {
    return null
  }

  if (key === 'icon') {
    return `:icon="RocketIcon"`
  } else if (key === 'trailingIcon') {
    return `:trailing-icon="RocketIcon"`
  } else if (key === 'deleteIcon') {
    return `:delete-icon="RocketIcon"`
  } else if (key === 'selectedIcon') {
    return `:selected-icon="RocketIcon"`
  } else if (key === 'incrementIcon') {
    return `:increment-icon="RocketIcon"`
  } else if (key === 'decrementIcon') {
    return `:decrement-icon="RocketIcon"`
  } else if (key === 'checkedIcon') {
    return `:checked-icon="RocketIcon"`
  } else if (key === 'uncheckedIcon') {
    return `:unchecked-icon="RocketIcon"`
  } else if (key === 'separatorIcon') {
    return `:separator-icon="RocketIcon"`
  } else if (key === 'closeIcon') {
    return `:close-icon="RocketIcon"`
  } else if (key === 'backIcon') {
    return `:back-icon="RocketIcon"`
  } else if (key === 'prevIcon') {
    return `:prev-icon="RocketIcon"`
  } else if (key === 'nextIcon') {
    return `:next-icon="RocketIcon"`
  }

  return null
}

const castMap: Record<string, Cast> = {
  'DateValue': {
    get: (args: CastDateValue) => new CalendarDate(...args),
    template: (value: CalendarDate) => {
      return value ? `new CalendarDate(${value.year}, ${value.month}, ${value.day})` : 'null'
    },
    imports: [{ name: 'CalendarDate', from: '@internationalized/date' }]
  },
  'DateValue[]': {
    get: (args: CastDateValue[]) => args.map(date => new CalendarDate(...date)),
    template: (value: CalendarDate[]) => {
      return value ? `[${value.map(date => `new CalendarDate(${date.year}, ${date.month}, ${date.day})`).join(', ')}]` : '[]'
    },
    imports: [{ name: 'CalendarDate', from: '@internationalized/date' }]
  },
  'DateRange': {
    get: (args: { start: CastDateValue, end: CastDateValue }) => ({ start: new CalendarDate(...args.start), end: new CalendarDate(...args.end) }),
    template: (value: { start: CalendarDate, end: CalendarDate }) => {
      if (!value.start || !value.end) {
        return `{ start: null, end: null }`
      }

      return `{ start: new CalendarDate(${value.start.year}, ${value.start.month}, ${value.start.day}), end: new CalendarDate(${value.end.year}, ${value.end.month}, ${value.end.day}) }`
    },
    imports: [{ name: 'CalendarDate', from: '@internationalized/date' }]
  },
  'TimeValue': {
    get: (args: CastTimeValue) => new Time(...args),
    template: (value: Time) => {
      return value ? `new Time(${value.hour}, ${value.minute}, ${value.second})` : 'null'
    },
    imports: [{ name: 'Time', from: '@internationalized/date' }]
  },
  'RocketIcon': {
    get: () => RocketIcon,
    template: () => '',
    imports: [{ name: 'CalendarDate', from: '@internationalized/date' }]
  },
  'ComponentWithIcon': {
    get: (args: any) => {
      if (Array.isArray(args)) {
        const data = [...args]

        for (const value of data) {
          if (value?.icon) {
            value.icon = RocketIcon
          }
        }

        return data
      } else {
        return {
          ...args,
          icon: (args?.icon ? RocketIcon : undefined)
        }
      }
    },
    template: (value: any) => {
      return json5.stringify(value, null, 2)?.replace(/,([ |\t\n]+[}|\]])/g, '$1').replace('\'RocketIcon\'', 'RocketIcon')
    },
    imports: [{ name: 'CalendarDate', from: '@internationalized/date' }]
  }
}

/**
 * @see docs/app/components/content/ComponentCode.vue -> code
 */
const generateComponentCode = ({
  props,
  model,
  external,
  externalTypes,
  hide,
  componentName,
  slots,
  propsCast,
  prose
}: CodeConfig) => {
  const componentProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !hide.includes(key))
  )
  const camelName = componentName
  let code = ''

  const name = `${prose ? 'Prose' : 'B24'}${upperFirst(camelName)}`

  const componentTheme = ((prose ? theme.prose : theme) as any)[camelName]
  const { componentMeta } = getComponentMeta(name)

  let isUseIcon = false
  for (const [key, value] of Object.entries(componentProps)) {
    if (iconsTypeList.includes(key)) {
      isUseIcon = true
      break
    } else if (typeof value === 'object') {
      const parsedValue: string | { icon?: string } | null = !external?.includes(key) ? value : key

      if (parsedValue && typeof parsedValue !== 'string' && parsedValue?.icon) {
        isUseIcon = true
        break
      }
    }
  }
  if (!isUseIcon && external?.length) {
    for (const [_i, key] of external.entries()) {
      const parsedValue = json5.stringify(componentProps[key], null, 2)?.replace(/,([ |\t\n]+[}|\]])/g, '$1')
      if (parsedValue?.includes('icon')) {
        isUseIcon = true
        break
      }
    }
  }

  if (prose) {
    code += `\`\`\`mdc
::${camelName}`

    const proseProps = Object.entries(componentProps).map(([key, value]) => {
      if (value === undefined || value === null || value === '' || hide?.includes(key)) {
        return
      }

      return `${key}="${value}"`
    }).filter(Boolean).join(' ')

    if (proseProps.length) {
      code += `{${proseProps}}`
    }

    code += `
${slots?.default}
::
\`\`\``

    return code
  }

  if (external?.length || isUseIcon) {
    code += `
<script setup lang="ts">
`
    // Collect imports from cast types
    const importsBySource = new Map<string, Set<string>>()

    if (external?.length) {
      for (const key of external) {
        const cast = propsCast?.[key] as string
        if (cast && castMap[cast]) {
          for (const imp of castMap[cast].imports) {
            if (!importsBySource.has(imp.from)) {
              importsBySource.set(imp.from, new Set())
            }
            importsBySource.get(imp.from)!.add(imp.name)
          }
        }
      }
    }

    // Generate import statements
    for (const [source, names] of importsBySource) {
      code += `import { ${Array.from(names).join(', ')} } from '${source}'
`
    }

    if (isUseIcon) {
      code += `import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
`
    }

    if (externalTypes?.length) {
      const removeArrayBrackets = (type: string): string => type.endsWith('[]') ? removeArrayBrackets(type.slice(0, -2)) : type

      const types = externalTypes.map(type => removeArrayBrackets(type))
      code += `import type { ${types.join(', ')} } from '@bitrix24/b24ui-nuxt'
`
    }

    if (external?.length) {
      if (importsBySource.size > 0 || externalTypes?.length || isUseIcon) {
        code += `
`
      }

      for (const [i, key] of external.entries()) {
        const cast = propsCast?.[key] as string
        const value = cast ? castMap[cast]!.template(componentProps[key]) : json5.stringify(componentProps[key], null, 2)?.replace(/,([ |\t\n]+[}|\]])/g, '$1')
        const type = externalTypes?.[i] ? `<${externalTypes[i]}>` : ''
        const refType = cast && ['DateValue', 'DateValue[]', 'DateRange', 'TimeValue'].includes(cast || '') ? 'shallowRef' : 'ref'

        code += `const ${key === 'modelValue' ? 'value' : key} = ${refType}${type}(${value})
`
      }
    }
    code += `</script>
`
  }

  code += `
<template>
  <${name}`
  for (const [key, value] of Object.entries(componentProps)) {
    if (key === 'modelValue') {
      code += ` v-model="value"`
      continue
    }

    const convertedIconValue = convertIcon(key)
    if (typeof convertedIconValue === 'string') {
      code += ` ${convertedIconValue}`
      continue
    }

    if (model && model.includes(key)) {
      code += ` v-model:${key}="${key}"`
      continue
    }

    if (value === undefined || value === null || value === '' || hide?.includes(key)) {
      continue
    }

    const prop = componentMeta?.props?.find((prop: any) => prop.name === key)
    const propDefault = prop && (prop.default ?? prop.tags?.find((tag: any) => tag.name === 'defaultValue')?.text ?? componentTheme?.defaultVariants?.[prop.name])
    const name = kebabCase(key)

    if (typeof value === 'boolean') {
      if (value && (propDefault === 'true' || propDefault === '`true`' || propDefault === true)) {
        continue
      }
      if (!value && (!propDefault || propDefault === 'false' || propDefault === '`false`' || propDefault === false)) {
        continue
      }

      code += value ? ` ${name}` : ` :${name}="false"`
    } else if (typeof value === 'object') {
      const preValue: string | { icon?: string } = !external?.includes(key) ? { ...value } : key
      if (typeof preValue !== 'string' && preValue?.icon) {
        preValue.icon = 'RocketIcon'
      }

      const parsedValue = (!external?.includes(key) ? json5.stringify(preValue, null, 0).replace(/,([ |\t\n]+[}|\])])/g, '$1') : preValue) as string

      code += ` :${name}="${parsedValue.replace('\'RocketIcon\'', 'RocketIcon')}"`
    } else {
      if (propDefault === value) {
        continue
      }

      code += ` ${typeof value === 'number' ? ':' : ''}${name}="${value}"`
    }
  }

  if (slots && Object.keys(slots).length > 0) {
    code += `>`
    for (const [key, value] of Object.entries(slots)) {
      if (key === 'default') {
        code += slots.default
      } else {
        code += `
  <template #${key}>
    ${value}
  </template>\n`
      }
    }
    code += (Object.keys(slots).length > 1 ? '\n' : '') + `</${name}>`
  } else {
    code += ' />'
  }
  code += `\n</template>

`

  return code
}

function processLinks(
  nodes: Node[],
  baseUrl: string
) {
  if (!Array.isArray(nodes)) return

  for (const node of nodes) {
    if (Array.isArray(node)) {
      if (node[0] === 'a' && node[1] && node[1].href) {
        node[1].href = prepareHref(node[1].href, baseUrl)
      } else if (node[0] === 'tip' && node[1] && node[1].to) {
        node[1].href = prepareHref(node[1].to, baseUrl)
      }

      for (let i = 1; i < node.length; i++) {
        if (Array.isArray(node[i])) {
          processLinks([node[i]], baseUrl)
        }
      }
    }
  }
}

function prepareHref(
  href: string,
  baseUrl: string
): string {
  if (href.includes('/raw') || href.endsWith('.md')) {
    return href
  }

  const processUrlWithAnchor = (url: string, base: string): string => {
    const [path, anchor] = url.split('#')
    const processedPath = path!.endsWith('/') ? path!.slice(0, -1) + '.md' : path + '.md'
    return anchor ? `${base}raw/${processedPath}#${anchor}` : `${base}raw/${processedPath}`
  }

  if (href.startsWith(B24_DOCS.ui) && href.includes('/docs/')) {
    const path = href.replace(B24_DOCS.ui, '')
    return processUrlWithAnchor(path, B24_DOCS.ui)
  }

  if (href.startsWith(B24_DOCS.jsSdk) && href.includes('/docs/')) {
    const path = href.replace(B24_DOCS.jsSdk, '')
    return processUrlWithAnchor(path, B24_DOCS.jsSdk)
  }

  if (href.startsWith('/docs/') && !href.startsWith('http')) {
    const [path, anchor] = href.split('#')
    let newHref = path!.startsWith('/') ? path!.slice(1) : path

    if (newHref!.endsWith('/')) {
      newHref = newHref!.slice(0, -1) + '.md'
    } else if (!newHref!.endsWith('.md')) {
      newHref = newHref + '.md'
    }

    return anchor ? `${baseUrl}/${newHref}#${anchor}` : `${baseUrl}/${newHref}`
  }

  return href
}

function processBlockNode(node: any[], config: BlockConfig, baseUrl: string) {
  const prevNode = [...node]

  node[0] = 'blockquote'
  node[1] = {}

  const customTitle = prevNode[1]?.title || prevNode[1]?.ariaLabel

  let title: [string, any, any]
  if (typeof prevNode[1].to !== 'undefined') {
    title = [
      'a',
      { href: prepareHref(prevNode[1].to, baseUrl) },
      `${customTitle || config.defaultTitle}`
    ]
  } else {
    title = [
      'p',
      {},
      `${customTitle || config.defaultTitle}`
    ]
  }

  const description = Array.isArray(prevNode[2]) ? prevNode[2] : []
  if (description) {
    description[2] = `%br>%${description[2]}`
  }
  node[2] = [
    'p',
    {},
    title,
    description
  ]
}

export async function transformMDC(event: H3Event, doc: Document): Promise<Document> {
  const componentName = camelCase(doc.title)

  const config = useRuntimeConfig()
  const baseUrl = `${config.public.canonicalUrl}${config.public.baseUrl}/raw`

  visitAndReplace(doc, 'component-theme', (node) => {
    const attributes = node[1] as Record<string, string>
    const mdcSpecificName = attributes?.slug

    const finalComponentName = mdcSpecificName ? camelCase(mdcSpecificName) : componentName

    const prose = parseBoolean(attributes[':prose'])
    const appConfig = generateThemeConfig({ prose, componentName: finalComponentName })

    replaceNodeWithPre(
      node,
      'ts',
      `export default defineAppConfig(${json5.stringify(appConfig, null, 2)?.replace(/,([ |\t\n]+[}|\])])/g, '$1')})`,
      'app.config.ts'
    )
  })

  visitAndReplace(doc, 'component-code', (node) => {
    const attributes = node[1] as ComponentAttributes
    const props = attributes[':props'] ? json5.parse(attributes[':props']) : {}
    const propsCast = attributes[':cast'] ? json5.parse(attributes[':cast']) : {}
    const model = attributes[':model'] ? json5.parse(attributes[':model']) : []
    const external = attributes[':external'] ? json5.parse(attributes[':external']) : []
    const externalTypes = attributes[':externalTypes'] ? json5.parse(attributes[':externalTypes']) : []
    const ignore = attributes[':ignore'] ? json5.parse(attributes[':ignore']) : []
    const hide = attributes[':hide'] ? json5.parse(attributes[':hide']) : []
    const slots = attributes[':slots'] ? json5.parse(attributes[':slots']) : {}
    const prose = !!attributes[':prose']

    const mdcSpecificName = attributes[':slug']

    const finalComponentName = mdcSpecificName ? camelCase(mdcSpecificName) : componentName

    /**
     * @memo You need to understand that the code is trying to load a component by the page name, but it is not available for some pages.
     */
    if (['icons', 'customize components'].includes(finalComponentName.toLowerCase())) {
      return
    }

    const code = generateComponentCode({
      props,
      model,
      external,
      externalTypes,
      ignore,
      hide,
      componentName: finalComponentName,
      slots,
      propsCast,
      prose
    })

    replaceNodeWithPre(node, 'vue', code)
  })

  visitAndReplace(doc, 'component-props', (node) => {
    const attributes = node[1] as Record<string, string>
    const mdcSpecificName = attributes?.name
    const isProse = parseBoolean(attributes[':prose'])

    const finalComponentName = mdcSpecificName ? camelCase(mdcSpecificName) : componentName

    const { pascalCaseName, componentMeta } = getComponentMeta(finalComponentName)

    if (!componentMeta?.props) return

    const interfaceName = isProse ? `Prose${pascalCaseName}Props` : `${pascalCaseName}Props`

    const interfaceCode = generateTSInterface(
      interfaceName,
      Object.values(componentMeta.props),
      propItemHandler,
      `Props for the ${isProse ? 'Prose' : ''}${pascalCaseName} component`
    )
    replaceNodeWithPre(node, 'ts', interfaceCode)
  })

  visitAndReplace(doc, 'component-slots', (node) => {
    const { pascalCaseName, componentMeta } = getComponentMeta(componentName)
    if (!componentMeta?.slots) return

    const interfaceCode = generateTSInterface(
      `${pascalCaseName}Slots`,
      Object.values(componentMeta.slots),
      slotItemHandler,
      `Slots for the ${pascalCaseName} component`
    )
    replaceNodeWithPre(node, 'ts', interfaceCode)
  })

  visitAndReplace(doc, 'component-emits', (node) => {
    const { pascalCaseName, componentMeta } = getComponentMeta(componentName)
    const hasEvents = componentMeta?.events && Object.keys(componentMeta.events).length > 0

    if (hasEvents) {
      const interfaceCode = generateTSInterface(
        `${pascalCaseName}Emits`,
        Object.values(componentMeta.events),
        emitItemHandler,
        `Emitted events for the ${pascalCaseName} component`
      )
      replaceNodeWithPre(node, 'ts', interfaceCode)
    } else {
      node[0] = 'p'
      node[1] = {}
      node[2] = 'No events available for this component.'
    }
  })

  visitAndReplace(doc, 'component-example', (node) => {
    const camelName = camelCase(node[1]['name'])
    const lang = node[1]['lang'] ?? 'vue'
    const name = node[1]['filename'] ?? camelName.charAt(0).toUpperCase() + camelName.slice(1)
    try {
      const code = components[name]?.code || ''
      replaceNodeWithPre(node, lang, code, `${name}.${lang}`)
    } catch (error) {
      console.error(
        error,
        name
        // components[name],
        // components
      )

      // @todo fix this
      replaceNodeWithPre(node, 'vue', '? visitAndReplace ?', `${name}.vue`)
    }
  })

  Object.entries(BLOCK_CONFIGS).forEach(([blockType, config]) => {
    visitAndReplace(doc, blockType, (node: any[]) => processBlockNode(node, config, baseUrl))
  })

  visitAndReplace(doc, 'card', (node) => {
    const prevNode = { ...node }

    node[0] = 'blockquote'
    node[1] = {}

    const customTitle = prevNode[1]?.title || ''

    let title: [string, any, any]
    if (typeof prevNode[1].to !== 'undefined') {
      title = [
        'a',
        { href: prepareHref(prevNode[1].to, baseUrl) },
        `${customTitle}`
      ]
    } else {
      title = [
        'p',
        {},
        `${customTitle}`
      ]
    }

    const description = Array.isArray(prevNode[2]) ? prevNode[2] : []
    if (description) {
      description[2] = `%br>%${description[2]}`
    }

    node[2] = [
      'p',
      {},
      title,
      description
    ]
  })

  visitAndReplace(doc, 'accordion-item', (node) => {
    const prevNode = { ...node }

    node[0] = 'p'
    node[1] = {}

    const customTitle = prevNode[1]?.label || ''

    const title = [
      'strong',
      {},
      `Question: ${customTitle}`
    ]

    const description = Array.isArray(prevNode[2]) ? prevNode[2] : []
    if (description) {
      description[2] = `%br%Answer: ${description[2]}%br%%br%`
    }

    node[2] = [
      'p',
      {},
      title,
      description
    ]
  })

  const componentsListNodes: any[] = []
  visit(doc.body, (node) => {
    if (Array.isArray(node) && node[0] === 'components-list') {
      componentsListNodes.push(node)
    }
    return true
  }, node => node)

  for (const node of componentsListNodes) {
    const category = node[1]?.category
    if (!category) continue

    const components = await queryCollection(event, 'docs')
      .where('path', 'LIKE', '/docs/components/%')
      .where('extension', '=', 'md')
      .where('category', '=', category)
      .select('path', 'title')
      .all()

    const links = components.map((c: any) => `- [${c.title}](${config.public.canonicalUrl}${config.public.baseUrl}/raw${c.path}.md)`).join('\n')

    node[0] = 'p'
    node[1] = {}
    node[2] = links
  }

  processLinks(doc.body.value, baseUrl)

  return doc
}
