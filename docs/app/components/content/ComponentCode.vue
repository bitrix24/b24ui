<!-- eslint-disable no-useless-escape -->
<script setup lang="ts">
import json5 from 'json5'
import { upperFirst, camelCase, kebabCase } from 'scule'
import { hash } from 'ohash'
import { CalendarDate, Time } from '@internationalized/date'
import * as theme from '#build/b24ui'
import { get, set } from '#b24ui/utils'
import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
// import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
// import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
// import InfoIcon from '@bitrix24/b24icons-vue/button/InfoIcon'

interface Cast {
  get: (args: any) => any
  template: (args: any) => string
}

type CastDateValue = [number, number, number]
type CastTimeValue = [number, number, number]

// function prepareIconTitle(iconTitle?: string) {
//   switch (iconTitle) {
//     case 'RocketIcon': return RocketIcon
//     case 'SignIcon': return SignIcon
//     case 'InfoIcon': return InfoIcon
//     case 'MoreMIcon': return MoreMIcon
//   }
//
//   return undefined
// }

const castMap: Record<string, Cast> = {
  'DateValue': {
    get: (args: CastDateValue) => new CalendarDate(...args),
    template: (value: CalendarDate) => {
      return value ? `new CalendarDate(${value.year}, ${value.month}, ${value.day})` : 'null'
    }
  },
  'DateValue[]': {
    get: (args: CastDateValue[]) => args.map(date => new CalendarDate(...date)),
    template: (value: CalendarDate[]) => {
      return value ? `[${value.map(date => `new CalendarDate(${date.year}, ${date.month}, ${date.day})`).join(', ')}]` : '[]'
    }
  },
  'DateRange': {
    get: (args: { start: CastDateValue, end: CastDateValue }) => ({ start: new CalendarDate(...args.start), end: new CalendarDate(...args.end) }),
    template: (value: { start: CalendarDate, end: CalendarDate }) => {
      if (!value.start || !value.end) {
        return `{ start: null, end: null }`
      }

      return `{ start: new CalendarDate(${value.start.year}, ${value.start.month}, ${value.start.day}), end: new CalendarDate(${value.end.year}, ${value.end.month}, ${value.end.day}) }`
    }
  },
  'TimeValue': {
    get: (args: CastTimeValue) => new Time(...args),
    template: (value: Time) => {
      return value ? `new Time(${value.hour}, ${value.minute}, ${value.second})` : 'null'
    }
  },
  'RocketIcon': {
    get: () => RocketIcon,
    template: () => ''
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
    }
  }
}

const props = defineProps<{
  prose?: boolean
  prefix?: string
  /** Override the slug taken from the route */
  slug?: string
  class?: any
  /** List of props to ignore in selection */
  ignore?: string[]
  /** List of props to hide from code and selection */
  hide?: string[]
  /** List of props to externalize in script setup */
  external?: string[]
  /** The types of the externalized props */
  externalTypes?: string[]
  /** List of props to use with `v-model` */
  model?: string[]
  /** List of props to cast from code and selection */
  cast?: { [key: string]: string }
  /** List of items for each prop */
  items?: { [key: string]: string[] }
  props?: { [key: string]: any }
  slots?: { [key: string]: any }
  /**
   * Whether to format the code with Prettier
   * @defaultValue false
   */
  prettier?: boolean
  /**
   * Whether to collapse the code block
   * @defaultValue false
   */
  collapse?: boolean
  /**
   * A list of line numbers to highlight in the code block
   */
  highlights?: number[]
  /**
   * Whether to add overflow-hidden to wrapper
   */
  overflowHidden?: boolean
  /**
   * Hide bg grid
   * @defaultValue true
   */
  hideBgGrid?: boolean
}>()

const route = useRoute()
const { $prettier } = useNuxtApp()

const camelName = camelCase(props.slug ?? route.path.split('/').filter(Boolean).pop() ?? '')
const name = `${props.prose ? 'Prose' : 'B24'}${upperFirst(camelName)}`
const component = defineAsyncComponent(() => {
  if (props.prefix) {
    return import(`#b24ui/components/${props.prefix}/${upperFirst(camelName)}.vue`)
  }

  if (props.prose) {
    return import(`#b24ui/components/prose/${upperFirst(camelName)}.vue`)
  }

  return import(`#b24ui/components/${upperFirst(camelName)}.vue`)
})

