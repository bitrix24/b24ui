import { splitByCase, upperFirst, camelCase, kebabCase } from 'scule'

function replaceBrackets(value) {
  return value.replace(/\[/g, '<').replace(/\]/g, '>')
}

const playground = ({ name, pro }) => {
  const upperName = splitByCase(name).map(p => upperFirst(p)).join('')
  const kebabName = kebabCase(name)

  return {
    filename: `playground/app/pages/components/${kebabName}.vue`,
    contents: pro
      ? undefined
      : replaceBrackets(`
[template]
  [div]
    [B24${upperName} /]
  [/div]
[/template]
`)
  }
}

const component = ({ name, primitive, pro, prose, content }) => {
  const upperName = splitByCase(name).map(p => upperFirst(p)).join('')
  const camelName = camelCase(name)
  const kebabName = kebabCase(name)
  const key = 'ui'
  const path = 'ui'

  if (pro) {
    // pro
  }

  return {
    filename: `src/runtime/components/${prose ? 'prose/' : ''}${content ? 'content/' : ''}${upperName}.vue`,
    contents: primitive
      ? replaceBrackets(`
[script lang="ts"]
import { tv } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/${path}/${prose ? 'prose/' : ''}${content ? 'content/' : ''}${kebabName}'

const appConfig = _appConfig as AppConfig & { ${key}: { ${prose ? 'prose: { ' : ''}${camelName}: Partial<typeof theme> } }${prose ? ' }' : ''}

const ${camelName} = tv({ extend: tv(theme), ...(appConfig.${key}?.${prose ? 'prose?.' : ''}${camelName} || {}) })

export interface ${upperName}Props {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  ui?: Partial<typeof ${camelName}.slots>
}

export interface ${upperName}Slots {
  default(props?: {}): any
}
[/script]

[script setup lang="ts"]
import { Primitive } from 'radix-vue'

const props = withDefaults(defineProps<${upperName}Props>(), { as: 'div' })
defineSlots<${upperName}Slots>()

const ui = ${camelName}()
[/script]

[template]
  [Primitive :as="as" :class="ui.root({ class: [props.class, props.ui?.root] })"]
    [slot /]
  [/Primitive]
[/template]
`)
      : replaceBrackets(`
[script lang="ts"]
import { tv, type VariantProps } from 'tailwind-variants'
import type { ${upperName}RootProps, ${upperName}RootEmits } from 'radix-vue'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/${path}/${prose ? 'prose/' : ''}${content ? 'content/' : ''}${kebabName}'

const appConfig = _appConfig as AppConfig & { ${key}: { ${prose ? 'prose: { ' : ''}${camelName}: Partial<typeof theme> } }${prose ? ' }' : ''}

const ${camelName} = tv({ extend: tv(theme), ...(appConfig.${key}?.${prose ? 'prose?.' : ''}${camelName} || {}) })

type ${upperName}Variants = VariantProps<typeof ${camelName}>

export interface ${upperName}Props extends Pick<${upperName}RootProps> {
  class?: any
  ui?: Partial<typeof ${camelName}.slots>
}

export interface ${upperName}Emits extends ${upperName}RootEmits {}

export interface ${upperName}Slots {}
[/script]

[script setup lang="ts"]
import { ${upperName}Root, useForwardPropsEmits } from 'radix-vue'
import { reactivePick } from '@vueuse/core'

const props = defineProps<${upperName}Props>()
const emits = defineEmits<${upperName}Emits>()
const slots = defineSlots<${upperName}Slots>()

const rootProps = useForwardPropsEmits(reactivePick(props), emits)

const ui = ${camelName}()
[/script]

[template]
  [${upperName}Root v-bind="rootProps" :class="ui.root({ class: [props.class, props.ui?.root] })" /]
[/template]
`)
  }
}

const theme = ({ name, prose, content }) => {
  const kebabName = kebabCase(name)

  return {
    filename: `src/theme/${prose ? 'prose/' : ''}${content ? 'content/' : ''}${kebabName}.ts`,
    contents: prose
      ? `
export default {
  base: ''
}
`
      : `
export default {
  slots: {
    root: ''
  }
}
`
  }
}

const test = ({ name, prose, content }) => {
  const upperName = splitByCase(name).map(p => upperFirst(p)).join('')

  return {
    filename: `test/components/${content ? 'content/' : ''}${upperName}.spec.ts`,
    contents: prose
      ? undefined
      : `
import { describe, it, expect } from 'vitest'
import ${upperName}, { type ${upperName}Props, type ${upperName}Slots } from '../../${content ? '../' : ''}src/runtime/components/${content ? 'content/' : ''}${upperName}.vue'
import ComponentRender from '../${content ? '../' : ''}component-render'

describe('${upperName}', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'div' } }],
    ['with class', { props: { class: '' } }],
    ['with ui', { props: { ui: {} } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ${upperName}Props, slots?: Partial<${upperName}Slots> }) => {
    const html = await ComponentRender(nameOrHtml, options, ${upperName})
    expect(html).toMatchSnapshot()
  })
})
`
  }
}

const doc = ({ name, pro }) => {
  const kebabName = kebabCase(name)
  const upperName = splitByCase(name).map(p => upperFirst(p)).join('')

  if (pro) {
    // @memo for pro
  }

  return {
    filename: `docs/components/${kebabName}.md`,
    contents: replaceBrackets(`---
title: ${upperName}
description:
---

# ${upperName}

[Description
  nuxt-ui="https://ui.nuxt.com/components/${kebabName}"
  radix-vue="https://www.radix-vue.com/components/${kebabName}"
  radix-vue-title="${kebabName}"
  git="https://github.com/bitrix24/b24ui/tree/v3/src/runtime/components/${upperName}.vue"
]
  A placeholder to show while content is loading.
[/Description]

## Usage

[ComponentExample group="${upperName.toLowerCase()}" file="${upperName}Example" /]
<<< @/examples/${upperName.toLowerCase()}/${upperName}Example.vue

## API

### Props

[ComponentProps component="${upperName}" /]

### Slots

[ComponentSlots component="${upperName}" /]

### Emits

[ComponentEmits component="${upperName}" /]
`)
  }
}

export default {
  playground,
  component,
  theme,
  test,
  doc
}
