import json5 from 'json5'
import { camelCase, kebabCase } from 'scule'
import { visit } from '@nuxt/content/runtime'
import * as theme from '../../.nuxt/b24ui'
import meta from '#nuxt-component-meta'
// @ts-expect-error - no types available
import components from '#component-example/nitro'

type ComponentAttributes = {
  ':prose'?: string
  ':props'?: string
  ':external'?: string
  ':externalTypes'?: string
  ':ignore'?: string
  ':hide'?: string
  ':slots'?: string
}

type ThemeConfig = {
  prose: boolean
  componentName: string
}

type CodeConfig = {
  props: Record<string, unknown>
  external: string[]
  externalTypes: string[]
  ignore: string[]
  hide: string[]
  componentName: string
  slots?: Record<string, string>
}

type Document = {
  title: string
  body: any
}

const parseBoolean = (value?: string): boolean => value === 'true'

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
   * @memo customize color property
   * @todo test all colors
   * @see docs/app/components/content/HighlightInlineType.vue
   */
  if (propName === 'color') {
    // @todo remove whet unset default / danger / ...
    propType = propType.replace('| undefined', '').replace('"default" | ', '').replace('"danger" | ', '').replace('"success" | ', '').replace('"warning" | ', '').replace('"primary" | ', '').replace('"secondary" | ', '').replace('"collab" | ', '').replace('"ai" | ', '').trim()
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
      ['air-tertiary', 11],
      ['air-selection', 12]
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

const generateComponentCode = ({
  props,
  external,
  externalTypes,
  hide,
  componentName,
  slots
}: CodeConfig) => {
  const filteredProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !hide.includes(key))
  )

  const imports = external
    .filter((_, index) => externalTypes[index] && externalTypes[index] !== 'undefined')
    .map((ext, index) => {
      const type = externalTypes[index]?.replace(/[[\]]/g, '')
      return `import type { ${type} } from '@bitrix24/b24ui-nuxt'`
    })
    .join('\n')

  let itemsCode = ''
  if (props.items) {
    itemsCode = `const items = ref<${externalTypes[0]}>(${json5.stringify(props.items, null, 2)})`
    delete filteredProps.items
  }

  let calendarValueCode = ''
  if (componentName === 'calendar' && props.modelValue && Array.isArray(props.modelValue)) {
    calendarValueCode = `const value = ref(new CalendarDate(${props.modelValue.join(', ')}))`
  }

  const propsString = Object.entries(filteredProps)
    .map(([key, value]) => {
      const formattedKey = kebabCase(key)
      if (typeof value === 'string') {
        return `${formattedKey}="${value}"`
      } else if (typeof value === 'number') {
        return `:${formattedKey}="${value}"`
      } else if (typeof value === 'boolean') {
        return value ? formattedKey : `:${formattedKey}="false"`
      }
      return ''
    })
    .filter(Boolean)
    .join(' ')

  const itemsProp = props.items ? ':items="items"' : ''
  const vModelProp = componentName === 'calendar' && props.modelValue ? 'v-model="value"' : ''
  const allProps = [propsString, itemsProp, vModelProp].filter(Boolean).join(' ')
  const formattedProps = allProps ? ` ${allProps}` : ''

  let scriptSetup = ''
  if (imports || itemsCode || calendarValueCode) {
    scriptSetup = '<script setup lang="ts">'
    if (imports) scriptSetup += `\n${imports}`
    if (imports && (itemsCode || calendarValueCode)) scriptSetup += '\n'
    if (calendarValueCode) scriptSetup += `\n${calendarValueCode}`
    if (itemsCode) scriptSetup += `\n${itemsCode}`
    scriptSetup += '\n</script>\n\n'
  }

  let componentContent = ''
  let slotContent = ''

  if (slots && Object.keys(slots).length > 0) {
    const defaultSlot = slots.default?.trim()
    if (defaultSlot) {
      const indentedContent = defaultSlot
        .split('\n')
        .map(line => line.trim() ? `    ${line}` : line)
        .join('\n')
      componentContent = `\n${indentedContent}\n  `
    }

    Object.entries(slots).forEach(([slotName, content]) => {
      if (slotName !== 'default' && content?.trim()) {
        const indentedSlotContent = content.trim()
          .split('\n')
          .map(line => line.trim() ? `      ${line}` : line)
          .join('\n')
        slotContent += `\n    <template #${slotName}>\n${indentedSlotContent}\n    </template>`
      }
    })
  }

  const pascalCaseName = componentName.charAt(0).toUpperCase() + componentName.slice(1)

  let componentTemplate = ''
  if (componentContent || slotContent) {
    componentTemplate = `<B24${pascalCaseName}${formattedProps}>${componentContent}${slotContent}</B24${pascalCaseName}>` // Removed space before closing tag
  } else {
    componentTemplate = `<B24${pascalCaseName}${formattedProps} />`
  }

  return `${scriptSetup}<template>
  ${componentTemplate}
</template>`
}

export function transformMDC(doc: Document): Document {
  const componentName = camelCase(doc.title)

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
    const external = attributes[':external'] ? json5.parse(attributes[':external']) : []
    const externalTypes = attributes[':externalTypes'] ? json5.parse(attributes[':externalTypes']) : []
    const ignore = attributes[':ignore'] ? json5.parse(attributes[':ignore']) : []
    const hide = attributes[':hide'] ? json5.parse(attributes[':hide']) : []
    const slots = attributes[':slots'] ? json5.parse(attributes[':slots']) : {}

    const code = generateComponentCode({
      props,
      external,
      externalTypes,
      ignore,
      hide,
      componentName,
      slots
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
    const name = camelName.charAt(0).toUpperCase() + camelName.slice(1)
    try {
      const code = components[name].code
      replaceNodeWithPre(node, 'vue', code, `${name}.vue`)
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

  return doc
}