const componentProps = reactive({
  ...Object.fromEntries(Object.entries(props.props || {}).map(([key, value]) => {
    const cast = props.cast?.[key]

    if (cast && !castMap[cast]) {
      throw new Error(`Unknown cast: ${cast}`)
    }

    return [key, cast ? castMap[cast]!.get(value) : value]
  }))
})
const componentEvents = reactive({
  ...Object.fromEntries((props.model || []).map(key => [`onUpdate:${key}`, (e: any) => setComponentProp(key, e)])),
  ...(componentProps.modelValue ? { [`onUpdate:modelValue`]: (e: any) => setComponentProp('modelValue', e) } : {})
})

const helperForChangeComponentProps = ref(hash({ name: name, ts: Date.now() }))

function getComponentProp(name: string) {
  return get(componentProps, name) ?? undefined
}

function setComponentProp(name: string, value: any) {
  set(componentProps, name, value)
  // Forcefully update the hash
  helperForChangeComponentProps.value = hash({ name: name, ts: Date.now() })
}

const componentTheme = ((props.prose ? theme.prose : theme) as any)[camelName]
const meta = await fetchComponentMeta(name as any)

function mapKeys(obj: object, parentKey = ''): any {
  return Object.entries(obj || {}).flatMap(([key, value]: [string, any]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      return mapKeys(value, key)
    }

    const fullKey = parentKey ? `${parentKey}.${key}` : key

    return !props.ignore?.includes(fullKey) && !props.hide?.includes(fullKey) ? fullKey : undefined
  }).filter(Boolean)
}

const options = computed(() => {
  const keys = mapKeys(props.props || {})

  return keys.map((key: string) => {
    const prop = meta?.meta?.props?.find((prop: any) => prop.name === key)
    const propItems = get(props.items, key, [])
    const items = propItems.length
      ? propItems.map((item: any) => ({
          value: item,
          label: String(item)
        }))
      : prop?.type === 'boolean' || prop?.type === 'boolean | undefined'
        ? [{ value: true, label: 'true' }, { value: false, label: 'false' }]
        : Object.keys(componentTheme?.variants?.[key] || {}).filter((variant) => {
            return variant !== 'true' && variant !== 'false'
          }).map(variant => ({
            value: variant,
            label: variant
          }))

    return {
      name: key,
      label: key,
      type: props?.cast?.[key] ?? prop?.type,
      items
    }
  })
})

/**
 * @see docs/server/utils/transformMDC.ts -> generateComponentCode
 */
