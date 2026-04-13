<script setup lang="ts">
import { camelCase, upperFirst } from 'scule'
import { hash } from 'ohash'
import { useElementSize } from '@vueuse/core'
import { get, set } from '#b24ui/utils'

const props = withDefaults(defineProps<{
  name: string
  class?: any
  /**
   * Whether to render the component in an iframe
   * @defaultValue false
   */
  iframe?: boolean | { [key: string]: any }
  /**
   * Whether to display the component in a mobile-sized iframe viewport
   * @defaultValue false
   */
  iframeMobile?: boolean
  props?: { [key: string]: any }
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
   * Whether to show the preview
   * When `false`, the filename will be shown instead
   * @defaultValue true
   */
  preview?: boolean
  /**
   * Whether to show the source code
   * @defaultValue true
   */
  source?: boolean
  /**
   * Show border
   * @defaultValue true
   */
  border?: boolean
  /**
   * A list of variable props to link to the component.
   */
  options?: Array<{
    type?: string
    alias?: string
    name: string
    label: string
    items?: any[]
    default: any
    multiple?: boolean
  }>
  /**
   * A list of line numbers to highlight in the code block
   */
  highlights?: number[]
  /**
   * Whether to add overflow-hidden to wrapper
   */
  overflowHidden?: boolean
  /**
   * Whether to add background-elevated to wrapper
   */
  elevated?: boolean
  lang?: string
  /**
   * Override the filename used for the code block
   */
  filename?: string
}>(), {
  preview: true,
  source: true,
  border: true,
  lang: 'vue'
})

const slots = defineSlots<{
  options(props?: {}): any
  code(props?: {}): any
}>()

const el = ref<HTMLElement | null>(null)
const wrapperContainer = ref<HTMLElement | null>(null)
const componentContainer = ref<HTMLElement | null>(null)

const { $prettier } = useNuxtApp()
const { framework } = useFrameworks()
const { width } = useElementSize(el)
const config = useRuntimeConfig()

const camelName = camelCase(props.name)

const exampleModules = import.meta.glob('~/components/content/examples/**/*.vue')
const exampleMatch = Object.entries(exampleModules).find(([path]) => path.endsWith(`/${upperFirst(camelName)}.vue`))
const resolvedComponent = exampleMatch ? defineAsyncComponent(exampleMatch[1] as any) : undefined

const { data } = await useFetchComponentExample(camelName)

const componentProps = reactive({ ...(props.props || {}) })

const code = computed(() => {
  let code = ''

  if (props.collapse) {
    code += `::code-collapse
`
  }

  const source = framework.value === 'vue' && props.lang === 'vue' ? addVueImports(data.value?.code ?? '') : (data.value?.code ?? '')

  code += `\`\`\`${props.lang} ${props.preview ? '' : ` [${props.filename ?? data.value?.pascalName}.${props.lang}]`}${props.highlights?.length ? `{${props.highlights.join('-')}}` : ''}
${source}
\`\`\``

  if (props.collapse) {
    code += `
::`
  }

  return code
})

const { data: ast } = useAsyncData(`component-example-${camelName}${hash({ props: componentProps, collapse: props.collapse, framework: framework.value })}`, async () => {
  if (!props.prettier) {
    return cachedParseMarkdown(code.value)
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

  return cachedParseMarkdown(formatted)
}, { lazy: import.meta.client, watch: [code] })

const optionsValues = ref(props.options?.reduce((acc, option) => {
  if (option.name) {
    acc[option.alias || option.name] = option.default
  }
  if (option.name.toLowerCase().endsWith('color') && option.items?.length) {
    option.items = option.items.map((item: any) => ({
      label: item,
      value: item,
      chip: { color: item }
    }))
  }
  return acc
}, {} as Record<string, any>) || {})

const urlSearchParams = computed(() => {
  const params = {
    ...optionsValues.value,
    ...componentProps
  }

  if (!props.iframeMobile) {
    params.width = Math.round(width.value).toString()
  }

  return new URLSearchParams(params).toString()
})
</script>

<template>
  <div ref="el" class="my-5" :style="{ '--b24ui-header-height': '3.625rem' }">
    <template v-if="preview">
      <div
        ref="wrapperContainer"
        class="relative group/component"
      >
        <div
          class="relative z-1"
          :class="[{
            'border-(--ui-color-divider-accent) border': props.border,
            'border-b-0 rounded-t-md': props.source,
            'rounded-md': !props.source,
            'overflow-hidden': props.overflowHidden
          }]"
        >
          <div
            v-if="props.options?.length || !!slots.options"
            class="flex gap-4 p-4 border-b border-muted"
          >
            <slot name="options" />

            <B24FormField
              v-for="option in props.options"
              :key="option.name"
              :label="option.label"
              :name="option.name"
            >
              <B24SelectMenu
                v-if="option.items?.length"
                :model-value="get(optionsValues, option.name)"
                :items="option.items"
                :search-input="false"
                :value-key="option.name.toLowerCase().endsWith('color') ? 'value' : undefined"
                class="min-w-[175px]"
                :multiple="option.multiple"
                :class="[option.name.toLowerCase().endsWith('color') && 'pl-6']"
                :content="{ align: 'start', side: 'bottom', sideOffset: 8 }"
                @update:model-value="set(optionsValues, option.name, $event)"
              />
              <B24Input
                v-else
                :type="option.type"
                :model-value="get(optionsValues, option.name)"
                :b24ui="{ base: 'min-w-[20px]' }"
                @update:model-value="set(optionsValues, option.name, $event)"
              />
            </B24FormField>
          </div>

          <iframe
            v-if="iframe"
            v-bind="typeof iframe === 'object' ? iframe : {}"
            :src="`${config.public.baseUrl}/examples/${name}/?${urlSearchParams}`"
            class="relative w-full"
            :class="[props.class, { 'dark:bg-gray-950/50 rounded-t-md': props.elevated }, !iframeMobile && 'max-w-[1300px]']"
          />
          <div
            v-else-if="resolvedComponent"
            ref="componentContainer"
            class="flex justify-center p-4 bg-grid-example [mask-image:linear-gradient(0deg,rgba(255,255,255,0.09),rgba(255,255,255,0.18))"
            :class="[props.class, { 'dark:bg-gray-950/50 rounded-t-md': props.elevated }]"
          >
            <component :is="resolvedComponent" v-bind="{ ...componentProps, ...optionsValues }" />
          </div>
        </div>

        <ClientOnly>
          <LazyComponentThemeVisualizer
            :container="componentContainer"
            :position-container="wrapperContainer"
          />
        </ClientOnly>
      </div>
    </template>

    <template v-if="props.source">
      <div v-if="!!slots.code" class="[&_pre]:rounded-t-none! [&_div.my-5]:mt-0! scrollbar-transparent">
        <slot name="code" />
      </div>
      <MDCRenderer
        v-else-if="ast"
        :body="ast.body"
        :data="ast.data"
        class="[&_pre]:rounded-t-none! [&_div.my-5]:mt-0! scrollbar-transparent"
      />
    </template>
  </div>
</template>
