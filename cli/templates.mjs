import { splitByCase, upperFirst, camelCase, kebabCase } from 'scule'

function replaceBrackets(value) {
  return value.replace(/\[\[/g, '<').replace(/\]\]/g, '>')
}

const playground = ({ name, pro }) => {
  const upperName = splitByCase(name).map(p => upperFirst(p)).join('')
  const kebabName = kebabCase(name)

  return {
    filename: `playground/app/pages/components/${kebabName}.vue`,
    contents: pro
      ? undefined
      : replaceBrackets(`
[[template]]
  [[div]]
    [[B24${upperName} /]]
  [[/div]]
[[/template]]
`)
  }
}

const component = ({ name, primitive, pro, prose, content }) => {
  const upperName = splitByCase(name).map(p => upperFirst(p)).join('')
  const camelName = camelCase(name)
  const kebabName = kebabCase(name)
  const key = 'b24ui'
  const path = 'b24ui'

  if (pro) {
    // pro
  }

  return {
    filename: `src/runtime/components/${prose ? 'prose/' : ''}${content ? 'content/' : ''}${upperName}.vue`,
    contents: primitive
      ? replaceBrackets(`
[[script lang="ts"]]
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/${path}/${prose ? 'prose/' : ''}${content ? 'content/' : ''}${kebabName}'
import type { ComponentConfig } from '../types/utils'

type ${upperName} = ComponentConfig<typeof theme, AppConfig, ${upperName}>

export interface ${upperName}Props {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: ${upperName}['slots']
}

export interface ${upperName}Slots {
  default(props?: {}): any
}
[[/script]]

[[script setup lang="ts"]]
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<${upperName}Props>()
defineSlots<${upperName}Slots>()

const appConfig = useAppConfig() as ${upperName}['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.${camelName} || {}) })())
[[/script]]

[[template]]
  [[Primitive :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })"]]
    [[slot /]]
  [[/Primitive]]
[[/template]]
`)
      : replaceBrackets(`
[[script lang="ts"]]
import type { ${upperName}RootProps, ${upperName}RootEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/${path}/${prose ? 'prose/' : ''}${content ? 'content/' : ''}${kebabName}'
import type { ComponentConfig } from '../types/utils'

const appConfig${camelName} = _appConfig as AppConfig & { ${key}: { ${prose ? 'prose: { ' : ''}${camelName}: Partial[[typeof theme]] } }${prose ? ' }' : ''}

type ${upperName} = ComponentConfig<typeof theme, AppConfig, ${upperName}>

export interface ${upperName}Props extends Pick[[${upperName}RootProps]] {
  class?: any
  b24ui?: ${upperName}['slots']
}

export interface ${upperName}Emits extends ${upperName}RootEmits {}

export interface ${upperName}Slots {}
[[/script]]

[[script setup lang="ts"]]


import { ${upperName}Root, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<${upperName}Props>()
const emits = defineEmits<${upperName}Emits>()
const slots = defineSlots<${upperName}Slots>()

const appConfig = useAppConfig() as ${upperName}['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props), emits)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.${camelName} || {}) })())
[[/script]]

[[template]]
  [[${upperName}Root v-bind="rootProps" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })" /]]
[[/template]]
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
    ['with as', { props: { as: 'section' } }],
    ['with class', { props: { class: '' } }],
    ['with b24ui', { props: { b24ui: {} } }],
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

const docs = ({ name, pro, primitive }) => {
  const kebabName = kebabCase(name)
  const upperName = splitByCase(name).map(p => upperFirst(p)).join('')

  if (pro) {
    // @memo for pro
  }

  return {
    filename: `docs/components/${kebabName}.md`,
    contents: replaceBrackets(`---
title: ${upperName}
description: _todo_ change me
outline: deep
---
[[script setup]]
import ${upperName}Example from '/examples/${upperName.toLowerCase()}/${upperName}Example.vue';
[[/script]]
# ${upperName}

[[Description ${
  primitive
    ? ''
    : `
  nuxt-ui="https://ui3.nuxt.dev/components/${kebabName}"
  reka-ui="https://reka-ui.com/docs/components/${kebabName}"
  reka-ui-title="${kebabName}"`}
  git="https://github.com/bitrix24/b24ui/blob/main/src/runtime/components/${upperName}.vue"
]]
  @todo change me
[[/Description]]

## Usage

[[ComponentShowExample ]]
  [[iframe data-why class="min-h-[80px]" allowtransparency="true"]]
    [[${upperName}Example /]]
  [[/iframe]]
[[/ComponentShowExample]]

<<< @/examples/${upperName.toLowerCase()}/${upperName}Example.vue

## API

### Props

[[ComponentProps component="${upperName}" /]]

### Slots

[[ComponentSlots component="${upperName}" /]]

### Emits

[[ComponentEmits component="${upperName}" /]]
`)
  }
}

export default {
  playground,
  component,
  theme,
  test,
  docs
}