const code = computed(() => {
  let code = ''

  let isUseIcon = false
  for (const [key, value] of Object.entries(componentProps)) {
    if (['icon', 'trailingIcon', 'deleteIcon', 'selectedIcon', 'incrementIcon', 'decrementIcon', 'checkedIcon', 'uncheckedIcon', 'separatorIcon', 'closeIcon', 'backIcon', 'prevIcon', 'nextIcon'].includes(key)) {
      isUseIcon = true
      break
    } else if (typeof value === 'object') {
      const parsedValue: string | { icon?: string } | null = !props.external?.includes(key) ? value : key

      if (parsedValue && typeof parsedValue !== 'string' && parsedValue?.icon) {
        isUseIcon = true
        break
      }
    }
  }
  if (!isUseIcon && props.external?.length) {
    for (const [_i, key] of props.external.entries()) {
      const parsedValue = json5.stringify(componentProps[key], null, 2)?.replace(/,([ |\t\n]+[}|\]])/g, '$1')
      if (parsedValue?.includes('icon')) {
        isUseIcon = true
        break
      }
    }
  }

  if (props.prose) {
    code += `\`\`\`mdc
::${camelName}`

    const proseProps = Object.entries(componentProps).map(([key, value]) => {
      if (value === undefined || value === null || value === '' || props.hide?.includes(key)) {
        return
      }

      return `${key}="${value}"`
    }).filter(Boolean).join(' ')

    if (proseProps.length) {
      code += `{${proseProps}}`
    }

    code += `
${props.slots?.default}
::
\`\`\``

    return code
  }

  if (props.collapse) {
    code += `::code-collapse
`
  }

  code += `\`\`\`vue${props.highlights?.length ? ` {${props.highlights.join('-')}}` : ''}`

  if (props.external?.length || isUseIcon) {
    code += `
<script setup lang="ts">
`
    let isSomeImport = false
    if (isUseIcon) {
      isSomeImport = true
      code += `import RocketIcon from '@bitrix24/b24icons-vue/main/RocketIcon'
`
    }

    if (props.external?.length) {
      for (const [_i, key] of props.external.entries()) {
        const cast = props.cast?.[key]
        const isCastDate = ['DateValue', 'DateValue[]', 'DateRange'].includes(cast || '')
        const isCastTime = ['TimeValue'].includes(cast || '')
        const types: string[] = []
        if (isCastDate) {
          types.push('CalendarDate')
        }
        if (isCastTime) {
          types.push('Time')
        }

        if (types.length > 0) {
          isSomeImport = true
          code += `import { ${types.join(', ')} } from '@internationalized/date'
`
        }
      }
    }

    if (props.externalTypes?.length) {
      isSomeImport = true
      const removeArrayBrackets = (type: string): string => type.endsWith('[]') ? removeArrayBrackets(type.slice(0, -2)) : type

      const types = props.externalTypes.map(type => removeArrayBrackets(type))
      code += `import type { ${types.join(', ')} } from '@bitrix24/b24ui-nuxt'
`
    }

    if (props.external?.length) {
      if (isSomeImport) {
        code += `
`
      }

      for (const [i, key] of props.external.entries()) {
        const cast = props.cast?.[key]
        const value = cast ? castMap[cast]!.template(componentProps[key]) : json5.stringify(componentProps[key], null, 2)?.replace(/,([ |\t\n]+[}|\]])/g, '$1')
        const type = props.externalTypes?.[i] ? `<${props.externalTypes[i]}>` : ''

        code += `const ${key === 'modelValue' ? 'value' : key} = ${['DateValue', 'DateValue[]', 'DateRange', 'TimeValue'].includes(cast || '') ? 'shallowRef' : 'ref'}${type}(${value})
`
      }
    }
    code += `<\/script>
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

    if (key === 'icon') {
      code += ` :icon="RocketIcon"`
      continue
    } else if (key === 'trailingIcon') {
      code += ` :trailing-icon="RocketIcon"`
      continue
    } else if (key === 'deleteIcon') {
      code += ` :delete-icon="RocketIcon"`
      continue
    } else if (key === 'selectedIcon') {
      code += ` :selected-icon="RocketIcon"`
      continue
    } else if (key === 'incrementIcon') {
      code += ` :increment-icon="RocketIcon"`
      continue
    } else if (key === 'decrementIcon') {
      code += ` :decrement-icon="RocketIcon"`
      continue
    } else if (key === 'checkedIcon') {
      code += ` :checked-icon="RocketIcon"`
      continue
    } else if (key === 'uncheckedIcon') {
      code += ` :unchecked-icon="RocketIcon"`
      continue
    } else if (key === 'separatorIcon') {
      code += ` :separator-icon="RocketIcon"`
      continue
    } else if (key === 'closeIcon') {
      code += ` :close-icon="RocketIcon"`
      continue
    } else if (key === 'backIcon') {
      code += ` :back-icon="RocketIcon"`
      continue
    } else if (key === 'prevIcon') {
      code += ` :prev-icon="RocketIcon"`
      continue
    } else if (key === 'nextIcon') {
      code += ` :next-icon="RocketIcon"`
      continue
    }

    if (props.model?.includes(key)) {
      code += ` v-model:${key}="${key}"`
      continue
    }

    if (value === undefined || value === null || value === '' || props.hide?.includes(key)) {
      continue
    }

    const prop = meta?.meta?.props?.find((prop: any) => prop.name === key)
    const propDefault = prop && (prop.default ?? prop.tags?.find(tag => tag.name === 'defaultValue')?.text ?? componentTheme?.defaultVariants?.[prop.name])
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
      const preValue = !props.external?.includes(key) ? { ...value } : key
      if (preValue?.icon) {
        preValue.icon = 'RocketIcon'
      }

      const parsedValue = !props.external?.includes(key) ? json5.stringify(preValue, null, 2).replace(/,([ |\t\n]+[}|\])])/g, '$1') : preValue

      code += ` :${name}="${parsedValue.replace('\'RocketIcon\'', 'RocketIcon')}"`
    } else {
      if (propDefault === value) {
        continue
      }

      code += ` ${typeof value === 'number' ? ':' : ''}${name}="${value}"`
    }
  }

  if (props.slots) {
    code += `>`
    for (const [key, value] of Object.entries(props.slots)) {
      if (key === 'default') {
        code += props.slots.default
      } else {
        code += `
  <template #${key}>
    ${value}
  </template>\n`
      }
    }
    code += (Object.keys(props.slots).length > 1 ? '\n' : '') + `</${name}>`
  } else {
    code += ' />'
  }
  code += `\n</template>
