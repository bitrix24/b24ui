<script setup lang="ts">
import { upperFirst, camelCase } from 'scule'
import { computed, type ComputedRef } from 'vue'
import B24UIMeta from '@bitrix24/b24ui-nuxt/meta'
import type { ComponentMeta } from 'vue-component-meta'

const $props = withDefaults(defineProps<{
  component: string
  ignore?: string[]
}>(), {
  ignore: () => [
    'activeClass',
    'inactiveClass',
    'exactActiveClass',
    'ariaCurrentValue',
    'href',
    'rel',
    'noRel',
    'prefetch',
    'prefetchOn',
    'noPrefetch',
    'prefetchedClass',
    'replace',
    'exact',
    'exactQuery',
    'exactHash',
    'external',
    'onClick'
  ]
})

// @todo remove this
console.log([
  'B24UIMeta',
  $props.component,
  B24UIMeta
])

const camelName = camelCase($props.component)
const name = `B24${upperFirst(camelName)}`
const meta = B24UIMeta[name] || {}

const metaProps: ComputedRef<ComponentMeta['props']> = computed(() => {
  if (!meta?.meta?.props?.length) {
    return []
  }

  return meta.meta.props.filter((prop) => {
    return !$props.ignore?.includes(prop.name)
  }).map((prop) => {
    // @todo fix this ////
    // prop.default = prop.default ?? prop.tags?.find(tag => tag.name === 'defaultValue')?.text ?? componentTheme?.defaultVariants?.[prop.name]
    prop.default = prop.default ?? prop.tags?.find(tag => tag.name === 'defaultValue')?.text
    // @ts-expect-error - Type is not correct
    prop.type = !prop.type.startsWith('boolean') && prop.schema?.kind === 'enum' && Object.keys(prop.schema.schema)?.length ? Object.values(prop.schema.schema).map(schema => schema?.type ? schema.type : schema).join(' | ') : prop.type
    return prop
  }).sort((a, b) => {
    if (a.name === 'as') {
      return -1
    }

    if (b.name === 'as') {
      return 1
    }

    if (a.name === 'ui') {
      return 1
    }

    if (b.name === 'ui') {
      return -1
    }

    return 0
  })
})

// @todo style
// @todo add ProseCode
// @todo add <HighlightInlineType v-if="prop.default" :type="prop.default" />
// @todo add <HighlightInlineType v-if="prop.type" :type="prop.type" />
// @todo add <MDC v-if="prop.description" :value="prop.description" class="text-[var(--ui-text-toned)] mt-1" />
// @todo add <ComponentPropsLinks v-if="prop.tags?.length" :prop="prop" />
// @todo add <ComponentPropsSchema v-if="prop.schema" :prop="prop" :ignore="ignore" />
</script>

<template>
  <div class="info-wrapper">
    <table class="info">
      <thead>
        <tr>
          <th class="value-info-1">
            Prop
          </th>
          <th class="value-info-2">
            Default
          </th>
          <th class="value-info-3">
            Type
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="prop in metaProps"
          :key="prop.name"
        >
          <td translate="no" class="variable">
            {{ prop.name }}
          </td>
          <td translate="no" class="value">
            <div v-if="prop.default">
              {{ prop.default }}
            </div>
          </td>
          <td translate="no" class="value">
            <div v-if="prop.type">
              {{ prop.type }}
            </div>

            <div v-if="prop.description" class="text-red-500 mt-1">
              {{ prop.description }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
