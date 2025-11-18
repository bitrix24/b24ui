<script setup lang="ts">
import { camelCase } from 'scule'
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
}>(), {
  preview: true,
  source: true,
  border: true
})

const slots = defineSlots<{
  options(props?: {}): any
  code(props?: {}): any
}>()

const el = ref<HTMLElement | null>(null)

const { $prettier } = useNuxtApp()
const { width } = useElementSize(el)
const config = useRuntimeConfig()

const camelName = camelCase(props.name)

const data = await fetchComponentExample(camelName)

const componentProps = reactive({ ...(props.props || {}) })

const code = computed(() => {
  let code = ''

  if (props.collapse) {
    code += `::code-collapse
`
  }

  code += `\`\`\`vue ${props.preview ? '' : ` [${data.pascalName}.vue]`}${props.highlights?.length ? `{${props.highlights.join('-')}}` : ''}
${data?.code ?? ''}
\`\`\``

  if (props.collapse) {
    code += `
::`
  }

  return code
})

const { data: ast } = await useAsyncData(`component-example-${camelName}${hash({ props: componentProps, collapse: props.collapse })}`, async () => {
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
}, { watch: [code] })

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
  <div ref="el" class="my-5">
    <template v-if="preview">
      <div
        class="relative"
        :class="[{
          'border-(--ui-color-design-tinted-na-stroke) border': props.border,
          'border-b-0 rounded-t-md': props.source,
          'rounded-md': !props.source,
          'overflow-hidden': props.overflowHidden
        }]"
      >
        <div
          v-if="props.options?.length || !!slots.options"
          class="flex gap-4 p-4 border-b border-(--ui-color-design-tinted-na-stroke)"
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
          :class="[props.class, !iframeMobile && 'max-w-[1300px]']"
        />
        <div
          v-else
          class="flex justify-center p-[16px] bg-grid-example [mask-image:linear-gradient(0deg,rgba(255,255,255,0.09),rgba(255,255,255,0.18))"
          :class="props.class"
        >
          <component :is="camelName" v-bind="{ ...componentProps, ...optionsValues }" />
        </div>
      </div>
    </template>

    <template v-if="props.source">
      <div v-if="!!slots.code" class="[&_pre]:!rounded-t-none [&_div.my-5]:!mt-0 scrollbar-transparent">
        <slot name="code" />
      </div>
      <template v-else-if="ast">
        <ClientOnly>
          <MDCRenderer
            :body="ast.body"
            :data="ast.data"
            class="[&_pre]:!rounded-t-none [&_div.my-5]:!mt-0 scrollbar-transparent"
          />
          <template #fallback>
            <div class="[&_pre]:!rounded-t-none [&_div.my-5]:!mt-0 scrollbar-transparent">
              <ProsePre class="text-(length:--ui-font-size-xs)">{{ { wait: 'Loading client-side content...' } }}</ProsePre>
            </div>
          </template>
        </ClientOnly>
      </template>
    </template>
  </div>
</template>