\`\`\`
`

  if (props.collapse) {
    code += `
::`
  }

  return code
})

const { data: ast } = await useAsyncData(
  `component-code-${name}-${hash({ props: componentProps, slots: props.slots, external: props.external, externalTypes: props.externalTypes, collapse: props.collapse })}-${helperForChangeComponentProps.value}`,
  async () => {
    if (!props.prettier) {
      return parseMarkdown(code.value)
    }

    let formatted = ''
    try {
      formatted = await $prettier.format(code.value, {
        trailingComma: 'none',
        semi: false,
        singleQuote: true,
        printWidth: 100
      })
    } catch {
      formatted = code.value
    }

    return parseMarkdown(formatted)
  },
  { watch: [code, helperForChangeComponentProps] }
)
</script>

<template>
  <div class="my-5">
    <div class="relative">
      <div
        v-if="options.length"
        class="flex flex-wrap items-start gap-[10px] text-(--ui-color-design-tinted-na-content) bg-(--ui-color-design-tinted-na-bg) border-(--ui-color-design-tinted-na-stroke) border border-b-0 relative rounded-t-(--ui-border-radius-md) p-[10px] overflow-x-auto"
      >
        <template v-for="option in options" :key="option.name">
          <B24FormField :label="option.label">
            <B24Switch
              v-if="option.type?.includes('boolean') && typeof getComponentProp(option.name) === 'boolean'"
              :model-value="getComponentProp(option.name)"
              @update:model-value="setComponentProp(option.name, $event)"
            />
            <B24Select
              v-else-if="option.items?.length"
              :model-value="getComponentProp(option.name)"
              :items="option.name.toLowerCase().endsWith('color') ? option.items.filter((color: any): color is { value: string } => { return (color?.value || '').includes('air') }).filter(Boolean) : option.items"
              value-key="value"
              :content="{ align: 'start', side: 'bottom', sideOffset: 8 }"
              :b24ui="{ base: 'min-w-[175px]' }"
              @update:model-value="setComponentProp(option.name, $event)"
            />
            <B24InputNumber
              v-else-if="option.label === 'content.sideOffset' || (option.type?.includes('number') && typeof getComponentProp(option.name) === 'number')"
              :model-value="getComponentProp(option.name)"
              :b24ui="{ base: 'w-[105px]' }"
              @update:model-value="setComponentProp(option.name, $event)"
            />
            <B24Input
              v-else
              type="text"
              :model-value="getComponentProp(option.name)"
              :b24ui="{ base: 'min-w-[20px]' }"
              @update:model-value="setComponentProp(option.name, $event)"
            />
          </B24FormField>
        </template>
      </div>

      <div
        v-if="component"
        style="background-position: 10px 10px"
        class="flex justify-center border border-b-0 border-(--ui-color-design-tinted-na-stroke) relative p-[16px] z-[1]"
        :class="[
          !options.length && 'rounded-t-md',
          props.class,
          { 'overflow-hidden': props.overflowHidden },
          { 'bg-grid-example [mask-image:linear-gradient(0deg,rgba(255,255,255,0.09),rgba(255,255,255,0.18))': !props.hideBgGrid }
        ]"
      >
        <component :is="component" v-bind="{ ...componentProps, ...componentEvents }">
          <template v-for="slot in Object.keys(slots || {})" :key="slot" #[slot]>
            <slot :name="slot" mdc-unwrap="p">
              {{ slots?.[slot] }}
            </slot>
          </template>
        </component>
      </div>
    </div>

    <ClientOnly>
      <MDCRenderer
        v-if="ast"
        :body="ast.body"
        :data="ast.data"
        class="[&_pre]:!rounded-t-none [&_div.my-5]:!mt-0"
      />
      <template #fallback>
        <div class="[&_pre]:!rounded-t-none [&_div.my-5]:!mt-0">
          <ProsePre class="text-(length:--ui-font-size-xs)">{{ { wait: 'Loading client-side content...' } }}</ProsePre>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
